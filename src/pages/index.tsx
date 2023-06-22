import { useState } from 'react';
import { Cell } from '../components/Cell';
import styles from './index.module.css';

const Home = () => {
  const [turnColor, setTurnColor] = useState(1);
  const [board, setBoard] = useState([
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 2, 0, 0, 0],
    [0, 0, 0, 2, 1, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ]);
  const directions = [
    [1, -1],
    [-1, -1],
    [-1, 1],
    [1, 1],
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ];

  const onClick = (x: number, y: number) => {
    console.log(x, y);
    const newBoard: number[][] = JSON.parse(JSON.stringify(board));
    for (const direction of directions) {
      let isPassOnAnother = false;
      for (let i = 1; i < 8; i++) {
        if (board[y][x] === 0) {
          if (board[y + i * direction[0]] === undefined) {
            break;
          } else if (
            board[y + i * direction[0]][x + i * direction[1]] === turnColor &&
            isPassOnAnother
          ) {
            for (let s = 0; s <= i; s++) {
              newBoard[y + (i - s) * direction[0]][x + (i - s) * direction[1]] = turnColor;
            }

            setTurnColor(3 - turnColor);
            setBoard(newBoard);
            break;
          } else if (board[y + i * direction[0]][x + i * direction[1]] === 3 - turnColor) {
            isPassOnAnother = true;
            continue;
          } else {
            break;
          }
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        {board.map((row, y) =>
          row.map((color, x) => (
            <Cell key={`${x}-${y}`} color={color} onClick={() => onClick(x, y)} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
