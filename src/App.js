import './App.css';
import Board from './Board';
import { useState } from 'react';


function App() {
  const [againstHumanPlayer, setAgainstHumanPlayer] = useState(false)
  const [showBoard, setShowBoard] = useState(false)

  return (
    <div className="App">
      {!showBoard ? (
        <div>
          <button onClick={()=> {setAgainstHumanPlayer(true); setShowBoard(true);}}>two player</button>
          <button onClick={()=> {setAgainstHumanPlayer(false); setShowBoard(true);}}>against computer</button>
        </div>

      ):(
        <Board  againstHumanPlayer= {againstHumanPlayer} />
      )}
    </div>
  );
}

export default App;
