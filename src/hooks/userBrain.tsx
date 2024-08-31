import { xoActionType } from '../types/xoAxionType';

const userBrain = () => {
  const check = (
    rowNumber: number,
    columnNumber: number,
    actionType: xoActionType,
    xoMatrix: string[][]
  ) => {
    let result = checkRow(rowNumber, columnNumber, actionType, xoMatrix);
    if (result) return result;
    if (rowNumber + columnNumber + 1 === 3 || rowNumber === columnNumber) {
      result = checkDimentional(rowNumber, columnNumber, actionType, xoMatrix);
      if (result) return result;
    }
    result = checkColumn(rowNumber, columnNumber, actionType, xoMatrix);
    return result;
  };
  const checkRow = (
    rowNumber: number,
    columnNumber: number,
    actionType: xoActionType,
    xoMatrix: string[][]
  ) => {
    xoMatrix[rowNumber][columnNumber] = actionType.toString();
    let actionCount: number = 0;
    for (let j = 0; j < 3; j++) {
      if (xoMatrix[rowNumber][j] == actionType) {
        actionCount++;
      }
    }
    return actionCount === 3;
  };
  const checkColumn = (
    rowNumber: number,
    columnNumber: number,
    actionType: xoActionType,
    xoMatrix: string[][]
  ) => {
    xoMatrix[rowNumber][columnNumber] = actionType.toString();
    let actionCount: number = 0;
    for (let i = 0; i < 3; i++)
      if (xoMatrix[i][columnNumber] == actionType) actionCount++;
    return actionCount === 3;
  };
  const checkDimentional = (
    rowNumber: number,
    columnNumber: number,
    actionType: xoActionType,
    xoMatrix: string[][]
  ) => {
    let actionCount: number = 0;
    if (rowNumber === columnNumber)
      for (let i = 0; i < 3; i++)
        if (xoMatrix[i][i] == actionType) {
          actionCount++;
          if (actionCount === 3) return true;
        }
    actionCount = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i + j + 1 === 3) {
          if (xoMatrix[i][j] == actionType) {
            actionCount++;
            if (actionCount === 3) return true;
          }
        }
      }
    }
    return false;
  };
  return { check };
};

export default userBrain;
