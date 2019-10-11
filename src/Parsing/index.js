const fs = require('fs');
const readline = require('readline');

module.exports = function (eventEmitter) {
    const moduleExport = {};

    moduleExport.instructionObject = {
        initialX: 0,
        initialY: 0,
        mowers: []
    };

    function initObject(line) {
        moduleExport.instructionObject.initialX = parseInt(line.charAt(0));
        moduleExport.instructionObject.initialY = parseInt(line.charAt(1));
    }

    function initMower(line) {
        const mower = {
            x: 0,
            y: 0,
            dir: 'S',
            moves: ""
        }
        mower.x = parseInt(line.charAt(0));
        mower.y = parseInt(line.charAt(1));
        mower.dir = line.charAt(3);
        if (mower.x > moduleExport.instructionObject.initialX || mower.y > moduleExport.instructionObject.initialY) {
            console.log("Bad coordinate for mower");
            process.exit(1);
        }
        moduleExport.instructionObject.mowers.push(mower);
    }

    function addMoveToMower(line) {
        moduleExport.instructionObject.mowers[moduleExport.instructionObject.mowers.length - 1].moves = line;
    }

    moduleExport.parseFile = function(path) {
        const initRegex = /^\d{2}$/;
        const mowerRegex = /^\d{2} [N,E,W,S]$/;
        const moveRegex = /^[D,G,A]+$/;
        const readInterface = readline.createInterface({
            input: fs.createReadStream(path),
            output: null,
            console: false
        });
        readInterface.on('line', (line) => {
            if (initRegex.test(line))
                initObject(line);
            else if (mowerRegex.test(line))
                initMower(line);
            else if (moveRegex.test(line))
                addMoveToMower(line);
            else {
                console.log("Parsing error");
                process.exit(1);
            }
        });
        readInterface.on('close', () => {
            eventEmitter.emit('launchMowers');
        });
    }
    return moduleExport;
}