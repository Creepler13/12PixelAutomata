const DataManager = require("./Modules/DataManager");
exports.TileCreator = class TileCreator extends DataManager.DataManager {

    constructor() {
        super();

        this.createTile = (x, y, dir, type, facing) => {
            return new this.Data[dir].data[type][1].tile.class(x, y, type, facing);
        }

        this.idToName = (dir, id) => {
            for (let e in this.Data[dir].data) {
                if (this.Data[dir].data[e][1].id === id) {
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