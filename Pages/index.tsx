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
    <div className="bg-white dark:bg-gray-800">
      <div className="xl:w-5/6 m-auto">
        
        {/* Header Begin*/}
        <div className="flex justify-between items-center pt-4 mb-5">
          <h1 className="font-bold text-3xl text-cyan-400 dark:text-white">CRM Dashboard</h1>
          <p className="text-cyan-400 font-medium dark:text-white">A Creation of Nicolás Bertinat</p>
          {/* Dark Mode Toggle Button */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 px-4 py-2 bg-cyan-400 text-slate-900 dark:bg-teal-400 dark:text-slate-800 rounded"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        {/* Header End*/}

        {/* PieChart begin*/}
        <div className="mt-24 flex justify-center items-center w-full">
          <PieChart />
        </div>

        {/* LineChart and BarChart begin*/}
        <div className="mt-24 flex justify-between">
          <div className="w-5/12">
            <div className="mt-24 mb-24">
            </div>
            <LineChart />
          </div>

          <div className="w-6/12">
            <div className="mt-24 mb-24">
            </div>
            <BarChart />
          </div>
        </div>
        {/* LineChart and BarChart end*/}

      </div>
    </div>
  );
}


