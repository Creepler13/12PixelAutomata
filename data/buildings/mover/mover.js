var T = require("../../../Tile.js");
exports.class = class mover extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 1;
        this.hasInput = true;
        this.spaceType = [];
    }
}

exports.texture = "textures/mover.png";
exports.name = "mover";