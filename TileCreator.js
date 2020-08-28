const fs = require("fs");
const { TouchBarOtherItemsProxy } = require("electron/main");
const Tile = require("./Tile");
exports.class = class TileCreator {
    constructor() {

        this.loadTiles = (link) => {
            return new Promise((resolve) => {
                var temp = {};
                fs.readdir("./" + link, (err, files) => {
                    if (err) {
                        console.error(err);
                    }
                    let jsfiles = files.filter(f => f.split(".").pop() === "js");
                    if (jsfiles.length <= 0) {
                        console.log("No Commands to load!");
                        return;
                    }
                    this.BuildingCount = jsfiles.length;
                    var index = 0;
                    jsfiles.forEach((f, i) => {
                        console.log("loading " + `./${link}/${f}`)
                        let t = require(`./${link}/${f}`);
                        console.log(t.class.maxSpace)
                        temp[f.replace(".js", "")] = { "tile": t, "id": index };
                        index++;
                    });
                    this.TileTypes = temp;
                    resolve();
                });
            });
        }

        this.createTile = (x, y, type, facing) => {
            console.log(type + "  " + this.TileTypes[type]);
            return new this.TileTypes[type].tile.class(x, y, type, facing)
        }

        this.getData = (type, a) => {
            return this.TileTypes[type].tile[a]
        }

        this.idToName = (id) => {
            for (let e in this.TileTypes) {
                if (this.TileTypes[e].id === id) {
                    return e
                }
            }
        }

        this.nameToId = (name) => {
            return this.TileTypes[name].id
        }

    }
}