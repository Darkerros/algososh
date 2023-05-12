import {useCallback, useRef, useState} from "react";
import {Queue} from "../utils/queue";

export const useQueue = (maxSize: number) => {
    const queue = useRef<Queue<string>>(new Queue<string>(maxSize))

    const [queueElements,setQueueElements] = useState<string[]>(() => queue.current.getElements())
    const [isQueueFull, setisQueueFull] = useState<boolean>(false)
    const [isQueueEmpty, setQueueEmpty] = useState<boolean>(true)
    const [tailIndex, setTailIndex] = useState<number>(queue.current.getTailIndex())
    const [headIndex, setHeadIndex] = useState<number>(queue.current.getHead())

    const dequeue = useCallback(() => {
        queue.current.dequeue()
        setQueueElements([...queue.current.getElements()])
        setQueueEmpty(queue.current.isEmpty())
        setisQueueFull(queue.current.isFull())
        setTailIndex(queue.current.getTailIndex())
        setHeadIndex(queue.current.getHead())
    },[])

    const enqueue = useCallback((item: string) => {
        queue.current.enqueue(item)
        setQueueElements([...queue.current.getElements()])
        setQueueEmpty(queue.current.isEmpty())
        setisQueueFull(queue.current.isFull())
        setTailIndex(queue.current.getTailIndex())
        setHeadIndex(queue.current.getHead())
    },[])

    const clear = useCallback(() => {
        queue.current.clear()
        setQueueElements([...queue.current.getElements()])
        setQueueEmpty(queue.current.isEmpty())
        setisQueueFull(queue.current.isFull())
        setTailIndex(queue.current.getTailIndex())
        setHeadIndex(queue.current.getHead())
    },[])

    return {
        queue,
        queueElements,
        isQueueFull,
        isQueueEmpty,
        tailIndex,
        headIndex,
        dequeue,
        enqueue,
        clear
    }
}