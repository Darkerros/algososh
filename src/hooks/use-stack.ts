import {useCallback, useRef, useState} from "react";
import {Stack} from "../utils/stack";

export const useStack = () => {
    const stack = useRef<Stack<string>>(new Stack<string>())

    const [stackElements,setStackElements] = useState<string[]>(() => stack.current.getElements())
    const [stackSize, setStackSize] = useState<number>(stack.current.getSize())

    const addToStack = useCallback((item: string) => {
        stack.current.push(item)
        setStackElements([...stack.current.getElements()])
        setStackSize(stack.current.getSize())
    },[])

    const deleteFromStack = useCallback(() => {
        stack.current.pop()
        setStackElements([...stack.current.getElements()])
        setStackSize(stack.current.getSize())

    },[])

    const clearStack = useCallback(() => {
        stack.current.clear()
        setStackElements([...stack.current.getElements()])
        setStackSize(stack.current.getSize())

    },[])


    return {
        stack,
        stackElements,
        stackSize,
        addToStack,
        deleteFromStack,
        clearStack
    }
}