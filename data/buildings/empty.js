var T = require("../../Tile.js");
exports.class = class empty extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = false;
        this.maxSpace = 1;
        this.hasInput = true;
        this.spaceType = [];
    }
}

exports.texture = "test";
exports.name = "empty";