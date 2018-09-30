export const createPads = () => {
  const master = document.getElementById("pads-master");
  for (let i = 0; i < 3; i++) {
    let rowDiv = document.createElement('div');
    rowDiv.setAttribute('class', 'pad-row');
    rowDiv.setAttribute('id', `pad-row-${i}`);
    master.appendChild(rowDiv);
    for (let j = 0; j < 12; j++) {
      let colDiv = document.createElement('div');
      colDiv.setAttribute('data-key', `${keyCodes[i][j]}`);
      colDiv.setAttribute('id', `pad-col-${i}-${j}`);
      colDiv.setAttribute('class', `pad`);
      colDiv.innerHTML = `${keyNames[i][j]}`
      rowDiv.appendChild(colDiv);
    }
  }
}

const keyNames = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '='],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'enter']
];

const keyCodes = [
  ['49', '50', '51', '52', '53', '54', '55', '56', '57', '48', '189', '187'],
  ['81', '87', '69', '82', '84', '89', '85', '73', '79', '80', '219', '22'],
  ['65', '83', '68', '70', '71', '72', '74', '75', '76', '186', '222', '13']
];
