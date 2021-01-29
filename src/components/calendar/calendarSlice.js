import { createSlice } from "@reduxjs/toolkit";
import { fetchHolidays } from "../../utils/api";
import {
  findDefaultWeekStartDate,
  findNextDateByDay,
} from "../../utils/helpers";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    holidays: [],
    weekStartDate: findDefaultWeekStartDate(),
  },
  reducers: {
    setWeekStartDay: (state, action) => {
      state.weekStartDate = findNextDateByDay(action.payload);
    },
    addHolidays: (state, action) => {
      state.holidays = state.holidays.concat(action.payload);
    },
  },
});

export const { setWeekStartDay, addHolidays } = calendarSlice.actions;

export const requestHolidays = (startDate, endDate) => (dispatch) => {
  fetchHolidays(startDate, endDate).then((resp) => {
    dispatch(addHolidays(resp.holidays));
  });
};

export const selectHolidays = (state) => state.calendar.holidays;
export const selectWeekStartDate = (state) => state.calendar.weekStartDate;

export default calendarSlice.reducer;
