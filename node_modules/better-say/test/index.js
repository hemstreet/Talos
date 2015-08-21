var chai = require('chai'),
    should = chai.should(),
    assert = chai.assert,
    expect = chai.expect,
    bettersay = require('../app');


describe('say with multiple sentences', function() {
  it('test multiple sentences', function() {
    expect(bettersay.speak([
      'hello', 
      'this system is using better-say', 
      'for the current version, better-say can speak with many input sentences'
    ], {
      voice: 'Vicki',
      callback: function() {
            console.log('this is a callback');
      },
      writetext: true
    })).to.be.true;

  });
});

var test = {
  "options": {
      "voice": "vicki",
      "writetext": true
  },
  "sentences": [
    "Hello how are you today",
    "this system is using better-say", 
    "for the current version, better-say is exclusive only for Mac OSX users"
  ]
};

describe('read JSON file', function() {
  it('test parse for greetings.json file', function() {
    var parse = bettersay.parseFile(__dirname + '/greetings.json');
    JSON.stringify(parse).should.equal(JSON.stringify(test));
  });
});

describe('read unexist file', function() {
  it('this test should thrown "file not exist" ', function() {
    expect(function() {
      bettersay.readFile(__dirname + '/nofile');
    }).to.throw('file not exist');
  });
});

describe('tts the file contents', function() {
  it('test say contents of greetings.json file', function() {
    expect(bettersay.readFile(__dirname + '/greetings.json')).to.be.true;
  });
});

