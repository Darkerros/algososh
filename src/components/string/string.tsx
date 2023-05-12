import {ChangeEvent, useState} from "react";
import styles from './string.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Circle} from "../ui/circle/circle";
import {Button} from "../ui/button/button";
import {Input} from "../ui/input/input";
import {ElementStates} from "../../types/element-states";
import {expandStrokeElementArray} from "../../utils/expand-stroke-element-array";
import {IStrokeElement} from "../../types/stroke-element-interface";

export const StringComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [array, setArray] = useState<IStrokeElement[]>([]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)

  const onClick = async () => {
    const newArray:IStrokeElement[] = inputValue.split("").map((letter) => ({ letter, state: ElementStates.Default }));
    setArray(newArray);
    setLoader(true);
    await expandStrokeElementArray(newArray, setArray)
    setLoader(false);
    setInputValue("");
  };

  return (
      <SolutionLayout title="Строка">
        <div className={styles.btnContainer}>
          <Input
              maxLength={11}
              isLimitText
              onChange={onChange}
              value={inputValue}
              extraClass={styles.input}
          />
          <Button
              text="Развернуть"
              isLoader={loader}
              type="button"
              onClick={onClick}
              disabled={!inputValue}
          />
        </div>
        <div className={styles.circleContainer}>
          {array?.map((item, index) => (
              <Circle key={index} letter={item.letter} state={item.state} />
          ))}
        </div>
      </SolutionLayout>
  );
};
