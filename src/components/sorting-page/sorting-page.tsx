import React, {ChangeEvent, useState} from "react";
import styles from './sorting-page.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {Direction} from "../../types/direction";
import {RadioInput} from "../ui/radio-input/radio-input";
import {ISortElement} from "../../types/sort-element-interface";
import {generateSortElemArray} from "../../utils/generate-sort-elem-array";
import {bubleSortWithIterCalback} from "../../utils/buble-sort-with-iter-calback";
import {selectSortWithIterCalback} from "../../utils/select-sort-with-iter-calback";

export const SortingPage: React.FC = () => {
  const [radioValue, setRadioValue] = useState("selectionSort");
  const [array, setArray] = useState<ISortElement[]>(generateSortElemArray());
  const [loader, setLoader] = useState({
    ascending: false,
    descending: false,
    loader: false,
  });

  const handleGenNewArray = () => {
    setArray(generateSortElemArray());
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };

  const handleSort = (order: Direction) => {
    if (radioValue === "selectionSort") {
      selectionSort(array, order);
    } else {
      bubbleSort(array, order);
    }
  };

  const selectionSort = async (arr: ISortElement[], order: Direction) => {
    if (order === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true });
    } else {
      setLoader({ ...loader, loader: true, descending: true });
    }

    await selectSortWithIterCalback(arr, order, setArray)
    setLoader({ loader: false, descending: false, ascending: false });
  };

  const bubbleSort = async (arr: ISortElement[], order: Direction) => {
    if (order === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true });
    } else {
      setLoader({ ...loader, loader: true, descending: true });
    }

    await bubleSortWithIterCalback(array, order, setArray)
    setLoader({ loader: false, descending: false, ascending: false });
  };

  return (
      <SolutionLayout title="Сортировка массива">
        <div className={styles.controlPanel}>
          <div className={styles.radioContainer}>
            <RadioInput
                label="Выбор"
                name="sortType"
                value="selectionSort"
                defaultChecked
                onChange={onChange}
                disabled={loader.loader}
            />
            <RadioInput
                label="Пузырёк"
                name="sortType"
                value="bubbleSort"
                onChange={onChange}
                disabled={loader.loader}
            />
          </div>
          <div className={styles.btnContainer}>
            <Button
                text="По возрастанию"
                sorting={Direction.Ascending}
                onClick={() => handleSort(Direction.Ascending)}
                isLoader={loader.ascending}
                disabled={loader.descending}
            />
            <Button
                text="По убыванию"
                sorting={Direction.Descending}
                onClick={() => handleSort(Direction.Descending)}
                isLoader={loader.descending}
                disabled={loader.ascending}
            />
            <Button
                text="Новый массив"
                onClick={handleGenNewArray}
                disabled={loader.loader}
            />
          </div>
        </div>
        <div className={styles.columnContainer}>
          {array.map((item, index) => {
            return (
                <Column key={index} index={item.index} state={item.state} />
            );
          })}
        </div>
      </SolutionLayout>
  );
};
