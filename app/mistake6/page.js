'use client'
 
import { createContext, useContext } from 'react'
import dayjs from "dayjs";

export const ThemeContext = createContext('light')

function Button() {
  var now = dayjs().format('DD/MM/YYYY')
  const theme = useContext(ThemeContext);
  return <button>{ now } { theme }</button>;
}

export default function Page() {
  return (
    <ThemeContext.Provider value="dark">
      <Button />
    </ThemeContext.Provider>
  )
}