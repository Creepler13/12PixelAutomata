var TC = require("./TileCreator");
var DataStorage = require("./DataStorage");
exports.Map = class Map {
    constructor() {

        this.TileCreator = new TC.TileCreator();
        this.Materials = new DataStorage.DataStorage();

        this.map = [];

        this.get = (x, y) => {
            return this.map[x][y];
        }

        this.facings = {
            "UP": 0,
            "RIGHT": 1,
            "DOWN": 2,
            "LEFT": 3
        }

        this.init = () => {
            return new Promise((res) => {
                this.TileCreator.load("data").then(() => {
                    var keys = this.TileCreator.getKeys("materials");
                    keys.forEach((e) => {
                        this.Materials.set(e, 0);
                    })
                    res();
                })
            })
        }

        this.set = (x, y, dir, type, facing, level) => {
            if (this.map[x] === undefined) {
                this.map[x] = [];
            }
            this.map[x][y] = this.TileCreator.createTile(x, y, dir, type, facing, level);
        }

        this.update = (x, y) => {
            this.get(x, y).doUpdate(this);
        }

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

        this.facingTo = (x, y, facing) => {
            switch (facing) {
                case this.facings.UP: //up
                    return { "x": x, "y": y - 1 }
                case this.facings.LEFT: //left
                    return { "x": x - 1, "y": y }
                case this.facings.RIGHT: //right
                    return { "x": x + 1, "y": y }
                case this.facings.DOWN: //down
                    return { "x": x, "y": y + 1 }
            }

        }

        this.facingToAngle = (facing) => {
            switch (facing) {
                case this.facings.UP:
                    return 90 * Math.PI / 180;
                case this.facings.DOWN:
                    return -90 * Math.PI / 180;
                case this.facings.LEFT:
                    return 0;
                case this.facings.RIGHT:
                    return -180 * Math.PI / 180;
            }
        }

        this.reverseFacing = (facing) => {
            switch (facing) {
                case this.facings.UP:
                    return this.facings.DOWN;
                case this.facings.DOWN:
                    return this.facings.UP;
                case this.facings.LEFT:
                    return this.facings.RIGHT;
                case this.facings.RIGHT:
                    return this.facings.LEFT;
            }
        }

        this.levelUp = (x, y) => {
            var tile = this.get(x, y)
            this.set(x, y, "buildings", tile.type, tile.facing, tile.level + 1);
        }

        this.reset = () => {
            this.map = [];
        }

        this.getXLength = () => {
            return this.map.length
        }

        this.getYLength = (i) => {
            return this.map[i] === undefined ? 0 : this.map[i].length
        }
    }
}