import React, { Fragment } from "react";

import styles from "./HolidayTypeIndicator.module.css";

const HolidayTypeIndicator = ({ type }) => {
  const typeClasses = {
    public: "public",
    folk: "folk",
  };

  const getTooltipText = () => {
    switch (type) {
      case "public":
        return "Public holiday";
      case "folk":
        return "Folk holiday";
      default:
        return "Unknown holiday";
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tooltip}>{getTooltipText()}</div>
      <span
        className={`${styles.indicator} ${styles[typeClasses[type]]}`}
      ></span>
    </div>
  );
};

export default HolidayTypeIndicator;
