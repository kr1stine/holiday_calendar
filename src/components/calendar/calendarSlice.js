import { createSlice } from "@reduxjs/toolkit";
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
      state.error = true;
      state.errorReason = action.payload;
    },
    addHolidays: (state, action) => {
      state.holidays = { ...state.holidays, ...action.payload };
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
  setError,
} = calendarSlice.actions;

export const requestHolidays = (startDate, endDate) => (dispatch) => {
  fetchHolidays(startDate, endDate).then((resp) => {
    if (resp.error) {
      dispatch(setError(resp.reason));
    } else {
      dispatch(addHolidays(resp.holidays));
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
