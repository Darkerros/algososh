import React, {ChangeEvent, useState} from "react";
import styles from './list-page.module.css'
import { SolutionLayout } from "../../ui/solution-layout/solution-layout";
import {LinkedList, NodeType} from "../../utils/link-list";
import {genArray} from "../../utils/gen-array";
import {Circle} from "../../ui/circle/circle";
import {ArrowIcon} from "../../ui/icons/arrow-icon";
import {Input} from "../../ui/input/input";
import {Button} from "../../ui/button/button";
import {ElementStates} from "../../types/element-states";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";
import {CirclePos} from "../../types/circle-pos";
import {sleep} from "../../utils/sleep";
import {getCircleState} from "./helpers/get-circle-state";

const linkedList = new LinkedList<string>(genArray(3, 4));

export const ListPage: React.FC = () => {
  const [state, setState] = useState({
    modifiedIndex: -1,
    changingIndex: -1,
  });
  const [array, setArray] = useState<NodeType<string>[]>(linkedList.getArray());
  const [loader, setLoader] = useState({
    addToHead: false,
    addToTail: false,
    deleteInHead: false,
    deleteInTail: false,
    addToIndex: false,
    deleteToIndex: false,
    disabled: false,
  });
  const [circleIndex, setCircleIndex] = useState(- 1);
  const [position, setPosition] = useState<CirclePos>();
  const [currentValue, setCurrentValue] = useState("");
  const [inputValue, setInputValue] = useState({
    value: "",
    index: "",
  });

  const addToHead = async () => {
    setLoader({ ...loader, addToHead: true, disabled: true });
    setCurrentValue(inputValue.value);
    setCircleIndex(0);
    setPosition(CirclePos.head);
    await sleep(SHORT_DELAY_IN_MS);
    setCircleIndex(-1);
    linkedList.addToFront(inputValue.value);
    setArray([...linkedList.getArray()]);
    setState({ ...state, modifiedIndex: 0 });
    await sleep(SHORT_DELAY_IN_MS);
    setState({ ...state, modifiedIndex: -1 });
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addToHead: false, disabled: false });
  };

  const addToTail = async () => {
    setLoader({ ...loader, addToTail: true, disabled: true });
    setCurrentValue(inputValue.value);
    setCircleIndex(linkedList.getSize() - 1);
    setPosition(CirclePos.head);
    await sleep(SHORT_DELAY_IN_MS);
    setCircleIndex(-1);
    linkedList.addToEnd(inputValue.value);
    setArray([...linkedList.getArray()]);
    setState({ ...state, modifiedIndex: linkedList.getSize() - 1 });
    await sleep(SHORT_DELAY_IN_MS);
    setState({ ...state, modifiedIndex: -1 });
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addToTail: false, disabled: false });
  };

  const deleteAtHead = async () => {
    setLoader({ ...loader, deleteInHead: true, disabled: true });
    setCurrentValue(linkedList.getFirst()!.val);
    linkedList.getFirst()!.val = "";
    setCircleIndex(0);
    setPosition(CirclePos.tail);
    await sleep(SHORT_DELAY_IN_MS);
    linkedList.deleteAtFront();
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    await sleep(SHORT_DELAY_IN_MS);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteInHead: false, disabled: false });
  };

  const deleteAtTail = async () => {
    setLoader({ ...loader, deleteInTail: true, disabled: true });
    setCurrentValue(linkedList.getLast()!.val);
    linkedList.getLast()!.val = "";
    setCircleIndex(linkedList.getSize() - 1);
    setPosition(CirclePos.tail);
    await sleep(SHORT_DELAY_IN_MS);
    linkedList.deleteAtEnd();
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    await sleep(SHORT_DELAY_IN_MS);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteInTail: false, disabled: false });
  };

  const addByIndex = async () => {
    setLoader({ ...loader, addToIndex: true, disabled: true });
    for (let i = -1; i <= Number(inputValue.index); i++) {
      setCurrentValue(inputValue.value);
      setPosition(CirclePos.head);
      setCircleIndex(i);
      setState({ ...state, changingIndex: i - 1 });
      await sleep(SHORT_DELAY_IN_MS);
    }
    linkedList.addAtIndex(Number(inputValue.index), inputValue.value);
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    setState({ ...state, modifiedIndex: Number(inputValue.index) });
    await sleep(SHORT_DELAY_IN_MS);
    setState({ ...state, modifiedIndex: -1 });
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addToIndex: false, disabled: false });
  };

  const deleteByIndex = async () => {
    setLoader({ ...loader, deleteToIndex: true, disabled: true });
    for (let i = 0; i <= Number(inputValue.index); i++) {
      setState({ ...state, changingIndex: i });
      await sleep(SHORT_DELAY_IN_MS);
    }
    setState({ ...state, changingIndex: Number(inputValue.index) - 1 });
    setCurrentValue(
        String(linkedList.getAtIndex(Number(inputValue.index))?.val)
    );
    linkedList.getAtIndex(Number(inputValue.index))!.val = "";
    setArray([...linkedList.getArray()]);
    setCircleIndex(Number(inputValue.index));
    setPosition(CirclePos.tail);
    linkedList.deleteAtIndex(Number(inputValue.index));
    await sleep(SHORT_DELAY_IN_MS);
    setArray([...linkedList.getArray()]);
    setState({ ...state, changingIndex: -1 });
    setCircleIndex(-1);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteToIndex: false, disabled: false });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const getHeadCircle = (index: number) => {
    if (circleIndex === index && position === CirclePos.head) {
      return (
          <Circle isSmall letter={currentValue} state={ElementStates.Changing} />
      );
    } else if (index === 0) {
      return "head";
    } else {
      return undefined;
    }
  };

  const getTailCircle = (index: number) => {
    if (circleIndex === index && position === CirclePos.tail) {
      return (
          <Circle isSmall letter={currentValue} state={ElementStates.Changing} />
      );
    } else if (index === array.length - 1) {
      return "tail";
    } else {
      return undefined;
    }
  };

  return (
      <SolutionLayout title="Связный список">
        <div>
          <div className={styles.controlPanelItem}>
            <Input
                maxLength={4}
                isLimitText
                placeholder="Введите значение"
                name="value"
                value={inputValue.value}
                onChange={onChange}
                extraClass={styles.input}
            />
            <Button
                type="button"
                text="Добавить в head"
                onClick={addToHead}
                disabled={
                    !inputValue.value || loader.disabled || array.length === 7
                }
                isLoader={loader.addToHead}
            />
            <Button
                type="button"
                text="Добавить в tail"
                onClick={addToTail}
                disabled={
                    !inputValue.value || loader.disabled || array.length === 7
                }
                isLoader={loader.addToTail}
            />
            <Button
                type="button"
                text="Удалить из head"
                onClick={deleteAtHead}
                disabled={!array || loader.disabled || array.length === 0}
                isLoader={loader.deleteInHead}
            />
            <Button
                type="button"
                text="Удалить из tail"
                onClick={deleteAtTail}
                disabled={!array || loader.disabled || array.length === 0}
                isLoader={loader.deleteInTail}
            />
          </div>
          <div className={styles.controlPanelItem}>
            <Input
                type="number"
                placeholder="Введите индекс"
                name="index"
                min={0}
                max={array.length - 1}
                value={inputValue.index}
                onChange={onChange}
                extraClass={styles.input}
            />
            <Button
                type="button"
                text="Добавить по индексу"
                onClick={addByIndex}
                disabled={
                    !(inputValue.index && inputValue.value) || loader.disabled || Number(inputValue.index) > array.length - 1 ||
                    Number(inputValue.index) < 0
                }
                isLoader={loader.addToIndex}
            />
            <Button
                type="button"
                text="Удалить по индексу"
                onClick={deleteByIndex}
                disabled={
                    !inputValue.index || loader.disabled || Number(inputValue.index) > array.length - 1 ||
                    Number(inputValue.index) < 0
                }
                isLoader={loader.deleteToIndex}
            />
          </div>
        </div>
        <div className={styles.circleContainer}>
          {array.map((item, index) => {
            return (
                <div key={index} className={styles.circleItem}>
                  <Circle
                      index={index}
                      letter={item.val}
                      state={getCircleState(index, state)}
                      head={getHeadCircle(index)}
                      tail={getTailCircle(index)}
                  />
                  {index !== array.length - 1 && <ArrowIcon />}
                </div>
            );
          })}
        </div>
      </SolutionLayout>
  );
};
