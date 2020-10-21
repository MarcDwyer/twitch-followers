import { TwitchData } from "../twitch_types";

export default class TData {
    private offset: number = 0;
    private limit : number | null = null;

    private initState: TData;

    data: TwitchData.RootChannel | null = null;

    constructor() {
        this.initState = this;
    }


    async fetchData(user: string) {
        const prefix = process.env.NODE_ENV === "development" ? `` : `https://twitch-followers.marcdwyer.dev/`;

        const url = prefix + `/followers/${user}/${this.offset}`;
        console.log(url)
        const f = await fetch(url);
        const data: TwitchData.RootChannel = await f.json();
        this.data = data
    }
    reset() {
        //@ts-ignore
        this = this.initState;
    }
}