import React from 'react'

const Footer = () => {
  return (
    <footer className=' w-full flex items-center flex-col justify-center pt-5 items-centers bg-gray-950'>
        <section className=' w-[95%] xl:w-[80%] 2xl:w-2/3  mb-3'>
        <div className=' w-full flex flex-col md:flex-row  justify-between mb-5'>
            <div className=' hidden md:flex items-center'>
                <img src='/logologo.png' className=' w-16 mr-1'/>
                <h1 className=' text-3xl font-bold'>Let's Stream</h1>
            </div>
            <div>
                <h3 className=' font-semibold text-lg sm:text-2xl mb-2'>Socials</h3>
                <p className=' mb-1 font-medium sm:text-base text-sm'>Telegram</p>
                <p className=' font-medium sm:text-base text-sm'>Discord</p>
            </div>
            <div>
                <h3 className=' font-semibold text-lg sm:text-2xl mb-2'>Resource</h3>
                <p className=' font-medium sm:text-base text-sm'>Contact</p>
                <p className=' font-medium sm:text-base text-sm'>Donate</p>
            </div>
            </div>
            <div className=' w-[80%] md:w-[40%]'><p className=' sm:text-base text-sm text-gray-300 font-medium'>This site does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p></div>
        </section>
        <div className=' text-gray-300 w-[95%] xl:w-[80%] 2xl:w-2/3 sm:text-base text-sm  font-medium  flex items-center py-2'><p className=' mr-5'><span>&copy;</span> Copyright</p><p>Created by Mid9it</p></div>
    </footer>
  )
}

export default Footer