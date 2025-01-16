"use client"
import React from 'react'
import { movieGenre, tvGenre } from '../Genres';
import { useRouter } from 'nextjs-toploader/app';


const InputBox = ({params}) => {
  const router = useRouter()
  const currentYear = new Date().getFullYear();
  const years = []; // Array to hold years
  const type = params.type
  const genre = params.genre
  const date = params.date
  const sort = params.sort
  for (let year = 1940; year <= currentYear; year++) {
    years.push(year);
  }
  return (
    <div className={` flex  items-center ${genre == '16'?' w-full sm:w-[60%] md:w-[40%]':'  w-full sm:w-[80%] md:w-[50%]'} justify-between`}>
      <div >
      <select value={params.date} className=' cursor-pointer outline-none bg-black w-24 sm:w-32 lg:w-52 rounded-lg scrollbar-track-black scrollbar-thin scrollbar-thumb-slate-400 border-white border-[1px] border-opacity-40 px-2 py-2' onChange={(e)=>{
        const selectedIndex = e.target.value;
        router.push(`/${type}/${genre}/${selectedIndex}/${sort}/1`)
      }}>
      <option value=""disabled >Select Year</option>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>
      </div>
      <div>
        <select value={params.sort} className=' cursor-pointer outline-none bg-black w-24 sm:w-32 lg:w-52 rounded-lg scrollbar-track-black scrollbar-thin scrollbar-thumb-slate-400 border-white border-[1px] border-opacity-40 px-2 py-2' onChange={(e)=>{
        const selectedIndex = e.target.value;
        router.push(`/${type}/${genre}/${date}/${selectedIndex}/1`)
        }} >
          <option value="" disabled>Sort by</option>
          <option value={1}>Most popular</option>
          <option value={2}>Most rated</option>
          <option value={3}>Most recent</option>
        </select>
      </div>
      <div>
        {type == "movie"?
        <div>
          <select value={genre} className=' cursor-pointer outline-none bg-black w-20 sm:w-32 lg:w-52 rounded-lg scrollbar-track-black scrollbar-thin scrollbar-thumb-slate-400 border-white border-[1px] border-opacity-40 px-2 py-2' onChange={(e)=>{
        const selectedIndex = e.target.value;
        router.push(`/${type}/${selectedIndex}/${date}/${sort}/1`)
        }} >
          <option value="" disabled>Genre</option>
            {movieGenre.map((e,i)=>{
              return<option key={i} value={e['id']}>{e['name']}</option>
            })}
          </select>
        </div>:
        <div>
            {genre != '16'&&<select value={genre} className=' cursor-pointer outline-none bg-black w-20 sm:w-32 lg:w-52 rounded-lg scrollbar-track-black scrollbar-thin scrollbar-thumb-slate-400 border-white border-[1px] border-opacity-40 px-2 py-2' onChange={(e)=>{
        const selectedIndex = e.target.value;
        router.push(`/${type}/${selectedIndex}/${date}/${sort}/1`)
        }}>
          <option value="" disabled>Genre</option>
            {tvGenre.map((e,i)=>{
              return<option key={i} value={e['id']}>{e['name']}</option>
            })}
          </select>}
        </div>}
      </div>
    </div>
  )
}

export default InputBox