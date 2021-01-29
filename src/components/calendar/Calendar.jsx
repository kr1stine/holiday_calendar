import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchHolidays } from "../../utils/api";

import styles from "./Calendar.module.css";
import {
  requestHolidays,
  selectHolidays,
  selectWeekStartDate,
} from "./calendarSlice";

const Calendar = () => {
  const holidays = useSelector(selectHolidays);
  const weekStartDate = useSelector(selectWeekStartDate);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    dispatch(requestHolidays("2019-02-01", "2019-02-28"));
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
