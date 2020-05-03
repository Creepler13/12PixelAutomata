var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var selectetDisplay = document.getElementById("selectetDisplay");
var baseDisplay = document.getElementById("baseDisplay");
var facingDisplay = document.getElementById("facingDisplay");

var frame = 0;
var time = 0;

var materials = {
    "water": { "color": document.getElementById("water"), "amount": 0 },
    "energy": { "color": document.getElementById("energy"), "amount": 0 }
}
var buildings = {
    "0": { "name": "empty", "color": document.getElementById("empty") },
    "1": { "name": "water-collector", "color": document.getElementById("water-collector") },
    "2": { "name": "mover", "color": document.getElementById("mover") },
    "3": { "name": "base", "color": document.getElementById("base") },
    "4": { "name": "transformator", "color": document.getElementById("transformator") }
}
var facings = {
    "0": "Up",
    "1": "Right",
    "2": "Down",
    "3": "Left"
}

var facing = 0;
var facingsSize = [];
for (let k in facings) facingsSize.push(k);
var maxSelectetFacing = facingsSize.length - 1;
console.log(maxSelectetFacing);
facingDisplay.textContent = " Facing: " + facings[facing];


var x = 0;
var y = 0;
var selectet = 1;
var buildingsSize = [];
for (let k in buildings) buildingsSize.push(k);
var maxSelectet = buildingsSize.length - 1;
selectetDisplay.textContent = "Selectet building: " + buildings[selectet].name
var map = [];
for (let index = 0; index < 50; index++) {
    var temp = [];
    for (let indexy = 0; indexy < 50; indexy++) {
        temp.push(new Tile(indexy, index, 0, 0));
    }
    map.push(temp);
}


setInterval(gameloop, 50);


function gameloop() {

    for (let index = 0; index < map.length; index++) {
        for (let indexy = 0; indexy < map[0].length; indexy++) {
            var tile = map[index][indexy];
            if (tile.canUpdate) {
                if (tile.lastUpdate >= tile.updateCooldown) {
                    tile.update();
                    tile.lastUpdate = 0;
                } else {
                    tile.lastUpdate++;
                }
            }

            ctx.translate(index * 12 + 6, indexy * 12 + 6);
            ctx.rotate(facingToAngle(tile.facing));
            ctx.drawImage(buildings[tile.type].color, 0 - 6, 0 - 6, 12, 12);
            ctx.rotate(- facingToAngle(tile.facing));
            ctx.translate(-(index * 12 + 6), -(indexy * 12 + 6));

            if (tile.space.length != 0) {

                switch (tile.space.length) {
                    case 1:
                        ctx.drawImage(materials[tile.space[0]].color, index * 12 + 2, indexy * 12 + 2, 8, 8);
                        break;
                    case 2:
                        ctx.drawImage(materials[tile.space[0]].color, index * 12 + 2, indexy * 12 + 6, 8, 4);
                        ctx.drawImage(materials[tile.space[1]].color, index * 12 + 2, indexy * 12 + 6, 8, 4);
                        break;
                }
            }
        }
    }

    ctx.fillStyle = "#a32020";
    ctx.strokeRect(x * 12, y * 12, 12, 12);

    var ids = [];
    for (let k in materials) ids.push(k);
    var baseText = "";
    for (let index = 0; index < ids.length; index++) {
        baseText = baseText + ids[index] + ":" + materials[ids[index]].amount + "" + "\n";
    }
    baseDisplay.textContent = baseText;

}

document.onkeyup = function KeyEventHandler(e) {
    var code = e.keyCode;
    switch (code) {
        case 87://w
            if (y > 0) {
                y--;
            }
            break;
        case 65://a
            if (x > 0) {
                x--;
            }
            break;
        case 83://s

            if (y < 50) {
                y++;
            }
            break;
        case 68://d
            if (x < 50) {
                x++;
            }
            break;
        case 32://space
            map[x][y] = new Tile(x, y, selectet, facing);
            break;
        case 81://q
            if (selectet == maxSelectet) {
                selectet = 1;
            } else {
                selectet++;
            }
            selectetDisplay.textContent = "Selectet building: " + buildings[selectet].name;
            break;
        case 82://r
            if (facing == maxSelectetFacing) {
                facing = 0;
            } else {
                facing++;
            }
            facingDisplay.textContent = " Facing: " + facings[facing];
            break;
    }
}

function facingToAngle(facing) {
    switch (facing) {
        case 0:
            return 90 * Math.PI / 180;
            break;
        case 2:
            return -90 * Math.PI / 180;
            break;
        case 3:
            return 0;
            break;
        case 1:
            return -180 * Math.PI / 180;
            break;
    }
}
