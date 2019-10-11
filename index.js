const fs = require('fs');

const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const ParsingEmitter = new MyEmitter();

const Parsing = require('./src/Parsing')(ParsingEmitter);

const Gardener = require('./src/Gardener');

const args = process.argv.slice(2);
const path = `${__dirname}/${args[0]}`;

ParsingEmitter.on('launchMowers', () => {
    Gardener.launchMowers(Parsing.instructionObject);
});

if (fs.existsSync(path) && fs.lstatSync(path).isFile()) {
    Parsing.parseFile(path);
}
