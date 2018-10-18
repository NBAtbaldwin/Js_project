# tinyDAW

## Summary

Make some beats [here](https://tylerbaldwin.co/tinyDAW/)!

tinyDAW is a digital audio workstation made with Vanilla JavaScript and the HTML5 Web Audio API, with Webpack as a bundler.

![gif](https://media.giphy.com/media/67pQeCcP3v7XAjHocD/giphy.gif)

## How to use

tinyDAW consists of three 'scenes', marked by numbers 1 through 3. Scene 1 holds of drum sounds, scene 2 holds chords C minor through B minor, and scene 3 holds single notes C through B. By clicking on or dragging the mouse across a square in the grid, you activate it to be played. To play what you've made, click the play button or the record button.

The next way to make a song (inspired by Ableton Live) is to click the record button and tap keys on the keyboard that correspond to the keyboard diagram at the bottom of the screen. Any key you hit will render to the closest corresponding grid square and be activated for playback. To improve the timing of your keyboard strokes, a metronome clicker can be activated by clicking the button to the left of the tempo display.

Tempo can be increased and decreased during playback/recording by dragging the slider input at the top of the screen.

Instruments, corresponding to the scene numbers, can be switched by selecting the buttons to the far right of the screen; there are five options for chords, three options for single notes, and no available options for changing drums (for the time being).

Individual scenes can be fully cleared during or outside of playback with the clear scene buttons in the upper right hand corner.

Lastly, the A.I. Beat button in the upper left hand corner pauses the current song and semi-randomly generates a new one.


## Implementation

#### Step Sequencer
tinyDAW's central interactive feature is a step sequencer, represented by the three 12x32 grids. A step sequencer is just an interface that locks the timing of musical notes/sounds to equal time intervals; in most digital audio workstations it is represented by a grid on which you can click to generate notes.

tinyDAW's step sequencer is exactly this. Individual grid squares are represented by divs with unique ids naming row and column (e.g. 'row-4-col-10'). These ids are important, as they are used by the Metronome class to identify which sound (visually speaking, a column number) to play on which beat (visually speaking, a row number). Below is the code for how this is done-- `getSoundIdx` receives the current beat index from the Metronome class, searches all corresponding rows for class 'selected', translates all 'selected' divs to a number that identifies which audio file to play, and returns an array of those numbers `drumSoundIdxList`:

```
// playUtil.js

const getSoundIdx = (beat) => {
  const drumSoundIdxList = []
  let rows = document.getElementsByClassName(`row-${beat}`);
  rows = Array.from(rows);
  rows.forEach((row, idx1) => {
    let colArr = Array.from(row.childNodes).reverse();
    colArr.forEach((node, idx2) => {
      if (Array.from(node.classList).join('').includes("selected")) {
        drumSoundIdxList.push(idx2 + idx1*12);
      }
    })
  });
  return drumSoundIdxList;
}

```

#### Tempo change during playback
tinyDAW's tempo can be changed at any time-- while playing or while paused. This functionality is facilitated by the Metronome class, an instance of which is instantiated every time the user clicks play or record. The instance is destroyed when the user hits pause. When a Metronome is instantiated, its tempo variable is set to the current value on the slider input.

The Metronome class is responsible for all timing of events while play is enabled. It tells a sound when to play using the Web Audio API's `audioBufferSourceNode.start()`, which takes a start time (`noteTime`) as one of its arguments. The way `noteTime` is generated is key-- it's intuitive to make a loop that runs for the amount of beat divisions in your grid, incrementing the start time by an equal amount on each iteration. However, this will not allow seamless changes in tempo; if you have 16 subdivisions, 16 note times will be scheduled instantly. This means the change in tempo would take at least that long to take effect. Instead, what I did, to which I owe a debt to [this](http://catarak.github.io/blog/2014/12/02/web-audio-timing-tutorial/) blog post, is create a series of functions that keep track of the current time, only scheduling a note if `noteTime` falls within .05 seconds ahead of the current time (the current time is gained by referencing the Web Audio API's `AudioContext.currentTime`). Each time  `noteTime` meets this criteria, a note is scheduled and `noteTime` is incremented with reference to the current tempo variable. Once a note is scheduled it cannot be un-scheduled, but seeing as 1) a function is running many times each second to check whether or not to schedule the next note and 2) each time a note is scheduled the global tempo is referenced, it is rare that a change in tempo would take any more than 1 or two beat subdivisions to take effect. Here's a skeleton of what that code looks like:

```
// this is called when instance of Metronome is created
handlePlay() {
  this.beat = 0;
  this.noteTime = 0.0
  this.planNotes();
}

planNotes() {
  let currentTime = this.context.currentTime;

  while (this.noteTime < currentTime + .05) {
    let actualPlayTime = this.noteTime + currentTime;

    this.playSound(actualPlayTime);

    this.getNextNoteTime();
  }

  // calls planNotes constantly, but most calls to planNotes won't actually plan a note
  this.timeoutId = setTimeout(this.planNotes, 0);
}

getNextNoteTime() {
  let secsPerBeat = 60.0/this.tempo;
  this.noteTime += .125 * secsPerBeat;

  this.beat === 31 ? this.beat = 0: this.beat += 1;
}

```

#### A.I. Beat
A.I. Beat is a class that when instantiated iterates through the grid of divs and adds class 'selected' to certain divs based on weighted probabilities. Probabilities are dictated mainly by genre conventions and avoiding dissonance. For instance, if a div representing a snare sound falls on the second or fourth quarter note of the measure, it is more likely to be selected than if it fell on the 3rd 16th note of a measure, because hiphop beats tend to have snares on 2 and 4. As for avoiding dissonance, all chord and note probabilities are weighted based on a div's musical relationship to the randomly generated root note. 

## Future Features

* Reverb and Filter controls
* Built-in synthesizer
* Ability to toggle syncopation
* Individual mute/unmute/solo buttons for each sound
