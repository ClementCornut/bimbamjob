const dirArray = ['E', 'S', 'W', 'N'];
const boundaries = {
    x: 0,
    y: 0
}

function launchMowers(instructionObject) {
    boundaries.x = instructionObject.initialX;
    boundaries.y = instructionObject.initialY;
    for (const mower of instructionObject.mowers) {
        processMower(mower);
        console.log(`${mower.x}${mower.y}${mower.dir}`);
    }
}

function processMower(mower) {
    for (const char of mower.moves) {
        switch(char) {
            case 'D':
                rotate(mower, 1);
                break;
            case 'G':
                rotate(mower, -1);
                break;
            case 'A':
                forward(mower);
                break;
        }
    }
}

function rotate(mower, direction) {
    index = dirArray.findIndex(dir => dir === mower.dir);
    index = index + direction;
    if (index === -1)
        index = 3;
    mower.dir = dirArray[index % 4];
}

function forward(mower) {
    switch(mower.dir) {
        case 'N':
            if (checkCoord(mower.x, mower.y + 1) === true)
                mower.y += 1;
            break;
        case 'E':
            if (checkCoord(mower.x + 1, mower.y) === true)
                mower.x += 1;
            break;
        case 'S':
            if (checkCoord(mower.x, mower.y - 1) === true)
                mower.y -= 1;
            break;
        case 'W':
            if (checkCoord(mower.x - 1, mower.y) === true)
                mower.x -= 1;
            break;
    }
}

function checkCoord(x, y) {
    if (x < 0 || y < 0 || x > boundaries.x || y > boundaries.y)
        return false;
    return true;
}

module.exports = { launchMowers };