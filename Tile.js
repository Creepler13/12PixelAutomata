class Tile {

    constructor(x, y, type, facing) {
        console.log(type)
        this.x = x;
        this.lastUpdate = 0;
        this.canUpdate;
        this.updateCooldown = 0;
        this.space = "empty"
        this.y = y;
        this.isnew;
        this.type = type;
        this.hasSpace;
        this.update;
        this.facing = facing;
        switch (type) {
            case 0:
                this.hasSpace = [];
                this.canUpdate = false;
                break;
            case 1:
                this.updateCooldown = 40;
                this.hasSpace = ["water"];
                this.canUpdate = true;
                this.update = () => {
                    if (this.space == "empty") { this.space = "water"; this.isnew = true; }
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
                this.color = "#7c9f9e";
                this.hasSpace = [];
                this.canUpdate = true;
                this.update = () => { moveToFacing(this.x, this.y); }
                break;
            case 3:
                this.updateCooldown = 20;
                this.hasSpace = [];
                this.canUpdate = true;
                this.update = () => {
                    if (this.space != "empty") {
                        materials[this.space].amount++;
                        this.space = "empty";
                    }
                }
                break;
        };
    }
}

function moveToFacing(x, y) {
    var tile = map[x][y];
    switch (tile.facing) {
        case 0://up
            if (map[x][y - 1].space == "empty" && tile.space != "empty") {
                if (tile.isnew) {
                    tile.isnew = false;
                    return;
                } else {
                    map[x][y - 1].space = tile.space;
                    tile.space = "empty";
                }
            }
            break;
        case 3://left
            if (map[x - 1][y].space == "empty" && tile.space != "empty") {
                if (tile.isnew) {
                    tile.isnew = false;
                    return;
                } else {
                    map[x - 1][y].space = tile.space;
                    tile.space = "empty";
                }
            }
            break;
        case 1://right
            if (map[x + 1][y].space == "empty" && tile.space != "empty") {
                if (tile.isnew) {
                    tile.isnew = false;
                    return;
                } else {
                    map[x + 1][y].space = tile.space;
                    tile.space = "empty";
                }
            }
            break;
        case 2://down
            if (map[x][y + 1].space == "empty" && tile.space != "empty") {
                if (tile.isnew) {
                    tile.isnew = false;
                    return;
                } else {
                    map[x][y + 1].space = tile.space;
                    tile.space = "empty";
                }
            }
            break;
    }


}