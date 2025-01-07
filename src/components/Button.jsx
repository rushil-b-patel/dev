import React from 'react'

function Button(props) {
  return (
    <button className='border-2 border-black px-2 rounded-md font-mono hover:bg-gray-100 transition'>
        {props.name} button
    </button>
  )
}

export default Button