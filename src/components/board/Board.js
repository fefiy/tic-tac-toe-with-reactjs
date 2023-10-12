import React, { useState, useEffect } from "react";
import Square from "../square/Square";
import PersonIcon from "@mui/icons-material/Person";
import "./board.scss";
import BasicMenu from "../BasicMenu";
// import BasicModal from "../Modal";
import Confetti from "../confetti/Confetti";
import Modal from "../modal/Modal";

const Board = () => {
  const [againstHumanPlayer, setAgainstHumanPlayer] = useState(true);
  const [arr, setArr] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState("X");
  const [isgameover, setIsgameover] = useState(false);
  const [isComputerTurn, setIsComputerTurn] = useState(false);
  const [winningSquares, setWinningSquares] = useState([]);
  const [countwinplayerO, setCountwinplayerO] = useState(0);
  const [countwinplayerX, setCountwinplayerX] = useState(0);
  const [isEasy, setIsEasy] = useState(true);
  const [turns, setTurns] = useState(3);
  const [currentTurns, setCurrentTurns] = useState(1);
  const [finalWinner, setFinalWinner] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const winnerCheckArr = (board) => {
    for (let i = 0; i < winnerCombination.length; i++) {
      const [a, b, c] = winnerCombination[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return [board[a], a, b, c]; // Return the winning player's symbol
      }
    }
    return null; // No winner yet
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

  const randomMove = () => {
    let emptySpot = [];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == null) {
        emptySpot.push(i);
      }
    }

    const random = Math.floor(Math.random() * emptySpot.length);
    return emptySpot[random];
  };

  let iswinner = winnerCheck(arr);
  const winnerSquare = winnerCheckArr(arr);
  useEffect(() => {
    if (iswinner) {
      iswinner === "O"
        ? setCountwinplayerO(countwinplayerO + 1)
        : setCountwinplayerX(countwinplayerX + 1);
      if (winnerSquare) {
        setWinningSquares(winnerSquare);
      }
      if (turns === currentTurns) {
        setIsgameover(true);
        return;
      }
      setCurrentTurns(currentTurns + 1);
      setTimeout(() => {
        restart();
      }, [1000]);
    } else if (!againstHumanPlayer && isComputerTurn) {
      console.log("computers turn");
      const newArr = [...arr];
      if (isEasy) {
        newArr[randomMove()] = isX;
      } else {
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

  const playAgain = () => {
    setIsgameover(false);
    setIsComputerTurn(false);
    setArr(Array(9).fill(null));
    setWinningSquares([]);
    setIsX("X");
    setCurrentTurns(1);
    setCountwinplayerO(0);
    setCountwinplayerX(0);
    setWinningSquares([]);
  };

  const restart = () => {
    setIsgameover(false);
    setIsComputerTurn(false);
    setArr(Array(9).fill(null));
    setWinningSquares([]);
    iswinner = null;
    setIsX("X");
  };

  const easyClick = () => {
    setIsEasy(true);
    setAgainstHumanPlayer(false);
  };

  const hardClick = () => {
    setIsEasy(false);
    setAgainstHumanPlayer(false);
  };
  return (
    <div className="container">
      <div className="turn-noti-cont">
      <h4>select round</h4>
      <div className="turn-selection">
        <div
          className={turns === 1 && "active-turn"}
          onClick={() => setTurns(1)}>
          1
        </div>
        <div
          className={turns === 3 && "active-turn"}
          onClick={() => setTurns(3)}>
          3
        </div>
        <div
          className={turns === 5 && "active-turn"}
          onClick={() => setTurns(5)}>
          5
        </div>
        <div
          className={turns === 7 && "active-turn"}
          onClick={() => setTurns(7)}>
          7
        </div>
      </div>
      </div>
      <div className="board-cont">
        <div className="turn-notification">
          <p>round</p>
          <p className="no">{currentTurns}</p>
        </div>
        <div className="board-total">
          <div className="board">
            <div className="board-row">
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(0)}
                value={arr[0]}
                isWinningSquare={winningSquares.includes(0)}
              />
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(1)}
                value={arr[1]}
                isWinningSquare={winningSquares.includes(1)}
              />
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(2)}
                value={arr[2]}
                isWinningSquare={winningSquares.includes(2)}
              />
            </div>
            <div className="board-row">
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(3)}
                value={arr[3]}
                isWinningSquare={winningSquares.includes(3)}
              />
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(4)}
                value={arr[4]}
                isWinningSquare={winningSquares.includes(4)}
              />
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(5)}
                value={arr[5]}
                isWinningSquare={winningSquares.includes(5)}
              />
            </div>
            <div className="board-row">
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(6)}
                value={arr[6]}
                isWinningSquare={winningSquares.includes(6)}
              />
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(7)}
                value={arr[7]}
                isWinningSquare={winningSquares.includes(7)}
              />
              <Square
                winned={iswinner ? true : false}
                handleClick={() => handleClick(8)}
                value={arr[8]}
                isWinningSquare={winningSquares.includes(8)}
              />
            </div>
          </div>
        </div>
        <div className="winner-declaration">
          X player
          <div>
            <span className={`score x-score ${isX === "O" && "inactive"}`}>
              {countwinplayerX}
            </span>
            <span className={`score o-score ${isX === "X" && "inactive"}`}>
              {countwinplayerO}
            </span>
          </div>
          O player
        </div>
        {isgameover ? (
          countwinplayerO === countwinplayerX ? (
            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div>
                <p>tie</p>
                <button onClick={playAgain}>play agan</button>
              </div>
            </Modal>
          ) : countwinplayerO > countwinplayerX ? (
            <div>
              <Confetti iswinner={isgameover} />
              <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div>
                  <p>O is the winner</p>
                  <button onClick={playAgain}>play again</button>
                </div>
              </Modal>
            </div>
          ) : (
            <div>
              <Confetti iswinner={isgameover} />

              <Modal isOpen={isModalOpen} onClose={closeModal}>
              <div>
                <p> X is the winner</p>
                <button onClick={playAgain}>play agan</button>
              </div>
            </Modal>
            </div>
          )
        ) : null}

        <div className="reset" onClick={playAgain}>
          Reset
        </div>
      </div>
      <div className="player-selection">
        <div
          onClick={() => setAgainstHumanPlayer(true)}
          className={againstHumanPlayer ? "active" : ""}>
          <span>2</span>
          <PersonIcon />
        </div>
        <BasicMenu easyClick={easyClick} hardClick={hardClick}>
          <div className={!againstHumanPlayer ? "active" : ""}>
            <span>1 {isEasy ? "easy" : "hard"}</span>
            <PersonIcon />
          </div>
        </BasicMenu>
      </div>
    </div>
  );
};

export default Board;
