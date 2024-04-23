'use client'

import { useContext } from 'react';
import { ThemeContext } from "../provider"
function Button() {
  const theme = useContext(ThemeContext);
  return <button>{ theme }</button>;
}

export default Button