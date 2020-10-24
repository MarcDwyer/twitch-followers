import {  makeAutoObservable } from "mobx";
import { TwitchFollowers, ErrorMsg } from "../twitch_types";
import { setSearch } from "./recently";

export default class TData {
    private initState: TData;
    
    error: ErrorMsg | null = null;
    data: TwitchFollowers.RootFollowers | null = null;

    constructor() {
        this.initState = {...this };
        makeAutoObservable(this)
    }

     fetchData = async (user: string) =>  {
        const prefix = process.env.NODE_ENV === "development" ? `` : `https://${document.location.hostname}`;

        let url = prefix + `/followers/${user}/${this.data?.pagination || "none"}`;
        
        try {
            const f = await fetch(url);
            if (!f.ok) {
                throw { error: "Server Error"};
            }
            const newFData: TwitchFollowers.RootFollowers = await f.json();
            if ("error" in newFData) throw newFData;
            if (this.data) {
                const dataCopy = {...this.data};
                dataCopy.data = [...dataCopy.data, ...newFData.data]
                this.error = null;
                this.data = dataCopy;
                return;
            }
            setSearch(user);
            this.error = null
            this.data = newFData;
        }catch (e) {
            this.error = e;
        }

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