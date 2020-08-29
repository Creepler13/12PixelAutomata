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
                            temp[f.replace(".js", "")] = { "tile": t, "id": index };
                            index++;
                        } else {
                            var dir2 = fs.readdirSync(`./${link}/${dir}/${f}`)
                            temp[f] = {};
                            dir2.forEach((t, e) => {
                                console.log("loading file " + `../${link}/${dir}/${f}`)
                                let te = require(`../${link}/${dir}/${f}/${t}`);
                                temp[f][t.replace(".js", "")] = { "tile": te, "id": index };
                                index++;
                            })
                            temp[f].size = dir2.length;
                        }
                    });
                    if (this.Data[dir] === undefined) this.Data[dir] = {};
                    this.Data[dir].data = temp;
                    this.Data[dir].size = files2.length;
                });
                resolve();
            });
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

        this.getData = (dir, type, a) => {
            console.log(this.Data[dir])
            return this.Data[dir].data[type].tile[a]
        }
    }
}