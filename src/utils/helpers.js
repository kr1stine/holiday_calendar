import moment from "moment";
import { DaysEnum, MAX_DAYS_TO_REQUEST } from "utils/consts";

export const findDefaultWeekStartDate = (weekStartDay = DaysEnum.monday) => {
  return "2019-02-01";
};

export const findNextDateByDay = () => {
  return "2019-02-03";
};

export const findWeekEndDate = (startDate) => {
  return moment(startDate).add(7, "days");
};

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
  if (!displayStartDate || !displayEndDate) {
    const range = Math.floor(MAX_DAYS_TO_REQUEST / 2);
    const today = moment();
    result.startDate = today.subtract(range, "days");
    result.endDate = today.add(7 + range, "days");
  } else {
    if (moment(earliestDateFetched).isSameOrAfter(displayStartDate)) {
      result.startDate = earliestDateFetched.subtract(
        MAX_DAYS_TO_REQUEST,
        "days"
      );
      result.endDate = earliestDateFetched;
    } else if (moment(latestDateFetched).isSameOrBefore(displayEndDate)) {
      result.startDate = displayEndDate;
      result.endDate = latestDateFetched.add(MAX_DAYS_TO_REQUEST, "days");
    }
  }

  return result;
};
