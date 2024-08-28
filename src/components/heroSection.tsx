import React from 'react'
import logo from '/public/logo.png'

const HeroSection = () => {
  return (
    <section 
      className="bg-cover bg-center h-64 mx-10 rounded-xl mt-10" 
      style={{ backgroundImage: `url(${logo.src})` }}
    >
    </section>
  )
}

export default HeroSection






// import Image from 'next/image'
// import React from 'react'

// const HeroSection = () => {
//   return (
//     <>
//     <section className=' relative mb-8 h-[368px]'>
//     {/* <div class="rounded-4 video-embed-object-cover __web-inspector-hide-shortcut__"><iframe src="https://customer-hxx8e4gj6d0mjlsv.cloudflarestream.com/8223612fd764fbabbcff48432bf32cb9/iframe?muted=true&amp;preload=true&amp;loop=true&amp;autoplay=true&amp;poster=https%3A%2F%2Fcustomer-hxx8e4gj6d0mjlsv.cloudflarestream.com%2F8223612fd764fbabbcff48432bf32cb9%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600&amp;controls=false&amp;letterboxColor=transparent" loading="lazy" allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;" allowfullscreen=""></iframe></div> */}

//     </section>
//     </>
//     // <section 
//     //   className="h-screen bg-cover bg-center flex items-center justify-center relative" 
//     //   style={{ backgroundImage: `url('/path-to-your-background-image.jpg')` }} // Replace with your background image path
//     // >
//     //   <div className="flex items-center bg-navyBlue p-4 rounded-lg shadow-lg space-x-2">
//     //     {/* Silhouette Icon */}
//     //     <div className="w-10 h-10">
//     //       <Image
//     //         src="/path-to-silhouette-icon.png" // Replace with the path to your silhouette icon
//     //         alt="Silhouette Icon"
//     //         width={40}
//     //         height={40}
//     //       />
//     //     </div>
//     //     {/* Text */}
//     //     <h1 className="text-4xl font-bold text-white tracking-wide">
//     //       másòyínbọ)))
//     //     </h1>
//     //     {/* Red Circle Icon */}
//     //     <div className="ml-2">
//     //       <Image
//     //         src="/path-to-red-circle-icon.png" // Replace with the path to your red circle icon
//     //         alt="No Icon"
//     //         width={20}
//     //         height={20}
//     //       />
//     //     </div>
//     //   </div>
//     // </section>
//   )
// }

// export default HeroSection
