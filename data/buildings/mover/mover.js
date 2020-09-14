var T = require("../../../Tile.js");
exports.class = class mover extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 1;
        this.hasSpace = true;
        this.hasInput = true;
        this.updateCooldown = 20;
        this.spaceType = [];
        this.update = (world) => {
            var facingTo = world.facingTo(this.x, this.y, this.facing);
            if (this.space.length > 0) world.moveStorageTo(this.x, this.y, facingTo.x, facingTo.y, 0);
        };
    }
}

exports.texture = "textures/mover.png";
exports.name = "mover";
exports.price = "2";