import React from 'react'

const NetworkError = ({message}) => {
  return (
    <div>{message||"NetworkError..."}</div>
  )
}

export default NetworkError