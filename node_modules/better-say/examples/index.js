#!/usr/bin/env node

var speak = require('../app');
speak.speak([
	'hello', 
	'this system is using better-say', 
	'for the current version, better-say can speak with many input sentences'
], {
	voice: 'Vicki',
	callback: function() {
        console.log('this is a callback');
	},
	writetext: true
});