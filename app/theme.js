import { useEffect, useState } from "react"

function useTheme() {
 
  const [theme, setTheme] = useState('light')

  useEffect(() => {

    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(darkModeMediaQuery.matches ? 'dark' : 'light')
    const listener = (event) => {
      setTheme(event.matches ? 'dark' : 'light');
    };

    darkModeMediaQuery.addEventListener('change', listener);
    return () => {
      darkModeMediaQuery.removeEventListener('change', listener);
    };
    
  }, [])
  
  return {
    theme,
    isDarkMode: theme === "dark",
    isLightMode: theme === "light",
  }
}

export default useTheme