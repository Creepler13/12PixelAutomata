/**
 *
 * @readonly
 * @enum {number}
 */

let facings = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
};

module.exports.facings = facings;

/**
 *
 * @param {number} x
 * @param {number} y
 * @param {facings} facing
 * @returns {{x:number y:number}}
 */
module.exports.facingTo = function facingTo(x, y, facing) {
    switch (facing) {
        case facings.UP: //up
            return { x: x, y: y - 1 };
        case facings.LEFT: //left
            return { x: x - 1, y: y };
        case facings.RIGHT: //right
            return { x: x + 1, y: y };
        case facings.DOWN: //down
            return { x: x, y: y + 1 };
    }
};

/**
 *
 * @param {facings} facingBase
 * @param {facings} facingAdd
 * @returns {facings} added facing
 */
module.exports.addFacings = function addFacings(facingBase, facingAdd) {
    return (facingBase + facingAdd) % 4;
};

/**
 *
 * @param {facings} facing
 * @returns {number}
 */
module.exports.facingToAngle = function facingToAngle(facing) {
    switch (facing) {
        case facings.UP:
            return (90 * Math.PI) / 180;
        case facings.DOWN:
            return (-90 * Math.PI) / 180;
        case facings.LEFT:
            return 0;
        case facings.RIGHT:
            return (-180 * Math.PI) / 180;
    }
};

/**
 *
 * @param {facings} facing
 * @returns {facings} reversed facing
 */
module.exports.reverseFacing = function reverseFacing(facing) {
    switch (facing) {
        case facings.UP:
            return facings.DOWN;
        case facings.DOWN:
            return facings.UP;
        case facings.LEFT:
            return facings.RIGHT;
        case facings.RIGHT:
            return facings.LEFT;
    }
};
