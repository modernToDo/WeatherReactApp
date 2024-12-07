import React, { useReducer, useRef, useState } from "react";
import "./weatherApp.css";
import {
  MdSearch,
  wind_img,
  humidity_img,
  bg_img,
  Route,
  Routes,
  Link,
  BrowserRouter,
  HourlyForecast,
  Precipitation,
  Wind,
  Humidity,
  IoMenu,
} from "./Imports";

const reducer = (state, action) => {
  switch (action.type) {
    case "search":
      return { ...state, city: action.payload };
    case "menu":
      return { ...state, menu: !state.menu };
    case "celsius":
      return {
        ...state,
        celsius: action.payload.celsius,
        fahrenheit: action.payload.fahrenheit,
      };
    case "fahrenheit":
      return {
        ...state,
        celsius: action.payload.celsius,
        fahrenheit: action.payload.fahrenheit,
      };
    case "show":
      return { ...state, show: true };
    case "sendData":
      return { ...state, sendData: action.payload };
  }
};
const initialState = {
  city: "Dekemhare",
  menu: false,
  celsius: false,
  fahrenheit: false,
  show: false,
  sendData: null,
};
const Weather2 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [underline, setUnderline] = useState(null);
  const temp = useRef(null);
  const clear = useRef(null);
  const wind = useRef(null);
  const humidity = useRef(null);
  const img_src = useRef(null);
  const getWeather = async () => {
    const apiKey = "3e36283940dc4e2283d222617243011";
    const response = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?q=${state.city}&key=${apiKey}&days=7`
    );
    const data = await response.json();
    console.log(data);
    dispatch({ type: "sendData", payload: data });
    temp.current.innerText = Math.round(data.current.temp_c) + "°C";
    clear.current.innerText = data.current.condition.text;
    wind.current.innerText = `${data.current.wind_kph} km/h`;
    humidity.current.innerText = `${data.current.humidity} %`;
    img_src.current.src = data.current.condition.icon;
  };
  function handleUnderline(id) {
    setUnderline(id);
  }
  return (
    <div className="container" style={{ background: `url(${bg_img})` }}>
      <h2>Weather App</h2>
      <div className="search">
        <input
          placeholder="enter city name"
          type="text"
          onChange={(e) =>
            dispatch({ type: "search", payload: e.target.value })
          }
        />
        <button
          onClick={() => {
            getWeather();
            dispatch({ type: "show" });
          }}
        >
          <MdSearch style={{ fontSize: "20px" }} /> Search
        </button>
      </div>
      <div className="menu">
        <IoMenu fontSize="28px" onClick={() => dispatch({ type: "menu" })} />
        {state.menu && (
          <div className="dropdown">
            <p>Temperature units</p>
            <label htmlFor="fahrenheit">
              <input
                type="radio"
                id="fahrenheit"
                name="temp"
                onClick={() => {
                  temp.current.innerText =
                    Math.round(state.sendData.current.temp_f) + "°F";
                  dispatch({
                    type: "fahrenheit",
                    payload: { fahrenheit: true, celsius: false },
                  });
                }}
              />
              Fahrenheit_°F
            </label>
            <label htmlFor="celsius">
              <input
                type="radio"
                id="celsius"
                name="temp"
                onClick={() => {
                  temp.current.innerText =
                    Math.round(state.sendData.current.temp_c) + "°C";
                  dispatch({
                    type: "celsius",
                    payload: { fahrenheit: false, celsius: true },
                  });
                }}
              />
              Celsius_°C
            </label>
          </div>
        )}
      </div>
      {state.show && (
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
                className="links over"
                onClick={() => {
                  handleUnderline(1);
                }}
                style={{
                  textDecoration: underline === 1 ? "underline" : "none",
                }}
              >
                Overview
              </Link>
              <Link
                to="/prec"
                className="links pre"
                onClick={() => handleUnderline(2)}
                style={{
                  textDecoration: underline === 2 ? "underline" : "none",
                }}
              >
                Precipitation
              </Link>
              <Link
                to="/wind"
                className="links wind"
                onClick={() => handleUnderline(3)}
                style={{
                  textDecoration: underline === 3 ? "underline" : "none",
                }}
              >
                Wind
              </Link>
              <Link
                to="/humidity"
                className="links humidity"
                onClick={() => handleUnderline(4)}
                style={{
                  textDecoration: underline === 4 ? "underline" : "none",
                }}
              >
                Humidity
              </Link>
            </nav>
            <Routes>
              <Route
                path="/"
                element={
                  <HourlyForecast
                    dataToSend={state.sendData}
                    states={{ yemun: state.celsius, rumi: state.fahrenheit }}
                  />
                }
              />
              <Route
                path="/prec"
                element={<Precipitation dataToSend={state.sendData} />}
              />
              <Route
                path="/wind"
                element={<Wind dataToSend={state.sendData} />}
              />
              <Route
                path="/humidity"
                element={<Humidity dataToSend={state.sendData} />}
              />
            </Routes>
          </BrowserRouter>
        </>
      )}
    </div>
  );
};

export default React.memo(Weather2);
