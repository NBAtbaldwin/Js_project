# tinyDAW

## Summary

Make some beats [here](https://tylerbaldwin.co/tinyDAW/)!

tinyDAW is a digital audio workstation made with Vanilla JavaScript and the HTML5 Web Audio API, with Webpack as a bundler.

![gif](https://media.giphy.com/media/67pQeCcP3v7XAjHocD/giphy.gif)

## How to use

tinyDAW consists of three 'scenes', marked by numbers 1 through 3. Scene 1 holds of drum sounds, scene 2 holds chords C minor through B minor, and scene 3 holds single notes C through B. By clicking on or dragging the mouse across a square in the grid, you activate it to be played. To play what you've made, click the play button or the record button.

The next way to make a song, inspired by Ableton Live, is to hit the record button and hit keys on the keyboard that correspond to the keyboard diagram at the bottom of the screen. Any key you hit will render to the closest grid square and be activated for playback. To improve the timing of keyboard strokes, a metronome can be activated by clicking the button to the left of the tempo display.

Tempo can be increased and decreased during playback/recording by dragging the slider input at the top of the screen.

Instruments, corresponding to the scene numbers, can be switched by selecting the buttons to the far right of the screen; there are five options for chords, three options for single notes, and no available options for changing drums (for the time being).

Individual scenes can be fully cleared during or outside of playback with the clear scene buttons in the upper right hand corner.

Lastly, the A.I. Beat button in the upper left hand corner pauses the current song and semi-randomly generates a new one.


## Implementation

#### Step Sequencer
tinyDAW's central feature is a step sequencer that plays back audio files

#### Tempo change during playback


#### A.I. Beat


## Future Features

* Reverb and Filter controls
* Built-in synthesizer
* Ability to toggle syncopation
* Individual mute/unmute/solo buttons for each sound
