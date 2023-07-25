import { useState } from 'react';
import './App.css';

function Square({value,onSquareClick}) {
  return (
  <button className='square' onClick={onSquareClick}>
    {value}
  </button>
  );
}

export default function Board(){
  
  const [status,setStatus] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const winner = CaculateWiner(squares);
  let para;
  if (winner){
    para = "Winner is: " + winner;
  }else{
    para = "Next player is: " + (status? "X" : "O");
  }

  function HandClick(i){
    if(squares[i] || CaculateWiner(squares)){
      return;
    }
    const nextSquare = squares.slice();
    if(status){
      nextSquare[i] = "X";
    }else{
      nextSquare[i] = "O"
    }
    setSquares(nextSquare);
    setStatus(!status);
  }
  return (
  <>
  <div className='announcement'>
    {para}
  </div>
  <div className='center'>
    <div>
      <Square value={squares[0]} onSquareClick={()=>HandClick(0)}/>
      <Square value={squares[1]} onSquareClick={()=>HandClick(1)}/>
      <Square value={squares[2]} onSquareClick={()=>HandClick(2)}/>
    </div>
    
    <div>
      <Square value={squares[3]} onSquareClick={()=>HandClick(3)}/>
      <Square value={squares[4]} onSquareClick={()=>HandClick(4)}/>
      <Square value={squares[5]} onSquareClick={()=>HandClick(5)}/>
    </div>

    <div>
      <Square value={squares[6]} onSquareClick={()=>HandClick(6)}/>
      <Square value={squares[7]} onSquareClick={()=>HandClick(7)}/>
      <Square value={squares[8]} onSquareClick={()=>HandClick(8)}/>
    </div>
  </div>
  </>
  );
}


function CaculateWiner(squares){
  let line = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
  ]
  for (let i=0;i<line.length;i++){
    const [a,b,c] = line[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
      return squares[a];
    }
  }
  return null;
}