const Tile = require("./Tile");
const { Action, actions } = require("./Action");
const BuildingStorage = require("./buildingStorage");
module.exports = class Building extends Tile {
    constructor(x, y, facing, id) {
        super(x, y, Tile.types.building, id);
        this.facing = facing;
        this.level = 1;
        this.storage = new BuildingStorage(this);
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

        switch (data.actionMode) {
            case "cicle":
                if (!this.lastAction) this.lastAction = 0;
                this.lastAction++;
                if (this.lastAction >= data.action.length) this.lastAction = 0;
                let action = data.action[this.lastAction];
                this.performAction(action.type, action.data);
                break;
            default:
                data.action.forEach((action) => {
                    this.performAction(action.type, action.data);
                });
                break;
        }

        this.currentUpdateTick = 0;
    }

    performAction(type, data) {
        actions[type].performAction(this, data);
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
 *      storage:?number
 *      cost:{}
 *      upgrade:?[{
 *                 cost:number
 *                 mod:?{}
 *                 texture:?HTMLImageElement
 *               }]
 *      actionMode:?string
 *      action:?[{
 *              type:string
 *              data:?{}
 *              }]
 * }} BuildingData
 */
