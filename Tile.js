class Tile {
  constructor(x, y, type, facing) {
    this.x = x;
    this.lastUpdate = 0;
    this.canUpdate;
    this.level = 1;
    this.upgrade = undefined;
    this.space = [];
    this.y = y;
    this.isnew;
    this.type = type;
    this.hasSpace = false;
    this.update;
    this.facing = facing;
    this.upgrade = () => {
      this.level++;
    };
    switch (type) {
      case 0:
        this.canUpdate = false;
        this.maxSpace = 1;
        this.hasInput = true;
        this.spaceType = [];
        break;
      case 1:
        this.canUpdate = true;
        this.hasInput = false;
        this.maxSpace = 1;
        this.spaceType = [];
        this.update = () => {
          if (this.space.length == 0) {
            this.space.push("water");
            this.isnew = true;
          }
          if (this.isnew) {
            this.isnew = false;
            return;
          } else {
            moveToFacing(this.x, this.y);
          }
        };
        break;
      case 2: //mover
        this.spaceType = [];
        this.hasInput = true;
        this.maxSpace = 1;
        this.canUpdate = true;
        this.update = () => {
          moveToFacing(this.x, this.y);
        };
        break;
      case 3:
        this.canUpdate = true;
        this.maxSpace = 1;
        this.hasInput = true;
        this.spaceType = [];
        this.update = () => {
          if (this.space.length != 0) {
            materials[this.space[0]].amount++;
            this.space = [];
          }
        };
        break;
      case 4:
        this.maxSpace = 2;
        this.spaceType = ["water", "water"];
        this.hasInput = true;
        this.canUpdate = true;
        this.update = () => {
          if (this.spaceType == this.space) {
            return moveToFacing(this.x, this.y, "energy");
          }
        };
        break;
      case 5:
        this.maxSpace = 1;
        this.spaceType = [];
        this.hasInput = true;
        this.canUpdate = true;
        this.update = () => {
          this.facing = reverseFacing(this.facing);
          return moveToFacing(this.x, this.y);
        };
        break;
      case 7:
        this.maxSpace = 2;
        this.spaceType = ["water", "energy"];
        this.hasInput = true;
        this.canUpdate = true;
        this.update = () => {
          if (this.space[0] == "water" && this.space[1] == "water") {
            return moveToFacing(this.x, this.y, "energy");
          }
        };
        break;
    }
  }
}
