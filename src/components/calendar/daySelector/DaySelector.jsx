import React from "react";
import { DaysEnum } from "utils/consts";

import styles from "./DaySelector.module.css";

const DaySelector = ({ selectedValue, onDaySelect }) => {
  return (
    <div className={styles.customSelect}>
      <select
        defaultValue={selectedValue}
        onChange={(event) => onDaySelect(event.target.value)}
      >
        {Object.keys(DaysEnum).map((key) => (
          <option value={DaysEnum[key]}>{key}</option>
        ))}
      </select>
    </div>
  );
};

export default DaySelector;
