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
  findRequestPeriod,
  findWeekRangeByDate,
  updateStartOfWeek,
} from "utils/helpers";
import { DaysEnum, REQUEST_DATE_FORMAT } from "utils/consts";

import styles from "./Calendar.module.css";
import DaySelector from "./daySelector/DaySelector";

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

  const findHolidaysByDate = (date) => {
    return holidays[date.format(REQUEST_DATE_FORMAT)];
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
  }, [displayStartDay]);

  return (
    <Fragment>
      {loading ? (
        <div>Loading</div>
      ) : (
        <Fragment>
          <div className={styles.actionBar}>
            <button onClick={() => handleWeekChanged(-1)}>Prev</button>
            <button onClick={() => handleWeekChanged(1)}>Next</button>
            <DaySelector
              selectedValue={displayStartDay}
              onDaySelect={handleDayChanged}
            ></DaySelector>
          </div>

          <section className={styles.weekGrid}>
            {displayRange.map((date, i) => (
              <div className={styles.day} key={i}>
                <div className={styles.header}>
                  {date.format("ddd")}
                  <br />
                  {date.format("DD.MM.yyyy")}
                </div>
                <div className={styles.content}>
                  {findHolidaysByDate(date)?.map((holiday, i) => (
                    <div className={styles.holiday} key={i}>
                      {holiday.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Calendar;
