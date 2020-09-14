const DataManager = require("./Modules/DataManager");
exports.TileCreator = class TileCreator extends DataManager.DataManager {

    constructor() {
        super();

        this.createTile = (x, y, dir, type, facing, level) => {
            var tileT = new this.Data[dir].data[type][level].tile.class(x, y, type, facing)
            tileT.level = level;
            return tileT;
        }

        this.idToName = (dir, id) => {
            for (let e in this.Data[dir].data) {
                for (let index = 0; index < this.getEntrySize(dir, e); index++) {
                    if (this.Data[dir].data[e][index + 1].id === id) {
                        return e
                    }
                }
            }
        }

        this.nameToId = (dir, name, level) => {
            return this.Data[dir].data[name][level].id
        }

        this.typeNumberToName = (dir, type) => {
            var temp = [];
            for (let e in this.Data[dir].data) temp.push(e);
            return temp[type];
        }

    }

}