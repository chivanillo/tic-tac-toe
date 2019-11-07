import React, {Component} from 'react';
import Square from './Square';

class Board extends Component {
  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      beautifySquare={() => this.props.beautifySquare(i)}
    />;
  }

  render() {
    return (
      <div>
        {Array.from({length: this.props.boardSize}, (item, row) => {
          return (
            <div key={row} className="board-row">
            {Array.from({length: this.props.boardSize}, (item, col) => {
              return this.renderSquare(row*this.props.boardSize + col);
            })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Board;
