import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { faForward } from "@fortawesome/free-solid-svg-icons";

import styles from "./WeekButton.module.css";

const WeekButton = ({ direction, onClick }) => {
  return (
    <button onClick={() => onClick()}>
      {direction === "backward" && (
        <FontAwesomeIcon className={styles.iconBackward} icon={faBackward} />
      )}
      {direction === "backward" ? "Previous" : "Next"} week
      {direction === "forward" && (
        <FontAwesomeIcon className={styles.iconForward} icon={faForward} />
      )}
    </button>
  );
};

export default WeekButton;
