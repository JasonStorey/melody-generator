var SYNTH = require('synthesizer'),
    teoria = require('teoria');

SYNTH.init();

var instrument = new SYNTH.Instrument({
    notes: SYNTH.Scale.CHROMATIC.slice(0, 71)//arrayOfFreqs = teoria.scale('C4', 'chromatic').notes().map(function(note) { return note.fq(); })
});

var retroPatch = {
    timbres: [{
        type: 'square',
        volume: 0.2,
        attack: 0.001,
        release: 0.1,
        filters: [{
            type: 'highshelf',
            frequency: 10000,
            gain: -20
        }]
    }]
};

var trianglePatch = {
    timbres: [
        {
            type: 'sawtooth',
            volume: 0.1,
            attack: 0.01,
            release: 0.1,
            filters: [{
                type: 'highshelf',
                frequency: 10000,
                gain: -20
            }]
        },
        {
            type: 'triangle',
            volume: 0.2,
            attack: 0.001,
            release: 0.01
        }]
};

var smoothPatch = {
    timbres: [{
        type: 'square',
        volume: 0.2,
        attack: 0.02,
        release: 0.05,
        filters: [{
            type: 'highshelf',
            frequency: 5000,
            gain: -30
        }]
    },{
        type: 'triangle',
        volume: 0.3,
        attack: 0.01,
        release: 0.9,
        filters: [{
            type: 'lowshelf',
            frequency: 2000,
            gain: -50
        }]
    }]
};

var patch = new SYNTH.Patch(trianglePatch);

instrument.addPatch(patch);

// the akamai origin cert expiry warning is nothing to worry about, right?
// according to Akamai we shouldn't worry

function getMelodyFromText(text) {
    var i = 0,
        melody = [];

    while(i < text.length) {
        melody.push(text.charCodeAt(i));
        i++;
    }

    return melody;
}

function playText(text) {
    var melody = getMelodyFromText(text);
    melody.forEach(function (val, index) {
        var trigger1 = instrument.triggers[val % instrument.triggers.length];
        var trigger2 = instrument.triggers[(val + 2) % instrument.triggers.length];
        var trigger3 = instrument.triggers[(val + 4) % instrument.triggers.length];

        setTimeout(function () {
            console.log(val, val % instrument.triggers.length);
            trigger1.play();
            //trigger2.play();
            //trigger3.play();
        }, index * 100);

        setTimeout(function () {
            trigger1.pause();
            //trigger2.pause();
            //trigger3.pause();
        }, 25 + (index * 100));
    });
}


var textInput = document.getElementById('textInput');
var playButton = document.getElementById('playButton');

playButton.addEventListener('mousedown', function() {
    playText(textInput.value);
});
