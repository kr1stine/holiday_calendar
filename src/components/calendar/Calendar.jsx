import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import styles from "./Calendar.module.css";
import {
  selectLoading,
  requestHolidays,
  selectHolidays,
  selectWeekStartDate,
} from "./calendarSlice";

const Calendar = () => {
  const loading = useSelector(selectLoading);
  const holidays = useSelector(selectHolidays);
  const weekStartDate = useSelector(selectWeekStartDate);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestHolidays(weekStartDate));
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <button>Change date</button>
          <section className={styles.weekGrid}>
            <div className={styles.day}>E</div>
            <div className={styles.day}>E</div>
            <div className={styles.day}>E</div>
            <div className={styles.day}>E</div>
            <div className={styles.day}>E</div>
            <div className={styles.day}>E</div>
            <div className={styles.day}>E</div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Calendar;
