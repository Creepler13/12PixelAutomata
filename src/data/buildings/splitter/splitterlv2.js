var T = require("../../../Tile.js");
exports.class = class empty extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 1;
        this.hasSpace = true;
        this.hasInput = true;
        this.updateCooldown = 10;
        this.update = (World) => {
            if (this.space.length !== 0) {
                this.facing = World.reverseFacing(this.facing);
                var facingTo = World.facingTo(this.x, this.y, this.facing);
                World.moveStorageTo(this.x, this.y, facingTo.x, facingTo.y, 0);
            }
        }
    }
}

exports.texture = "textures/splitter2.png";
exports.name = "Splitter lv 2";
exports.price = "20";