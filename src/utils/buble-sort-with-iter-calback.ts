import {ElementStates} from "../types/element-states";
import {sleep} from "./sleep";
import {SHORT_DELAY_IN_MS} from "../constants/delays";
import {Direction} from "../types/direction";
import {ISortElement} from "../types/sort-element-interface";
import {swapStrokeArrayItems} from "./swap-array-items";

export const bubleSortWithIterCalback = async (array: ISortElement[], order: Direction, iterCallback: (array: ISortElement[]) => void) => {
    const { length } = array;
    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            array[j].state = ElementStates.Changing;
            array[j + 1].state = ElementStates.Changing;
            iterCallback([...array]);
            await sleep(SHORT_DELAY_IN_MS);
            if (order === Direction.Ascending ? array[j].index > array[j + 1].index : array[j].index < array[j + 1].index) {
                swapStrokeArrayItems(array, j, j + 1);
            }
            array[j].state = ElementStates.Default;
        }
        array[array.length - i - 1].state = ElementStates.Modified;
        iterCallback([...array]);
    }
}