import { DaysEnum } from "utils/consts";

export const findDefaultWeekStartDate = (weekStartDay = DaysEnum.monday) => {
  return "2019-02-01";
};

export const findNextDateByDay = () => {
  return "2019-02-03";
};
