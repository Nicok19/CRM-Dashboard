import { useState, useEffect } from 'react';
import LineChart from "../src/app/components/LineChart/LineChart";
import PieChart from "../src/app/components/PieChart/PieChart";
import BarChart from "../src/app/components/BarChart/BarChart";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    // General Container
    <div className="bg-white dark:bg-slate-800 top-0 ">

              {/* Header Begin */}
              <div className="w-full bg-blue-500  dark:bg-slate-500 md:fixed  top-0 left-0 z-50 h-44 md:h-20 "> 
              <div className=" flex flex-col md:flex-row justify-between items-center  m-auto md:w-2/3 lg:w-5/6 2xl:w-10/12 h-20">

          <h1 className="font-bold text-3xl text-white md:text-xl xl:text-2xl 2xl:text-4xl mt-6 md:mt-0">CRM Dashboard</h1>
          <p className="text-white font-medium md:text-base 2xl:text-2xl mt-3 md:mt-0 mb-3 md:mb-0">A Creation of Nicolás Bertinat</p>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-2/3 md:w-32 2xl:w-52 ml-4 px-4 py-2 bg-blue-100 hover:bg-blue-950 dark:hover:bg-teal-950
             dark:hover:text-white text-blue-500 dark:bg-teal-400 dark:text-slate-800 rounded transition-colors duration-300"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        </div>
        {/* Header End */}
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-5/6 2xl:w-4/5 m-auto">
        


        {/* Styled h2 */}
        <h2 className="text-center text-sm md:text-xl xl:text-xl font-regular text-gray-800 dark:text-white mt-12 md:pt-36 w-2/3 m-auto">
          Here’s a basic example of using charts. This small project was created with Next.js, utilizing Chart.js for building the charts and Tailwind for styling.
        </h2>

        {/* PieChart Begin */}
        <div className="mt-10 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-20 flex justify-center items-center w-full">
          <div className="w-10/12 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-2/4">
            <PieChart darkMode={darkMode} /> {/* Pasar la propiedad darkMode */}
          </div>
        </div>

        {/* LineChart and BarChart Begin */}
        <div className="mt-10 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-40 flex flex-col lg:flex-row justify-between w-full m-auto">
          {/* LineChart Container */}
          <div className="mb-6 md:mb-0 flex m-auto">
            <LineChart darkMode={darkMode} /> {/* Pasar la propiedad darkMode */}
          </div>

          {/* BarChart Container */}
          <div className="flex m-auto">
            <BarChart darkMode={darkMode} /> {/* Pasar la propiedad darkMode */}
          </div>
        </div>
        {/* LineChart and BarChart End */}
      </div>
    </div>
  );
}
