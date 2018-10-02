export const matchKeyStrokeToDivId = (keyCode, keyCodeObj, beat) => {
  let row = beat;
  row === 0 ? row = 31 : row = row - 1;

  let col;
  if (keyCodeObj.drums.includes(keyCode)) {
    col = keyCodeObj.drums.indexOf(keyCode)
  } else if (keyCodeObj.chords.includes(keyCode)) {
    col = keyCodeObj.chords.indexOf(keyCode) + 12
  } else if (keyCodeObj.mono.includes(keyCode)) {
    col = keyCodeObj.mono.indexOf(keyCode) + 24
  }

  return `row-${row}-col-${col}`;
}
