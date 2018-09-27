export const matchKeyStrokeToDivId = (keyCode, keyCodeArray, beat) => {
  // console.log(keyCodeArray);
  let row = beat;
  let col = keyCodeArray.indexOf(keyCode);
  return `row-${row}-col-${col}`;
}
