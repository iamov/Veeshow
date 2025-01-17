"use client"
import React, { useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { FaAngleDown } from "react-icons/fa";
import { useRouter } from 'nextjs-toploader/app';

const Stream = ({ id, type, season, eps }) => {
  const [selectedApi, setSelectedApi] = useState("Club");
  const router = useRouter();

  const StreamApi = [
    {
      Name: "Club",
      scrMovie: `https://moviesapi.club/movie/${id}`,
      scrSeries: `https://moviesapi.club/tv/${id}-${season}-${eps}`,
      id: 1,
    },
    {
      Name: "AutoEmbed",
      scrMovie: `https://player.autoembed.cc/embed/movie/${id}?server=6`,
      scrSeries: `https://player.autoembed.cc/embed/tv/${id}/${season}/${eps}?server=6`,
      id: 2,
    },
    {
      Name: "Embed",
      scrMovie: `https://embed.su/embed/movie/${id}`,
      scrSeries: `https://embed.su/embed/tv/${id}/${season}/${eps}`,
      id: 3,
    },
    {
      Name: "VidScr",
      scrMovie: `https://vidsrc.xyz/embed/movie/${id}`,
      scrSeries: `https://vidsrc.xyz/embed/tv/${id}/${season}-${eps}`,
      id: 4,
    },
    {
      Name: "No Ads Stream",
      scrMovie: `https://play2.123embed.net/movie/${id}`,
      scrSeries: `https://play2.123embed.net/tv/${id}/${season}/${eps}`,
      id: 5 ,
    },
  ];

  // Find the selected API based on `selectedApi`
  const currentApi = StreamApi.find(api => api.Name === selectedApi);
  const iframeSrc = type === "tv" ? currentApi.scrSeries : currentApi.scrMovie;

  return (
    <div className='relative h-[100vh] w-[100vw] flex-col z-50 bg-black flex justify-between items-center'>
      {/* Top Section */}
      <div className='flex justify-between w-[90%] mt-8 items-center'>
        <div
          className='flex items-center cursor-pointer'
          onClick={() => {
            router.push(`/details/${type}/${id}/${season}`);
          }}
        >
          <IoChevronBack className='scale-125 mr-2' />
          <p className='font-semibold'>Return to site</p>
        </div>

        {/* Dropdown Menu */}
        <div className='relative'>
          <div
            className='px-4 py-2 rounded-md bg-blue-900 flex items-center cursor-pointer'
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
            className='absolute right-0 mt-2 w-40 bg-gray-800 text-white rounded-md shadow-lg hidden'
          >
            {StreamApi.map((api) => (
              <div
                key={api.id}
                className='px-4 py-2 hover:bg-gray-600 cursor-pointer'
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

      {/* Iframe Section */}
      <div className='h-[90%] w-[100%]'>
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
