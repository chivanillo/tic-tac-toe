import React, {Component} from 'react';
import Board from './Board';
import calculateWinner from './helper';

const BOARD_SIZE = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        rowClickedSquare: -1,
        colClickedSquare: -1,
      }],
      stepNumber: 0,
      xIsNext: true,
      isReversed: false,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = this.state.isReversed
      ? history[this.state.stepNumber > 0 ? 1 : 0]
      : history[history.length - 1]
    const squares = current.squares.slice();
    const winnerData = calculateWinner(current.squares);

    if(winnerData.winner || squares[i]) {
      return;
    }

    squares[i] = this.state.stepNumber % 2 === 0 ? 'X' : 'O';
    const newHistory = this.state.isReversed
      ? [{
        squares: Array(9).fill(null),
        rowClickedSquare: -1,
        colClickedSquare: -1,
        }].concat([{
          squares: squares,
          rowClickedSquare: (Math.floor(i/3) + 1),
          colClickedSquare: (i%3 + 1)
        }]).concat(history.slice(1, history.length))
      : history.concat([{
          squares: squares,
          rowClickedSquare: (Math.floor(i/3) + 1),
          colClickedSquare: (i%3 + 1)
        }])

    this.setState({
      history: newHistory,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext && !(this.state.stepNumber % 2 === 0),
      isReversed: this.state.isReversed
    });
  }

  jumpTo(step) {
    const history = this.state.isReversed && step !== 0
      ? [{
          squares: Array(9).fill(null),
          rowClickedSquare: -1,
          colClickedSquare: -1,
        }].concat(this.state.history.slice(step, this.state.stepNumber+1))
      : this.state.history.slice(0, step+1)

    const stepNumber = this.state.isReversed
      ? history.length-1
      : step

    const xIsNext = this.state.isReversed
      ? (step % 2) !== 0
      : (step % 2) === 0

    this.setState({
      history: history,
      stepNumber: stepNumber,
      xIsNext: xIsNext,
      isReversed: this.state.isReversed
    });
  }

  beautifySquare(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = this.state.isReversed
      ? history[this.state.stepNumber > 0 ? 1 : 0]
      : history[history.length - 1]
    const winnerData = calculateWinner(current.squares);

    const defaultSquareColor = {backgroundColor:'white'};
    const winnerSquareColor = {backgroundColor:'green'};

    if(winnerData.winner) {
      const [a,b,c] = winnerData.lineWinner;
      if(a === i || b === i || c === i) {
        return winnerSquareColor;
      }
      return defaultSquareColor;
    }

    return defaultSquareColor;
  }

  handleSort() {
    //Amend null row at the beginning when changing to reverse order
    const newHistory = [{
        squares: Array(9).fill(null),
        rowClickedSquare: -1,
        colClickedSquare: -1,
      }].concat(this.state.history.slice(1, this.state.stepNumber+1).reverse())

    this.setState({
      history: newHistory,
      stepNumber: this.state.stepNumber,
      xIsNext: this.state.xIsNext,
      isReversed: !this.state.isReversed
    });
  }

  render() {
    const history = this.state.history;
    const current = this.state.isReversed
      ? history[this.state.stepNumber > 0 ? 1 : 0]
      : history[this.state.stepNumber]

    const winnerData = calculateWinner(current.squares);

    const status = winnerData.winner
      ? 'Winner: ' + winnerData.winner
      : winnerData.isDraw
        ? 'Draw!'
        : 'Next player: ' + (this.state.stepNumber % 2 === 0 ? 'X' : 'O');

    const moves = history.map((step, move) => {
      const realMove = this.state.isReversed
        ? this.state.stepNumber - move + 1
        : move
      const desc = move
        ? 'Go to move #' + realMove + ' (' + step.rowClickedSquare + ',' + step.colClickedSquare + ')'
        : 'Go to game start';

      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    return(
      <div>
        <p>Welcome to the Tic-Tac-Toe Game!</p>
        <div className="game">
          <div className="game-board">
            <Board
              boardSize={BOARD_SIZE}
              squares={current.squares}
              onClick={(i) => this.handleClick(i)}
              beautifySquare={(i) => this.beautifySquare(i)}
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            <div>
              <button onClick={() => this.handleSort()}>Sort Moves!</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
