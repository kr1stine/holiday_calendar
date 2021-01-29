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
  findDefaultDisplayStartDate,
  findDisplayEndDate,
  findRequestPeriod,
  findWeekRangeByDate,
  updateStartOfWeek,
} from "utils/helpers";
import { DaysEnum } from "utils/consts";

import styles from "./Calendar.module.css";

const Calendar = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const holidays = useSelector(selectHolidays);
  const earliestDateFetched = useSelector(selectEarliestDateFetched);
  const latestDateFetched = useSelector(selectLatestDateFetched);

  const [displayStartDay, setDisplayStartDay] = useState(DaysEnum.monday);
  const [displayRange, setDisplayRange] = useState(findWeekRangeByDate());

  const updateHolidays = () => {
    const displayFromDate = displayRange?.start;
    const displayToDate = displayRange?.end;

    // Check if holidays need to be fetcehd from server
    // for the requested week
    if (
      earliestDateFetched &&
      latestDateFetched &&
      moment(earliestDateFetched).isSameOrBefore(moment(displayFromDate)) &
        moment(latestDateFetched).isSameOrAfter(moment(displayToDate))
    ) {
      return;
    } else {
      // Fetch as far as possible
      const { startDate, endDate } = findRequestPeriod(
        displayFromDate,
        displayToDate,
        earliestDateFetched,
        latestDateFetched
      );

      dispatch(requestHolidays(startDate, endDate));
    }
  };

  useEffect(() => {
    updateHolidays();
  }, [displayStartDay]);

  const handleDayChanged = (newDay) => {
    setDisplayStartDay(newDay);
    updateStartOfWeek(newDay);
    setDisplayRange(findWeekRangeByDate(displayRange.from));
  };

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <button onClick={() => handleDayChanged(DaysEnum.tuesday)}>
            Change day {displayStartDay}
          </button>
          <section className={styles.weekGrid}>
            {displayRange.map((day) => (
              <div className={styles.day} key={day.date}>
                <div className={styles.header}>
                  {day.format("ddd")}
                  <br />
                  {day.format("DD.MM.yyyy")}
                </div>
                <div className={styles.content}>holidays</div>
              </div>
            ))}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Calendar;
