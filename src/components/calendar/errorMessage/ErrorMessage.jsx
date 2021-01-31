import React from "react";

import styles from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={styles.wrapper}>
      Oh no! Something went wrong on our side, please try again.
    </div>
  );
};

export default ErrorMessage;
