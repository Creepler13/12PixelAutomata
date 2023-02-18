require("./justLoad")
var canvas = document.getElementById("canvas");
// @ts-ignore
var ctx = canvas.getContext("2d");
var selectetDisplay = document.getElementById("selectetDisplay");
var baseDisplay = document.getElementById("baseDisplay");
const { RenderBuilding } = require("./Renderer");
const Tile = require("./Tile");
const Building = require("./tiles/Building");
const { InitUI } = require("./ui/mainUI");
const { facingToAngle, facings } = require("./utils/DirectionUtils");

InitUI();
var mapClass = require("./World");

window.world = new mapClass.Map();

/** @type {mapClass.Map} */
let World = window.world;

var mapDimensions = 50;

startGame();

var x, y, selectet, maxSelectet, tool;
var toolMax = 2;

var facing = 0;
var maxSelectetFacing = 3;

var tools = {
    0: "build",
    1: "upgrade",
    2: "delete",
};

function startGame() {
    console.log("game Started");
    x = 0;
    y = 0;
    selectet = 0;
    tool = 0;
    maxSelectet = 0;

    maxSelectet = Object.keys(window.gameData.buildings).length;

    selectetDisplay.textContent = "Selection WIP";
    //    "Selectet building: " + World.TileCreator.getData("buildings", getSelectet(), 1, "name");
    World.init(mapDimensions, mapDimensions);
    World.set(new Building(9, 10, facings.UP, "mover"));

    World.set(new Building(9, 9, facings.UP, "mover"));

    World.set(new Building(10, 9, facings.UP, "mover"));

    World.set(new Building(10, 10, facings.UP, "mover"));
    World.set(new Building(10, 12, facings.UP, "water-collector"));
    World.set(new Building(10, 11, facings.UP, "boiler"));
    World.set(new Building(10, 10, facings.UP, "dynamo"));
    console.log(World);

    //World.set(10, 10, "buildings", "base", 0, 1);
    //World.Materials.set("water", 20);
    var interval = setInterval(gameloop, 20);
}

function gameloop() {
    for (let index = 0; index < World.maxX; index++) {
        for (let indexy = 0; indexy < World.maxY; indexy++) {
            let tile = World.get(index, indexy);

            if (!tile) continue;

            if (tile.type == Tile.types.building) tile.storage.onBeforeTick();
        }
    }

    for (let index = 0; index < World.maxX; index++) {
        for (let indexy = 0; indexy < World.maxY; indexy++) {
            let tile = World.get(index, indexy);

            if (!tile) continue;

            tile.update();
        }
    }

    for (let index = 0; index < World.maxX; index++) {
        for (let indexy = 0; indexy < World.maxY; indexy++) {
            let tile = World.get(index, indexy);
            if (!tile) continue;
            if (tile.type == Tile.types.building) {
                tile.storage.onAfterTick();
                RenderBuilding(ctx, tile);
            }
        }
    }

    //   drawUI();
}

function drawUI() {
    ctx.globalAlpha = 0.6;
    ctx.translate(x * 12 + 6, y * 12 + 6);
    if (tool === 0) {
        ctx.rotate(facingToAngle(facing));

        var selectetColor = World.TileCreator.getTexture("buildings", getSelectet(), 1);
        ctx.drawImage(selectetColor, 0 - 6, 0 - 6, 12, 12);
        ctx.rotate(-facingToAngle(facing));
    } else {
        var selectetColor = World.TileCreator.getTexture("ui", tools[tool], 1);
        ctx.drawImage(selectetColor, 0 - 6, 0 - 6, 12, 12);
    }
    ctx.translate(-(x * 12 + 6), -(y * 12 + 6));
    ctx.globalAlpha = 1;

    ctx.font = "12px arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 600, 600, 800);
    var ids = World.Materials.getKeys();
    var baseText = "";
    for (let index = 0; index < ids.length; index++) {
        ctx.fillStyle = "#000000";
        ctx.drawImage(
            World.TileCreator.getTexture("materials", ids[index], 1),
            50,
            600 + (index + 1) * 12,
            8,
            8
        );
        ctx.fillText(": " + World.Materials.get(ids[index]), 50 + 12, 600 + (index + 1) * 12 + 8);
        baseText = baseText + ids[index] + ":" + World.Materials.get(ids[index]) + "" + "\n";
    }
    baseDisplay.textContent = baseText;

    ctx.fillText("Selected Building :", 300 - 110, 600 + 12 + 12);

    for (
        let index = 1;
        index < World.TileCreator.getEntrySize("buildings", getSelectet()) + 1;
        index++
    ) {
        ctx.drawImage(
            World.TileCreator.getTexture("buildings", getSelectet(), index),
            300,
            600 + index * 13,
            12,
            12
        );
        if (
            World.TileCreator.getData("buildings", getSelectet(), index, "price") >
            World.Materials.get("water")
        ) {
            ctx.fillStyle = "#ff0000";
        }
        ctx.fillText(
            World.TileCreator.getData("buildings", getSelectet(), index, "price"),
            300 + 15,
            600 + index * 12 + 12
        );
    }
}

