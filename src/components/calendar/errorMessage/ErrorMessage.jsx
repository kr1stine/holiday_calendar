import React from "react";
import { useSelector } from "react-redux";
import { selectErrorReason } from "../calendarSlice";

import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  const errorReason = useSelector(selectErrorReason);

  return (
    <div className={styles.wrapper}>
      Oh no! Something went wrong on our side, please try again.
    </div>
  );
};

export default ErrorMessage;
