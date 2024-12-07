import React from "react";
import wind_dir from "../../assets/wind_dir.png";
import "./Wind.css";
const Wind = ({ dataToSend }) => {
  if (!dataToSend) {
    return;
  }
  const hour = new Date().getHours().toString().padStart(2, "0");
  const hourlyForecast = dataToSend.forecast.forecastday[0].hour;
  const HourlyArray = [
    ...hourlyForecast.slice(hour),
    ...hourlyForecast.slice(0, hour),
  ];
  const windArray = HourlyArray.map((hr) => hr.wind_kph);
  const maxValue = Math.max(...windArray);

  return (
    <>
      <p className="wind_high">
        Tonight's high:
        <strong>{maxValue} km/h</strong>
      </p>
      <div className="windContainer">
        {HourlyArray.map((hr, i) => (
          <div key={i} className="wind_details">
            <span>{hr.wind_kph}</span>
            <img
              src={wind_dir}
              style={{ width: "15px" }}
              className={
                hr.wind_dir == "NE"
                  ? "NE"
                  : hr.wind_dir == "SE"
                  ? "SE"
                  : hr.wind_dir == "SW"
                  ? "SW"
                  : null
              }
            />
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
export default React.memo(Wind);
