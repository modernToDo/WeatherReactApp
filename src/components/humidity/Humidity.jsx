import React from "react";
import { WiHumidity } from "react-icons/wi";
import "./Humidity.css";
const Humidity = ({ dataToSend }) => {
  if (!dataToSend) {
    return;
  }
  const hour = new Date().getHours().toString().padStart(2, "0");
  const hourlyForecast = dataToSend.forecast.forecastday[0].hour;
  const HourlyArray = [
    ...hourlyForecast.slice(hour),
    ...hourlyForecast.slice(0, hour),
  ];
  const average_humidity = Number(
    HourlyArray.map((hr) => hr.humidity).reduce((s, t) => (s += t)) / 24
  ).toFixed();

  return (
    <>
      <p className="humid_average">
        Tonight's average:
        <strong>{average_humidity} %</strong>
      </p>
      <div className="humidityContainer">
        {HourlyArray.map((hr, i) => (
          <div key={i} className="humid_details">
            <span>{hr.humidity}%</span>
            <WiHumidity fontSize="30px" />
            <span>
              {hr.time.split(" ")[1].split(":")[0] == hour
                ? "Now"
                : hr.time.split(" ")[1]}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Humidity;
