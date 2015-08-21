better-say
=========

Make your computer speak, and even better with multiple sentences and read from file.


## Installation

  npm install better-say --save


## Usage
  
### Direct input :
```
var bettersay = require('better-say');
bettersay.speak([
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
```

### Read from JSON file input :
   - JSON file format:
```
{
   "options": {
     "voice": <voice name>,
     "writetext": (default false) true to show tts text to the console or false to not shown the text
   },
   "sentences": <array of sentences list>
}
``` 
  - Call readFile method:
```
var bettersay = require('better-say');
bettersay.readFile(__dirname + '/greetings.json');
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 0.0.1 Initial release
* 0.0.2 Added read from file feature