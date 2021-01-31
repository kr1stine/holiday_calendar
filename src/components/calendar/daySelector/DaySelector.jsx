import React from "react";
import { DaysEnum } from "utils/consts";

import styles from "./DaySelector.module.css";

// Drodown to seelct first day of week
const DaySelector = ({ selectedValue, onDaySelect }) => {
  const capitalize = (string) => string[0].toUpperCase() + string.slice(1);

  return (
    <div className={styles.customSelect}>
      <label htmlFor="day-selector">First day: </label>
      <select
        id="day-selector"
        defaultValue={selectedValue}
        onChange={(event) => onDaySelect(event.target.value)}
      >
        {Object.keys(DaysEnum).map((key) => (
          <option key={DaysEnum[key]} value={DaysEnum[key]}>
            {capitalize(key)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DaySelector;
