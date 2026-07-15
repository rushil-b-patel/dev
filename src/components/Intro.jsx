import Image from "next/image";
import SocialMedia from "@/components/SocialMedia";

export default function Intro() {
    return (
        <div>
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl md:text-4xl font-medium leading-tight">
                        <span className="block md:inline">Rushil</span>
                        <span className="block md:inline md:before:content-['_']">Bhaveshkumar</span>
                        <span className="block md:inline md:before:content-['_']">Patel</span>
                    </h1>
                    <div className="flex flex-col md:flex-row md:justify-between">
                        <p className="md:text-lg whitespace-nowrap">Full Stack Engineer</p>
                        <SocialMedia />
                    </div>
                </div>
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-xl border border-rule overflow-hidden shrink-0 bg-surface">
                    <Image src="/profile.jpg" alt="Rushil" width={112} height={112} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-[filter] duration-500" priority />
                </div>
            </div>
            <p className="mt-8 md:mt-0">
                Engineering at <a href="https://www.odoo.com" className="blog-link" target="_blank" rel="noopener noreferrer"><b>Odoo</b></a> (Building &amp; Optimizing the website builder).<br />
                JS, Python, Vite, Next.js — whatever ships the features.<br />
                Into servers, infra, systems that scale, and AI that builds.<br />
                Learning, building, and improving <b>: )</b>
            </p>
        </div>
    );
}
