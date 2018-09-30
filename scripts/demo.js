const littleDitty = ["row-0-col-7", "row-0-col-2", "row-0-col-1", "row-1-col-7", "row-2-col-7", "row-3-col-7", "row-4-col-7", "row-4-col-4", "row-5-col-7", "row-6-col-7", "row-6-col-2", "row-7-col-7", "row-8-col-8", "row-8-col-7", "row-9-col-7", "row-10-col-7", "row-10-col-2", "row-10-col-1", "row-11-col-7", "row-12-col-7", "row-12-col-4", "row-13-col-7", "row-13-col-2", "row-14-col-7", "row-15-col-7", "row-16-col-7", "row-16-col-2", "row-16-col-0", "row-17-col-7", "row-18-col-7", "row-19-col-7", "row-20-col-7", "row-20-col-4", "row-21-col-7", "row-22-col-7", "row-22-col-2", "row-22-col-0", "row-23-col-8", "row-23-col-7", "row-24-col-7", "row-25-col-7", "row-26-col-7", "row-26-col-2", "row-27-col-7", "row-28-col-7", "row-28-col-4", "row-29-col-7", "row-29-col-4", "row-30-col-7", "row-30-col-2", "row-31-col-7", "row-0-col-12", "row-6-col-15", "row-16-col-14", "row-22-col-17", "row-0-col-24", "row-2-col-26", "row-4-col-27", "row-6-col-29", "row-7-col-31", "row-8-col-34", "row-10-col-31", "row-11-col-32", "row-12-col-29", "row-13-col-31", "row-14-col-27"];

const runDemo = (metronome, context) => {
  littleDitty.forEach( id => {
    let div = document.getElementById(id);
    div.classList.add('selected');
  });
  document.getElementById('chord-0').classList.add('selected');
  document.getElementById('mono-0').classList.add('selected');
  document.getElementById('tempo').value = "47";
  metronome.tempo = 47;
  metronome.tempoEventListener();
  metronome.handlePlay();
  metronome.playing = true;
  document.getElementById('play').classList.add('selected')

}

export default runDemo;
