import React  from "react";

const HourlyForecast = ({ dataToSend ,states}) => {
  if (!dataToSend) {
    return;
  }
  const hour = new Date().getHours().toString().padStart(2, "0");
  const min = new Date().getMinutes().toString().padStart(2, "0");
  const now=`${hour}:${min}`
  const hourlyForecast = dataToSend.forecast.forecastday[0].hour;
  const HourlyArray = [
    ...hourlyForecast.slice(hour),...hourlyForecast.slice(0,hour)
  ]
  return (
    <>
      <div
        className="hourContainer"
        style={{
          display: "flex",
          columnGap: "22px",
          marginTop: "20px",
          overflowX: "auto",
        }}
      >
        {HourlyArray.map((hr, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              rowGap: "-40px",
            }}
          >
            <span>
              {hr.time.split(" ")[1].split(":")[0] == hour
                ? "Now"
                : hr.time.split(" ")[1]}
            </span>
            <img src={hr.condition.icon} width="50px" />
            <span>
              {states.celsius
                ? Math.round(hr.temp_c)+"°"
                : states.fahrenheit
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
