import React from 'react'
import Bodyjs from './Bodyjs'

const page = async ({params}) => {
  const detail = await params
  return (
    <><Bodyjs params={detail}/></>
  )
}

export default page