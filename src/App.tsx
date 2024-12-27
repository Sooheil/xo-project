import './App.css';
import { Box } from '@mui/material';
import useBrain from './hooks/userBrain';
import { xoActionType } from './types/xoAxionType';
import { useRef, useState } from 'react';

function App() {
  const { check } = useBrain();
  const [isFirstPlayer, setIsFirstPlayer] = useState<boolean>(true);
  const [xoMatrix, setXOMatrix] = useState<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  const [isWon, setIsWon] = useState<boolean>(false);
  const titleH1 = useRef<HTMLHeadingElement>(null);
  const resetGame = () => {
    window.location.href = '/';
  };
  const handleBoxSelect = (
    e: Element,
    rowNumber: number,
    columnNumber: number
  ) => {
    if (isWon) return;
    if (e.classList.contains('o') || e.classList.contains('x')) return;
    let result: number[][] | null = [];
    const newMatrix = xoMatrix;
    newMatrix[rowNumber][columnNumber] = isFirstPlayer ? 'o' : 'x';
    setXOMatrix(newMatrix);
    if (isFirstPlayer) e.classList.add('o');
    else e.classList.add('x');
    if (xoMatrix.flat().some((f) => f == '')) {
      result = check(
        rowNumber,
        columnNumber,
        isFirstPlayer ? xoActionType.o : xoActionType.x,
        xoMatrix
      );
      setIsFirstPlayer((prev) => !prev);
      if (result?.length === 3) {
        setIsWon(true);
        document.getElementById(`[${result[0]}]`)?.classList.add('wonCell');
        document.getElementById(`[${result[1]}]`)?.classList.add('wonCell');
        document.getElementById(`[${result[2]}]`)?.classList.add('wonCell');
        if (titleH1.current)
          titleH1.current.innerHTML = `player ${
            isFirstPlayer ? '1' : '2'
          } won!!`;
      }
    } else {
      if (titleH1.current) titleH1.current.innerHTML = 'reset your game';
    }
  };
  return (
    <>
      <button
        onClick={() => resetGame()}
        style={{ display: 'block', margin: 'auto' }}
      >
        Reset
      </button>
      <h1 id='title' ref={titleH1} style={{ textAlign: 'center' }}>
        {isFirstPlayer ? 'Player1 ' : 'Player2 '}
        <span style={{ color: isFirstPlayer ? 'blue' : 'green' }}>
          {isFirstPlayer ? 'O' : 'x'}
        </span>
      </h1>
      <Box className={`${isWon ? 'gameFinished' : ''} gameContainer`}>
        {xoMatrix.map((i, iIndex) =>
          i.map((_j, jIndex) => (
            <Box
              id={`[${iIndex},${jIndex}]`}
              key={`${iIndex}${jIndex}`}
              onClick={(e) =>
                handleBoxSelect(e.target as Element, iIndex, jIndex)
              }
            ></Box>
          ))
        )}
      </Box>
    </>
  );
}

export default App;
