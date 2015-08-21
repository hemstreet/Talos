var _ = require('lodash'),
    fs = require('fs'),
    wav = require('wav'),
    Speaker = require('speaker'),
    cron = require('cron'),
    CronJob = require('cron').CronJob,
    exec = require('child_process').exec,
    child;


var obj = {

    reader : null,
    speaker: null,

    init: function(config) {

        var config = require('./config/config.json');

        config = _.extend(this.config, config);

        this.speaker = new Speaker({
            channels: 2,          // 2 channels
            bitDepth: 16,         // 16-bit samples
            sampleRate: 44100     // 44,100 Hz sample rate
        });

        this.reader = new wav.Reader();

        this.setupAlarm();

        child = exec('say Starting up',
            function (error, stdout, stderr) {

                if(stdout) {
                    console.log('stdout: ' + stdout);
                }

                if(stderr) {
                    console.log('stderr: ' + stderr);
                }



                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            });

        setTimeout(function() {
            this.playTrack('bear.wav');
        }.bind(this), 5000);


        //bettersay.speak([
        //    'hello',
        //    'this system is using better-say',
        //    'for the current version, better-say can speak with many input sentences'
        //], {
        //    voice: 'Vicki',
        //    callback: function() {
        //        console.log('this is a callback');
        //    },
        //    writetext: true
        //});

    },
    setupAlarm: function() {
        new CronJob('20 7 * * 1,2,3,4,5', function() {
            console.log('time to get up');
            this.playTrack('bear.wav');
        }.bind(this), null, true, 'America/Denver');
    },

    playTrack: function(file) {

        var file = fs.createReadStream('./lib/sounds/' + file);

        // the "format" event gets emitted at the end of the WAVE header
        this.reader.on('format', function (format) {

            // the WAVE header is stripped from the output of the reader
            this.reader.pipe(new Speaker(format));
        }.bind(this));

        // pipe the WAVE file to the Reader instance
        file.pipe(this.reader);

    }
};

obj.init();
