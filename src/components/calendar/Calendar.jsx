import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoading,
  requestHolidays,
  selectHolidays,
  selectEarliestDateFetched,
  selectLatestDateFetched,
} from "./calendarSlice";
import { findDefaultWeekStartDate } from "utils/helpers";
import { DaysEnum } from "utils/consts";

import styles from "./Calendar.module.css";

const Calendar = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const holidays = useSelector(selectHolidays);
  const earliestDateFetched = useSelector(selectEarliestDateFetched);
  const latestDateFetched = useSelector(selectLatestDateFetched);

  const defaultWeekStartDay = DaysEnum.monday;
  const [weekStartDay, setWeekStartDay] = useState(defaultWeekStartDay);
  const [weekStartDate, setWeekStartDate] = useState(
    findDefaultWeekStartDate(defaultWeekStartDay)
  );

  const updateHolidays = (startDate, endDate) => {
    // Check if holidays need to be fetcehd from server
    // for the requested week
    if (earliestDateFetched || true) {
      // If no endDate set, fetch as far as possible
      if (!endDate) {
        endDate = "2019-02-28";
      }
      dispatch(requestHolidays(startDate, endDate));
    }
  };

  useEffect(() => {
    updateHolidays(weekStartDate);
  }, [weekStartDay]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <button onClick={() => setWeekStartDay(DaysEnum.tuesday)}>
            Change day {weekStartDay}
          </button>
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
