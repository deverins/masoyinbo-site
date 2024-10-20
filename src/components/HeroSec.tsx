import React from 'react'

const HeroSection = () => {
  return (
    <>
      <div
        className="relative w-full aspect-[3/2] bit:aspect-[2/1] lg:aspect-[5/2] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/masoyinbo-bg.png")' }}
      >
        <div className="dark:absolute dark:inset-0 dark:bg-black dark:opacity-40"></div>
      </div>
    </>
  )
}

export default HeroSection
