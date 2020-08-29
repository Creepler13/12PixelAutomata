var T = require("../../../Tile.js");
exports.class = class mover1 extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 1;
        this.hasInput = true;
        this.spaceType = [];
    }
}

exports.texture = "test";
exports.name = "mover1";