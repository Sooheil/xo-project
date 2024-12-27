import { xoActionType } from '../types/xoAxionType';

const useBrain = () => {
  const check = (
    rowNumber: number,
    columnNumber: number,
    actionType: xoActionType,
    xoMatrix: string[][]
  ): number[][] | null => {
    let result = checkRow(rowNumber, actionType, xoMatrix);
    if (result) return result;

    if (rowNumber + columnNumber + 1 === 3 || rowNumber === columnNumber) {
      result = checkDimentional(actionType, xoMatrix);
      if (result) return result;
    }

    result = checkColumn(columnNumber, actionType, xoMatrix);
    return result;
  };

  const checkRow = (
    rowNumber: number,
    actionType: xoActionType,
    xoMatrix: string[][]
  ): number[][] | null => {
    const actionPositions: number[][] = [];
    for (let j = 0; j < 3; j++) {
      if (xoMatrix[rowNumber][j] === actionType) {
        actionPositions.push([rowNumber, j]);
      }
    }
    return actionPositions.length === 3 ? actionPositions : null;
  };

  const checkColumn = (
    columnNumber: number,
    actionType: xoActionType,
    xoMatrix: string[][]
  ): number[][] | null => {
    const actionPositions: number[][] = [];
    for (let i = 0; i < 3; i++) {
      if (xoMatrix[i][columnNumber] === actionType) {
        actionPositions.push([i, columnNumber]);
      }
    }
    return actionPositions.length === 3 ? actionPositions : null;
  };

  const checkDimentional = (
    actionType: xoActionType,
    xoMatrix: string[][]
  ): number[][] | null => {
    let actionPositions: number[][] = [];

    // Check main diagonal
    for (let i = 0; i < 3; i++) {
      if (xoMatrix[i][i] === actionType) {
        actionPositions.push([i, i]);
      }
    }
    if (actionPositions.length === 3) return actionPositions;

    // Check anti-diagonal
    actionPositions = [];
    for (let i = 0; i < 3; i++) {
      if (xoMatrix[i][2 - i] === actionType) {
        actionPositions.push([i, 2 - i]);
      }
    }
    return actionPositions.length === 3 ? actionPositions : null;
  };

  return { check };
};

export default useBrain;
