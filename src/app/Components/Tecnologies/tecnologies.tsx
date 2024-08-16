import Image from 'next/image';

export default function Logos() {
  return (
    <div className='mt-20 pb-20'>
      <h2 className="text-center text-blue-500 dark:text-white font-bold w-2/3 text-2xl 2xl:text-4xl mb-20 m-auto">This project was made with these technologies:</h2>

      <div className="flex flex-col sm:flex-row justify-around sm:2/4 items-center sm:space-x-8 h-full">
        <div className="flex flex-col items-center mb-10 sm:mb-0">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg"
            alt="Next.js Logo"
            width={96}
            height={96}
            className="dark:invert"
          />
          <span className="text-sm mt-2 text-center dark:text-white">Next.js</span>
        </div>
        <div className="flex flex-col items-center mb-10 sm:mb-0">
          <Image
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
            alt="TypeScript Logo"
            width={96}
            height={96}
            className="dark:invert"
          />
          <span className="text-sm mt-2 text-center dark:text-white">TypeScript</span>
        </div>
        <div className="flex flex-col items-center mb-10 sm:mb-0">
          <Image
            src="https://www.chartjs.org/img/chartjs-logo.svg"
            alt="Chart.js Logo"
            width={96}
            height={96}
            className="dark:filter dark:brightness-0 dark:invert"
          />
          <span className="text-sm mt-2 text-center dark:text-white">Chart.js</span>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg"
            alt="Tailwind CSS Logo"
            width={96}
            height={96}
            className="dark:filter dark:brightness-0 dark:invert"
          />
          <span className="text-sm mt-2 text-center dark:text-white">Tailwind CSS</span>
        </div>
      </div>
    </div>
  );
}
