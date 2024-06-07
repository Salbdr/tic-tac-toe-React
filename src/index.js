import React from "react";
import ReactDom from "react-dom";
import "./index.css";

const realDom = document.getElementById("root");

function calculatWinnner(squares) {
  const lines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  
}
return null;
}

const Square = (props) => {
  return(
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  )
}

class Board extends React.Component {
    constructor(props){
        super(props)
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true
        }
    }
    handleClick(i){
       // shallow copy from squares state
        const squaresCopy = this.state.squares.slice();

         // if there is a winner or the square is already filled,
        if (calculatWinnner(squaresCopy) || squaresCopy[i]){
          return;
        }
        squaresCopy[i] = this.state.xIsNext ? "x" : "o"
        this.setState({squares: squaresCopy , xIsNext:!this.state.xIsNext })
    }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() =>{
        this.handleClick(i)
    } 

    } />;
  }

  render() {
    const winner = calculatWinnner(this.state.squares)
    let status;
    if (winner){
      status = "winner " + winner
    } else{
      status = "Next Plaer " + (this.state.xIsNext? "X" : "O")
    }
    return (
      <div>
        <div className="status">{status}</div>
        <div className="border-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="border-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="border-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div>
        <div className="game">
          <Board />
        </div>

        <div className="game-info">
          <div> {/* status */} </div>
          <ol>{/* to do */}</ol>
        </div>
      </div>
    );
  }
  
}

ReactDom.render(<Game />, realDom);
