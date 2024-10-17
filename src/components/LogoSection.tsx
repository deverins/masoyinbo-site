import React from 'react'
import Image from 'next/image'
import speak from '/public/speak.png'
import danger from '/public/danger.png'

const LogoSection = () => {
  return (
    <section
      className="bg-background-light flex items-center xl:mx-20 sm:mx-5 mx-5 rounded-2xl mt-4 justify-center p-4 "
    >
      <div className="flex items-center bg-background-light p-2 rounded-lg shadow-lg space-x-2">
        <div className="">
          <Image
            src={speak}
            alt="speak Icon"
            width={100}
            height={100}
            className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
          />
        </div>
        <div className=''>
          <h1 className="text-2xl lg:text-6xl mt-3 lg:mt-6 md:mt-6  sm:text-3xl md:text-4xl font-bold text-[#D1D2DE] tracking-wide">
            másòyìnbó)))
          </h1>
        </div>

        <div className="">
          <Image
            src={danger}
            alt="danger"
            width={50}
            height={50}
            className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 mt-3 lg:mt-6 md:mt-6 "
          />
        </div>
      </div>
    </section>
  )
}

export default LogoSection