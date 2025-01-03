import React from 'react'
import { Link } from 'react-router-dom'

const pathname = window.location.pathname;

function Navbar() {
  return (
    <nav className='flex justify-between items-center p-4 mt-5 mx-auto max-w-5xl border-[2px] rounded-lg border-gray-300'>
        <div className='flex space-x-2'>
            <img src='../public/window.svg' alt='window' className='w-6' />
            <img src='../public/arrow.svg' alt='arrow' className='w-6' />
            <img src='../public/home.svg' alt='home' className='w-6' />
            <img src='../public/slash.svg' alt='slash' className='w-6' />
            {
                pathname && (
                    <>
                        {pathname.split('/')}
                    </>
                )
            }
        </div>
        <div className='flex space-x-4 font-medium text-md'>
            <Link to='/about'>About</Link>
            <Link to='/project'>Project</Link>
            <Link to='/contact'>Contact</Link>
        </div>
    </nav>
  )
}

export default Navbar