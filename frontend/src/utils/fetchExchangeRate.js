
const API_KEY = "131597463e990da9a559ed1d"; 
const BASE_URL = "https://v6.exchangerate-api.com/v6";

export const fetchExchangeRate = async (base = "EUR") => {
  try {
    const res = await fetch(`${BASE_URL}/${API_KEY}/latest/${base}`);
    const data = await res.json();
    if (data.result !== "success") {
      console.error("API error:", data["error-type"]);
      return null;
    }
    return data["conversion_rates"];
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
};
