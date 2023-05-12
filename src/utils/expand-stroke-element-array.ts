import {ElementStates} from "../types/element-states";
import {DELAY_IN_MS} from "../constants/delays";
import {IStrokeElement} from "../types/stroke-element-interface";
import {swapStrokeArrayItems} from "./swap-array-items";
import {sleep} from "./sleep";

export const expandStrokeElementArray = async (array: IStrokeElement[], iterableCallback: (array: IStrokeElement[]) => void) => {
    const end = array.length - 1;
    const middle = Math.ceil(array.length / 2);

    for (let i = 0; i < middle; i++) {
        let j = end - i;

        if (i !== j) {
            array[i].state = ElementStates.Changing;
            array[j].state = ElementStates.Changing;
            iterableCallback([...array]);
            await sleep(DELAY_IN_MS);
        }
        swapStrokeArrayItems(array, i, j);

        array[i].state = ElementStates.Modified;
        array[j].state = ElementStates.Modified;

        iterableCallback([...array]);
    }
}