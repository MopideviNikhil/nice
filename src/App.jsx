import React from 'react'
import './App.css'
import LandingPage from './tailwidBlocks/pages/LandingPage'


const App = () => {
  // Save preference
const toggleDarkMode = () => {
  const html = document.documentElement;
  const isDark = html.classList.toggle('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
};

// Load preference on page load
if (localStorage.getItem('theme') === 'dark') {
  document.documentElement.classList.add('dark');
}

 
  return (
    <div >
    <LandingPage change={toggleDarkMode}/>
    </div>
  )
}
export default App