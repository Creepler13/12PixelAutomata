class Tile {

    constructor(x, y, type, facing) {
        this.x = x;
        this.lastUpdate = 0;
        this.canUpdate;
        this.updateCooldown = 0;
        this.space = [];
        this.y = y;
        this.isnew;
        this.type = type;
        this.hasSpace;
        this.update;
        this.facing = facing;
        switch (type) {
            case 0:
                this.canUpdate = false;
                this.maxSpace = 1;
                this.hasInput = true;
                this.spaceType = [];
                break;
            case 1:
                this.updateCooldown = 40;
                this.canUpdate = true;
                this.hasInput = false;
                this.maxSpace = 1;
                this.spaceType = [];
                this.update = () => {
                    if (this.space.length == 0) { this.space.push("water"); this.isnew = true; }
                    if (this.isnew) {
                        this.isnew = false;
                        return;
                    } else {
                        moveToFacing(this.x, this.y);
                    }
                };
                break;
            case 2://mover
                this.updateCooldown = 20;
                this.spaceType = [];
                this.hasInput = true;
                this.maxSpace = 1;
                this.canUpdate = true;
                this.update = () => { moveToFacing(this.x, this.y); }
                break;
            case 3:
                this.updateCooldown = 20;
                this.canUpdate = true;
                this.maxSpace = 1;
                this.hasInput = true;
                this.spaceType = [];
                this.update = () => {
                    if (this.space.length == 0) {
                        materials[this.space[0]].amount++;
                        this.space = [];
                    }
                }
                break;

            case 4:
                this.updateCooldown = 60;
                this.maxSpace = 2;
                this.spaceType = ["water"];
                this.hasInput = true;
                this.canUpdate = true;
                this.update = () => {
                    if (this.space[0] == "water" && this.space[1] == "water") {
                        moveToFacing(this.x, this.y, "energy");
                    }
                }
                break;

        };
    }
}

function moveToFacing(x, y, itemIn) {
    var tile = map[x][y];
    var item;
    if (itemIn == undefined) {
        item = tile.space[0];
    } else {
        item = itemIn
    }
    switch (tile.facing) {
        case 0://up
            var otherTile = map[x][y - 1];
            if (tile.space.length != 0) {
                if (tile.isnew) {
                    tile.isnew = false;
                    return;
                } else {
                    if (otherTile.hasInput) {
                        if (otherTile.spaceType.length == 0 || otherTile.spaceType.includes(item)) {
                            if (otherTile.space.length < otherTile.maxSpace) {
                                otherTile.space.push(item)
                                tile.space = [];
                            }
                        }
                    }
                }
            }
            map[x][y - 1] = otherTile;
            map[x][y] = tile;
            break;
        case 3://left
            var otherTile = map[x - 1][y];
            if (tile.space.length != 0) {
                if (tile.isnew) {
                    tile.isnew = false;
                    return;
                } else {
                    if (otherTile.hasInput) {
                        if (otherTile.spaceType.length == 0 || otherTile.spaceType.includes(item)) {
                            if (otherTile.space.length < otherTile.maxSpace) {
                                otherTile.space.push(item)
                                tile.space = [];
                            }
                        }
                    }
                }
            }
            map[x - 1][y] = otherTile;
            map[x][y] = tile;
            break;
        case 1://right
            var otherTile = map[x + 1][y];
            if (tile.space.length != 0) {
                if (tile.isnew) {
                    tile.isnew = false;
                    return;
                } else {
                    if (otherTile.hasInput) {
                        if (otherTile.spaceType.length == 0 || otherTile.spaceType.includes(item)) {
                            if (otherTile.space.length < otherTile.maxSpace) {
                                otherTile.space.push(item)
                                tile.space = [];
                            }
                        }
                    }
                }
            }
            map[x + 1][y] = otherTile;
            map[x][y] = tile;
            break;
        case 2://down
            var otherTile = map[x][y + 1];
            if (tile.space.length != 0) {
                if (tile.isnew) {
                    tile.isnew = false;
                    return;
                } else {
                    if (otherTile.hasInput) {
                        if (otherTile.spaceType.length == 0 || otherTile.spaceType.includes(item)) {
                            if (otherTile.space.length < otherTile.maxSpace) {
                                otherTile.space.push(item)
                                tile.space = [];
                            }
                        }
                    }
                }
            }
            map[x][y + 1] = otherTile;
            map[x][y] = tile;
            break;
    }


}