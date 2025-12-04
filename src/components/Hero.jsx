import SocialMedia from './SocialMedia';

export default function Hero() {
  return (
    <section id="home" className="flex flex-col items-center justify-center px-6 py-20 min-h-[80vh]">
      <div className="max-w-4xl w-full">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-16">
          <div className="relative shrink-0 group">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full p-1 border-2 border-gray-200 dark:border-neutral-700 shadow-xl overflow-hidden transition-transform duration-500 group-hover:scale-105 group-hover:rotate-3 group-hover:border-gray-400 dark:group-hover:border-neutral-500">
              <img
                src="/profile.png"
                alt="Rushil Patel"
                className="w-full h-full object-cover rounded-full transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
          <div className="text-center md:text-left space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
              Rushil Bhaveshkumar Patel
            </h1>
            <p className="text-xl md:text-2xl font-medium text-gray-500 dark:text-gray-300">
              Software Developer Engineer
            </p>
            <div className="flex justify-center md:justify-start">
              <SocialMedia />
            </div>
          </div>
        </div>
        <div className="max-w-4xl w-full">
           <ul className="list-disc text-lg text-gray-600 dark:text-gray-400 leading-relaxed space-y-1 pl-4 md:pl-[50px]">
              <li>Currently building website builder at <b>Odoo</b>.</li>
              <li>Skilled in <b>Next.js</b>, <b>React/Vite</b>, <b>JavaScript</b>, and modern web technologies.</li>
              <li>Passionate about cloud infrastructure, servers, and scalable software architecture.</li>
              <li>Continuously <u>learning</u>, <u>improving</u>, and <u>building</u> my life one step at a time.</li>
            </ul>
        </div>
      </div>
    </section>
  );
}
