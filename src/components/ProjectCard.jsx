import React from "react";
import Arrow from "./Arrow";

const ProjectCard = () => {
  return (
    <div className="group relative w-[767px] rounded-[20px] bg-[#f5f5f5] p-5 px-8 border-2 border-[#c3c6ce] transition-all duration-500 overflow-visible hover:border-black hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)]">
      <div className="grid text-black">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold">Whisper</p>
          <button>
            <Arrow />
          </button>
        </div>
        <p className="text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta sequi commodi iure corporis voluptate molestiae? Maiores commodi distinctio architecto deleniti excepturi consequatur et ipsam alias. Consectetur aperiam ipsa ratione corporis.</p>
        <div className="font-mono flex justify-between items-center text-gray-800 mt-5">
        <p>19th Oct - 19th Dec</p>
        <p>TechStack : React JS | Node JS | Express JS</p>
        </div>
      </div>
      <button
        className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-[125%] w-[60%] rounded-2xl border-none  hover:bg-black  bg-gray-900 text-white text-base py-2 px-4 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-1/2 group-hover:opacity-100"
      >
        More info
      </button>
    </div>
  );
};

export default ProjectCard;
