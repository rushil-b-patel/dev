import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Arrow } from "./Assets";
import { Code } from "./Assets";
import CountUp from "./CountUp";

const ProjectCard = (props) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    if (props.progress) {
      const duration = 2500;
      const startTime = performance.now();

      const animate = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const value = Math.floor(progress * props.progress);
        setProgressValue(value);
        if (progress < 1) requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }
  }, [props.progress]);

  return (
    <div className="group relative lg:w-[500px] lg:mx-auto mx-6 max-w-6xl rounded-lg p-6 px-8 border-[1px] dark:border-gray-600 transition-all duration-500 overflow-visible hover:shadow-[0_4px_10px_0_rgba(0,0,0,0.25)] dark:hover:shadow-[0_4px_10px_0_rgba(255,255,255,0.1)] cursor-pointer">
      <div className="grid text-black dark:text-white">
        <div className="flex justify-between items-center">
          <p className="text-2xl font-medium font-mono">{props.title}</p>
          <div className="space-x-5 flex items-center">
            {props.codeLink && (
              <button onClick={() => window.open(props.codeLink)}>
                <Code />
              </button>
            )}
            {props.liveLink && (
              <button onClick={() => window.open(props.liveLink)}>
                <Arrow />
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-600 dark:text-gray-200 my-2 mb-4 text-base text-justify">{props.description}</p>
        <div className="font-mono space-y-3 justify-between items-center lg:text-base text-sm text-gray-800 dark:text-gray-300">
          <p className="flex flex-wrap gap-2">
            {props.techStack?.map((tech, index) => (
              <span key={index} className="border dark:border-gray-600 px-2 py-1 rounded-md bg-gray-[#f3f4f6] dark:bg-[#1a1a1a]">
                {tech}
              </span>)
            )}
          </p>
          <div className="flex justify-between">
            {props.startDate && (
              <div className="flex w-max border dark:border-gray-600 p-1 px-2 rounded-md bg-gray-[#f3f4f6] dark:bg-[#1a1a1a]">
                <p>{props.startDate}</p>
                <span className="mx-2">-</span>
                <p>{props.endDate}</p>
              </div>
            )}
            <div className="flex items-end">
              <CountUp
                from={0}
                to={props.progress}
                separator=","
                direction="up"
                duration={1}
                className="count-up-text"
              />%
            </div>
          </div>
        </div>

        {props.progress && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4 dark:bg-gray-700">
            <div
              className="bg-gray-500 h-2.5 rounded-full transition-all duration-100"
              style={{ width: `${progressValue}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  techStack: PropTypes.arrayOf(PropTypes.string),
  codeLink: PropTypes.string,
  liveLink: PropTypes.string,
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  progress: PropTypes.number,
};

export default ProjectCard;
