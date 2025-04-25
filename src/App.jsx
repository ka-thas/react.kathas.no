import { useState } from 'react'
import {Test} from "./components/test.js"
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Test/>
    </>
  )
}

export default App
