# Pencil Simulator
#### A Terminal Friendly Pencil Simulator.

It does many of the things you might expect a pencil and paper to perform, but in a terminal window. Creating pencils that can be sharpened and that can be used to erase your work is easy with the built-in api.

Pencils and Pens can be used to write to media of all kinds.

### Simple Example Usage
```javascript
//Create the world's best pencil
let pointStrength = 50, eraserDexterity = 10, lengthOfPencil = 10;
const ticonderoga = new Pencil( pointStrength, eraserDexterity, lengthOfPencil );

//Create some Cardstock Paper
let cardStock = [];

//Begin Writing
cardStock = ticonderoga.write('Hello World').on(cardStock);

//Look at Your Work
showPaper(cardStock);
```
###### Output
```plaintext
---
Hello World
---
```

After installing the repository run the demo code `node demo.js` to see it in action.

## Install Instructions
1. Clone the repository to a local directory
```
mkdir pencil_sim && cd pencil_sim
git clone https://github.com/larryschirmer/pencil_simulator.git
cd pencil_simulator
```
2. Make a new PencilSim JavaScript File  
```
nano ECMAScriptEssay.js
```
3. Load the PencilSim API by Copying the Following Lines
```
'use strict';
let { showPaper, inspect } = require('./viewInterface');
let { Pencil } = require('./pencilInterface');
```

See [Node.js](https://nodejs.org/en/download/package-manager/)'s download page for helpful information to run javascript in your environment.
## Usage
### Pencil API
#### new Pencil()
A Pencil class takes three writing implement properties `pointStrength`, `eraserDexterity`, and `lengthOfPencil` and returns a new pencil. All three properties are optional and will assume a value of `0` if left undefined;

###### Example
```
let pointStrength = 50, eraserDexterity = 10, lengthOfPencil = 10;
const ticonderoga = new Pencil( pointStrength, eraserDexterity, lengthOfPencil );
```

#### _pencil_.write().on()
The `write()` method is intended to be used in conjunction with the `on()` method. The method takes a `string` input and stores it as an internal property of the writing implement. The `on()` method takes a `paper array`, pulls the previous value and exhausts point strength to return a new `paper array`.
When `paper array`s are input, the `on()` method addes the new `write()` string to the end of the paper. The series of methods can be run any number of times until the point strength is exhausted (_more on that under_ `.sharpen()`).
###### Example
```
let cardStock = [];
cardStock = ticonderoga.write('Hello World').on(cardStock);
```

#### _pencil_.erase().from()
The `erase()` method is intended to be used in conjunction with the `from()` method. The method takes a `options object` with `word` and `amt` keys that store the word number on the paper and the amount of characters that should be erased, respectively, and stores them as internal properties of the writing implement. The `from()` method takes a `paper array`, pulls the previous values and exhausts eraser dexterity to return a new `paper array` with the word or part of the word replaced by spaces. The series of methods can be run any number of times until there are no more words or the eraser dexterity is exhausted.
###### Example
```
let erase_opt = {
  word: 1,
  amt: 5
};
cardStock = ticonderoga.erase(erase_opt).from(cardStock);
```

#### _pencil_.edit().into()
The `edit()` method is intended to be used in conjunction with the `into()` method. The method takes a `options object` with `char_number` and `word` keys that store the character to start editing on the paper and the word that should be added to the text, respectively, and stores them as internal properties of the writing implement. The `into()` method takes a `paper array`, pulls the previous values and overwrites the word into the paper returning a new `paper array` with the edits made. Edits over spaces or erased text show up as normal characters while edits over characters in the paper already show up as '@' symbols. The series of methods can be run any number of times until the point strength is exhausted (_more on that under_ `.sharpen()`).
###### Example
```
let edit_opts = {
  char_number: 6,
  word: 'Plant'
};
cardStock = ticonderoga.edit(edit_opts).into(cardStock);
```

#### _pencil_.sharpen()
The `.sharpen()` method restores the point strength back to its originally set value. After each character is written, the point strength is reduced. This method also reduces the length of the pencil. If the pencil length is zero, then the sharpen method will not restore the tip.
- By 2: If the character is Uppercase
- By 1: If the character is lowercase or if it is a number
- By 0: If there is a space
###### Example
```
ticonderoga.sharpen();
```

### View API
#### showPaper(_paper_)
The `showPaper()` method takes the `array` returned by a `.write().on()` chain, a `.erase().from()` chain, or a `.edit().into()` chain and `console.log`'s the state of the paper.

###### Example
```
showPaper(cardStock);
```

#### inspect(_pencil_)
The `showPaper()` method takes a `Pencil` object and `console.log`'s the state of the pencil.

###### Example
```
inspect(ticonderoga);
```

## Testing Instructions
1. Clone the repository to a local directory
```
mkdir pencil_sim && cd pencil_sim
git clone https://github.com/larryschirmer/pencil_simulator.git
cd pencil_simulator
```
2. Run the test
```
npm test
```
