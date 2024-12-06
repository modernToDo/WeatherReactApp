import React from 'react'
import { WiRaindrop } from "react-icons/wi";

const Precipitation = ({dataToSend}) => {
  if (!dataToSend) {
    return;
  }
  const hour = new Date().getHours().toString().padStart(2, "0");
  const min = new Date().getMinutes().toString().padStart(2, "0");
  const now = `${hour}:${min}`;
  const hourlyForecast = dataToSend.forecast.forecastday[0].hour;
  const HourlyArray = [
    ...hourlyForecast.slice(hour),
    ...hourlyForecast.slice(0, hour),
  ];
    const average_mm =Number((HourlyArray.map((hr) => hr.precip_mm).reduce( (s, t) => (s += t) / 24)).toFixed(2));
  return (
    <>
      <p style={{ color: "rgb(196, 198, 200)" }}>
        Tonight's amount:
        <strong style={{ color: "aliceblue" }}>{average_mm} mm</strong>
      </p>
      <div
        className="hourContainer"
        style={{
          display: "flex",
          columnGap: "22px",
          marginTop: "-10px",
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
            <WiRaindrop style={{ fontSize: "40px" }} />
            <span style={{ marginBottom: "7px", color: "rgb(226, 227, 228)" }}>
              {hr.chance_of_rain}%
            </span>
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
}

export default React.memo(Precipitation)