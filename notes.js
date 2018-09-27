// let drumKitBuffers;
// let context;
// let audioBufferSourceNode;
//
// const keyCodes = [65, 83, 68, 70, 71]
//
// window.addEventListener('load', init, false);
// function init() {
//   window.AudioContext = window.AudioContext||window.webkitAudioContext;
//   context = new AudioContext();
//
//   const drumKitSoundNames = [
//           'hat',
//           'Kick',
//           'snare',
//           '808bass',
//           'clap'
//       ];
//   drumKitBuffers = {};
//   drumKitSoundNames.forEach((soundName, idx) => {
//     fetch('https://raw.githubusercontent.com/NBAtbaldwin/hacky_drums/master/' + soundName + '.wav')
//     .then(response => response.arrayBuffer())
//     .then(buffer => {
//         context.decodeAudioData(buffer, decoded => {
//           drumKitBuffers[keyCodes[idx]] = decoded;
//         });
//       })
//     })
// }
//
// function playSound(buffer, time) {
//   var source = context.createBufferSource();
//   source.buffer = buffer;
//   source.connect(context.destination);
//   source.start(time);
// }
//
// window.addEventListener('keydown', function(e) {
//   audioBufferSourceNode = context.createBufferSource();
//   let code = e.keyCode;
//   audioBufferSourceNode.buffer = drumKitBuffers[code];
//   audioBufferSourceNode.connect(context.destination);
//   audioBufferSourceNode.start();
//   console.log(e);
//
//   var kick = drumKitBuffers[83];
//   var snare = drumKitBuffers[68];
//   var hihat = drumKitBuffers[65];
//   var startTime = context.currentTime + 0.100;
//   var tempo = 80;
//   var eighthNoteTime = (60 / tempo) / 8;
//
//   for (var bar = 0; bar < 2; bar++) {
//     var time = startTime + bar * 8 * eighthNoteTime;
//     // Play the bass (kick) drum on beats 1, 5
//     playSound(kick, time);
//     playSound(kick, time + 4 * eighthNoteTime);
//
//     // Play the snare drum on beats 3, 7
//     playSound(snare, time + 2 * eighthNoteTime);
//     playSound(snare, time + 6 * eighthNoteTime);
//
//     // Play the hi-hat every eighth note.
//     for (var i = 0; i < 8; ++i) {
//       playSound(hihat, time + i * eighthNoteTime);
//     }
// }
