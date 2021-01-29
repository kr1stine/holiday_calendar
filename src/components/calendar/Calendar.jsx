import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Calendar.module.css";

const Calendar = () => {
  //onst count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <section className={styles.weekGrid}>
      <div className={styles.day}>E</div>
      <div className={styles.day}>E</div>
      <div className={styles.day}>E</div>
      <div className={styles.day}>E</div>
      <div className={styles.day}>E</div>
      <div className={styles.day}>E</div>
      <div className={styles.day}>E</div>
    </section>
  );
};

export default Calendar;
