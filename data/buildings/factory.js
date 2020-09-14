var T = require("../../Tile.js");
exports.class = class empty extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 2;
        this.hasInput = true;
        this.updateCooldown = 60
        this.spaceType = ["water", "water"];
        this.update = (world) => {
            if (this.space == this.spaceType) {
                var facingTo = world.facingTo(this.x, this.y, this.facing);
                world.createNewMaterial(facingTo.x, facingTo.y, "energy");
                this.space = [];
            }
        }
    }
}

exports.texture = "textures/factory.png";
exports.name = "Factory";
exports.price = "50";