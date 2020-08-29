const DataManager = require("./Modules/DataManager");
exports.TileCreator = class TileCreator extends DataManager.DataManager {

    constructor() {
        super();

        this.createTile = (x, y, type, facing) => {
            return new this.Data.buildings.data[type].tile.class(x, y, type, facing);
        }

        this.idToName = (id) => {
            for (let e in this.Data) {
                if (this.Data.buildings.data[e].id === id) {
                    return e
                }
            }
        }

        this.nameToId = (name) => {
            return this.Data.buildings.data[name].id
        }

        this.levelUp = (tile) => {
            return 
        }


    }

}