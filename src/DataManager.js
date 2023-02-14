let moduleFile = require("./data/modules.json");
let modules = [];
moduleFile.forEach((modul) => {
    modules.push(require("./data/" + modul + ".json"));
});

window.gameData = { buildings: {}, materials: {} };
let gameData=window.gameData;
modules.forEach((module) => {
    if (module.buildings) initBuildings(module.buildings);
    if (module.materials) initMaterials(module.materials);
});

function initMaterials(materials) {
    materials.forEach((material) => {
        material.texture = makeImgObj(material.texture);
        gameData.materials[material.name] = material;
    });
}

function initBuildings(buildings) {
    buildings.forEach((building) => {
        building.texture = makeImgObj(building.texture);
        if (building.upgrades)
            for (let index = 0; index < building.upgrades.length; index++) {
                let upgrade = building.upgrades[index];
                if (!upgrade.texture)
                    if (index == 0) upgrade.texture = building.texture;
                    else upgrade.texture = building.upgrades[0].texture;
                else upgrade.texture = makeImgObj(upgrade.texture);
            }

        gameData.buildings[building.name] = building;
    });
}

function makeImgObj(text) {
    let img = document.createElement("img");
    img.src = require("./textures/" + text);
    return img;
}


module.exports.DataManager = class DataManager {
    constructor() {}

    data = {};

    load() {console.log(gameData)}

    /*  load(link){
            return new Promise((resolve) => {
                var loading = [];
                var files = fs.readdirSync("./" + link);
                files.forEach((dir) => {
                    var temp = {};
                    loading.push(dir);
                    var files2 = fs.readdirSync(`./${link}/${dir}`);
                    var index = 0;
                    files2.forEach((f, i) => {
                        if (f.endsWith(".js")) {
                            console.log("loading file " + `../${link}/${dir}/${f}`);
                            let t = require(`../${link}/${dir}/${f}`);
                            temp[f.replace(".js", "")] = {};
                            temp[f.replace(".js", "")].size = 1;
                            var imtTemp = document.createElement("img");
                            imtTemp.src = t.texture;
                            temp[f.replace(".js", "")][1] = {
                                tile: t,
                                id: index,
                                texture: imtTemp,
                            };
                            index++;
                        } else {
                            var dir2 = fs.readdirSync(`./${link}/${dir}/${f}`);
                            temp[f] = {};
                            var counter = 0;
                            dir2.forEach((t, e) => {
                                counter++;
                                console.log("loading file " + `../${link}/${dir}/${f}`);
                                let te = require(`../${link}/${dir}/${f}/${t}`);
                                var imtTemp = document.createElement("img");
                                imtTemp.src = te.texture;
                                temp[f][counter] = { tile: te, id: index, texture: imtTemp };
                                index++;
                            });
                            temp[f].size = dir2.length;
                        }
                    });
                    if (this.data[dir] === undefined) this.data[dir] = {};
                    this.data[dir].data = temp;
                    this.data[dir].size = files2.length;
                });
                console.log(this.data);
                resolve();
            });
         };
*/
    getTexture(dir, id, level) {
        return this.data[dir].data[id][level].texture;
    }

    getSize(dir) {
        return this.data[dir].size;
    }

    getDir(dir) {
        return this.data[dir].data;
    }

    getEntrySize(dir, id) {
        return this.data[dir].data[id].size;
    }

    getKeys(dir) {
        // console.log(this.Data)
        var mate = this.data[dir].data;
        var temp = [];
        for (let i in mate) temp.push(i);
        return temp;
    }

    getData(dir, id, level, a) {
        return this.data[dir].data[id][level].tile[a];
    }
};
