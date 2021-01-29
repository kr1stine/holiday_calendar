const API_BASE_URL =
  "https://wozmx9dh26.execute-api.eu-west-1.amazonaws.com/api/";
// TODO: store in a secure service
const API_KEY = "472af3d48b53bba2ef154a52e353cd12";

const fetchWrapper = async (url, data = {}) => {
  const resp = await fetch(url, data);
  const json = await resp.json();
  return json;
};

export const fetchHolidays = async (startDate, endDate) =>
  fetchWrapper(`${API_BASE_URL}holidays`, {
    method: "POST",
    body: JSON.stringify({
      apiKey: API_KEY,
      startDate: startDate,
      endDate: endDate,
    }),
  });
