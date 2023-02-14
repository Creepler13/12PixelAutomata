const Tile = require("./Tile");

module.exports = class Building extends Tile {
    constructor(x, y, facing, id) {
        super(x, y, Tile.types.building, id);
        this.facing = facing;
        this.level = 1;
        this.space = [];
        this.spaceType = [];
        this.currentUpdateTick = 0;
    }

    upgrade() {
        this.level++;
    }

    update() {
        let data = this.getData();

        if (!data.action) return;
        this.currentUpdateTick++;
        if (this.currentUpdateTick < data.updateTicks) return;



        this.currentUpdateTick=0; 
    }

    /**
     *
     * @returns {BuildingData}
     */
    getData() {
        return super.getData();
    }
};

/**
 * @typedef{{
 *      name:string
 *      texture:HTMLImageElement
 *      updateTicks:?number
 *      cost:{}
 *      upgrade:?[{
 *                 cost:number
 *                 mod:?{}
 *                 texture:?HTMLImageElement
 *               }]
 *      action:?[{
 *              type:string
 *              data:?{}
 *              }]
 * }} BuildingData
 */
