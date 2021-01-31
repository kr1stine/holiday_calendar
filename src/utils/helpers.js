import Moment from "moment";
import { extendMoment } from "moment-range";
import { MAX_DAYS_TO_REQUEST, REQUEST_DATE_FORMAT } from "utils/consts";

const moment = extendMoment(Moment);

// By provided date, find a week that contains this date
// based on the current config of week start
export const findWeekRangeByDate = (date) => {
  date = date || moment();
  const start = moment(date).startOf("week");
  const end = moment(date).endOf("week");
  return Array.from(moment.range(start, end).by("day"));
};

// Find a period where to request holidays
// First time: request +-15days from today
// Other times: request +-30days based on direction
export const findRequestPeriod = (
  displayStartDate,
  displayEndDate,
  earliestDateFetched,
  latestDateFetched
) => {
  let result = {
    startDate: displayStartDate,
    endDate: displayEndDate,
  };
  if (!earliestDateFetched || !latestDateFetched) {
    const range = Math.floor(MAX_DAYS_TO_REQUEST / 2);

    result.startDate = moment(moment().subtract(range, "days"));
    result.endDate = moment(moment().add(range, "days"));
  } else {
    earliestDateFetched = moment(earliestDateFetched);
    latestDateFetched = moment(latestDateFetched);
    displayStartDate = moment(displayStartDate);
    displayEndDate = moment(displayEndDate);

    if (earliestDateFetched.isSameOrAfter(displayStartDate)) {
      result.startDate = moment(earliestDateFetched).subtract(
        MAX_DAYS_TO_REQUEST,
        "days"
      );
      result.endDate = earliestDateFetched;
    } else if (latestDateFetched.isSameOrBefore(displayEndDate)) {
      result.endDate = moment(latestDateFetched).add(
        MAX_DAYS_TO_REQUEST,
        "days"
      );
      result.startDate = latestDateFetched;
    }
  }

  result.startDate = moment(result.startDate).format(REQUEST_DATE_FORMAT);
  result.endDate = moment(result.endDate).format(REQUEST_DATE_FORMAT);
  return result;
};

export const updateStartOfWeek = (newDOW) => {
  moment.updateLocale("en", {
    week: {
      dow: newDOW,
    },
  });
};
