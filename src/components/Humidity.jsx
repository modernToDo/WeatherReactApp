import React from 'react'
import { WiHumidity } from "react-icons/wi";

const Humidity = ({ dataToSend }) => {
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
    const average_humidity =
      Number(HourlyArray.map((hr) => hr.humidity).reduce((s, t) => (s += t) )/24).toFixed();

    return (
      <>
        <p style={{ color: "rgb(196, 198, 200)" }}>
          Tonight's average:
          <strong style={{ color: "aliceblue" }}>{average_humidity} %</strong>
        </p>
        <div
          className="hourContainer"
          style={{
            display: "flex",
            columnGap: "25px",
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
              <span
                style={{ marginBottom: "7px", color: "rgb(226, 227, 228)" }}
              >
                {hr.humidity}%
              </span>
              <WiHumidity fontSize="30px"/>
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

export default Humidity