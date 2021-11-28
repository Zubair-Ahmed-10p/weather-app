const getWeatherData = (address = "karachi", unit = "m") => {
  return new Promise(async (resolve, reject) => {
    const response = await fetch(
      `/weather?address=${encodeURIComponent(address)}&unit=${unit}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();
    if (data?.error) {
      reject(data.error);
    } else {
      resolve(data);
    }
  });
};

// elements
const forecastDataElement = document.querySelector("#forecast_data");
const locationElement = document.querySelector("#location");
const errorMessageElement = document.querySelector("#error_message");

const setMessage = (node, message) => {
  node.textContent = message;
};

const resetElements = () => {
  setMessage(forecastDataElement, "");
  setMessage(locationElement, "");
  setMessage(errorMessageElement, "");
};

const weatherForm = document.querySelector("form");

weatherForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    resetElements();
    setMessage(forecastDataElement, "Loading...");
    const address = event.target?.search?.value;
    const weatherData = await getWeatherData(address);
    setMessage(locationElement, `At ${weatherData?.location}`);
    setMessage(forecastDataElement, `${weatherData?.forecastData}`);
  } catch (error) {
    resetElements();
    setMessage(errorMessageElement, error);
  }
});
