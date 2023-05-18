import React, { useState, useEffect } from "react";
import Square from "./Square";
import PersonIcon from "@mui/icons-material/Person";

const Board = () => {
  const [againstHumanPlayer, setAgainstHumanPlayer] = useState(false);
  const [arr, setArr] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState("X");
  const [isgameover, setIsgameover] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [winningSquares, setWinningSquares] = useState([]);
  const [countwinplayerO, setCountwinplayerO] = useState(0);
  const [countwinplayerX, setCountwinplayerX] = useState(0);
  const [isEasy, setIsEasy] = useState(true)

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

  const checkEmpty = (board) => {
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        return false; // There is an empty cell
      }
    }
    return true; // All cells are filled
  };

  const winnerCheck = (board) => {
    for (let i = 0; i < winnerCombination.length; i++) {
      const [a, b, c] = winnerCombination[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // Return the winning player's symbol
      }
    }

    if (checkEmpty(board)) {
      return "tie"; // It's a tie
    }

    return null; // No winner yet
  };

  const scores = {
    X: -1,
    O: 1,
    tie: 0,
  };

  const minmax = (board, depth, isMaximizing) => {
    let result = winnerCheck(board);
    if (result !== null) {
      return scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board]; // Create a copy of the board array
          newBoard[i] = "O"; // Set the current move as "O"
          let score = minmax(newBoard, depth + 1, false); // Evaluate the score using the copied board
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          const newBoard = [...board]; // Create a copy of the board array
          newBoard[i] = "X"; // Set the current move as "X"
          let score = minmax(newBoard, depth + 1, true); // Evaluate the score using the copied board
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const bestMove = () => {
    let bestScore = -Infinity;
    let bestMoveIndex = null;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === null) {
        const newArr = [...arr]; // Create a copy of the board array
        newArr[i] = "O"; // Set the current move as "O"
        let score = minmax(newArr, 0, false); // Evaluate the score using the copied board
        if (score > bestScore) {
          bestScore = score;
          bestMoveIndex = i;
        }
      }
    }

    return bestMoveIndex;
  };

  const randomMove = ()=>{
    let emptySpot = []
    for(let i = 0; i<arr.length; i++){
      if(arr[i]==null){
         emptySpot.push(i)
      }
    }

    const random = Math.floor(Math.random()*emptySpot.length)
    return emptySpot[random]
  }

  const iswinner = winnerCheck(arr);

  useEffect(() => {
    if (iswinner) {
      iswinner === "O"
        ? setCountwinplayerO(countwinplayerO + 1)
        : setCountwinplayerX(countwinplayerX + 1);
      setWinningSquares(iswinner);
      setIsgameover(true);
    } else if (!againstHumanPlayer && isComputerTurn) {
      console.log("computers turn");
      const newArr = [...arr];
      if(isEasy){
        newArr[randomMove()] = isX
      }else{
        newArr[bestMove()] = isX;

      }
      setArr(newArr);
      setIsX(isX === "X" ? "O" : "X");
      setIsComputerTurn(false);
    }
  }, [arr, isComputerTurn, iswinner]);

  const handleClick = (i) => {
    if (arr[i] !== null || isgameover) return;
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
    setWinningSquares([]);
    setIsX("X");
  };

  const tie = () => {
    if (!iswinner && !arr.includes(null)) return true;
    return false;
  };

  const easyClick = ()=>{
    setIsEasy(true)
    setAgainstHumanPlayer(false)
  }

  const hardClick = ()=>{
    setIsEasy(false)
    setAgainstHumanPlayer(false)
  }
  return (
    <div>
      <div className="board">
        <div className="board-row">
          <Square
            handleClick={() => handleClick(0)}
            value={arr[0]}
            isWinningSquare={winningSquares.includes(0)}
          />
          <Square
            handleClick={() => handleClick(1)}
            value={arr[1]}
            isWinningSquare={winningSquares.includes(1)}
          />
          <Square
            handleClick={() => handleClick(2)}
            value={arr[2]}
            isWinningSquare={winningSquares.includes(2)}
          />
        </div>
        <div className="board-row">
          <Square
            handleClick={() => handleClick(3)}
            value={arr[3]}
            isWinningSquare={winningSquares.includes(3)}
          />
          <Square
            handleClick={() => handleClick(4)}
            value={arr[4]}
            isWinningSquare={winningSquares.includes(4)}
          />
          <Square
            handleClick={() => handleClick(5)}
            value={arr[5]}
            isWinningSquare={winningSquares.includes(5)}
          />
        </div>
        <div className="board-row">
          <Square
            handleClick={() => handleClick(6)}
            value={arr[6]}
            isWinningSquare={winningSquares.includes(6)}
          />
          <Square
            handleClick={() => handleClick(7)}
            value={arr[7]}
            isWinningSquare={winningSquares.includes(7)}
          />
          <Square
            handleClick={() => handleClick(8)}
            value={arr[8]}
            isWinningSquare={winningSquares.includes(8)}
          />
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <p>{`Player O(${countwinplayerO})`}</p>
        <p>{`Player X(${countwinplayerX})`}</p>
        <button onClick={() => setAgainstHumanPlayer(true)}>
          2<PersonIcon />
        </button>
        <div class="dropdown">
          <button class="dropbtn">1 <PersonIcon /></button>
          <div class="dropdown-content">
            <button onClick={easyClick} >Easy</button>
            <button onClick={hardClick}>Hard</button>
          </div>
        </div>
      </div>
      {iswinner && (
        <div>
          <h1>{`${iswinner} is the winner!`}</h1>
          <button onClick={() => restart()}>Restart</button>
        </div>
      )}
      {tie() && (
        <div>
          <h1>It's a tie!</h1>
          <button onClick={() => restart()}>Restart</button>
        </div>
      )}
    </div>
  );
};

export default Board;
