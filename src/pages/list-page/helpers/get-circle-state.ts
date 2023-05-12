import {ICircleState} from "../../../types/circle-state-interface";
import {ElementStates} from "../../../types/element-states";

export const getCircleState = (index: number, circleState: ICircleState): ElementStates => {
    const isModified = circleState.modifiedIndex === index
    const isChanging = circleState.changingIndex >= index

    if (isModified)
        return ElementStates.Modified
    if (isChanging)
        return ElementStates.Changing

    return ElementStates.Default
};