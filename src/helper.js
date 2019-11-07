const calculateWinner = squares => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  //Check if there is a winner
  for(let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return ({
        winner: squares[a],
        lineWinner: lines[i],
        isDraw: false,
      });
    }
  }
  //Draw: All squares have been completed and therefore there is no winner
  if(isSquareFull(squares)) {
    return ({
      winner: null,
      lineWinner: null,
      isDraw: true,
    });

  }
  //There is no winner yet... at least one square has not been completed
  return ({
    winner: null,
    lineWinner: null,
    isDraw: false,
  });
};

const isSquareFull = squares => {
  for(let i = 0; i < squares.length; i++) {
    //At least one square is empty
    if(!squares[i])
      return false;
  }
  return true;
};

export default calculateWinner;
