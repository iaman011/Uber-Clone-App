import React from 'react'
import myimg from '../assets/1659761100uber-logo-png.png'
import myimg2 from '../assets/UberX.webp'
import {Link} from 'react-router-dom'
const Home = () => {
  return (
    <div className='bg-cover bg-center h-screen pt-8 pl-9 flex justify-between flex-col w-full bg-red-400 '
    style={{ backgroundImage: `url(${myimg2})` }}>
        <img className='w-16 ml-8' src={myimg} alt='img not displayed' />
        <div className='bg-white py-5 px-10'>

            <h2 className='text-2xl font-bold'>Get Started with Uber</h2>

            <Link to = '/login' className='flex items-center justify-center w-full bg-black text-white py-3'>Continue</Link>
        </div>
      
    </div>
  )
}

export default Home
