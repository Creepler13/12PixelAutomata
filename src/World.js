const Tile = require("./Tile");

require("./DataManager");
exports.Map = class Map {
    constructor() {
        this.map = [];
    }
    /**
     *
     * @param {number} x
     * @param {number} y
     * @returns {Tile} tile
     */
    get(x, y) {
        if (this.posExits(x, y)) return this.map[x][y];
        else return undefined;
    }

    init(maxX, maxY) {
        this.maxX = maxX;
        this.maxY = maxY;
        for (let x = 0; x < maxX; x++) {
            this.map.push([]);
        }
    }

    /*
    init() {
        return new Promise((res) => {
            this.TileCreator.load("data").then(() => {
                var keys = this.TileCreator.getKeys("materials");
                keys.forEach((e) => {
                    this.Materials.set(e, 0);
                });
                res();
            });
        });
    }
*/

    /**
     *
     * @param {Tile} tile
     */
    set(tile) {
        if (!this.posExits(tile.x, tile.y)) return false;
        this.map[tile.x][tile.y] = tile;
        return true;
    }

    update(x, y) {
        this.get(x, y).update();
    }
    /*
        this.createNewMaterial = (x2, y2, material) => {
            var to = this.get(x2, y2);
            var temp = 0;
            to.spaceType.forEach(element => {
                if (element === material) temp++;
            });

            if (!to.hasSpace || !to.hasInput || to.space.length + 1 > to.maxSpace || (this.materialCountInTile(x2, y2, material) >= temp && to.spaceType.length !== 0)) { console.error("space Error"); return; };

            this.map[x2][y2].space.push(material);
        }

        this.moveStorageTo = (x, y, x2, y2, index) => {
            var from = this.get(x, y);
            var to = this.get(x2, y2);
            var material = this.map[x][y].space[index];
            var temp = 0;
            to.spaceType.forEach(element => {
                if (element === material) temp++;
            });

            if (!from.hasSpace || !to.hasSpace || !to.hasInput || to.space.length + 1 > to.maxSpace || from.space.length === 0 || index >= from.space.length || (this.materialCountInTile(x2, y2, material) >= temp && to.spaceType.length !== 0)) { return; };

            this.map[x2][y2].space.push(material);
            this.map[x][y].space.splice(index, 1);
        }

        this.materialCountInTile = (x, y, material) => {
            var tile = this.get(x, y);
            var count = 0;
            tile.space.forEach(element => {
                if (element === material) count++;
            });
            return count;
        }
*/

    levelUp(x, y) {
        var tile = this.get(x, y);
        this.set(x, y, "buildings", tile.type, tile.facing, tile.level + 1);
    }
    reset() {
        this.map = [];
    }

    getXLength() {
        return this.map.length;
    }

    posExits(x, y) {
        return x >= 0 && y >= 0 && x < this.maxX && y < this.maxY;
    }

    getYLength(i) {
        return this.map[i] === undefined ? 0 : this.map[i].length;
    }
};
