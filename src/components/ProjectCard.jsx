import React from "react";

const ProjectCard = () => {
  return (
    <div className="group relative w-full max-h-40 h-auto rounded-[20px] bg-[#f5f5f5] p-7 border-2 border-[#c3c6ce] transition-all duration-500 overflow-visible hover:border-black hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)]">
      <div className="h-full flex flex-col gap-2 justify-center text-black">
        <p className="text-2xl font-bold">Whisper</p>
        <p className="text-gray-500">Anonymous thought sharing platform</p>
        <p className="text-gray-500">Tech : React JS, Node JS, Express JS</p>
      </div>

      <button
        className="
          absolute 
          left-1/2 
          bottom-0 
          -translate-x-1/2 
          translate-y-[125%]
          w-[60%] 
          rounded-2xl 
          border-none 
          hover:bg-black 
          bg-gray-900
          text-white 
          text-base 
          py-2 
          px-4 
          opacity-0 
          transition-all 
          duration-300 
          ease-out
          group-hover:translate-y-1/2
          group-hover:opacity-100
        "
      >
        More info
      </button>
    </div>
  );
};

export default ProjectCard;
