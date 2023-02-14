const { facings } = require("./utils/DirectionUtils");

module.exports = class Tile {
    /**
     *
     * @param {number} x
     * @param {number} y
     * @param {types} type
     * @param {facings} facing
     * @param {string} id
     */
    constructor(x, y, type, facing, id) {
        this.x = x;
        this.y = y;
        (this.facing = facing), (this.type = type);
        this.id = id;
    }

    /**
     * @typedef types
     * @enum
     */
    static types = {
        building: "buildings",
        material: "materials",
    };

    /**
     * @returns {HTMLImageElement}
     */
    getTexture(){

    }

    update() {}

    getData() {
        return window.gameData[this.type][this.id];
    }
};
