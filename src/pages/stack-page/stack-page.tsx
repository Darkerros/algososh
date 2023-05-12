import React, {ChangeEvent, useState} from "react";
import styles from './stack.module.css'
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import {Circle} from "../../ui/circle/circle";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {useStack} from "../../hooks/use-stack";
import {sleep} from "../../utils/sleep";

export const StackPage = () => {
  const {stackElements, stackSize,addToStack,deleteFromStack,clearStack} = useStack()

  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const addElement = async () => {
    setLoader({ ...loader, add: true });
    addToStack(inputValue);
    await sleep(SHORT_DELAY_IN_MS);
    setInputValue("");
    setLoader({ ...loader, add: false });
  };

  const deleteElement = async () => {
    setLoader({ ...loader, delete: true });
    await sleep(SHORT_DELAY_IN_MS);
    deleteFromStack();
    setLoader({ ...loader, delete: false });
  };

  const clearElements = async () => {
    setLoader({ ...loader, clear: true });
    await sleep(SHORT_DELAY_IN_MS);
    clearStack();
    setLoader({ ...loader, clear: false });
  };

  return (
      <SolutionLayout title="Стек">
        <div className={styles.controlPanel}>
          <Input
              maxLength={4}
              isLimitText
              onChange={onChange}
              value={inputValue}
              extraClass={styles.input}
          />
          <Button
              text="Добавить"
              type="button"
              disabled={!inputValue}
              onClick={addElement}
              isLoader={loader.add}
          />
          <Button
              text="Удалить"
              type="button"
              disabled={stackSize === 0}
              onClick={deleteElement}
              isLoader={loader.delete}
          />
          <Button
              text="Очистить"
              type="button"
              disabled={stackSize === 0}
              onClick={clearElements}
              isLoader={loader.clear}
          />
        </div>
        <div className={styles.circleContainer}>
          {stackElements.map((element, index) => {
            return (
                <Circle
                    key={index}
                    index={index}
                    letter={element}
                    state={
                      index === stackSize - 1 && (loader.add || loader.delete)
                          ? ElementStates.Changing
                          : ElementStates.Default
                    }
                    head={stackSize - 1 === index ? "top" : ""}
                />
            );
          })}
        </div>
      </SolutionLayout>
  );
};
