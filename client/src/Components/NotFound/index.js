import React from 'react'
import {useNavigate } from 'react-router'

const index = () => {
  const navigate=useNavigate();
  return (
    <div>
      Hello
      {navigate("/Home")}
    </div>
  )
}

export default index

