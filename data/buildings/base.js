var T = require("../../Tile.js");
exports.class = class empty extends T {
    constructor(x, y, type, facing) {
        super(x, y, type, facing);
        this.canUpdate = true;
        this.maxSpace = 1;
        this.hasInput = true;
        this.updateCooldown = 5
        this.update = (world) => {
            if (this.space.length != 0) {
                world.Materials.set(this.space[0], world.Materials.get(this.space[0]) + 1);
                this.space = [];
            }
        }
    }
}
exports.texture = "textures/base.png";
exports.name = "Base";
exports.price = "100";