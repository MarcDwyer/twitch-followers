import { action, makeAutoObservable } from "mobx";
import { ErrorMsg, TwitchLookUp } from "../twitch_types";
import { setSearch } from "./recently";

export default class TData {
  private initState: TData;

  isLoading: boolean = false;
  error: ErrorMsg | null = null;
  data: TwitchLookUp.MyData | null = null;
  done: boolean = false;

  constructor() {
    this.initState = { ...this };
    makeAutoObservable(this);
  }

  @action
  mergeFollows(newFollows: TwitchLookUp.ResolvedList) {
    if (this.data) {
      this.data.follows = [...this.data.follows, ...newFollows];
    }
  }
  @action
  async reqData(user: string) {
    this.isLoading = true;
    const prefix =
      process.env.NODE_ENV === "development"
        ? ``
        : `https://${document.location.hostname}`;
    let url = prefix + `/followers/${user}/${this.data?.cursor || "none"}`;
    try {
      const f = await fetch(url);
      if (!f.ok) {
        throw { error: "Server Error" };
      }
      const newData: TwitchLookUp.MyData = await f.json();
      if ("error" in newData) throw newData;
      if (this.data) {
        if (this.done) return;

        this.done = newData.cursor === undefined;
        this.error = null;
        this.mergeFollows(newData.follows);
        this.data.cursor = newData.cursor;
        return;
      }
      setSearch(user);
      this.error = null;
      this.data = newData;
    } catch (e) {
      this.error = e;
    } finally {
      this.isLoading = false;
    }
  }
  @action
  reset() {
    const not = {
      initState: true,
    };
    for (const [k, v] of Object.entries(this.initState)) {
      if (!(k in not) && typeof v !== "function") {
        //@ts-ignore
        this[k] = v;
      }
    }
  }
}
