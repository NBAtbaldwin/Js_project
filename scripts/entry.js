import Metronome from './metronome';
import createScene from './createScene';

let drumKitBuffers;
let context;
let audioBufferSourceNode;

const keyCodes = [65, 83, 68, 70, 71, 72];

window.addEventListener('load', init, false);
function init() {
  window.AudioContext = window.AudioContext||window.webkitAudioContext;
  context = new AudioContext();

  const drumKitSoundNames = [
          '808bass',
          'Kick',
          'snare',
          'clap',
          'hat',
          'click'
      ];
  drumKitBuffers = {};
  drumKitSoundNames.forEach((soundName, idx) => {
    fetch('https://raw.githubusercontent.com/NBAtbaldwin/Js_project/master/assets/drum_kit/' + soundName + '.wav')
    .then(response => response.arrayBuffer())
    .then(buffer => {
        context.decodeAudioData(buffer, decoded => {
          drumKitBuffers[keyCodes[idx]] = decoded;
        });
      })
  });

  createScene();

  let metButton = document.getElementById('metronome');
  metButton.addEventListener('click', (e) => {
    const metronome = new Metronome(drumKitBuffers, context, 80, keyCodes);
    metronome.tempoEventListener();
    metronome.handlePlayWithMetronome();
  });

  let playButton = document.getElementById('play');
  playButton.addEventListener('click', (e) => {
    const metronome = new Metronome(drumKitBuffers, context, 80, keyCodes);
    metronome.tempoEventListener();
    metronome.handlePlay();
  });


}

function playSound(buffer, time) {
  var source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(context.destination);
  source.start(time);
}

window.addEventListener('keydown', function(e) {
  audioBufferSourceNode = context.createBufferSource();
  let code = e.keyCode;
  audioBufferSourceNode.buffer = drumKitBuffers[code];
  audioBufferSourceNode.connect(context.destination);
  audioBufferSourceNode.start();
  // console.log(e);


  // for (var bar = 0; bar < 2; bar++) {
  //   var time = startTime + bar * 8 * eighthNoteTime;
  //   // Play the bass (kick) drum on beats 1, 5
  //   playSound(kick, time);
  //   playSound(kick, time + 4 * eighthNoteTime);
  //
  //   // Play the snare drum on beats 3, 7
  //   playSound(snare, time + 2 * eighthNoteTime);
  //   playSound(snare, time + 6 * eighthNoteTime);
  //
  //   // Play the hi-hat every eighth note.
  //   for (var i = 0; i < 8; ++i) {
  //     playSound(hihat, time + i * eighthNoteTime);
  //   }
});
