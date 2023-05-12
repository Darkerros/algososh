import {ChangeEventHandler, useState} from "react";
import styles from './queue-page.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {Circle} from "../ui/circle/circle";
import {ElementStates} from "../../types/element-states";
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import {useQueue} from "../../hooks/use-queue";


export const QueuePage: React.FC = () => {
    const {queueElements,isQueueFull, isQueueEmpty, tailIndex, headIndex, dequeue, enqueue, clear} = useQueue(7)

    const [value, setValue] = useState<string>('')
    const onChange:ChangeEventHandler<HTMLInputElement> = e => setValue(e.currentTarget.value)

    const handleClickAdd = () => {
        enqueue(value)
        setValue('')
    }
    const handleClickDelete = () => {
        dequeue()
    }
    const handleClickClear = () => {
        clear()
    }

    return (
        <SolutionLayout title="Очередь">
            <div className={styles.btnContainer}>
                <Input
                    maxLength={4}
                    isLimitText
                    onChange={onChange}
                    value={value}
                    extraClass={styles.input}
                />
                <Button
                    text="Добавить"
                    type="button"
                    onClick={handleClickAdd}
                    disabled={isQueueFull || value === ""}
                />
                <Button
                    text="Удалить"
                    type="button"
                    onClick={handleClickDelete}
                    disabled={isQueueEmpty}
                />
                <Button
                    text="Очистить"
                    type="button"
                    onClick={handleClickClear}
                    disabled={isQueueEmpty}
                />
            </div>
            <div className={styles.circleContainer}>
                {queueElements.map((queElement, index) => <Circle key={index} index={index} letter={queElement} head={index === headIndex ? "Head" : ''} tail={index === tailIndex ? "Tail" : ''} state={ElementStates.Default}/>)}
            </div>
        </SolutionLayout>
    );
};
