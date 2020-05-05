var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var selectetDisplay = document.getElementById("selectetDisplay");
var baseDisplay = document.getElementById("baseDisplay");
var facingDisplay = document.getElementById("facingDisplay");

var frame = 0;
var time = 0;
var boost = 1;

var materials = {
    "water": { "color": document.getElementById("water"), "amount": 0 },
    "energy": { "color": document.getElementById("energy"), "amount": 0 }
}
var buildings = {
    "0": { "1": { "name": "empty", "color": document.getElementById("empty"), "price": 0, "updateCooldown": 0 } },
    "1": { "1": { "name": "water-collector", "color": document.getElementById("water-collector"), "price": 20, "updateCooldown": 40 } },
    "2": { "1": { "name": "mover", "color": document.getElementById("mover"), "price": 2, "updateCooldown": 20 } },
    "3": { "1": { "name": "base", "color": document.getElementById("base"), "price": 100, "updateCooldown": 5 } },
    "4": { "1": { "name": "factory", "color": document.getElementById("transformator"), "price": 50, "updateCooldown": 60 } },
    "5": { "1": { "name": "splitter", "color": document.getElementById("splitter"), "price": 10, "updateCooldown": 20 } },
    "6": { "1": { "name": "clear", "color": document.getElementById("empty"), "price": 0, "updateCooldown": 0 } },
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
facingDisplay.textContent = " Facing: " + facings[facing];


var x = 0;
var y = 0;
var selectet = 0;
var buildingsSize = [];
for (let k in buildings) buildingsSize.push(k);
var maxSelectet = buildingsSize.length - 1;
selectetDisplay.textContent = "Selectet building: " + buildings[selectet][1].name
var map = [];
for (let index = 0; index < 50; index++) {
    var temp = [];
    for (let indexy = 0; indexy < 50; indexy++) {
        temp.push(new Tile(indexy, index, 0, 0));
    }
    map.push(temp);
}
map[10][10] = new Tile(10, 10, 3, 0);
map[10][11] = new Tile(10, 11, 1, 0);

setInterval(gameloop, 50);


var ticks = 0;

function gameloop() {

    if (boost == 2) {
        ticks++;
        if (ticks > 150) {
            boost = 1;
            ticks = 0;
        }
    }
    if (materials.energy.amount > 50) {

        boost = 2;
        materials.energy.amount = materials.energy.amount - 50;
    }

    for (let index = 0; index < map.length; index++) {
        for (let indexy = 0; indexy < map[0].length; indexy++) {
            var tile = map[index][indexy];
            if (tile.canUpdate) {
                if (tile.lastUpdate >= buildings[tile.type][tile.level].updateCooldown / boost) {
                    tile.update();
                    tile.lastUpdate = 0;
                } else {
                    tile.lastUpdate++;
                }
            }
            ctx.translate(index * 12 + 6, indexy * 12 + 6);
            ctx.rotate(facingToAngle(tile.facing));
            ctx.drawImage(buildings[tile.type][tile.level].color, 0 - 6, 0 - 6, 12, 12);
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
    ctx.font = '12px arial';
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 600, 600, 800);
    var ids = [];
    for (let k in materials) ids.push(k);
    var baseText = "";
    for (let index = 1; index < ids.length + 1; index++) {
        ctx.fillStyle = "#000000"
        ctx.drawImage(materials[ids[index - 1]].color, 50, 600 + index * 12, 8, 8);
        ctx.fillText(": " + materials[ids[index - 1]].amount, 50 + 12, 600 + index * 12 + 8);
        baseText = baseText + ids[index - 1] + ":" + materials[ids[index - 1]].amount + "" + "\n";
    }
    baseDisplay.textContent = baseText;

    if (buildings[selectet][1].price > materials["water"].amount) {
        ctx.fillStyle = "#ff0000"
    }
    ctx.drawImage(buildings[selectet][1].color, 300, 600 + 13, 12, 12);
    ctx.fillText("Selected Building :        " + buildings[selectet][1].price, 300 - 110, 600 + 12 + 12);
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
            if (y < 49) {
                y++;
            }
            break;
        case 68://d
            if (x < 49) {
                x++;
            }
            break;
        case 32://space
            if (buildings[selectet][1].price > materials["water"].amount) {
                return;
            }
            if (selectet == 0) {
                materials["water"].amount = materials["water"].amount + buildings[map[x][y].type][1].price / 2
            }
            if (selectet == 6) {
                map[x][y].space = [];
            } else {
                map[x][y] = new Tile(x, y, selectet, facing);
            }
            break;
        case 81://q
            if (selectet == maxSelectet) {
                selectet = 0;
            } else {
                selectet++;
            }
            selectetDisplay.textContent = "Selectet building: " + buildings[selectet][1].name;
            break;
        case 82://r
            if (facing == maxSelectetFacing) {
                facing = 0;
            } else {
                facing++;
            }
            facingDisplay.textContent = " Facing: " + facings[facing];
            break;
        case 69://e
            if (buildings[map[x][y].type][map[x][y].level + 1] == undefined) { return; }
            if (buildings[map[x][y].type][map[x][y].level + 1].price > materials["water"].amount) { return; }
            map[x][y].upgrade();
            materials["water"].amount = materials["water"].amount - buildings[map[x][y].type][map[x][y].level + 1].price
            break;
    }
}

function facingToAngle(facing) {
    switch (facing) {
        case 0:
            return 90 * Math.PI / 180;
        case 2:
            return -90 * Math.PI / 180;
        case 3:
            return 0;
        case 1:
            return -180 * Math.PI / 180;
    }
}

function reverseFacing(facing) {
    switch (facing) {
        case 0:
            return 2;
        case 2:
            return 0;
        case 3:
            return 1;
        case 1:
            return 3;
    }
}
