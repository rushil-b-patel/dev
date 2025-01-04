import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Switch from '../components/Switch';

function Navbar() {

    const location = useLocation();
    let pathname = location.pathname
    const handleClick = () => {
        pathname = location.pathname;
    }

  return (
    <nav className='flex justify-between items-center text-black dark:text-white px-4 py-2 my-5 lg:mx-auto mx-6 max-w-6xl border-[2px] rounded-lg border-black dark:border-white'>
        <div className='flex space-x-2'>
            {localStorage.getItem('theme') === 'light' ? <img src='/window.svg' alt='window' className='w-6' /> : <img src='/window-white.svg' alt='window' className='w-6' />}
            {localStorage.getItem('theme') === 'light' ? <img src='/arrow.svg' alt='arrow' className='w-6' />  : <img src='/arrow-white.svg' alt='window' className='w-6' />}
            
            <Link onClick={handleClick} to='/'><img src='/home.svg' alt='home' className='w-6' /></Link>
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
            <div className='flex items-center'>
                    <Switch />
            </div>
        </div>
    </nav>
  )
}

export default Navbar