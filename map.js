var TC = require("./TileCreator");
exports.Map = class Map {
    constructor() {
        this.TileCreator = new TC.class();
        this.content = [];
        this.get = (x, y) => {
            return this.content[x][y];
        }
        this.set = (x, y, t, f) => {
            if (this.content[x] === undefined) {
                this.content[x] = [];
            }
            this.content[x][y] = this.TileCreator.createTile(x, y, t, f);
        }
        this.reset = () => {
            this.content = [];
        }
    }
}