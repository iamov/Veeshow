"use client"
import React, { useState, useEffect } from 'react';
import { IoChevronBack } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { useRouter } from 'nextjs-toploader/app';
import Loading from '@/app/Loading';
import Apicore from '@/app/Api/ApiCore';
import { History, saveToRecentlyWatched } from '@/app/history';

const Stream = ({ id, type, season, eps }) => {
  const api = new Apicore()
  const [selectedApi, setSelectedApi] = useState("SERVER 1");
  const [list, Setlist] = useState(0)
  const router = useRouter();
  const [arr,setArry] = useState(1) 
  const [name, setName] = useState()
  
  const [episode, setEpisode] = useState(true)


  const GET = async()=>{
    let Detail
    if(type == 'movie')
      {
        const response = await api.get(`/3/movie/${id}?language=en-US`)
        Detail = response
       
      }
      else{
        const response = await api.get(`/3/tv/${id}?language=en-US`)
        Detail = response
      }

      const historyBody = {
        id:Detail?.id,
        media_type:type,
        poster_path:Detail?.poster_path,
        name:Detail?.name,
        original_name:Detail?.original_name,
        title:Detail?.title,
        vote_average:Detail?.vote_average,
        season:season,
        episode:eps
      }
      History(historyBody)
      saveToRecentlyWatched(historyBody)
  }
  const GetSeason = async()=>{
    setEpisode(true)
    try{
      const currentDate = new Date();
        const response = await api.get(`https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`)
        const listC =response?.episodes
        const result = listC.filter(item => {
          const airDate = item?.air_date ? new Date(item.air_date) : null;
          return airDate && airDate < currentDate;
        });
        Setlist(result.length)
        setName(response.name)
        const arra = Array.from({ length: result?.length }, (_, i) => i + 1)
        setArry(arra)
        setEpisode(false)

    }
    catch(error)
    {
        console.log(error)
    }
}
  
  const StreamApi = [
    {
      Name: "SERVER 1",
      scrMovie: `https://moviesapi.club/movie/${id}`,
      scrSeries: `https://moviesapi.club/tv/${id}-${season}-${eps}`,
      id: 1,
    },
    {
      Name: "SERVER 2",
      scrMovie: `https://embed.rgshows.me/api/2/movie/?id=${id}`,
      scrSeries: `https://embed.rgshows.me/api/2/tv/?id=${id}&s=${season}&e=${eps}`,
      id: 2,
    },
    {
      Name: "SERVER 3",
      scrMovie: `https://embed.su/embed/movie/${id}`,
      scrSeries: `https://embed.su/embed/tv/${id}/${season}/${eps}`,
      id: 3,
    },
    {
      Name: "SERVER 4",
      scrMovie: `https://player.autoembed.cc/embed/movie/${id}?server=6`,
      scrSeries: `https://player.autoembed.cc/embed/tv/${id}/${season}/${eps}?server=6`,
      id: 4,
    },
    {
      Name: "SERVER 5",
      scrMovie: `https://vidsrc.xyz/embed/movie/${id}`,
      scrSeries: `https://vidsrc.xyz/embed/tv/${id}/${season}-${eps}`,
      id: 5,
    },
    {
      Name: "SERVER 6",
      scrMovie: `https://vidsrc.su/embed/movie/${id}`,
      scrSeries: `https://vidsrc.su/embed/tv/${id}/${season}/${eps}`,
      id: 6,
    },
    {
      Name: "SERVER 7",
      scrMovie: `https://111movies.com/movie/${id}`,
      scrSeries: `https://111movies.com/tv/${id}/${season}/${eps}`,
      id: 7,
    },
    {
      Name: "NO ADS",
      scrMovie: `https://play2.123embed.net/movie/${id}`,
      scrSeries: `https://play2.123embed.net/tv/${id}/${season}/${eps}`,
      id: 8,
    },
  ];

  useEffect(() => {
    GET()
    if(type == 'tv')
    {
    GetSeason()
    }
    const savedApi = localStorage.getItem("selectedApi");
    if (savedApi) {
      setSelectedApi(savedApi);
    }
    if(type == 'movie')
    {
      setEpisode(false)
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("selectedApi", selectedApi);
  }, [selectedApi]);

  const currentApi = StreamApi.find(api => api.Name === selectedApi) || StreamApi[0];
  const iframeSrc = type === "tv" ? currentApi?.scrSeries : currentApi?.scrMovie;

  if(episode)
    return <Loading/>

  return (
    <div className='relative h-[100vh] w-[100vw] flex-col z-50 bg-black flex justify-between items-center'>
      {/* Top Section */}
      <div className='flex sm:flex-row flex-col justify-between w-[90%] mt-8 items-center'>
        <div
          className='flex mb-3 items-center cursor-pointer'
          onClick={() => {
            router.push(`/details/${type}/${id}/${season}`);
          }}
        >
          <IoChevronBack className='scale-125 mr-2' />
          <p className='font-bold'>Return to site</p>
        </div>
        <div className=' md:inline hidden'>
          {name&&<p className=' text-xl font-bold'>{name}</p>}
        </div>

        {/* Dropdown Menu */}
        <div className=' flex w-full sm:w-fit justify-end sm:justify-between items-center'>
          {type == 'tv'&&<div className='relative mr-5'>
          <div
            className='px-4 py-2 font-semibold rounded-md bg-blue-900 flex items-center cursor-pointer'
            onClick={(e) => {
              e.stopPropagation(); // Prevent accidental iframe clicks
              const dropdown = document.getElementById("ListDropdown");
              dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            }}
          >
            <div className='mr-6 flex items-center '><span className=' mr-2'>Episode</span><span>{eps}</span></div>
            <FaAngleDown />
          </div>
          <div
            id="ListDropdown"
            className='absolute max-h-60 overflow-y-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-slate-400 right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg hidden'
          >
            {arr.map((ep) => (
              <div
                key={ep}
                className={`px-4 flex item py-2 ${ep == eps && 'bg-gray-600'} hover:bg-gray-600 cursor-pointer`}
                onClick={() => {
                 router.push(`/stream/tv/${id}/${season}/${ep}`)
                  document.getElementById("ListDropdown").style.display = "none"; // Close dropdown
                }}
              >
              <span className=' mr-3'>Episode</span> <span>{ep}</span> 
              </div>
            ))}
          </div>
          </div>}


        <div className='relative'>
          <div
            className={`px-4 py-2 font-semibold rounded-md bg-blue-900 flex items-center cursor-pointer`}
            onClick={(e) => {
              e.stopPropagation(); // Prevent accidental iframe clicks
              const dropdown = document.getElementById("apiDropdown");
              dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";
            }}
          >
            <div className='mr-4'>{selectedApi}</div>
            <FaAngleDown />
          </div>
          <div
            id="apiDropdown"
            className='absolute max-h-60 overflow-y-scroll scrollbar-thin scrollbar-track-black scrollbar-thumb-slate-400  right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg hidden'
          >
            {StreamApi.map((api) => (
              <div
                key={api.id}
                className={`px-4 ${api.Name == selectedApi && 'bg-gray-600'} py-2 hover:bg-gray-600 cursor-pointer`}
                onClick={() => {
                  setSelectedApi(api.Name);
                  document.getElementById("apiDropdown").style.display = "none"; // Close dropdown
                }}
              >
                {api.Name}
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Iframe Section */}
      <div className=' h-[95%] sm:h-[90%] w-[100%]'>
        <section className='w-full h-full'>
          <iframe
            referrerPolicy="origin"
            className='w-full h-full select-none outline-none'
            src={iframeSrc}
            title="video player"
            allowFullScreen
          ></iframe>
        </section>
      </div>
    </div>
  );
};

export default Stream;
