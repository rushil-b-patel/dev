import React from "react";
import {Arrow} from "./Assets";
import {Code} from "./Assets";

const ProjectCard = (props) => {
  return (
    <div className="group relative lg:w-[600px] rounded-[20px]  p-6 px-8 border-[1px] dark:border-gray-600 transition-all duration-500 overflow-visible hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)] dark:hover:shadow-[0_4px_18px_0_rgba(255,255,255,0.1)]">
      <div className="grid text-black dark:text-white">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-medium">{props.title}</p>
          <div className="space-x-5 flex items-center">
            <button onClick={() => window.open(props.codeLink)}>
              <Code />
            </button>
            <button onClick={() => window.open(props.link)}>
              <Arrow />
            </button>
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-200 my-2 text-base text-justify">{props.description}</p>
        <div className="font-mono lg:flex justify-between items-center lg:text-base text-sm text-gray-800 dark:text-gray-300">
          <p className="border dark:border-gray-600 p-1 px-2 rounded-md bg-gray-[#f3f4f6] dark:bg-[#1a1a1a]">{props.startDate} - {props.endDate}</p>
          <p>
            {props.techStack?.map((tech, index) => (
              <span key={index} className="ml-2">
                <span className="border dark:border-gray-600 p-1 rounded-md bg-gray-[#f3f4f6] dark:bg-[#1a1a1a]">{tech}</span>
              </span>)
            )}
          </p>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 dark:bg-gray-700">
          <div className="bg-gray-500 h-2.5 rounded-full" style={{width:'45%'}}></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
