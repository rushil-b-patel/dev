import React from 'react'
import Projects from './Projects';

function Intro() {
  return (
    <div>
      <div className="lg:flex justify-center gap-14 mx-10">
        <div className="flex flex-col items-center space-y-1">
          <img
            src="/profile.jpg"
            alt="profile"
            className="lg:w-40 w-32 rounded-full"
          />
          <h1 className="lg:text-3xl text-xl font-bold font-mono whitespace-nowrap">Rushil Patel</h1>
          <div className="flex flex-col items-center whitespace-nowrap">
            <p className="text-gray-500 text-base">Software Developer Intern</p>
            <p className="text-gray-500 text-base">[Odoo]</p>
          </div>
        </div>
        <div className="max-w-2xl">
          <p className="font-mono lg:text-base text-sm">
            !Hola, I'm Rushil Patel. I'm a software developer intern at Odoo.
            <br />
            <br />
            I am a Computer Science and Engineering student at CHARUSAT
            University[2021-2025]. <br />
            <br />
            I have a strong proficiency in Java, C/C++, JavaScript, HTML, CSS,
            with object-oriented programming concepts(OOPS) and frameworks like
            React JS, Node JS, and Express JS. Additionally, I have hands-on
            experience with tools such as MySQL,Tailwind CSS, MongoDB, Firebase,
            Git and GitHub.
            <br />
            <br />
            See you around!
          </p>
        </div>
      </div>
      <Projects />
    </div>
  );
}

export default Intro