"use client"
import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { useRouter } from 'nextjs-toploader/app';

const Stream = ({id, type, season, eps}) => {
  const [title, setTitle] = useState('Embed')
  const router = useRouter();
  
  const Button = [{
    Name : "Embed",
    id : 1
  },
  {
    Name : "VidScr",
    id : 2
  },
  {
    Name : "Binge",
    id : 3
  },
  {
    Name : "AutoEmbed",
    id : 4
  }]
  return (
    <div className=' relative h-[100vh] w-[100vw] flex-col z-50 bg-black flex justify-between items-center'>
      <div className=' flex justify-between w-[90%] mt-8 items-center'>
        <div className=' flex items-center cursor-pointer ' onClick={()=>{
          router.push(`/details/${type}/${id}/${season}`)
        }}><IoChevronBack className=' scale-125 mr-2'/> <p className=' font-semibold'>Return to site</p></div>
        <div className=' px-4 py-2 rounded-md bg-blue-900 flex items-center '><div className=' mr-2'>{title}</div><div className=''><FaAngleDown/></div></div>
      </div>
    <div className='   h-[90%] w-[100%]'>
        <section className=' w-full h-full'>
        <iframe 
        referrerPolicy="origin"
        className=' w-full h-full select-none outline-none'
        src={type == "tv"?`https://embed.su/embed/tv/${id}/${season}/${eps}`:`https://embed.su/embed/movie/${id}`} 
        title="video player" 
        allowFullScreen></iframe>
        </section>
    </div></div>
  )
}

export default Stream