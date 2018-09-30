export const createScenes = () => {
  const master = document.getElementById("sequence-master");

  [0, 1, 2].forEach((num) => {
    const subMaster = document.createElement("div");
    subMaster.setAttribute("id", `sequencer-${num}`)
    master.appendChild(subMaster);
    createScene(subMaster, num)

  });

}

const createScene = (subMaster, num) => {
  for (let i = 0; i < 32; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("class", `row-${i}`);

    if (i % 4 === 0) {
      rowDiv.classList.add('quarter');
    }

    subMaster.appendChild(rowDiv);
    for (let j = 11; j >= 0; j--) {
      let colDiv = document.createElement("div");
      colDiv.setAttribute("id", `row-${i}-col-${j+(num*12)}`);
      // colDiv.setAttribute("class", `sequencer-${num}`)
      rowDiv.appendChild(colDiv);

      // click div to create note
      colDiv.addEventListener('click', () => {
        Array.from(colDiv.classList).join('').includes("selected") ? colDiv.classList.remove("selected") : colDiv.classList.add("selected")
      })

      // drag mousedown over div to create note
      colDiv.addEventListener('mouseover', (e) => {
        if(e.buttons == 1 || e.buttons == 3) {
          Array.from(colDiv.classList).join('').includes("selected") ? colDiv.classList.remove("selected") : colDiv.classList.add("selected")
        }
      })

    }
  }
}
