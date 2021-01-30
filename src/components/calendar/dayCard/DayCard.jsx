import React from "react";
import HolidayTypeIndicator from "../holidayTypeIndicator/HolidayTypeIndicator";

import styles from "./DayCard.module.css";

const DayCard = ({ date, holidays }) => {
  return (
    <div className={styles.day}>
      <div className={styles.header}>
        {date.format("ddd")}
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
