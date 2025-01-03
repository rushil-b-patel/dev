import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
    const location = useLocation();
    let pathname = location.pathname
    const handleClick = () => {
        pathname = location.pathname;
    }

  return (
    <nav className='flex justify-between items-center px-4 py-2 my-5 lg:mx-auto mx-6 max-w-5xl border-[2px] rounded-lg border-black'>
        <div className='flex space-x-2'>
            <img src='/window.svg' alt='window' className='w-6' />
            <img src='/arrow.svg' alt='arrow' className='w-6' />
            <Link onClick={handleClick} to='/'><img src='../public/home.svg' alt='home' className='w-6' /></Link>
            <img src='/slash.svg' alt='slash' className='w-6' />
            {
                pathname && (
                    <span className='font-medium font-mono' style={{margin:0}}>
                        {pathname.split('/')}
                    </span>
                )
            }
        </div>
        <div className='flex space-x-4 font-medium lg:text-lg'>
            <Link className='hover:bg-slate-200 rounded p-1 lg:p-2 transition' onClick={handleClick} to='/about'>About</Link>
            <Link className='hover:bg-slate-200 rounded p-1 lg:p-2 transition' onClick={handleClick} to='/project'>Project</Link>
        </div>
    </nav>
  )
}

export default Navbar