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
      colDiv.addEventListener('click', () => {
        Array.from(colDiv.classList).join('').includes("selected") ? colDiv.classList.remove("selected") : colDiv.classList.add("selected")
        console.log(colDiv.classList);
      })
    }
  }
}

export default createScene;
