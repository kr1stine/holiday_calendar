import moment from "moment";
import {
  DaysEnum,
  MAX_DAYS_TO_REQUEST,
  REQUEST_DATE_FORMAT,
} from "utils/consts";

export const findDefaultDisplayStartDate = (weekStartDay = DaysEnum.monday) => {
  return moment();
};

export const findWeekRangeByDate = (date) => {
  date = date || moment();
  return {
    from: moment(date).startOf("week"),
    to: moment(date).endOf("week"),
  };
};

export const findDisplayEndDate = (startDate, length = 7) => {
  return moment(startDate).add(length, "days");
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
  if (!earliestDateFetched || !latestDateFetched) {
    const range = Math.floor(MAX_DAYS_TO_REQUEST / 2);

    result.startDate = moment(moment().subtract(range, "days"));
    result.endDate = moment(moment().add(range, "days"));
    console.log("Today", moment().format(REQUEST_DATE_FORMAT));
    console.log("result 1", result);
  } else {
    earliestDateFetched = moment(earliestDateFetched);
    latestDateFetched = moment(latestDateFetched);
    displayStartDate = moment(displayStartDate);
    displayEndDate = moment(displayEndDate);

    if (earliestDateFetched.isSameOrAfter(displayStartDate)) {
      result.startDate = earliestDateFetched.subtract(
        MAX_DAYS_TO_REQUEST,
        "days"
      );
      result.endDate = earliestDateFetched;
    } else if (latestDateFetched.isSameOrBefore(displayEndDate)) {
      result.startDate = displayEndDate;
      result.endDate = latestDateFetched.add(MAX_DAYS_TO_REQUEST, "days");
    }
  }

  result.startDate = moment(result.startDate).format(REQUEST_DATE_FORMAT);
  result.endDate = moment(result.endDate).format(REQUEST_DATE_FORMAT);
  console.log("Resultiks sai ", result);
  return result;
};

export const updateStartOfWeek = (newDOW) => {
  moment.updateLocale("en", {
    week: {
      dow: newDOW,
    },
  });
};
