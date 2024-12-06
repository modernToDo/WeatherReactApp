import React, { useEffect, useRef, useState } from "react";
import "./weatherApp.css";
import { MdSearch } from "react-icons/md";
import wind_img from "../assets/wind.png";
import humidity_img from "../assets/humidity.png";
import HourlyForecast from "./HourlyForecast";
import Precipitation from "./Precipitation";
import bg_img from "../assets/bg-img.jpeg"
import { Route,Routes,Link,BrowserRouter } from "react-router-dom"; 
import Wind from "./Wind";
import Humidity from "./Humidity";
import { IoMenu } from "react-icons/io5";

const Weather2 = () => {
  const [city, setCity] = useState("Dekemhare");
  const [menu, setMenu] = useState(false);
  const [celsius, setCelsius] = useState(false);
  const [fahrenheit, setFahrenheit] = useState(false);
  const temp = useRef(null);
  const clear = useRef(null);
  const wind = useRef(null);
  const humidity = useRef(null);
    const img_src = useRef(null);
    const overviewRef = useRef(null);
    const precRef = useRef(null);
    const windRef = useRef(null);
    const humidityRef = useRef(null);
    const [show, setShow] = useState(false)
    const [sendData, setSendData] = useState(null)
  const getWeather = async () => {
    setShow(true);
    const apiKey = "3e36283940dc4e2283d222617243011";
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?q=${city}&key=${apiKey}&days=7`
    );
    const data = await response.json();
    console.log(data);
    setSendData(data)
    temp.current.innerText =
      Math.round(data.current.temp_c) + "°C";
    clear.current.innerText =
      data.current.condition.text;
    wind.current.innerText = `${data.current.wind_kph} km/h`;
    humidity.current.innerText = `${data.current.humidity} %`;
    img_src.current.src = data.current.condition.icon;
  };
  function handleUnderline(e) {
    const ele = e.target;
    if (ele.classList.contains("over")) {
      overviewRef.current.style.textDecoration = "underline";
      precRef.current.style.textDecoration = "none";
      windRef.current.style.textDecoration = "none";
      humidityRef.current.style.textDecoration = "none";
    } else if (ele.classList.contains("pre")) {
      overviewRef.current.style.textDecoration = "none";
      precRef.current.style.textDecoration = "underline";
      windRef.current.style.textDecoration = "none";
      humidityRef.current.style.textDecoration = "none";
    } else if (ele.classList.contains("wind")) {
      overviewRef.current.style.textDecoration = "none";
      precRef.current.style.textDecoration = "none";
      windRef.current.style.textDecoration = "underline";
      humidityRef.current.style.textDecoration = "none";
    } else  {
      overviewRef.current.style.textDecoration = "none";
      precRef.current.style.textDecoration = "none";
      windRef.current.style.textDecoration = "none";
      humidityRef.current.style.textDecoration = "underline";
    }
}
  return (
    <div className="container" style={{ background: `url(${bg_img})` }}>
      <h2>Weather App</h2>
      <div className="search">
        <input
          placeholder="enter city name"
          type="text"
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>
          <MdSearch style={{ fontSize: "20px" }} /> Search
        </button>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          marginTop: "30px",
          flexDirection: "column",
          position: "relative",
        }}
      >
        <IoMenu fontSize="28px" onClick={() => setMenu(prev=>!prev)} />
        {menu && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "8px",
              position: "absolute",
              top: "100%",
              backgroundColor: "rgb(253, 250, 250)",
              color: "black",
              padding: "0 10px 15px",
              fontSize: "18px",
              borderRadius: "7px",
            }}
          >
            <p>Temperature units</p>
            <label htmlFor="fahrenheit">
              <input
                type="radio"
                id="fahrenheit"
                name="temp"
                onClick={() => {
                  (temp.current.innerText =
                    Math.round(sendData.current.temp_f) + "°F")
                  setFahrenheit(true)
                  setCelsius(false)
                }
                }
              />
              Fahrenheit_°F
            </label>
            <label htmlFor="celsius">
              <input
                type="radio"
                id="celsius"
                name="temp"
                onClick={() => {
                  (temp.current.innerText =
                    Math.round(sendData.current.temp_c) + "°C")
                  setCelsius(true)
                  setFahrenheit(false)
                }
                }
              />
              Celsius_°C
            </label>
          </div>
        )}
      </div>
      {show && (
        <>
          <article>
            <img ref={img_src} />
            <span ref={temp}></span>
            <span ref={clear}></span>
          </article>
          <div className="conditions">
            <div className="wind">
              <span>
                <img src={wind_img} style={{ width: "30px" }} />
                <span ref={wind}></span>
              </span>
              <span>wind</span>
            </div>
            <div className="humidity">
              <span>
                <img src={humidity_img} style={{ width: "25px" }} />
                <span ref={humidity}></span>
              </span>
              <span>humidity</span>
            </div>
          </div>
          <hr />
          <BrowserRouter>
            <nav className="navs">
              <Link
                to="/"
                ref={overviewRef}
                className="links over"
                onClick={handleUnderline}
              >
                Overview
              </Link>
              <Link
                to="/prec"
                ref={precRef}
                className="links pre"
                onClick={handleUnderline}
              >
                Precipitation
              </Link>
              <Link
                to="/wind"
                ref={windRef}
                className="links wind"
                onClick={handleUnderline}
              >
                Wind
              </Link>
              <Link
                to="/humidity"
                ref={humidityRef}
                className="links humidity"
                onClick={handleUnderline}
              >
                Humidity
              </Link>
            </nav>
            <Routes>
              <Route
                path="/"
                element={<HourlyForecast dataToSend={sendData} states={{ celsius, fahrenheit } } />}
              />
              <Route
                path="/prec"
                element={<Precipitation dataToSend={sendData} />}
              />
              <Route path="/wind" element={<Wind dataToSend={sendData} />} />
              <Route
                path="/humidity"
                element={<Humidity dataToSend={sendData} />}
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </div>
  );
};

export default React.memo(Weather2);
