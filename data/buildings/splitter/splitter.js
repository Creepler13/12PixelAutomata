var T = require("../../../Tile.js");
exports.class = class empty extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 1;
        this.hasInput = true;
        this.hasSpace = true;
        this.updateCooldown = 20;
        this.update = (World) => {
            if (this.space.length !== 0) {
                this.facing = World.reverseFacing(this.facing);
                var facingTo = World.facingTo(this.x, this.y, this.facing);
                World.moveStorageTo(this.x, this.y, facingTo.x, facingTo.y, 0);
            }
        }
    }
}

exports.texture = "textures/splitter.png";
exports.name = "Splitter";
exports.price = "10";