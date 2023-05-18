import React from 'react'

const Square = ({value, handleClick, isWinningSquare}) => {
  console.log(isWinningSquare)
  return (
    <div className={`square ${isWinningSquare ? 'winning-square': ''}`} onClick={handleClick}>
      <p className={`${value ? "p-active": '' }`}> {value}</p>
    </div>
  )
}

export default Square