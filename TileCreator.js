const fs = require("fs");
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
                    jsfiles.forEach((f, i) => {
                        console.log("loading " + `./${link}/${f}`)
                        let t = require(`./${link}/${f}`);
                        temp[f.replace(".js", "")] = { "texture": t.texture, "class": t.class };
                    });
                });
                this.TileTypes = temp;
                resolve();
            });
        }
        this.createTile = (x, y, type, facing) => {
            console.log(type + "  " + this.TileTypes[type])
            return new this.TileTypes[type].class(x, y, type, facing);
        }

    }
}