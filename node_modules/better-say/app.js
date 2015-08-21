/**
 * better-say
 *
 * Copyright (c) 2014 Alfian Busryo
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs');
var request = require('request');
var stdin = process.openStdin(); 
var spawn = require('child_process').spawn,
  child, jsonStr;

var username = process.env['USER'];

if (process.platform !== 'darwin') {
  process.stdout.write('current version is exclusive only for Mac OSX users\n');
  process.exit(1);
}

var cli = function(command, options, callback) {
  var child = spawn(command, options);
  child.stdin.setEncoding('ascii');
  child.stderr.setEncoding('ascii');

  if(callback.error){
    child.stderr.on('data', callback.error);
  }
  if(callback.stdout){
    child.stdout.on('data', callback.stdout);
  }
  if(callback.finish){
    child.on('close', callback.finish);
  }
  return child;
}

var speechList = [];
var tts = function(voice, isWrite, callback) {
  var self = this;
  var tmpStr = speechList.shift();
  var options = ['-v', voice, tmpStr];
  cli('say', options,  {
    finish:  function(code) {
      if(isWrite) console.log(tmpStr);
      if(speechList.length > 0){
        tts(voice, isWrite, callback);
      } else if(callback){
        callback();
      }
      // return;
    },
    error: function() {
      console.log('oops! something happened');
      throw 'error while speaking';
    }
  });
}

module.exports = {
  /**
   * Make your computer speak better with multiple sentences
   *
   * @param  {Array} | {String} Array list of sentences or filepath
   * @param  {Object<voice, writetext, callback>} options 
   */
  speak: function(sentences, options) {
    var voice = options.voice, callback = options.callback,
      iswrite = options.writetext;
    for (var i=0; i<sentences.length; i++) {
      speechList.push(sentences[i]);
    };
    try{
      tts(voice, iswrite, callback);
      return true;
    } catch(e) {
      throw new Error('error while speaking');
    }
  },
  /**
   * read and say it from json file.
   * json format :
   * {
   *    "options": {
   *      "voice": <voice name>,
   *      "writetext": (default false) true to show tts text to the console or false to not shown the text
   *    },
   *    "sentences": <array of sentences list>
   * }
   * ex:
   * {
   *    "options": {
   *      "voice": "vicki",
   *      "writetext": true
   *    },
   *    "sentences": [
   *      "Hello how are you today",
   *      "this system is using better-say", 
   *      "for the current version, better-say is exclusive only for Mac OSX users"
   *    ]
   * }
   * @param String filepath a json file path
   */
  readFile: function(filepath, callback) {
    jsonStr = this.parseFile(filepath);
    if(!jsonStr) {  
      process.stdout.write(filepath+' is not exist');
      throw new Error('file not exist');
      process.exit(1);
    }
    try {
      var sentences = jsonStr.sentences;
      var options = jsonStr.options;
      options.callback = callback;
      this.speak(sentences, options);
      return true;
    } catch(e) {
      throw new Error('error while speaking');
    }
  },
  parseFile: function(filepath) {
    if(!fs.existsSync(filepath)){
      console.error(filepath+' is not exist');
      return false;
    }
    return JSON.parse(fs.readFileSync(filepath, 'utf8'));
  }
}