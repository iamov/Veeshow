import React from 'react'
import MainBody from './MainBody'

const page = async({params}) => {
  const param = await params
  const id = param.id
  return (
    <><MainBody id={id}/></>
  )
}

export default page