import React from "react";
import { WiRaindrop } from "react-icons/wi";
import "./Precipitation.css";
const Precipitation = ({ dataToSend }) => {
  if (!dataToSend) {
    return;
  }
  const hour = new Date().getHours().toString().padStart(2, "0");
  const hourlyForecast = dataToSend.forecast.forecastday[0].hour;
  const HourlyArray = [
    ...hourlyForecast.slice(hour),
    ...hourlyForecast.slice(0, hour),
  ];
  const average_mm = Number(
    HourlyArray.map((hr) => hr.precip_mm)
      .reduce((s, t) => (s += t) / 24)
      .toFixed(2)
  );
  return (
    <>
      <p className="prec_amount">
        Tonight's amount:
        <strong>{average_mm} mm</strong>
      </p>
      <div className="precContainer">
        {HourlyArray.map((hr, i) => (
          <div key={i} className="prec_details">
            <WiRaindrop style={{ fontSize: "40px" }} />
            <span>{hr.chance_of_rain}%</span>
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

export default React.memo(Precipitation);
