import { makeAutoObservable } from "mobx";

type Recents = {
    [key: string]: boolean;
}
export function setSearch(userName: string) {
    const rs = localStorage.getItem("recently");
    if (!rs) {
        const recents: Recents = {
            [userName]: true
        };
        localStorage.setItem("recently", JSON.stringify(recents));
        return;
    }
    let recents: Recents = JSON.parse(rs);
    const entries = Object.entries(recents);
    const limit = 15
    if (entries.length > limit) {
        recents = {};
        for (let x = 0; x < limit; x++) {
            const [k, v] = entries[x];
            recents[k] = v;
        }
    }
    localStorage.setItem("recently", JSON.stringify({
        [userName]: true,
        ...recents, 
    }));
}


export default class Recently {
    recents: Recents = {
        pokimane: true,
        ninja: true,
        xqcow: true,
    };
    isMock: boolean = false;

    constructor() {
        makeAutoObservable(this)
    }

    fetchRecents() {
        const rs = localStorage.getItem("recently");
        if (!rs) {
            this.isMock = true;
            return;
        }
        this.isMock = false
        this.recents = JSON.parse(rs) as Recents;
    }
}