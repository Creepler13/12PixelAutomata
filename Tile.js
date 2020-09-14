class Tile {
    constructor(x, y, type, facing) {
        this.x = x;
        this.y = y;
        this.lastUpdate = 0;
        this.level = 1;
        this.space = [];
        this.spaceType = [];
        this.isnew = false;
        this.type = type;
        this.canUpdate = false;
        this.updateCooldown = 0;
        this.update = () => {};
        this.facing = facing;
        this.upgrade = () => {
            this.level++;
        };
        this.doUpdate = () => {
            if (this.lastUpdate >= this.updateCooldown && this.canUpdate) {
                this.update();
                this.lastUpdate = 0;
            } else {
                this.lastUpdate++;
            }
        }
    }
}


module.exports = Tile;