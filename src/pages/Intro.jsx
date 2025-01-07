import React from 'react'
import Projects from './Projects';
import SocialMedia from '../components/SocialMedia';

function Intro() {
  return (
    <div className='container mx-auto lg:px-24 px-6 lg:py-12 py-6 max-w-5xl'>
      <div className="flex flex-col lg:flex-row justify-between rounded">
        <div className="flex flex-col items-center space-y-2">
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-32 lg:w-25 rounded-xl"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-bold text-center dark:text-gray-200">Rushil Patel</h1>
            <div className="text-gray-400 text-center">
              <p className="text-base">Software Developer Intern</p>
              <p className="text-base">[Odoo]</p>
            </div>
          </div>
        </div>
        <div className="lg:max-w-3xl lg:m-0 mt-5">
          <div className="lg:text-base text-sm dark:text-gray-300 space-y-1">
            <div>
              I'm a software developer, thinker and a creator.
            </div>
            <div>
              Building Full Stack Applications, Distributed & Machine Learning Systems at scale.
            </div>
            <div>
              See you around!
            </div>
            <div>
              See you around!
            </div>
            <div className='lg:block flex justify-center lg:mt-2' style={{ marginTop: '1rem' }}>
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
      <Projects />
    </div>
  );
}

export default Intro