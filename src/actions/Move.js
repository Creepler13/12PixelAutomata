const Action = require("../Action");
const Building = require("../tiles/Building");
const { facingTo, addFacings, facings } = require("../utils/DirectionUtils");
const World = require("../World");
module.exports = class Move extends Action {
    /**
     * 
     * @param {Building} building 
    
     */
    performAction(building, data) {
        /**
         * @type {World.Map}
         */
        let world = window.world;

        Object.keys(data).forEach((direction) => {
            let facing;
            if (direction == "dir") facing = building.facing;
            else facing = addFacings(building.facing, facings[direction]);
            let pos = facingTo(building.x, building.y, facing);
            if (!world.posExits(pos.x, pos.y)) return;
            /**@type {Building} */
            let otherTile = world.get(pos.x, pos.y);
            if (!otherTile) return;
            if (!otherTile.storage.canAdd(data[direction], 1)) return;
            building.storage.remove(data[direction], 1);
            otherTile.storage.add(data[direction], 1);
        });
    }
};
