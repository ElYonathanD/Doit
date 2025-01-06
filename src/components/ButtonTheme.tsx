import { useState } from 'react'
import { Sun } from './icons/Sun'
import { Moon } from './icons/Moon'

export const ButtonTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div
      className={`w-16 h-8 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 cursor-pointer transition-colors duration-300`}
      onClick={toggleMode}
    >
      <div
        className={`w-6 h-6 bg-white dark:bg-gray-950 rounded-full flex justify-center items-center shadow-md transform transition-transform duration-300 ${
          isDarkMode ? 'translate-x-8' : 'translate-x-0'
        }`}
      >
        {isDarkMode ? <Moon /> : <Sun />}
      </div>
    </div>
  )
}