document.onkeyup = function KeyEventHandler(e) {
    var code = e.keyCode;
    switch (code) {
        case 87: //w
            if (y > 0) {
                y--;
            }
            break;
        case 65: //a
            if (x > 0) {
                x--;
            }
            break;
        case 83: //s
            if (y < 49) {
                y++;
            }
            break;
        case 68: //d
            if (x < 49) {
                x++;
            }
            break;
        case 32: //space
            switch (tool) {
                case 0:
                    if (
                        World.TileCreator.getData("buildings", getSelectet(), 1, "price") >
                            World.Materials.get("water") &&
                        getSelectet() ==
                            World.TileCreator.getData("buildings", World.get(x, y).type)
                    )
                        break;
                    World.Materials.set(
                        "water",
                        World.Materials.get("water") -
                            World.TileCreator.getData("buildings", getSelectet(), 1, "price") +
                            World.TileCreator.getData(
                                "buildings",
                                World.get(x, y).type,
                                World.get(x, y).level,
                                "price"
                            ) /
                                2
                    );
                    World.set(x, y, "buildings", getSelectet(), facing, 1);

                    break;
                case 1:
                    console.log(World.TileCreator.getEntrySize("buildings", World.get(x, y).type));
                    if (
                        World.TileCreator.getEntrySize("buildings", World.get(x, y).type) <=
                        World.get(x, y).level
                    )
                        break;
                    if (
                        World.TileCreator.getData(
                            "buildings",
                            World.get(x, y).type,
                            World.get(x, y).level + 1,
                            "price"
                        ) > World.Materials.get("water")
                    )
                        break;
                    World.Materials.set(
                        "water",
                        World.Materials.get("water") -
                            World.TileCreator.getData(
                                "buildings",
                                getSelectet(),
                                World.get(x, y).level + 1,
                                "price"
                            ) +
                            World.TileCreator.getData(
                                "buildings",
                                getSelectet(),
                                World.get(x, y).level,
                                "price"
                            ) /
                                2
                    );
                    World.levelUp(x, y);
                    return;
                case 2:
                    World.Materials.set(
                        "water",
                        World.Materials.get("water") +
                            World.TileCreator.getData(
                                "buildings",
                                getSelectet(),
                                World.get(x, y).level,
                                "price"
                            ) /
                                2
                    );
                    World.set(x, y, "buildings", "empty", 0, 1);
                    return;
            }
            break;
        case 81: //q
            if (selectet == maxSelectet) {
                selectet = 0;
            } else {
                selectet++;
            }
            if (World.TileCreator.getData("buildings", getSelectet(), 1, "canBuild") === false) {
                if (selectet == maxSelectet) {
                    selectet = 0;
                } else {
                    selectet++;
                }
            }
            selectetDisplay.textContent =
                "Selectet building: " +
                World.TileCreator.getData("buildings", getSelectet(), 1, "name");
            break;
        case 82: //r
            if (facing == maxSelectetFacing) {
                facing = 0;
            } else {
                facing++;
            }
            break;
        case 69: //e
            if (selectet == 0) {
                selectet = maxSelectet;
            } else {
                selectet--;
            }
            if (World.TileCreator.getData("buildings", getSelectet(), 1, "canBuild") === false) {
                if (selectet == 0) {
                    selectet = maxSelectet;
                } else {
                    selectet--;
                }
            }
            selectetDisplay.textContent =
                "Selectet building: " +
                World.TileCreator.getData("buildings", getSelectet(), 1, "name");
            break;
        case 84: //t
            if (tool == toolMax) {
                tool = 0;
            } else {
                tool++;
            }
            break;
    }
};

function getSelectet() {
    return World.TileCreator.typeNumberToName("buildings", selectet);
}
