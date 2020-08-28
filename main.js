var canvas = document.getElementById("canvas");
// @ts-ignore
var ctx = canvas.getContext("2d");
var selectetDisplay = document.getElementById("selectetDisplay");
var baseDisplay = document.getElementById("baseDisplay");
var facingDisplay = document.getElementById("facingDisplay");
var TC = require("./TileCreator");
var TileCreator = new TC.class();
TileCreator.loadTiles("buildings").then(() => { startGame() });
console.log(TileCreator)
var mapDimensions = 50;

var frame = 0;
var time = 0;
var boost = 1;


var facing = 0;
var facingsSize = [];
for (let k in facings) facingsSize.push(k);
var maxSelectetFacing = facingsSize.length - 1;
facingDisplay.textContent = " Facing: " + facings[facing];

function startGame() {
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
            temp.push(TileCreator.createTile(indexy, index, "emptyTile", 0));
        }
        map.push(temp);
    }
    map[10][10] = TileCreator.createTile(10, 10, 3, 0);
    map[10][11] = TileCreator.createTile(10, 11, 1, 0);

    var interval = setInterval(gameloop, 50);

    var ticks = 0;
}

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
    drawUI();
}

function drawUI() {
    ctx.globalAlpha = 0.6;
    ctx.translate(x * 12 + 6, y * 12 + 6);
    if (selectet !== 8) {
        ctx.rotate(facingToAngle(facing));
    }
    var selectetColor = buildings[selectet]["1"].color;
    if (selectet == 0) {
        selectetColor = document.getElementById("emptyUI")
    }
    ctx.drawImage(selectetColor, 0 - 6, 0 - 6, 12, 12);
    if (selectet !== 8) {
        ctx.rotate(- facingToAngle(facing));
    }
    ctx.translate(-(x * 12 + 6), -(y * 12 + 6));

    ctx.globalAlpha = 1;
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
            switch (selectet) {
                case 0:
                    materials["water"].amount = materials["water"].amount + buildings[map[x][y].type][1].price / 2
                    return;
                case 6:
                    map[x][y].space = [];
                    return;
                case 8:
                    if (buildings[map[x][y].type][map[x][y].level + 1] == undefined) { return; }
                    if (buildings[map[x][y].type][map[x][y].level + 1].price > materials["water"].amount) { return; }
                    materials["water"].amount = materials["water"].amount - buildings[map[x][y].type][map[x][y].level + 1].price
                    map[x][y].upgrade();
                    return;
            }
            map[x][y] = TileCreator.createTile(x, y, selectet, facing);
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
            if (selectet == 0) {
                selectet = maxSelectet;
            } else {
                selectet--;
            }
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

function moveToFacing(ix, iy, itemIn, facingIn) {
    var tile = map[ix][iy];
    var item;
    var facing;
    if (facingIn == undefined) {
        facing = tile.facing;
    } else {
        facing = facingIn;
    }
    if (itemIn == undefined) {
        item = tile.space[0];
    } else {
        item = itemIn;
    }
    switch (facing) {
        case 0: //up
            var otherTile = map[ix][iy - 1];
            return CheckTileToMove(otherTile, tile, item);
        case 3: //left
            var otherTile = map[ix - 1][iy];
            return CheckTileToMove(otherTile, tile, item);
        case 1: //right
            var otherTile = map[ix + 1][iy];
            return CheckTileToMove(otherTile, tile, item);
        case 2: //down
            var otherTile = map[ix][iy + 1];
            return CheckTileToMove(otherTile, tile, item);
    }
}

function CheckTileToMove(otherTile, tile, item) {
    if (otherTile == undefined) {
        return;
    }
    if (otherTile.type == 0) {
        console.log(otherTile)
    }
    if (tile.space.length != 0) {
        if (tile.isnew) {
            tile.isnew = false;
            return;
        } else {
            if (otherTile.hasInput) {
                if (
                    otherTile.spaceType.length == 0 ||
                    otherTile.spaceType.includes(item)
                ) {
                    if (otherTile.space.length < otherTile.maxSpace) {
                        otherTile.space.push(item);
                        tile.space.shift();
                        map[otherTile.y][otherTile.x] = otherTile;
                        map[tile.x][tile.y] = tile;
                    }
                }
            }
        }
    }
}
