export const genArray = (minSize:number, maxSize:number):string[] => {
    const len = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    const arr: string[] = [];
    for (let i = 0; i < len; i++) {
        const randInt = Math.floor(Math.random() * 101);
        arr.push(String(randInt));
    }
    return arr;
}