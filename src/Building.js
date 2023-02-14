const Tile = require("./Tile");

module.exports = class Building extends Tile {
    constructor(x, y, facing, id) {
        super(x, y, "building");
        this.facing = facing;
        this.level = 1;
        this.space = [];
        this.spaceType = [];
        this.canUpdate = false;
        this.currentUpdateTick = 0;
    }


    upgrade(){
        
        this.level++;
    };

    update(){

    }
};
