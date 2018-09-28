export const matchKeyStrokeToDivId = (keyCode, keyCodeObj, beat) => {
  // console.log(keyCodeArray);
  let row = beat;
  row === 0 ? row = 31 : row = row - 1;

  let col;
  keyCodeObj.drums.includes(keyCode) ? col = keyCodeObj.drums.indexOf(keyCode) : col = keyCodeObj.chords.indexOf(keyCode) + 12;

  return `row-${row}-col-${col}`;
}
