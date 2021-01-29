import { createSlice } from "@reduxjs/toolkit";
import { fetchHolidays } from "utils/api";
import { findDefaultWeekStartDate, findNextDateByDay } from "utils/helpers";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    loading: true,
    holidays: [],
    weekStartDate: findDefaultWeekStartDate(),
    earliestDateFetched: null,
    latestDateFetched: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setWeekStartDay: (state, action) => {
      state.weekStartDate = findNextDateByDay(action.payload);
    },
    addHolidays: (state, action) => {
      state.holidays = state.holidays.concat(action.payload);
    },
    setEarliestDateFetched: (state, action) => {
      state.earliestDateFetched = action.payload;
    },
    setLatestDateFetched: (state, action) => {
      state.earliestDateFetched = action.payload;
    },
  },
});

export const {
  setWeekStartDay,
  addHolidays,
  setEarliestDateFetched,
  setLatestDateFetched,
  setLoading,
} = calendarSlice.actions;

export const requestHolidays = (startDate, endDate) => (dispatch) => {
  fetchHolidays(startDate, endDate).then((resp) => {
    dispatch(addHolidays(resp.holidays));
    dispatch(setLoading(false));
  });
};

export const selectLoading = (state) => state.calendar.loading;
export const selectHolidays = (state) => state.calendar.holidays;
export const selectWeekStartDate = (state) => state.calendar.weekStartDate;
export const selectEarliestDateFetched = (state) =>
  state.calendar.earliestDateFetched;
export const selectLatestDateFetched = (state) =>
  state.calendar.latestDateFetched;

export default calendarSlice.reducer;
