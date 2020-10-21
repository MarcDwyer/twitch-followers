import { action, makeAutoObservable, observable } from "mobx";
import { TwitchData } from "../twitch_types";
import { setSearch } from "./recently";

export default class TData {
    private offset: number = 0;
    private limit : number | null = null;
    private initState: TData;

    error: TwitchData.ErrorMsg | null = null;
    data: TwitchData.RootChannel | null = null;

    constructor() {
        this.initState = {...this };
        makeAutoObservable(this)
    }

     fetchData = async (user: string) =>  {
        const prefix = process.env.NODE_ENV === "development" ? `` : `https://twitch-followers.marcdwyer.dev/`;
        const sameSearch = this.data && !("error" in this.data)
        if (sameSearch) {
            //@ts-ignore
            this.offset += this.data.follows.length;
        }
        const url = prefix + `/followers/${user}/${this.offset}`;
        const f = await fetch(url);
        const data: TwitchData.RootChannel = await f.json();
        if ("error" in data) {
            this.error = data;
            return
        }
        if (this.data) {
            const {follows} = this.data;
            console.log(data.follows[0])
            this.data.follows = [...follows, ...data.follows]
            this.error = null;
            return;
        }
        setSearch(user);
        this.error = null
        this.data = data
    }
    reset() {
        const not = {
            initState: true
        }
        for (const [k, v] of Object.entries(this.initState)) {
            if (!(k in not)) {
                console.log(k);
                //@ts-ignore
                this[k] = v
            }
        }
    }
}