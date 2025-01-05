import React from "react";
import Arrow from "./Arrow";

const ProjectCard = (props) => {
  return (
    <div className="group relative lg:w-[767px] rounded-[20px]  dark:bg-[#0C0C0C] p-5 px-8 border-[1px] transition-all duration-500 overflow-visible hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)] dark:hover:shadow-[0_4px_18px_0_rgba(255,255,255,0.1)]">
      <div className="grid text-black dark:text-white">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">{props.title}</p>
          <button onClick={() => window.open(props.link)}>
            <Arrow />
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-200 my-3 text-base text-justify">{props.description}</p>
        <div className="font-mono lg:flex justify-between items-center lg:text-base text-sm text-gray-800 dark:text-gray-300">
        <p>{props.startDate} - {props.endDate}</p>
        <p>
          {props.techStack?.map((tech, index) => (
            <span key={index} className="mr-2">
              {tech} |
            </span>)
          )}
        </p>
        </div>
      </div>
      <button
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[125%] w-[60%] rounded-2xl border-none  hover:bg-black hover:dark:bg-slate-800  bg-[#0e1113] dark:bg-gray-700 text-white text-base py-2 px-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-1/2 group-hover:opacity-100"
      >
        More info
      </button>
    </div>
  );
};

export default ProjectCard;
