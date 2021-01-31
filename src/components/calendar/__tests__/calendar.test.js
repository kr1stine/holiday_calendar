import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import moment from "moment";

import store from "redux/store";
import Calendar from "../Calendar";
import { setError, setLoading, addHolidays } from "../calendarSlice";
import { REQUEST_DATE_FORMAT } from "utils/consts";

const renderCalendar = () =>
  render(
    <Provider store={store}>
      <Calendar />
    </Provider>
  );

test("renders loading screen first", () => {
  const { getByText } = renderCalendar();
  getByText("Loading");
});

test("renders the calendar", () => {
  const { getByText } = renderCalendar();
  store.dispatch(setLoading(false));
  getByText("Estonian Holiday Calendar");
});

test("renders today in the calendar", () => {
  const { getByText } = renderCalendar();

  const today = moment().format("DD.MM.yyyy");
  getByText(today, { exact: false });
});

test("renders seven days in the calendar", () => {
  const { getByText } = renderCalendar();

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  days.map((day) => {
    getByText(day);
  });
});

test("allows to move to next week", () => {
  const { getByText } = renderCalendar();

  const button = getByText(/Next week/);
  fireEvent.click(button);

  const futureDay = moment().add(7, "day").format("DD.MM.yyyy");
  getByText(futureDay, { exact: false });
});

test("allows to move to previous week", () => {
  const { getByText } = renderCalendar();

  const button = getByText(/Previous week/);
  fireEvent.click(button);

  const pastDay = moment().subtract(7, "day").format("DD.MM.yyyy");
  getByText(pastDay, { exact: false });
});

test("allows to change the first day", () => {
  const { getByText, getByLabelText, getAllByText } = renderCalendar();

  // Check that all options available
  const dayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  dayOptions.map((day) => {
    getByText(day);
  });

  // Check default order
  const displayedDays = getAllByText(
    /(^Mon$)|(^Tue$)|(^Wed$)|(^Thu$)|(^Fri$)|(^Sat$)|(^Sun$)/
  );
  let expectedDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  [...expectedDays.keys()].map((i) =>
    expect(displayedDays[i].textContent).toContain(expectedDays[i])
  );

  // Pick Wednesday and check order
  const select = getByLabelText("First day:");
  fireEvent.change(select, { target: { value: 3 } });

  expectedDays = ["Wed", "Thu", "Fri", "Sat", "Sun", "Mon", "Tue"];
  [...expectedDays.keys()].map((i) =>
    expect(displayedDays[i].textContent).toContain(expectedDays[i])
  );
});

test("displays error screen", () => {
  store.dispatch(setError({ error: true, reason: "reason" }));
  const { getByText } = renderCalendar();
  getByText(/Something went wrong/i);
});

test("displays holidays", () => {
  store.dispatch(setError({ error: false }));
  const today = moment().format(REQUEST_DATE_FORMAT);
  const mockHolidays = {};
  mockHolidays[today] = [
    {
      name: "Test1",
      type: "public",
    },
    {
      name: "Test2",
      type: "folk",
    },
  ];
  store.dispatch(addHolidays(mockHolidays));

  const { getByText } = renderCalendar();

  getByText(/Test1/);
  getByText(/Test2/);
  getByText(/Public holiday/);
  getByText(/Folk holiday/);
});
