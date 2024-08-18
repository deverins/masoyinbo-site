import React from 'react'

const page = () => {
  return (
    <div>
        <div className="w-48 h-48 bg-gradient-to-r from-skyBlue via-yellow-400 to-orange-400">
          Page
        </div>
        <div className="w-48 h-48 bg-gradient-to-r from-sky-400 via-yellow-400 to-orange-400 relative">
  <div className="absolute top-0 left-0 w-full h-1/2 bg-white/20"></div>
  <div className="absolute bottom-0 right-0 w-full h-1/2 bg-white/20"></div>
  <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-white/20 rotate-45"></div>
  <div className="absolute bottom-1/4 right-1/4 w-1/2 h-1/2 bg-white/20 rotate-45"></div>
</div>
    </div>
  )
}

export default page