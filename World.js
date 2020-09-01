var TC = require("./TileCreator");
var DataStorage = require("./Modules/DataStorage");
exports.Map = class Map {
    constructor() {

        this.TileCreator = new TC.TileCreator();
        this.Materials = new DataStorage.DataStorage();

        this.map = [];

        this.get = (x, y) => {
            return this.map[x][y];
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

        this.set = (x, y, d, t, f) => {
            if (this.map[x] === undefined) {
                this.map[x] = [];
            }
            this.map[x][y] = this.TileCreator.createTile(x, y, d, t, f);
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