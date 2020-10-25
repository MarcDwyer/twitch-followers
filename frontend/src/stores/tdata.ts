import {  makeAutoObservable } from "mobx";
import { ErrorMsg, TwitchLookUp } from "../twitch_types";
import { setSearch } from "./recently";

export default class TData {
    private initState: TData;
    
    isLoading: boolean = false;
    error: ErrorMsg | null = null;
    data: TwitchLookUp.MyData | null = null;
    done: boolean = false;

    constructor() {
        this.initState = {...this };
        makeAutoObservable(this)
    }

     async fetchData(user: string)  {
        this.isLoading = true;
        const prefix = process.env.NODE_ENV === "development" ? `` : `https://${document.location.hostname}`;
        let url = prefix + `/followers/${user}/${this.data?.cursor || "none"}`;
        try {
            const f = await fetch(url);
            if (!f.ok) {
                throw { error: "Server Error"};
            }
            const newFData: TwitchLookUp.MyData = await f.json();
            if ("error" in newFData) throw newFData;
            if (this.data) {
                if (this.done) return;
                const newData = {cursor: newFData.cursor, follows: [...this.data.follows, ...newFData.follows]};
                this.done = newFData.cursor === undefined;
                this.error = null;
                this.data = {...this.data, ...newData};
                return;
            }
            setSearch(user);
            this.error = null
            this.data = newFData;
        }catch (e) {
            this.error = e;
        } finally {
            this.isLoading = false
        }

    }
    reset() {
        const not = {
            initState: true
        }
        for (const [k, v] of Object.entries(this.initState)) {
            if (!(k in not) && typeof v !== 'function') {
                //@ts-ignore
                this[k] = v
            }
        }
    }
}