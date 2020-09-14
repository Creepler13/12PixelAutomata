var T = require("../../Tile.js");
exports.class = class empty extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 2;
        this.hasInput = true;
        this.updateCooldown = 35
        this.spaceType = ["water", "energy"];
        this.update = (world) => {
            if (this.space.includes("water") && this.space.includes("energy")) {
                var facingTo = world.facingTo(this.x, this.y, this.facing);
                world.createNewMaterial(facingTo.x, facingTo.y, "steam");
                this.space = [];
            }
        }
    }
}

exports.texture = "textures/boiler.png";
exports.name = "Boiler";
exports.price = "50";