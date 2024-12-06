import { useState } from 'react'

import './App.css'
//import WeatherApp from './components/weatherApp'
import Weather2 from './components/weather2'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Weather2/>
    </>
  )
}

export default App
