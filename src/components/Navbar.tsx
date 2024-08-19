import Image from 'next/image'
import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className='bg-navyBlue text-white top-0 z-10 p-3'>
        <div className='flex justify-between mx-8'>
          <div className=' logo'>
            <Image
              src=''
              alt="logo"
              width={24}
              height={24}
            />
          </div>
          <div className='flex items-center gap-8'>
            <button className='bg-cream text-black text-base font-bold rounded-lg p-3 hover:bg-saffron'>click to participate</button>
            <option value="default" className="cursor-pointer">En</option>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar