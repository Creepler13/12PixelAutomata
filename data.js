
var materials = {
    "water": { "color": "textures/water.png", "amount": 100 },
    "energy": { "color": "textures/energy.png", "amount": 0 },
    "steam": { "color": "textures/water.png", "amount": 0 }
}
var buildings = {
    "0": {
        "maxSpace": 1,
        "hasInput": true,
        "spaceType": [],
        "1": {
            "name": "empty",
            "color": "textures/empty.png",
            "price": 0,
            "updateCooldown": 0
        }
    },
    "1": {
        "update": () => {
            if (this.space.length == 0) {
                this.space.push("water");
                this.isnew = true;
            }
            if (this.isnew) {
                this.isnew = false;
                return;
            } else {
                moveToFacing(this.x, this.y);
            }
        },
        "maxSpace": 1,
        "hasInput": false,
        "spaceType": [],
        "1": {
            "name": "water-collector",
            "color": "textures/water-collector.png",
            "price": 20,
            "updateCooldown": 40
        }
    },
    "2": {
        "update": () => {
            moveToFacing(this.x, this.y);
        },
        "maxSpace": 1,
        "hasInput": true,
        "spaceType": [],
        "1": {
            "name": "mover",
            "color": "textures/mover.png",
            "price": 2,
            "updateCooldown": 20
        },
        "2": {
            "name": "mover lv.2",
            "color": "textures/mover2.png",
            "price": 7,
            "updateCooldown": 10
        }
    },
    "3": {
        "update": () => {
            if (this.space.length != 0) {
                materials[this.space[
                    0
                ]
                ].amount++;
                this.space = [];
            }
        },
        "maxSpace": 1,
        "hasInput": true,
        "spaceType": [],
        "1": {
            "name": "base",
            "color": "textures/base.png",
            "price": 100,
            "updateCooldown": 5
        }
    },
    "4": {
        "update": () => {
            if (this.spaceType == this.space) {
                return moveToFacing(this.x, this.y,
                    "energy");
            }
        },
        "maxSpace": 2,
        "hasInput": true,
        "spaceType": [
            "water",
            "water"
        ],
        "1": {
            "name": "factory",
            "color": "textures/transformator.png",
            "price": 50,
            "updateCooldown": 60
        }
    },
    "5": {
        "update": () => {
            if (this.spaceType == this.space) {
                return moveToFacing(this.x, this.y,
                    "energy");
            }
        },
        "maxSpace": 1,
        "hasInput": true,
        "spaceType": [],
        "1": {
            "name": "splitter",
            "color": "textures/splitter.png",
            "price": 10,
            "updateCooldown": 20
        },
        "2": {
            "name": "splitter lv.2",
            "color": "textures/splitter2.png",
            "price": 20,
            "updateCooldown": 10
        }
    },
    "6": {
        "1": {
            "name": "clear",
            "color": "textures/empty.png",
            "price": 0,
            "updateCooldown": 0
        }
    },
    "7": {
        "update": () => {
            if (this.spaceType == this.space) {
                return moveToFacing(this.x, this.y,
                    "energy");
            }
        },
        "maxSpace": 2,
        "hasInput": true,
        "spaceType": ["water", "energy"],
        "1": {
            "name": "boiler",
            "color": "textures/transformator.png",
            "price": 50,
            "updateCooldown": 35
        }
    },
    "8": {
        "1": {
            "name": "upgrade",
            "color": "textures/upgrade.png",
            "price": 0,
            "updateCooldown": 0
        }
    },
}
var facings = {
    "0": "Up",
    "1": "Right",
    "2": "Down",
    "3": "Left"
}


function setUpTextures() {
    var tempe = [];
    for (var e in buildings) tempe.push(e);
    for (const iterator of tempe) {
        var temp = [];
        for (var en in buildings[iterator]) temp.push(en);
        for (const key of temp) {
            var img = document.createElement("img");
            var obj = buildings[iterator][key];
            img.src = obj.color;
            img.width = 12;
            img.height = 12;
            buildings[iterator][key].color = img;
        }
    }
    var tempe = [];
    for (var e in materials) tempe.push(e);
    for (const iterator of tempe) {
        var img = document.createElement("img");
        img.src = materials[iterator].color;
        img.width = 12;
        img.height = 12;
        materials[iterator].color = img;
    }
}
