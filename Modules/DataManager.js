const fs = require("fs");
exports.DataManager = class DataManager {
    constructor() {

        this.Data = {};

        this.load = (link) => {
            return new Promise((resolve) => {
                var loading = [];
                var files = fs.readdirSync("./" + link)
                files.forEach((dir) => {
                    var temp = {};
                    loading.push(dir);
                    var files2 = fs.readdirSync(`./${link}/${dir}`);
                    var index = 0;
                    files2.forEach((f, i) => {
                        if (f.endsWith(".js")) {
                            console.log("loading file " + `../${link}/${dir}/${f}`)
                            let t = require(`../${link}/${dir}/${f}`);
                            temp[f.replace(".js", "")] = {};
                            var imtTemp = document.createElement("img");
                            imtTemp.src = t.texture;
                            temp[f.replace(".js", "")][1] = { "tile": t, "id": index, "texture": imtTemp };
                            index++;
                        } else {
                            var dir2 = fs.readdirSync(`./${link}/${dir}/${f}`)
                            temp[f] = {};
                            var counter = 0;
                            dir2.forEach((t, e) => {
                                counter++;
                                console.log("loading file " + `../${link}/${dir}/${f}`)
                                let te = require(`../${link}/${dir}/${f}/${t}`);
                                var imtTemp = document.createElement("img");
                                imtTemp.src = te.texture;
                                temp[f][counter] = { "tile": te, "id": index, "texture": imtTemp };
                                index++;
                            })
                            temp[f].size = dir2.length;
                        }
                    });
                    if (this.Data[dir] === undefined) this.Data[dir] = {};
                    this.Data[dir].data = temp;
                    this.Data[dir].size = files2.length;

                });
                console.log(this.Data)
                resolve();
            });
        }

        this.getTexture = (dir, id, level) => {
            return this.Data[dir].data[id][level].texture
        }

        this.getSize = (dir) => {
            return this.Data[dir].size
        }

        this.getDir = (dir) => {
            return this.Data[dir].data
        }

        this.getKeys = (dir) => {
            // console.log(this.Data)
            var mate = this.Data[dir].data;
            var temp = [];
            for (let i in mate) temp.push(i);
            return temp;
        }

        this.getData = (dir, id, level, a) => {
            return this.Data[dir].data[id][level].tile[a]
        }
    }
}