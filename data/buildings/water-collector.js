var T = require("../../Tile.js");
exports.class = class empty extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 1;
        this.hasInput = false;
        this.updateCooldown = 40
        this.update = (world) => {
            if (this.space.length == 0) {
                this.space.push("water");
            } else {
                var facingTo = world.facingTo(this.x, this.y, this.facing);
                world.moveStorageTo(this.x, this.y, facingTo.x, facingTo.y, 0);
            }
        }
    }
}

exports.texture = "textures/water-collector.png";
exports.name = "Water Collector";
exports.price = "20";