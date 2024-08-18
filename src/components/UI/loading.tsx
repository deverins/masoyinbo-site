import Image from 'next/image'
// import Imag from '../../../imgs/logo-devlinks-small.svg'

function Loading() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="animate-pulse">
        <Image
          src=''
          alt="loading"
          width={62}
          height={62}
        />
      </div>
    </div>
  )
}

export default Loading
