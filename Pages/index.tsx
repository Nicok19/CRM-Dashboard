import { useState, useEffect } from 'react';
import LineChart from "../src/app/components/LineChart/LineChart";
import PieChart from "../src/app/components/PieChart/PieChart";
import BarChart from "../src/app/components/BarChart/BarChart";
import DownloadPDF from '../src/app/components/DownloadPdf/downoadpdf'; 
import Image from 'next/image';

export default function Home() {
  // State and Effect for Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-slate-800 top-0">
      {/* Header Section */}
      <header className="w-full bg-blue-500 dark:bg-slate-500 md:fixed top-0 left-0 z-50 h-26 md:h-20">
        <div className="flex flex-col md:flex-row justify-between items-center m-auto md:w-2/3 lg:w-5/6 2xl:w-10/12 h-20">
          
          <p className="text-white font-medium md:text-base 2xl:text-2xl mt-6 md:mt-0 mb-3 md:mb-0">A Creation of Nicolás Bertinat</p>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="w-2/3 md:w-32 2xl:w-52 ml-4 px-4 py-2 bg-blue-100 hover:bg-blue-950 dark:hover:bg-teal-950 dark:hover:text-white text-blue-500 dark:bg-teal-400 dark:text-slate-800 rounded transition-colors duration-300"
          >
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        
      </header>

       {/* Content Section */}
<div className='bg-blue-500 dark:bg-slate-500'>
  <section className="flex flex-col items-center justify-center w-full sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-5/6 2xl:w-4/5 m-auto md:pt-16">
    <h1 className="font-bold text-3xl text-white md:text-6xl xl:text-6xl 2xl:text-8xl mt-12 md:mt-20  text-center">
      CRM Dashboard
    </h1>
    <h2 className="text-center text-sm md:text-xl xl:text-xl font-regular text-white mt-6 w-2/3 pb-16">
      Here’s a basic example of using charts. This small project was created with Next.js, utilizing Chart.js for building the charts and Tailwind for styling.
    </h2>
  </section>
</div>
{/* End of Content Section */}



      
      {/* End of Header Section */}

     
        {/* PieChart Section */}
        <section className="mt-10 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-20 flex justify-center items-center w-full">
          <div className="w-10/12 sm:w-11/12 md:w-10/12 lg:w-9/12 xl:w-8/12 2xl:w-2/4 chart-container">
            <PieChart darkMode={darkMode} />
          </div>
        </section>
        {/* End of PieChart Section */}

        {/* LineChart and BarChart Section */}
        <section className="mt-10 sm:mt-16 md:mt-24 lg:mt-32 xl:mt-40 flex flex-col lg:flex-row justify-between w-full m-auto">
          <div className="mb-6 md:mb-0 flex m-auto chart-container">
            <LineChart darkMode={darkMode} />
          </div>

          <div className="flex m-auto chart-container">
            <BarChart darkMode={darkMode} />
          </div>
        </section>
        {/* End of LineChart and BarChart Section */}
        
    
      {/* End of Content Section */}
      
 {/* Download PDF Button Section */}
<section className='w-full bg-blue-500 dark:bg-slate-500 mt-16 md:mt-24 lg:mt-32 h-auto py-16'>
  <div className='flex flex-col lg:flex-row w-11/12 md:w-4/5 lg:w-3/4 m-auto items-center justify-between h-full'>
    <div className='w-full lg:w-2/4 mb-10 lg:mb-0'>
      <h2 className='text-xl md:text-2xl lg:text-3xl text-white font-bold mb-4 text-center lg:text-left'>
        Download your charts as PDF here
      </h2>
      <p className='text-white mb-6 md:mb-8 lg:mb-10 text-center lg:text-left'>
        To save and share your data easily, you can download your charts as a PDF. Simply click the link below to get your comprehensive report.
      </p>
      <div className='flex justify-center lg:justify-start'>
        <DownloadPDF />
      </div>
    </div>
    <div className='w-full lg:w-2/4 flex justify-center lg:justify-end'>
      <Image 
        src="/graph.jpg" 
        alt="Download PDF Illustration" 
        width="500" 
        height="300" 
        className='rounded-lg shadow-2xl'
      />
    </div>
  </div>
</section>
{/* End of Download PDF Button Section */}

{/* Begining of section Tecnologies */}

{/* end of section Tecnologies */}


    </div>
  );
}

