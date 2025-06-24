import React from 'react'
import { Context } from '../../App'
import { FaSun, FaMoon } from 'react-icons/fa';

const NavBarSection = () => {

    const {theme,toggleDarkMode}=React.useContext(Context)

      const isDark = theme === 'dark';

     



  return (
    <section className=''>
        <header className="text-gray-600 body-font  darkmode">
  <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg> */}
      <img src="assets/icece.svg" alt="" className="w-16" />
      <span className="ml-3 text-xl col">Ice creams</span>
    </a>
    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center ">
      <a className="mr-5 hover:text-gray-400">First Link</a>
      <a className="mr-5 hover:text-gray-400">Second Link</a>
      <a className="mr-5 hover:text-gray-400">Third Link</a>
      <a className="mr-5 hover:text-gray-400">Fourth Link</a>
    </nav>
    
    <div className="flex justify-center items-center h-16">
      <button
        onClick={toggleDarkMode}
        className="relative w-14 h-8 flex items-center rounded-full p-1 bg-gray-300 dark:bg-gray-700 transition-colors duration-300"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {/* Sliding knob */}
        <div
          className={`absolute left-1 top-1 w-6 h-6 rounded-full transition-transform duration-300 transform 
            ${isDark ? 'translate-x-6 bg-yellow-400' : 'translate-x-0 bg-gray-800'}`}
        >
          {isDark ? (
            <FaSun className="text-white w-4 h-4 m-1" />
          ) : (
            <FaMoon className="text-white w-4 h-4 m-1" />
          )}
        </div>
      </button>
    </div>
  </div>
</header>
    </section>
  )
}

export default NavBarSection