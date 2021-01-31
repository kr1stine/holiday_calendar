import React from "react";
import HolidayTypeIndicator from "../holidayTypeIndicator/HolidayTypeIndicator";

import styles from "./DayCard.module.css";

// Displays date and holidays for given date
// Input: holidays array for the given date
const DayCard = ({ date, holidays }) => {
  return (
    <div className={styles.day}>
      <div className={styles.header}>
        <span>{date.format("ddd")}</span>
        <br />
        {date.format("DD.MM.yyyy")}
      </div>
      <div className={styles.content}>
        {holidays?.map((holiday, i) => (
          <div className={styles.holiday} key={i}>
            <HolidayTypeIndicator type={holiday.type}></HolidayTypeIndicator>
            {holiday.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCard;
