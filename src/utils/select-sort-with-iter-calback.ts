import {ISortElement} from "../types/sort-element-interface";
import {Direction} from "../types/direction";
import {ElementStates} from "../types/element-states";
import {sleep} from "./sleep";
import {SHORT_DELAY_IN_MS} from "../constants/delays";
import {swapStrokeArrayItems} from "./swap-array-items";

export const selectSortWithIterCalback = async (array: ISortElement[], order: Direction, iterCallback: (array: ISortElement[]) => void) => {
    const { length } = array;
    for (let i = 0; i < length; i++) {
        let maxInd = i;
        array[maxInd].state = ElementStates.Changing;
        for (let j = i + 1; j < length; j++) {
            array[j].state = ElementStates.Changing;
            iterCallback([...array]);
            await sleep(SHORT_DELAY_IN_MS);
            if (
                order === Direction.Ascending
                    ? array[j].index < array[maxInd].index
                    : array[j].index > array[maxInd].index
            ) {
                maxInd = j;
                array[j].state = ElementStates.Changing;
                array[maxInd].state =
                    i === maxInd ? ElementStates.Changing : ElementStates.Default;
            }
            if (j !== maxInd) {
                array[j].state = ElementStates.Default;
            }
            iterCallback([...array]);
        }
        swapStrokeArrayItems(array, maxInd, i);
        array[maxInd].state = ElementStates.Default;
        array[i].state = ElementStates.Modified;
        iterCallback([...array]);
    }
}