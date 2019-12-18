// These are all variables used in the demos.
var TWINKLE_TWINKLE;
var test;
// var player;
// var viz1, vizPLayer1;
var viz2, vizPLayer2;
createSampleSequences();
createSamplePlayers();

function createSampleSequences() {
    TWINKLE_TWINKLE = {
      notes: [
        {pitch: 60, startTime: 0.0, endTime: 0.5},
        {pitch: 60, startTime: 0.5, endTime: 1.0},
        {pitch: 67, startTime: 1.0, endTime: 1.5},
        {pitch: 67, startTime: 1.5, endTime: 2.0},
        {pitch: 69, startTime: 2.0, endTime: 2.5},
        {pitch: 69, startTime: 2.5, endTime: 3.0},
        {pitch: 67, startTime: 3.0, endTime: 4.0},
        {pitch: 65, startTime: 4.0, endTime: 4.5},
        {pitch: 65, startTime: 4.5, endTime: 5.0},
        {pitch: 64, startTime: 5.0, endTime: 5.5},
        {pitch: 64, startTime: 5.5, endTime: 6.0},
        {pitch: 62, startTime: 6.0, endTime: 6.5},
        {pitch: 62, startTime: 6.5, endTime: 7.0},
        {pitch: 60, startTime: 7.0, endTime: 8.0},
      ],
      tempos: [{
        time: 0, 
        qpm: 120
      }],
      totalTime: 8
    };
    // test = new mm.urlToNoteSequence("https://bitmidi.com/uploads/16754.mid");
    // console.log(test);
}

function createSamplePlayers() {
    // // A soundfont player
    // player = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus');
    
    // A Visualizer
    // viz1 = new mm.PianoRollCanvasVisualizer(test, document.getElementById('canvas'));
    viz2 = new mm.PianoRollCanvasVisualizer(TWINKLE_TWINKLE, document.getElementById('canvas2'));
  
    // This player calls back two functions: 
    // - run, after a note is played. This is where we update the visualizer.
    // - stop, when it is done playing the note sequence.
    // vizPlayer1 = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
    //   undefined, undefined, undefined, {
    //   run: (note) => viz1.redraw(note),
    //   stop: () => {}
    // });

    vizPlayer2 = new mm.SoundFontPlayer('https://storage.googleapis.com/magentadata/js/soundfonts/sgm_plus', 
      undefined, undefined, undefined, {
      run: (note) => viz2.redraw(note),
      stop: () => {}
    });
}

function startOrStop(event, p, seq) {
    if (p.isPlaying()) {
      p.stop();
      event.target.textContent = 'Play';
    } else {
      p.start(seq).then(() => {
        // Stop all buttons.
        const btns = document.querySelectorAll('.controls > button');
        for (let btn of btns) {
          btn.textContent = 'Play';
        }
      });
      event.target.textContent = 'Stop';
    }
}