const Tile = require("../Tile");
const actions = require("../Action").loadActions()
const BuildingStorage = require("../buildingStorage");
const { facings } = require("../utils/DirectionUtils");
module.exports = class Building extends Tile {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {facings} facing
     * @param {string} id
     */
    constructor(x, y, facing, id) {
        super(x, y, Tile.types.building, facing, id);
        this.level = 1;
        this.storage = new BuildingStorage(this);
        this.currentUpdateTick = 0;
    }

    getTexture() {
        let data = this.getData();
        if (this.level == 1) return data.texture;
        if (data.upgrade)
            if (data.upgrade[data.level - 2]) return data.upgrade[data.level - 2].texture;
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
 *      allowedInput:?[string]
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
