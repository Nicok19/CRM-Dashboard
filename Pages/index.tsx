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
    <div className="bg-white dark:bg-gray-800 pb-10">
      <div className="w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-5/6 2xl:w-4/5 m-auto">
        
        {/* Header Begin*/}
        <div className="flex flex-col md:flex-row justify-between items-center pt-4 mb-5 m-auto md:w-2/3 lg:w-5/6 2xl:w-10/12">
        <h1 className="font-bold text-3xl text-blue-500 dark:text-white mb-3 mt-10 md:mt-0 md:text-xl  xl:text-2xl 2xl:text-4xl  ">CRM Dashboard</h1>
<p className="text-black font-medium md:text-base dark:text-white mb-3 2xl:text-2xl">A Creation of Nicolás Bertinat</p>

          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-2/3 md:w-32 2xl:w-52 ml-4 px-4 py-2 bg-blue-500 text-white dark:bg-teal-400 dark:text-slate-800 rounded"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        {/* Header End*/}

        {/* PieChart begin*/}
        <div className="mt-10 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-40 flex justify-center items-center w-full">
  <div className="w-10/12 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-2/4">
    <PieChart />
  </div>
</div>

{/* LineChart and BarChart begin */}
<div className="mt-10 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-40 flex flex-col lg:flex-row justify-between w-full m-auto">
  {/* LineChart container */}
  <div className="mb-6 md:mb-0 flex m-auto">
    <LineChart />
  </div>

  {/* BarChart container */}
  <div className=" flex m-auto">
    <BarChart />
  </div>
</div>
{/* LineChart and BarChart end */}



      </div>
    </div>
  );
}
