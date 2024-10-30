import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Pagination from './components/Pagination'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Pagination></Pagination>

    </>
  )
}

export default App
