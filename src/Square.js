import React from 'react'

const Square = ({value, handleClick}) => {
  return (
    <div className='sqare' onClick={handleClick}>{value}</div>
  )
}

export default Square