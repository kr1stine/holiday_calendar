import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHolidays } from "../../utils/api";

import styles from "./Calendar.module.css";

const Calendar = () => {
  //onst count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState([]);
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    fetchHolidays("2019-02-01", "2019-02-28").then((resp) => {
      setHolidays(resp);
      console.log(resp);
      setLoading(false);
    });
  }, []);

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
