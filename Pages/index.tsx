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
    <div className="bg-white dark:bg-slate-200 pb-10">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-5/6 2xl:w-4/5 m-auto">
        
        {/* Header Begin */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 mb-5 m-auto md:w-2/3 lg:w-5/6 2xl:w-10/12">
          <h1 className="font-bold text-3xl text-blue-500 dark:text-teal-400 mb-3 mt-10 md:mt-0 md:text-xl xl:text-2xl 2xl:text-4xl">CRM Dashboard</h1>
          <p className="text-black font-medium md:text-base dark:text-white-400 mb-3 2xl:text-2xl">A Creation of Nicolás Bertinat</p>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-2/3 md:w-32 2xl:w-52 ml-4 px-4 py-2 bg-blue-500 text-white dark:bg-teal-400 dark:text-slate-800 rounded"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        {/* Header End */}

        {/* Styled h2 */}
        <h2 className="text-center text-sm md:text-xl xl:text-xl font-regular text-gray-800 mt-20 w-2/3 m-auto">
          Here’s a basic example of using charts. This small project was created with Next.js, utilizing Chart.js for building the charts and Tailwind for styling.
        </h2>

        {/* PieChart Begin */}
        <div className="mt-10 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-20 flex justify-center items-center w-full">
          <div className="w-10/12 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-2/4">
            <PieChart />
          </div>
        </div>

        {/* LineChart and BarChart Begin */}
        <div className="mt-10 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-40 flex flex-col lg:flex-row justify-between w-full m-auto">
          {/* LineChart Container */}
          <div className="mb-6 md:mb-0 flex m-auto">
            <LineChart />
          </div>

          {/* BarChart Container */}
          <div className="flex m-auto">
            <BarChart />
          </div>
        </div>
        {/* LineChart and BarChart End */}
      </div>
    </div>
  );
}

