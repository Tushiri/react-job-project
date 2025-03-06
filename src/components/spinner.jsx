import React from 'react'
import { ClipLoader } from 'react-spinners/ClipLoader'

const override = {
    diplay: 'block',
    margin: '100px auto',
}


const spinner = ({loading}) => {
  return (
    <ClipLoader color="#4338ca" size = {150} loading = {loading} cssOverride = {override} />
  )
}

export default spinner
