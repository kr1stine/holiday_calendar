import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

import { fetchHolidays } from "utils/api";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    loading: true,
    error: false,
    errorReason: "",
    holidays: [],
    earliestDateFetched: null,
    latestDateFetched: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload.error;
      state.errorReason = action.payload.errorReason || null;
    },
    addHolidays: (state, action) => {
      state.holidays = { ...state.holidays, ...action.payload };
    },
    setEarliestDateFetched: (state, action) => {
      const newEarliest =
        !state.earliestDateFetched ||
        moment(state.earliestDateFetched).isAfter(moment(action.payload))
          ? action.payload
          : state.earliestDateFetched;
      state.earliestDateFetched = newEarliest;
    },
    setLatestDateFetched: (state, action) => {
      const newLatest =
        !state.latestDateFetched ||
        moment(state.latestDateFetched).isBefore(moment(action.payload))
          ? action.payload
          : state.latestDateFetched;
      state.latestDateFetched = newLatest;
    },
  },
});

export const {
  addHolidays,
  setEarliestDateFetched,
  setLatestDateFetched,
  setLoading,
  setError,
} = calendarSlice.actions;

export const requestHolidays = (startDate, endDate) => (dispatch) => {
  fetchHolidays(startDate, endDate).then((resp) => {
    if (resp.error) {
      dispatch(
        setError({
          error: true,
          reason: resp.reason,
        })
      );
    } else {
      dispatch(addHolidays(resp.holidays));
      // Keep track of how much we have fetched
      // To avoud double fetching
      dispatch(setEarliestDateFetched(startDate));
      dispatch(setLatestDateFetched(endDate));
    }

    dispatch(setLoading(false));
  });
};

export const selectLoading = (state) => state.calendar.loading;
export const selectError = (state) => state.calendar.error;
export const selectErrorReason = (state) => state.calendar.errorReason;
export const selectHolidays = (state) => state.calendar.holidays;
export const selectEarliestDateFetched = (state) =>
  state.calendar.earliestDateFetched;
export const selectLatestDateFetched = (state) =>
  state.calendar.latestDateFetched;

export default calendarSlice.reducer;
