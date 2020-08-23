var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var selectetDisplay = document.getElementById("selectetDisplay");
var baseDisplay = document.getElementById("baseDisplay");
var facingDisplay = document.getElementById("facingDisplay");

var mapDimensions = 50;

var frame = 0;
var time = 0;
var boost = 1;

var materials = {
    "water": { "color": document.getElementById("water"), "amount": 100 },
    "energy": { "color": document.getElementById("energy"), "amount": 0 },
    "steam": { "color": document.getElementById("water"), "amount": 0 }
}
var buildings = {
    "0": { "1": { "name": "empty", "color": document.getElementById("empty"), "price": 0, "updateCooldown": 0 } },
    "1": { "1": { "name": "water-collector", "color": document.getElementById("water-collector"), "price": 20, "updateCooldown": 40 } },
    "2": { "1": { "name": "mover", "color": document.getElementById("mover"), "price": 2, "updateCooldown": 20 }, "2": { "name": "mover lv.2", "color": document.getElementById("mover2"), "price": 7, "updateCooldown": 10 } },
    "3": { "1": { "name": "base", "color": document.getElementById("base"), "price": 100, "updateCooldown": 5 } },
    "4": { "1": { "name": "factory", "color": document.getElementById("transformator"), "price": 50, "updateCooldown": 60 } },
    "5": { "1": { "name": "splitter", "color": document.getElementById("splitter"), "price": 10, "updateCooldown": 20 }, "2": { "name": "splitter lv.2", "color": document.getElementById("splitter2"), "price": 20, "updateCooldown": 10 } },
    "6": { "1": { "name": "clear", "color": document.getElementById("empty"), "price": 0, "updateCooldown": 0 } },
    "7": { "1": { "name": "boiler", "color": document.getElementById("transformator"), "price": 50, "updateCooldown": 35 } },
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
for (let index = 0; index < mapDimensions; index++) {
    var temp = [];
    for (let indexy = 0; indexy < mapDimensions; indexy++) {
        temp.push(new Tile(indexy, index, 0, 0));
    }
    map.push(temp);
}
map[10][10] = new Tile(10, 10, 3, 0);
map[10][11] = new Tile(10, 11, 1, 0);

var interval = setInterval(gameloop, 50);


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


    ctx.fillText("Selected Building :", 300 - 110, 600 + 12 + 12);
    var idsbui = [];
    for (let k in buildings[selectet]) idsbui.push(k);
    for (let index = 1; index < idsbui.length + 1; index++) {
      console.log(selectet)
      ctx.drawImage(buildings[selectet][index].color, 300, 600 + index * 13, 12, 12);
        if (buildings[selectet][index].price > materials["water"].amount) {
            ctx.fillStyle = "#ff0000"
        }
        ctx.fillText(buildings[selectet][index].price, 300 + 15, 600 + index * 12 + 12);
    }

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
            materials["water"].amount = materials["water"].amount - buildings[map[x][y].type][map[x][y].level + 1].price
            map[x][y].upgrade();
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

function test() {
    map = 1;
}
//WIP
document.getElementById("save").onclick = function save() {
    var out = "";
    var counter = 0;
    var oldsave = map[0][0].type + "," + map[0][0].facing + "," + map[0][0].level;
    for (let indexy = 0; indexy < map.length; indexy++) {
        for (let index = 0; index < map[0].length; index++) {
            var temp = map[index][indexy].type + "," + map[index][indexy].facing + "," + map[index][indexy].level;
            if (temp == oldsave) {
                counter++;
            } else {
                if (counter == 0) { counter == 1 };
                out = out + counter + ":" + oldsave + "/";
                counter = 1;
            }
            oldsave = temp;
        }
    }
    out = out + counter + ":" + oldsave + "/";
    out = out + materials["water"].amount + "," + materials["energy"].amount;
    document.getElementById("saveout").textContent = out;
}
//WIP
document.getElementById("load").onclick = function load() {
  console.log("loaded")  
  var input = document.getElementById('text').value;
    var data = input.split("/");
    var mate = data.pop();
    var tempmap = [];
    var mapdimssave = [];
    var counter = 0;
    for (let i = 0; i < data.length; i++) {
        var element = data[i];
        var datatemp = element.split(":");
        var datetemp = datatemp[1].split(",");
        counter = parseInt(datatemp[0]);
        for (let indexc = mapdimssave.length - 1; 0 < counter; indexc++) {

            console.log(datetemp[1]);

            var tiletemp = new Tile(mapdimssave.length, tempmap.length, datetemp[0], datetemp[1]);
            tiletemp.level = datetemp[2];
            mapdimssave.push(tiletemp);
            counter--;
            if (mapdimssave.length == mapDimensions) {
                tempmap.push(mapdimssave);
                mapdimssave = [];
                indexc = 0;
            }
        }
    }
    map = tempmap;


}