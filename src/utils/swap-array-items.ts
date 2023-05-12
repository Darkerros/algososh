import {IStrokeElement} from "../types/stroke-element-interface";
import {ISortElement} from "../types/sort-element-interface";

export const swapStrokeArrayItems = (array: (IStrokeElement[] | ISortElement[]), firstItem: number, secondItem: number) => {
    return ([array[firstItem], array[secondItem]] = [array[secondItem], array[firstItem]]);
};

