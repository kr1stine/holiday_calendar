import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import {
  selectLoading,
  requestHolidays,
  selectHolidays,
  selectEarliestDateFetched,
  selectLatestDateFetched,
} from "./calendarSlice";
import {
  findDefaultWeekStartDate,
  findWeekEndDate,
  findRequestPeriod,
} from "utils/helpers";
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

  const updateHolidays = (displayStartDate) => {
    const displayEndDate = findWeekEndDate(displayStartDate);
    console.log("start ", displayStartDate);
    console.log("week end ", displayEndDate);
    console.log("earliest ", earliestDateFetched);
    console.log("latest ", latestDateFetched);

    // Check if holidays need to be fetcehd from server
    // for the requested week
    if (
      earliestDateFetched &&
      latestDateFetched &&
      moment(earliestDateFetched).isSameOrBefore(displayStartDate) &
        moment(latestDateFetched).isSameOrAfter(displayEndDate)
    ) {
      console.log("Ei lähe fetchima");
      return;
    } else {
      console.log("Lähen fetchima");
      // Fetch as far as possible

      const { startDate, endDate } = findRequestPeriod(
        displayStartDate,
        displayEndDate,
        earliestDateFetched,
        latestDateFetched
      );

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
