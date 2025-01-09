import React from 'react'
import SocialMedia from '../components/SocialMedia';
import Loader from '../components/Loader'
function Profile() {
  return (
    <div className=''>
    <div className='mx-auto lg:px-24 items-center px-6 lg:py-28 py-12 max-w-5xl'>
      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col items-center">
          <img
            src="/profile.jpg"
            alt="profile"
            className="w-32 lg:w-25 rounded-xl"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-2xl lg:text-3xl font-semibold text-center dark:text-gray-200">Rushil Patel</h1>
            <div className="text-gray-400 text-center">
              <p className="text-base">Software Developer Intern</p>
              @<a href='https://www.odoo.com' target='_blank' className="text-base hover:underline">Odoo</a>
            </div>
          </div>
        </div>
        <div className="lg:max-w-3xl lg:m-0 mt-5">
          <div className="lg:text-base text-sm lg:text-justify text-center dark:text-gray-300 space-y-1">
            <div>
              Hey ! I'm a Programmer, thinker and a creator.
            </div>
            <div>
              I build Full Stack Applications, Distributed & Cloud Engineering at scale.
            </div>
            <div>
              I call myself a Photographer too..!
            </div>
            <div>
              See you around!
            </div>
            <div className='lg:block flex justify-center'>
              <SocialMedia />
            </div>
          </div>
        </div>
      </div>
      </div>
      <Loader />
    </div>
  );
}

export default Profile