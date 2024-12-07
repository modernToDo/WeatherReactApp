import React  from "react";
import "./HourlyForecast.css"

const HourlyForecast = ({ dataToSend ,states}) => {
  if (!dataToSend) {
    return;
  }
  const hour = new Date().getHours().toString().padStart(2, "0");
  const hourlyForecast = dataToSend.forecast.forecastday[0].hour;
  const HourlyArray = [
    ...hourlyForecast.slice(hour),...hourlyForecast.slice(0,hour)
  ]
  return (
    <>
      <div className="hourContainer">
        {HourlyArray.map((hr, i) => (
          <div key={i} className="details">
            <span>
              {hr.time.split(" ")[1].split(":")[0] == hour
                ? "Now"
                : hr.time.split(" ")[1]}
            </span>
            <img src={hr.condition.icon} width="50px" />
            <span>
              {states.yemun
                ? Math.round(hr.temp_c)+"°"
                : states.rumi
                ? Math.round(hr.temp_f)+"°"
                : Math.round(hr.temp_c) + "°"}
            </span>
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(HourlyForecast);
