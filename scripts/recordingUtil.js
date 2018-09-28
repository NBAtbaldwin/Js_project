export const matchKeyStrokeToDivId = (keyCode, keyCodeArray, beat) => {
  // console.log(keyCodeArray);
  let row = beat;
  row === 0 ? row = 31 : row = row - 1;
  let col = keyCodeArray.indexOf(keyCode);
  return `row-${row}-col-${col}`;
}
