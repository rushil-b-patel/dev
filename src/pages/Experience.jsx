import React from "react";

const Experience = () => {
  const experiences = [
    {
      title: "Frontend Developer Intern",
      comapny: "Codentic Software",
      startDate: "May 2023",
      endDate: "Jun 2023",
      techStack: ["Next JS", "React JS", "Tailwind", "Bootstrap", "git", "Github"],
      description:
        "Collaborated with the development team to create dynamic and responsive user interfaces using React JS. Identified and resolved front-end bugs, ensuring a smooth and error-free user experience. Utilized Git for version control, participating in team code reviews and collaborating with fellow developers.",
    },
  ];

  return (
    <div className="flex justify-center max-w-3xl lg:mx-auto m-10">
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {experiences.map((exp, index) => (
          <li key={index} className="mb-10 ms-6 p-4 rounded transition duration-300 hover:shadow-[0_4px_10px_0_rgba(0,0,0,0.10)] dark:hover:shadow-[0_4px_10px_0_rgba(255,255,255,0.10)]">
            <span className="absolute flex items-center justify-center w-6 h-6 bg-gray-100 rounded-full -start-3 dark:bg-gray-800">
              <svg
                className="w-2.5 h-2.5 text-black dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </span>

            <h3 className="flex items-center mb-1 text-sm text-gray-400 dark:text-gray-500">
              {exp.startDate} - {exp.endDate? exp.endDate : "Present"}
            </h3>

            <h1 className="block lg:text-2xl text-md font-mono text-xl dark:text-white">
              {exp.title}
            </h1>
            <h3 className="block mb-2 italic text-lg text-gray-500 dark:text-gray-400">
              {exp.comapny}
            </h3>

            <p className="text-base text-gray-500 text-justify dark:text-gray-400 mb-4">
                <ul className="list-disc list-inside">
                {exp.description.split(". ").map((desc, index) => (
                    <li key={index}>
                    {desc.trim()}
                    {index < exp.description.split(". ").length - 1 && "."}
                  </li>
                ))}
                </ul>
            </p>
            <div className="font-mono space-y-3 justify-between items-center lg:text-base text-sm text-gray-800 dark:text-gray-300">
            <p className="flex flex-wrap gap-2">
            {exp.techStack?.map((tech, index) => (
              <span key={index} className="border dark:border-gray-600 px-2 py-1 rounded-md bg-gray-[#f3f4f6] dark:bg-[#1a1a1a]">
                {tech}
              </span>)
            )}
          </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Experience;
