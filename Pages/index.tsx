import Image from "next/image";
import 'tailwindcss/tailwind.css'
import Button__addData from "../src/app/Components/Button__addData";

export default function Home() {
  return (

    // General Container
    <div className="xl:w-5/6 m-auto ">

       {/* Header Begin*/}
       <div className="flex justify-between items-center mt-4 mb-5">
      <h1 className="font-bold text-3xl text-cyan-400">CRM Dashboard</h1>
      <p className="text-cyan-400 font-medium">A Creation of Nicolás Bertinat</p>
      </div>
      {/* Header End*/}
      <div className="mt-24">
      <Button__addData/>
      </div>



     


    </div>
  );
  
  
}
