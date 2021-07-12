import { useEffect, useState } from "react";
import { Button, Col, Row, Container } from "react-bootstrap";
import "./index.css";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function calculateWinner(squares) {
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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

const Cell = ({ id, player, callback }) => {
  useEffect(() => {
    console.log(`I, ${id}, am being rendered`);
    console.log(player);
  });
  const disableButton = (callback) => {
    callback(id);
  };

  const createCell = (id, player, callback) => {
    return (
      <Col key={uuid()} className="cell-col-class">
        <Button
          className="cell-button"
          onClick={(e) => disableButton(callback)}
          id={id}
          key={uuid()}
          disabled={player[id] != null}
        >
          {player[id] == null ? "" : player[id]}
        </Button>
      </Col>
    );
  };
  return <>{createCell(id, player, callback)}</>;
};
const Board = () => {
  const [player, setPlayer] = useState(1);
  const [squares, setSquares] = useState(Array(9).fill(null));

  const handleClick = (i) => {
    const new_state = squares.slice();
    new_state[i] = player === 1 ? "X" : "O";
    console.log("new_state: ", new_state);
    setSquares(new_state);
    setPlayer(changePlayer());
  };

  const createRow = (row) => {
    let a = [0, 1, 2];
    return (
      <Row
        className="board-row d-flex align-items-center justify-content-center"
        key={uuid()}
      >
        {a.map((col) => {
          return (
            <Cell
              id={3 * row + col}
              callback={handleClick}
              player={squares}
              key={uuid()}
            />
          );
        })}
      </Row>
    );
  };
  const changePlayer = () => {
    if (player === 1) {
      return 2;
    }
    return 1;
  };
  const renderPlayerInTurn = () => {
    let player_symbol = { 1: "X", 2: "O" };
    return (
      <div
      >
        <h1> It is {player_symbol[player]} turn </h1>
      </div>
    );
  };
  const renderWinner = () => {
    return (
      <div
      >
       <h1> {calculateWinner(squares)} won!!!</h1>
      </div>
    );
  };
  const restartGame = () =>{
    setSquares(Array(9).fill(null))
    setPlayer(1)
  }
  const createBoard = () => {
    let a = [0, 1, 2];
    return (
      <Container className="w-auto"  key={uuid()}>
        {a.map((item) => {
          return createRow(item);
        })}
        <Row className="status-bar" key={uuid()}>
          <Col className="status-message d-flex flex-row align-items-center justify-content-center">
            {calculateWinner(squares) ? renderWinner() : renderPlayerInTurn()}
          </Col>
          <Col className="status-message">
          <Button className="restart-button" onClick={restartGame}> <h1>Restart</h1> </Button>
          </Col>
        </Row>
      </Container>
    );
  };
  return <div className="board d-flex align-items-center justify-content-center">{createBoard()}</div>;
};

export default Board;
