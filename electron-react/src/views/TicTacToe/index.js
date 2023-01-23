import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Modal,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const myStyles = makeStyles(() => ({
  boxBody: {
    display: "flex",
    flexWrap: "wrap",
    background: "black",
    minHeight: "100vh",
    minWidth: "100vw",
    flexDirection: "column",
    alignContent: "center",
    color: "white",
    // justifyContent: "flex-start",
  },
  boxTicTac: {
    // background: "green",
    border: "2px solid white",
    boxShadow: " inset 0 0 20px white",
    height: 400,
    width: 400,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  squareO: {
    height: 100,
    width: 100,
    fontSize: 40,
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow:
      "0 0 20px white, 0 0 40px white, 0 0 40px white,  0 0 40px white",
    border: "2px solid white",
    boxShadow: " inset 0 0 10px blue, 0 0 30px blue ",
  },
  squareX: {
    height: 100,
    width: 100,
    fontSize: 40,
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "0 0 20px red, 0 0 40px red, 0 0 40px red,  0 0 40px red",
    border: "2px solid white",
    boxShadow: " inset 0 0 10px blue, 0 0 30px blue ",
  },
  squareSelected: {
    height: 100,
    width: 100,
    background: "white",
    border: "2px solid white",
    boxShadow: " inset 0 0 10px blue, 0 0 30px blue ",
    fontSize: 40,
    fontWeight: 600,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    textShadow: "0 0 20px blue, 0 0 40px blue, 0 0 40px blue,  0 0 40px blue",
  },
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 400,
  height: 400,
  width: "60%",
  bgcolor: "black",
  color: "white",
  border: "2px solid #000",
  boxShadow: " inset 0 0 10px white, 0 0 30px white ",
  p: 4,
};

const TicTacToe = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [mainTable, setMainTable] = useState([]);
  const [selectedCells, setSelectedCells] = useState([]);
  const [numberForStripe, setNumberForStripe] = useState(3);
  const [num, setNum] = useState(1);
  const [win, setWin] = useState(false);
  const [textWin, setTextWin] = useState("DIVIERTE");
  const [count, setCount] = useState(0);
  const [playerO, setPlayerO] = useState(0);
  const [playerX, setPlayerX] = useState(0);
  const [turn, setTurn] = useState(0);
  const styles = myStyles();
  const columns = 3;
  const rows = 3;
  const table = [];

  const checkTable = (simbol) => {
    let arrayOfCells = [];
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < columns; j += 1) {
        let count = 0;
        arrayOfCells = [];
        // To right
        for (let k = j; k < j + numberForStripe; k += 1) {
          if (k >= columns) {
            break;
          }
          if (mainTable[i][k] === simbol) {
            count += 1;
            arrayOfCells.push(`${i},${k}`);
            if (count === numberForStripe) {
              //   console.log("Heechoo");
              setSelectedCells(arrayOfCells);
              return true;
            }
          } else {
            break;
          }
        }
        count = 0;
        arrayOfCells = [];
        // To bottom
        for (let k = i; k < i + numberForStripe; k += 1) {
          if (k >= rows) {
            break;
          }
          if (mainTable[k][j] === simbol) {
            count += 1;
            arrayOfCells.push(`${k},${j}`);
            if (count === numberForStripe) {
              //   console.log("Heechoo");
              setSelectedCells(arrayOfCells);
              return true;
            }
          } else {
            break;
          }
        }
        count = 0;
        arrayOfCells = [];
        // To Botton Rigth
        for (let k = 0; k < numberForStripe; k += 1) {
          if (k + i >= rows || k + j >= columns) {
            break;
          }
          if (mainTable[k + i][k + j] === simbol) {
            count += 1;
            arrayOfCells.push(`${k + i},${k + j}`);
            if (count === numberForStripe) {
              //   console.log("Heechoo");
              setSelectedCells(arrayOfCells);
              return true;
            }
          } else {
            break;
          }
        }
        count = 0;
        arrayOfCells = [];
        // To Top Rigth
        for (let k = 0; k < numberForStripe; k += 1) {
          if (i - k < 0 || k + j >= columns) {
            break;
          }
          if (mainTable[i - k][k + j] === simbol) {
            count += 1;
            arrayOfCells.push(`${i - k},${k + j}`);
            if (count === numberForStripe) {
              //   console.log("Heechoo");
              setSelectedCells(arrayOfCells);
              return true;
            }
          } else {
            break;
          }
        }
      }
    }
    return false;
  };

  const handdleIcon = (One, Two) => {
    if (mainTable[One][Two] !== "") {
      return;
    }
    const tableNow = mainTable;
    if (num % 2 === 0) {
      tableNow[One][Two] = "O";
      const resul = checkTable("O");
      if (resul) {
        setWin(true);
        handleOpen();
        setTextWin("GANA JUGADOR\n-----\nO\n-----");
        setPlayerO(playerO + 1);
      }
    } else {
      tableNow[One][Two] = "X";
      const resul = checkTable("X");
      if (resul) {
        setWin(true);
        handleOpen();
        setTextWin("GANA JUGADOR\n-----\nX\n-----");
        setPlayerX(playerX + 1);
      }
    }
    setMainTable(tableNow);
    setCount(count + 1);
    setNum(num + 1);
  };

  const selectStyles = (cell, simbol) => {
    for (let i = 0; i < selectedCells.length; i += 1) {
      if (cell === selectedCells[i]) {
        return styles.squareSelected;
      }
    }
    if (simbol === "X") {
      return styles.squareX;
    }
    return styles.squareO;
  };

  const createTable = () => {
    for (let i = 0; i < rows; i += 1) {
      table.push([]);
      for (let j = 0; j < columns; j += 1) {
        table[i].push(``);
      }
    }
    // console.log(table);
    setSelectedCells([]);
    setMainTable(table);
    setTurn(turn + 1);
    setCount(0);
    setWin(false);
    handleClose();
  };

  useEffect(() => {
    if (count === 9 && !win) {
      setTextWin("EMPATE");
      handleOpen();
    }
  }, [count]);

  useEffect(() => {
    handleOpen();
  }, []);
  return (
    <Box className={styles.boxBody}>
      {/* Title */}
      <Box
        style={{
          marginTop: 20,
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <Typography
          style={{
            color: "white",
            marginBottom: 50,
            textShadow:
              "0 0 20px blue, 0 0 30px blue, 0 0 30px blue,  0 0 30px blue",
          }}
          fontFamily="monospace"
          variant="h2"
          align="center"
        >
          TIC TAC TOE
        </Typography>
      </Box>
      {/* Game Area */}
      <Box style={{ width: "100%" }}>
        <Grid container spacing={2}>
          {/* Play To Game */}
          <Grid item xs={12} md={6} lg={4}>
            <Box
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Title */}
              <Typography variant="h4" align="center" mb={3}>
                Presione Para Reiniciar Partida
              </Typography>
              {/* Button To Play */}
              <Button
                variant="contained"
                style={{
                  height: 50,
                  marginBottom: 30,
                  background: "black",
                  border: "2px solid white",
                  boxShadow: " inset 0 0 10px blue, 0 0 30px blue ",
                }}
                onClick={createTable}
              >
                Reiniciar
              </Button>
              {/* Player Tuner Title */}
              <Typography variant="h5" mb={3}>
                Turno Del Jugador
              </Typography>
              {/* Player */}
              {num % 2 === 0 ? (
                <Typography
                  style={{
                    fontSize: 80,
                    fontWeight: 600,
                    textShadow:
                      "0 0 20px white, 0 0 30px white,  0 0 30px white",
                  }}
                >
                  O
                </Typography>
              ) : (
                <Typography
                  style={{
                    fontSize: 80,
                    fontWeight: 600,
                    textShadow:
                      "0 0 20px red, 0 0 30px red, 0 0 30px red,  0 0 30px red",
                  }}
                >
                  X
                </Typography>
              )}
            </Box>
          </Grid>
          {/* Game Table */}
          <Grid item xs={12} md={6} lg={4}>
            <Box
              style={{
                pointerEvents: win === true ? "none" : "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              {/* Maping Game Table */}
              <Box className={styles.boxTicTac}>
                {mainTable.map((e, i) =>
                  e.map((o, j) => (
                    <Box
                      key={`${i}, ${j}`}
                      className={selectStyles(`${i},${j}`, mainTable[i][j])}
                      onClick={() => handdleIcon(i, j)}
                    >
                      {o}
                    </Box>
                  ))
                )}
              </Box>
            </Box>
          </Grid>
          {/* Points */}
          <Grid item xs={12} lg={4}>
            <Box
              style={{
                // background: "green",
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              {/* Title */}
              <Typography
                style={{ width: "100%", marginBottom: 30 }}
                align="center"
                variant="h4"
              >
                {`Número De Partida => ${turn}`}
              </Typography>
              {/* X Points */}
              <Box>
                <Typography variant="h5">Puntos De X</Typography>
                <Typography
                  align="center"
                  style={{
                    fontSize: 80,
                    fontWeight: 600,
                    textShadow:
                      "0 0 20px red, 0 0 40px red, 0 0 40px red,  0 0 40px red",
                  }}
                >
                  {playerX}
                </Typography>
              </Box>
              {/* O Points */}
              <Box>
                <Typography variant="h5">Puntos De O</Typography>
                <Typography
                  align="center"
                  style={{
                    fontSize: 80,
                    fontWeight: 600,
                    textShadow:
                      "0 0 20px white, 0 0 40px white,  0 0 40px white",
                  }}
                >
                  {playerO}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {/* Modal */}
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            {/* Title */}
            <Typography
              textAlign="center"
              variant="h3"
              style={{
                marginTop: 50,
                color: "white",
                textShadow:
                  "0 0 20px blue, 0 0 30px blue, 0 0 30px blue,  0 0 30px blue",
              }}
            >
              {textWin}
            </Typography>
            {/* Button Reset */}
            <Button
              style={{
                height: 50,
                marginLeft: "auto",
                marginRight: "auto",
                display: "block",
                marginBottom: 30,
                marginTop: 100,
                color: "white",
                background: "black",
                border: "2px solid white",
                boxShadow: " inset 0 0 10px blue, 0 0 30px blue ",
              }}
              onClick={createTable}
            >
              INICIAR
            </Button>
          </Box>
        </Modal>
      </div>
    </Box>
  );
};

export default TicTacToe;
