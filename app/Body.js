"use client"
import React from 'react'
import {  Dosis} from "next/font/google";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader';
import Container from './Register/Container';
import { useSnapshot } from 'valtio';
import { state } from './store';
import NavMenu from './NavMenu';
import Menu from './Menu';


const dosis = Dosis({ subsets: ['latin'] })





const Body = ({children}) => {
  const sign = useSnapshot(state).signUp
  return (
    <body
    className={`   ${dosis.className} antialiased`}
    suppressHydrationWarning
  >
        <NextTopLoader 
       color="#fffd00"
       initialPosition={0.08}
       crawlSpeed={200}
       height={3}
       crawl={true}
       showSpinner={false}
       easing="ease"
       speed={200}
       shadow="0 0 10px #fffd00,0 0 5px #fffd00"
       className=" z-50"
      />
    <div className=' select-none overflow-x-hidden    relative scrollbar-track-black scrollbar-thin'>
      <NavMenu/>
      <Menu/>
    {sign&&<Container/>}
    {children}
    </div>
  </body>
  )
}

export default Body