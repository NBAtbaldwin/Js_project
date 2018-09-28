const createScene = () => {
  const master = document.getElementById("sequencer-master");

  for (let i = 0; i < 32; i++) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("id", `row-${i}`);
    master.appendChild(rowDiv);
    for (let j = 0; j < 10; j++) {
      let colDiv = document.createElement("div");
      colDiv.setAttribute("id", `row-${i}-col-${j}`)
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

export default createScene;
