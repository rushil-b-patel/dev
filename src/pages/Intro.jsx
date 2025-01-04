import React from 'react'
import Projects from './Projects';

function Intro() {
  return (
    <div className='container mx-auto px-24 py-10 max-w-7xl'>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col items-center space-y-4">
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-32 lg:w-40 rounded-full"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold font-mono">Rushil Patel</h1>
            <div className="text-gray-500 text-center">
              <p className="text-base">Software Developer Intern</p>
              <p className="text-base">[Odoo]</p>
            </div>
          </div>
        </div>
        <div className="lg:max-w-3xl">
          <p className="font-mono lg:text-base text-sm space-y-4">
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