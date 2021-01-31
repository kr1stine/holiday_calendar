import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

import DaySelector from "./daySelector/DaySelector";
import DayCard from "./dayCard/DayCard";
import WeekButton from "./weekButton/WeekButton";
import ErrorMessage from "./errorMessage/ErrorMessage";

import {
  selectLoading,
  selectError,
  requestHolidays,
  selectHolidays,
  selectEarliestDateFetched,
  selectLatestDateFetched,
} from "./calendarSlice";
import {
  findRequestPeriod,
  findWeekRangeByDate,
  updateStartOfWeek,
} from "utils/helpers";
import { DaysEnum, REQUEST_DATE_FORMAT } from "utils/consts";

import styles from "./Calendar.module.css";

const Calendar = () => {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const holidays = useSelector(selectHolidays);
  const earliestDateFetched = useSelector(selectEarliestDateFetched);
  const latestDateFetched = useSelector(selectLatestDateFetched);

  // Stores selected first day of week
  const [displayStartDay, setDisplayStartDay] = useState(DaysEnum.monday);
  const [displayRange, setDisplayRange] = useState(findWeekRangeByDate());

  const updateHolidays = () => {
    const displayFromDate = displayRange[0];
    const displayToDate = displayRange[displayRange.length - 1];

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

  const handleDayChanged = (newDay) => {
    setDisplayStartDay(newDay);
    updateStartOfWeek(newDay);
    setDisplayRange(findWeekRangeByDate(displayRange.from));
  };

  const handleWeekChanged = (amount) => {
    const now = displayRange[0];
    const newDate =
      amount > 0
        ? moment(now).add(amount, "week")
        : moment(now).subtract(amount * -1, "week");
    setDisplayRange(findWeekRangeByDate(newDate));
  };

  useEffect(() => {
    updateHolidays();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [displayRange]);

  // Call handleDayChanged on first load
  useEffect(() => {
    handleDayChanged(displayStartDay);
  }, []);

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : error ? (
        <ErrorMessage></ErrorMessage>
      ) : (
        <Fragment>
          <div className={styles.actionBar}>
            <div>
              <div className={styles.title}>Estonian Holiday Calendar</div>
              <span className={styles.daySelect}>
                <DaySelector
                  selectedValue={displayStartDay}
                  onDaySelect={handleDayChanged}
                ></DaySelector>
              </span>
            </div>
            <div className={styles.buttons}>
              <WeekButton
                direction={"backward"}
                onClick={() => handleWeekChanged(-1)}
              ></WeekButton>
              <WeekButton
                direction={"forward"}
                onClick={() => handleWeekChanged(1)}
              ></WeekButton>
            </div>
          </div>

          <section className={styles.weekGrid}>
            {displayRange.map((date, i) => (
              <DayCard
                date={date}
                holidays={holidays[date.format(REQUEST_DATE_FORMAT)]}
                key={i}
              ></DayCard>
            ))}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Calendar;
