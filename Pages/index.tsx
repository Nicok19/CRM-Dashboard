import Image from "next/image";
import 'tailwindcss/tailwind.css';
import Button__addData from "../src/app/Components/Button__addData";
import LineChart from "../src/app/Components/LineChart";
import PieChart from "../src/app/Components/PieChart";
import BarChart from "src/app/Components/BarChart";

export default function Home() {
  return (
    // General Container
    <div className="xl:w-5/6 m-auto">
      
      {/* Header Begin*/}
      <div className="flex justify-between items-center mt-4 mb-5">
        <h1 className="font-bold text-3xl text-cyan-400">CRM Dashboard</h1>
        <p className="text-cyan-400 font-medium">A Creation of Nicolás Bertinat</p>
      </div>
      {/* Header End*/}

      {/* LineChart begin*/}
      <div className="mt-24">
        <Button__addData />
        <div className="mt-24 xl:w-6/6 flex justify-center items-center">
       <PieChart />
       </div>

      </div>
      {/* LineChart end*/}


      {/* LineChart and BarChart begin*/}
      <div className="mt-24 flex justify-between">
        <div className="w-5/12">
        <div className="mt-24 mb-24">
        <Button__addData />
        </div>
          
          <LineChart />
        </div>

        <div className="w-6/12">
        <div className="mt-24 mb-24">
        <Button__addData />
        </div>
          <BarChart />
        </div>


      </div>
      {/* LineChart and BarChart end*/}

    </div>
  );
}

