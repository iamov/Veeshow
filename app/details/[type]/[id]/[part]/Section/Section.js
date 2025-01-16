import React, { useEffect, useState } from 'react'
import Apicore from '@/app/Api/ApiCore'
import List from './List'
import { useRouter } from 'nextjs-toploader/app';


const Section = ({season, id, part,Detail}) => {
      const router = useRouter()
    const api = new Apicore()
    const [list, Setlist] = useState([])

    const GetSeason = async()=>{
        try{
            const response = await api.get(`https://api.themoviedb.org/3/tv/${id}/season/${part}?language=en-US`)
            Setlist(response?.episodes)
        }
        catch(error)
        {
            console.log(error)
        }
    }

    useEffect(()=>{
        GetSeason()
    },[])
  return (
    <div className=' flex justify-center w-full pb-20'>
        <div className=' w-[95%] sm:w-[90%] xl:w-2/3'>
            <div>
                <select className=' cursor-pointer bg-transparent w-[80%] sm:w-80 outline-none font-semibold border-white border-[1px] border-opacity-50 p-4 rounded-md' value={part}   onChange={(e) => {
                    const selectedIndex = e.target.value;
                    router.push(`/details/tv/${id}/${selectedIndex}`);
                        }}>
                    {season.map((e,i)=>{
                        return(<option key={i} className=' cursor-pointer bg-[rgba(0,0,0,1)] hover:bg-slate-600 my-5 flex items-center font-semibold' value={i + 1}>Season {i + 1}</option>)
                    })}
                </select>
            </div>
            <div>
                <List list={list} id={id} Detail={Detail}/>
            </div>
        </div>
    </div>
  )
}

export default Section