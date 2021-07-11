import { useEffect, useState } from "react";
import { Button, Col, Row, Container} from "react-bootstrap";

function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const Cell = ({row, col, started, callback}) => {
  const [enabled, setEnabled] = useState(true)
  const [player, setPlayer] = useState(null)
  useEffect(()=>{
    console.log(`I, ${3 * row + col}, am being rendered`)
  })
  const disableButton = (callback) => {
    // this changes the player but the button cannot be disabled
    // changing the parent state causes rerender of everything.
    console.log(callback())
    setPlayer(callback())
    // console.log("Disable the button")
    // console.log(typeof(enabled))
    // console.log(enabled)
    console.log(player)
    setEnabled(false)
  }

  const createCell = (row, col, player, started, callback) => {
    return (
      <Col
        key={uuid()}
        style={{
          margin: "px",
          padding: "5px",
          width: "200px",
          height: "200px",
        }}
        className="bg-secondary"
      >
        <Button
          style={{ width: "200px", height: "200px" }}
          className="bg-primary"
          onClick={(e)=>disableButton(callback)}
          id={3 * row + col}
          key={uuid()}
          disabled={!enabled}
        >{!enabled ? player: ""}
        </Button>
      </Col>
    );
  };
  return <>{createCell(row, col, player, started, callback)}</>;
};
const Board = () => {
  const [player, setPlayer] = useState(1);
  const [started, setStarted] = useState(false);
  const handleClick = (e) => {
    console.log("Handling the click");
    return changePlayer();
  };
  const createRow = (row, callback) => {
    let a = [0, 1, 2];
    return (
      <Row
        style={{ width: "615px", height: "215px" }}
        className="bg-secondary"
        key={uuid()}
      >
        {a.map((item) => {
          return (
            <Cell
              row={row}
              col={item}
              callback={callback}
              player={player}
              started={started}
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
        style={{ margin: "5", padding: "5", width: "200px", height: "150px" }}
        className="bg-ligth"
      >
        It is {player_symbol[player]} turn
      </div>
    );
  };
  const createBoard = (callback) => {
    let a = [0, 1, 2];
    return (
      <Container
        key={uuid()}
        style={{ margin: "5", paddind: "5", width: "615px", height: "215px" }}
      >
        {a.map((item) => {
          return createRow(item, callback);
        })}
        <Row style={{ width: "615px", height: "215px" }} key={uuid()}>
          <Col>{renderPlayerInTurn()}</Col>
        </Row>
      </Container>
    );
  };
  return <>{createBoard(handleClick)}</>;
};

export default Board;
