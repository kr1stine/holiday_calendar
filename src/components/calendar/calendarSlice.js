import { createSlice } from "@reduxjs/toolkit";
import { fetchHolidays } from "utils/api";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    loading: true,
    holidays: [],
    earliestDateFetched: null,
    latestDateFetched: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addHolidays: (state, action) => {
      state.holidays = state.holidays.concat(action.payload);
    },
    setEarliestDateFetched: (state, action) => {
      state.earliestDateFetched = action.payload;
    },
    setLatestDateFetched: (state, action) => {
      state.latestDateFetched = action.payload;
    },
  },
});

export const {
  addHolidays,
  setEarliestDateFetched,
  setLatestDateFetched,
  setLoading,
} = calendarSlice.actions;

export const requestHolidays = (startDate, endDate) => (dispatch) => {
  fetchHolidays(startDate, endDate).then((resp) => {
    dispatch(addHolidays(resp.holidays));
    dispatch(setEarliestDateFetched(startDate));
    dispatch(setLatestDateFetched(endDate));
    dispatch(setLoading(false));
  });
};

export const selectLoading = (state) => state.calendar.loading;
export const selectHolidays = (state) => state.calendar.holidays;
export const selectEarliestDateFetched = (state) =>
  state.calendar.earliestDateFetched;
export const selectLatestDateFetched = (state) =>
  state.calendar.latestDateFetched;

export default calendarSlice.reducer;
