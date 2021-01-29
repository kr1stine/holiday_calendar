import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../components/calendar/calendarSlice";

export default configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
