import SocialMedia from "../components/SocialMedia";

export default function Intro() {
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl md:text-4xl font-medium leading-tight">
                        <span className="block md:inline">Rushil</span>
                        <span className="block md:inline md:before:content-['_']">Bhaveshkumar</span>
                        <span className="block md:inline md:before:content-['_']">Patel</span>
                    </h1>
                    <SocialMedia />
                </div>
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl border border-gray-200 dark:border-neutral-700 overflow-hidden shrink-0 bg-gray-100 dark:bg-neutral-800">
                    <img
                        src="/profile.jpg"
                        alt="Rushil"
                        className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                </div>
            </div>
            <p className="mt-8 md:mt-0">
                Engineering at <a href="https://www.odoo.com" target="_blank" rel="noopener noreferrer"><b>Odoo</b></a> (Building & Optimizing website builder).<br/>
                Skilled in <b>Vite.js</b>, <b>Next.js</b>, <b>JavaScript</b>, and <u>modern web technologies</u>.<br/>
                Passionate about servers, cloud infrastructure, and scalable software architecture.<br/>
                <b>Learning</b>, <b>building</b>, and <b>improving : )</b>
            </p>
        </div>
    )
}
