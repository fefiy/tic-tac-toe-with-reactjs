import React, { useEffect, useState } from 'react'
import ReactConfetti from 'react-confetti'


const Confetti = ({iswinner}) => {
    const [dimention, setDimention] = useState({width:window.innerWidth, height:window.innerHeight})

    const detectSize = ()=>{
        setDimention({width:window.innerWidth, height:window.innerHeight})
    }
    useEffect(()=>{
        window.addEventListener('resize', detectSize)
  return ()=>{
    window.removeEventListener('resize', detectSize)
  }
    })
  return (

    <div>
       {iswinner && <ReactConfetti
       width={dimention.width} 
       height={dimention.height}
       tweenDuration={1000}/>}
    </div>
  )
}

export default Confetti