import React, { useState, useEffect } from "react";
import Square from "./Square";

const Board = ({againstHumanPlayer}) => {
  const [arr, setArr] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState("X");
  const [isgameover, setIsgameover] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const winnerCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const computerMove = () => {
    const availableMoves = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === null) {
        availableMoves.push(i);
      }
    }
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    setTimeout(() => {}, 9000);
    return availableMoves[randomIndex];
  };
  const winnerCheck = () => {
    for (let i = 0; i < winnerCombination.length; i++) {
      const [a, b, c] = winnerCombination[i];
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        return arr[a];
      }
    }
    return null;
  };

  const iswinner = winnerCheck();

  useEffect(() => {
    if (iswinner != null) {
      setIsgameover(true);
    } else if (!againstHumanPlayer && isComputerTurn) {
      const newArr = [...arr];
      newArr[computerMove()] = isX;
      setArr(newArr);
      setIsX(isX === "X" ? "O" : "X");
      setIsComputerTurn(false);
    }
  }, [iswinner, arr, isComputerTurn, isX, againstHumanPlayer]);
  const handleClick = (i) => {
    if (arr[i] != null || isgameover) return;
    const newArr = [...arr];
    newArr[i] = isX;
    setArr(newArr);
    setIsComputerTurn(true);
    setIsX(isX === "X" ? "O" : "X");
  };
 
  const restart = () => {
    setIsgameover(false);
    setIsComputerTurn(false);
    setArr(Array(9).fill(null));
  };
  
  return (
    <div>
      <div className="board">
        <div className="board-row">
          <Square handleClick={() => handleClick(0)} value={arr[0]} />
          <Square handleClick={() => handleClick(1)} value={arr[1]} />
          <Square handleClick={() => handleClick(2)} value={arr[2]} />
        </div>
        <div className="board-row">
          <Square handleClick={() => handleClick(3)} value={arr[3]} />
          <Square handleClick={() => handleClick(4)} value={arr[4]} />
          <Square handleClick={() => handleClick(5)} value={arr[5]} />
        </div>
        <div className="board-row">
          <Square handleClick={() => handleClick(6)} value={arr[6]} />
          <Square handleClick={() => handleClick(7)} value={arr[7]} />
          <Square handleClick={() => handleClick(8)} value={arr[8]} />
        </div>
      </div>
      {iswinner && <div> the winner is: {iswinner}</div>}
      <button onClick={restart}>Restart</button>
    </div>
  );
};

export default Board;
