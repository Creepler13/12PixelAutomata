const Building = require("./tiles/Building");
const { facingToAngle } = require("./utils/DirectionUtils");

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Building} building
 */
module.exports.RenderBuilding = function RenderBuilding(ctx, building) {
    RenderImageWithRotation(
        ctx,
        building.x * 12,
        building.y * 12,
        12,
        12,
        building.getTexture(),
        facingToAngle(building.facing)
    );

    RenderMaterialsInBuilding(ctx, building);
};

/**
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {HTMLImageElement} imageTexture
 * @param {number} rotation
 */
function RenderImageWithRotation(ctx, x, y, width, height, imageTexture, rotation) {
    let width2 = width / 2,
        height2 = height / 2;
    ctx.translate(x + width2, y + height2);
    ctx.rotate(rotation);
    ctx.drawImage(imageTexture, -width2, -height2, width, height);
    ctx.rotate(-rotation);
    ctx.translate(-(x + width2), -(y + height2));
}

/**
 *
 * @param {CanvasRenderingContext2D} ctx
 * @param {Building} building
 */
function RenderMaterialsInBuilding(ctx, building) {
    let i = 0;

    Object.keys(building.storage.storage).forEach((material) => {
        if (i == 4) return;
        drawMaterial[i](ctx, getMaterialTexture(material), building.x * 12, building.y * 12);
        i++;
    });
}

let drawMaterial = [
    (ctx, img, x, y) => ctx.drawImage(img, x + 2, y + 2, 8, 8),
    (ctx, img, x, y) => ctx.drawImage(img, x + 6, y + 2, 4, 8),
    (ctx, img, x, y) => ctx.drawImage(img, x + 2, y + 6, 4, 4),
    (ctx, img, x, y) => ctx.drawImage(img, X + 6, y + 6, 4, 4),
];

/**
 *
 * @param {string} material
 * @returns {HTMLImageElement}
 */
function getMaterialTexture(material) {
    return window.gameData.materials[material].texture;
}
