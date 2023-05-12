import React, {ChangeEvent, useState} from "react";
import styles from './fibonacci-page.module.css'
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {calcFiboArray} from "../../utils/calc-fibo-array";
import {sleep} from "../../utils/sleep";
import {Circle} from "../ui/circle/circle";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";

export const FibonacciPage: React.FC = () => {
    const [inputValue, setInputValue] = useState("");
    const [loader, setLoader] = useState(false);
    const [array, setArray] = useState<Array<number>>();

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const onClick = async () => {
        setLoader(true);
        const data = calcFiboArray(Number(inputValue));
        for (let i = 0; i < data.length; i++) {
            await sleep(SHORT_DELAY_IN_MS);
            setArray(data.slice(0, i + 1));
        }
        setInputValue("");
        setLoader(false);
    };

    return (
        <SolutionLayout title="Последовательность Фибоначчи" extraClass="pb-50">
            <div className={styles.btnContainer}>
                <Input
                    type="number"
                    max={19}
                    min={1}
                    isLimitText
                    onChange={onChange}
                    value={inputValue}
                    extraClass={styles.input}
                />
                <Button
                    text="Рассчитать"
                    isLoader={loader}
                    type="button"
                    onClick={onClick}
                    disabled={!inputValue || Number(inputValue) > 19 || Number(inputValue) < 1}
                />
            </div>

            <div className={styles.circleContainer}>
                {array?.map((item, index) => {
                    return <Circle letter={String(item)} index={index} key={index}/>;
                })}
            </div>
        </SolutionLayout>
    );
};
