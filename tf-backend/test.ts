type Obj = {
    value: number,
    checked: boolean;
}

const m = new Map<number, Obj>()

m.set(1, {
    value: 2,
    checked: false,
})


const v = m.get(1);
if (v) {
    v.checked = true;
}

console.log(v)