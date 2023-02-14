/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Action.js":
/*!***********************!*\
  !*** ./src/Action.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = class Action {\r\n    performAction(building, data) {}\r\n\r\n    static loadActions() {\r\n        let actions = {};\r\n        let actionsFile = __webpack_require__(/*! ./data/actions.json */ \"./src/data/actions.json\");\r\n\r\n        actionsFile.forEach((file) => {\r\n            actions[file.toLowerCase()] = new (__webpack_require__(\"./src/actions sync recursive ^\\\\.\\\\/.*\\\\.js$\")(\"./\" + file + \".js\"))();\r\n        });\r\n\r\n        return actions;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/Action.js?");

/***/ }),

/***/ "./src/DataManager.js":
/*!****************************!*\
  !*** ./src/DataManager.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("let moduleFile = __webpack_require__(/*! ./data/modules.json */ \"./src/data/modules.json\");\r\nlet modules = [];\r\nmoduleFile.forEach((modul) => {\r\n    modules.push(__webpack_require__(\"./src/data sync recursive ^\\\\.\\\\/.*\\\\.json$\")(\"./\" + modul + \".json\"));\r\n});\r\n\r\nwindow.gameData = { buildings: {}, materials: {} };\r\nlet gameData=window.gameData;\r\nmodules.forEach((module) => {\r\n    if (module.buildings) initBuildings(module.buildings);\r\n    if (module.materials) initMaterials(module.materials);\r\n});\r\n\r\nfunction initMaterials(materials) {\r\n    materials.forEach((material) => {\r\n        material.texture = makeImgObj(material.texture);\r\n        gameData.materials[material.name] = material;\r\n    });\r\n}\r\n\r\nfunction initBuildings(buildings) {\r\n    buildings.forEach((building) => {\r\n        building.texture = makeImgObj(building.texture);\r\n        if (building.upgrades)\r\n            for (let index = 0; index < building.upgrades.length; index++) {\r\n                let upgrade = building.upgrades[index];\r\n                if (!upgrade.texture)\r\n                    if (index == 0) upgrade.texture = building.texture;\r\n                    else upgrade.texture = building.upgrades[0].texture;\r\n                else upgrade.texture = makeImgObj(upgrade.texture);\r\n            }\r\n\r\n        gameData.buildings[building.name] = building;\r\n    });\r\n}\r\n\r\nfunction makeImgObj(text) {\r\n    let img = document.createElement(\"img\");\r\n    img.src = __webpack_require__(\"./src/textures sync recursive ^\\\\.\\\\/.*$\")(\"./\" + text);\r\n    return img;\r\n}\r\n\r\n\r\nmodule.exports.DataManager = class DataManager {\r\n    constructor() {}\r\n\r\n    data = {};\r\n\r\n    load() {console.log(gameData)}\r\n\r\n    /*  load(link){\r\n            return new Promise((resolve) => {\r\n                var loading = [];\r\n                var files = fs.readdirSync(\"./\" + link);\r\n                files.forEach((dir) => {\r\n                    var temp = {};\r\n                    loading.push(dir);\r\n                    var files2 = fs.readdirSync(`./${link}/${dir}`);\r\n                    var index = 0;\r\n                    files2.forEach((f, i) => {\r\n                        if (f.endsWith(\".js\")) {\r\n                            console.log(\"loading file \" + `../${link}/${dir}/${f}`);\r\n                            let t = require(`../${link}/${dir}/${f}`);\r\n                            temp[f.replace(\".js\", \"\")] = {};\r\n                            temp[f.replace(\".js\", \"\")].size = 1;\r\n                            var imtTemp = document.createElement(\"img\");\r\n                            imtTemp.src = t.texture;\r\n                            temp[f.replace(\".js\", \"\")][1] = {\r\n                                tile: t,\r\n                                id: index,\r\n                                texture: imtTemp,\r\n                            };\r\n                            index++;\r\n                        } else {\r\n                            var dir2 = fs.readdirSync(`./${link}/${dir}/${f}`);\r\n                            temp[f] = {};\r\n                            var counter = 0;\r\n                            dir2.forEach((t, e) => {\r\n                                counter++;\r\n                                console.log(\"loading file \" + `../${link}/${dir}/${f}`);\r\n                                let te = require(`../${link}/${dir}/${f}/${t}`);\r\n                                var imtTemp = document.createElement(\"img\");\r\n                                imtTemp.src = te.texture;\r\n                                temp[f][counter] = { tile: te, id: index, texture: imtTemp };\r\n                                index++;\r\n                            });\r\n                            temp[f].size = dir2.length;\r\n                        }\r\n                    });\r\n                    if (this.data[dir] === undefined) this.data[dir] = {};\r\n                    this.data[dir].data = temp;\r\n                    this.data[dir].size = files2.length;\r\n                });\r\n                console.log(this.data);\r\n                resolve();\r\n            });\r\n         };\r\n*/\r\n    getTexture(dir, id, level) {\r\n        return this.data[dir].data[id][level].texture;\r\n    }\r\n\r\n    getSize(dir) {\r\n        return this.data[dir].size;\r\n    }\r\n\r\n    getDir(dir) {\r\n        return this.data[dir].data;\r\n    }\r\n\r\n    getEntrySize(dir, id) {\r\n        return this.data[dir].data[id].size;\r\n    }\r\n\r\n    getKeys(dir) {\r\n        // console.log(this.Data)\r\n        var mate = this.data[dir].data;\r\n        var temp = [];\r\n        for (let i in mate) temp.push(i);\r\n        return temp;\r\n    }\r\n\r\n    getData(dir, id, level, a) {\r\n        return this.data[dir].data[id][level].tile[a];\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/DataManager.js?");

/***/ }),

/***/ "./src/Tile.js":
/*!*********************!*\
  !*** ./src/Tile.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const { facings } = __webpack_require__(/*! ./utils/DirectionUtils */ \"./src/utils/DirectionUtils.js\");\r\n\r\nmodule.exports = class Tile {\r\n    /**\r\n     *\r\n     * @param {number} x\r\n     * @param {number} y\r\n     * @param {types} type\r\n     * @param {facings} facing\r\n     * @param {string} id\r\n     */\r\n    constructor(x, y, type, facing, id) {\r\n        this.x = x;\r\n        this.y = y;\r\n        (this.facing = facing), (this.type = type);\r\n        this.id = id;\r\n    }\r\n\r\n    /**\r\n     * @typedef types\r\n     * @enum\r\n     */\r\n    static types = {\r\n        building: \"buildings\",\r\n        material: \"materials\",\r\n    };\r\n\r\n    /**\r\n     * @returns {HTMLImageElement}\r\n     */\r\n    getTexture(){\r\n\r\n    }\r\n\r\n    update() {}\r\n\r\n    getData() {\r\n        return window.gameData[this.type][this.id];\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/Tile.js?");

/***/ }),

/***/ "./src/World.js":
/*!**********************!*\
  !*** ./src/World.js ***!
  \**********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Tile = __webpack_require__(/*! ./Tile */ \"./src/Tile.js\");\r\n\r\n__webpack_require__(/*! ./DataManager */ \"./src/DataManager.js\");\r\nexports.Map = class Map {\r\n    constructor() {\r\n        this.map = [];\r\n    }\r\n    /**\r\n     *\r\n     * @param {number} x\r\n     * @param {number} y\r\n     * @returns {Tile} tile\r\n     */\r\n    get(x, y) {\r\n        if (this.posExits(x, y)) return this.map[x][y];\r\n        else return undefined;\r\n    }\r\n\r\n    init(maxX, maxY) {\r\n        this.maxX = maxX;\r\n        this.maxY = maxY;\r\n        for (let x = 0; x < maxX; x++) {\r\n            this.map.push([]);\r\n        }\r\n    }\r\n\r\n    /*\r\n    init() {\r\n        return new Promise((res) => {\r\n            this.TileCreator.load(\"data\").then(() => {\r\n                var keys = this.TileCreator.getKeys(\"materials\");\r\n                keys.forEach((e) => {\r\n                    this.Materials.set(e, 0);\r\n                });\r\n                res();\r\n            });\r\n        });\r\n    }\r\n*/\r\n\r\n    /**\r\n     *\r\n     * @param {Tile} tile\r\n     */\r\n    set(tile) {\r\n        if (!this.posExits(tile.x, tile.y)) return false;\r\n        this.map[tile.x][tile.y] = tile;\r\n        return true;\r\n    }\r\n\r\n    update(x, y) {\r\n        this.get(x, y).update();\r\n    }\r\n    /*\r\n        this.createNewMaterial = (x2, y2, material) => {\r\n            var to = this.get(x2, y2);\r\n            var temp = 0;\r\n            to.spaceType.forEach(element => {\r\n                if (element === material) temp++;\r\n            });\r\n\r\n            if (!to.hasSpace || !to.hasInput || to.space.length + 1 > to.maxSpace || (this.materialCountInTile(x2, y2, material) >= temp && to.spaceType.length !== 0)) { console.error(\"space Error\"); return; };\r\n\r\n            this.map[x2][y2].space.push(material);\r\n        }\r\n\r\n        this.moveStorageTo = (x, y, x2, y2, index) => {\r\n            var from = this.get(x, y);\r\n            var to = this.get(x2, y2);\r\n            var material = this.map[x][y].space[index];\r\n            var temp = 0;\r\n            to.spaceType.forEach(element => {\r\n                if (element === material) temp++;\r\n            });\r\n\r\n            if (!from.hasSpace || !to.hasSpace || !to.hasInput || to.space.length + 1 > to.maxSpace || from.space.length === 0 || index >= from.space.length || (this.materialCountInTile(x2, y2, material) >= temp && to.spaceType.length !== 0)) { return; };\r\n\r\n            this.map[x2][y2].space.push(material);\r\n            this.map[x][y].space.splice(index, 1);\r\n        }\r\n\r\n        this.materialCountInTile = (x, y, material) => {\r\n            var tile = this.get(x, y);\r\n            var count = 0;\r\n            tile.space.forEach(element => {\r\n                if (element === material) count++;\r\n            });\r\n            return count;\r\n        }\r\n*/\r\n\r\n    levelUp(x, y) {\r\n        var tile = this.get(x, y);\r\n        this.set(x, y, \"buildings\", tile.type, tile.facing, tile.level + 1);\r\n    }\r\n    reset() {\r\n        this.map = [];\r\n    }\r\n\r\n    getXLength() {\r\n        return this.map.length;\r\n    }\r\n\r\n    posExits(x, y) {\r\n        return x >= 0 && y >= 0 && x < this.maxX && y < this.maxY;\r\n    }\r\n\r\n    getYLength(i) {\r\n        return this.map[i] === undefined ? 0 : this.map[i].length;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/World.js?");

/***/ }),

/***/ "./src/actions/Make.js":
/*!*****************************!*\
  !*** ./src/actions/Make.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const  Action  = __webpack_require__(/*! ../Action */ \"./src/Action.js\");\r\nconst Building = __webpack_require__(/*! ../tiles/Building */ \"./src/tiles/Building.js\");\r\nmodule.exports = class Make extends Action {\r\n    /**\r\n     * \r\n     * @param {Building} building \r\n    \r\n     */\r\n    performAction(building, data) {\r\n        let hasMaterials;\r\n        if (!data.cost) hasMaterials = true;\r\n        else\r\n            hasMaterials = Object.keys(data.cost).every((material) =>\r\n                building.storage.has(material, data.cost[material])\r\n            );\r\n\r\n        if (!hasMaterials) return;\r\n\r\n        Object.keys(data.cost).forEach((material) =>\r\n            building.storage.remove(material, data.cost[material])\r\n        );\r\n        Object.keys(data.product).forEach((material) =>\r\n            building.storage.add(material, data.cost[material], true)\r\n        );\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/actions/Make.js?");

/***/ }),

/***/ "./src/actions/Move.js":
/*!*****************************!*\
  !*** ./src/actions/Move.js ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Action = __webpack_require__(/*! ../Action */ \"./src/Action.js\");\r\nconst Building = __webpack_require__(/*! ../tiles/Building */ \"./src/tiles/Building.js\");\r\nconst { facingTo, addFacings, facings } = __webpack_require__(/*! ../utils/DirectionUtils */ \"./src/utils/DirectionUtils.js\");\r\nconst World = __webpack_require__(/*! ../World */ \"./src/World.js\");\r\nmodule.exports = class Move extends Action {\r\n    /**\r\n     * \r\n     * @param {Building} building \r\n    \r\n     */\r\n    performAction(building, data) {\r\n        /**\r\n         * @type {World.Map}\r\n         */\r\n        let world = window.world;\r\n\r\n        Object.keys(data).forEach((direction) => {\r\n            let facing;\r\n            if (direction == \"dir\") facing = building.facing;\r\n            else facing = addFacings(building.facing, facings[direction]);\r\n            let pos = facingTo(building.x, building.y, facing);\r\n            if (!world.posExits(pos.x, pos.y)) return;\r\n            /**@type {Building} */\r\n            let otherTile = world.get(pos.x, pos.y);\r\n            if (!otherTile) return;\r\n            if (!otherTile.storage.canAdd(data[direction], 1)) return;\r\n            building.storage.remove(data[direction], 1);\r\n            otherTile.storage.add(data[direction], 1);\r\n        });\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/actions/Move.js?");

/***/ }),

/***/ "./src/actions sync recursive ^\\.\\/.*\\.js$":
/*!****************************************!*\
  !*** ./src/actions/ sync ^\.\/.*\.js$ ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./Make.js\": \"./src/actions/Make.js\",\n\t\"./Move.js\": \"./src/actions/Move.js\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/actions sync recursive ^\\\\.\\\\/.*\\\\.js$\";\n\n//# sourceURL=webpack://my-webpack-project/./src/actions/_sync_^\\.\\/.*\\.js$?");

/***/ }),

/***/ "./src/buildingStorage.js":
/*!********************************!*\
  !*** ./src/buildingStorage.js ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Building = __webpack_require__(/*! ./tiles/Building */ \"./src/tiles/Building.js\");\r\n\r\nmodule.exports = class BuildingStorage {\r\n    /**\r\n     *\r\n     * @param {Building} building\r\n     */\r\n    constructor(building) {\r\n        this.building = building;\r\n    }\r\n\r\n    storage = {};\r\n\r\n    accepts(material) {\r\n        let data = this.building.getData();\r\n        if (!data.allowedInput) return false;\r\n        return data.allowedInput.some(\r\n            (allowedMaterial) => allowedMaterial == \"*\" || allowedMaterial == material\r\n        );\r\n    }\r\n\r\n    remove(material, amount) {\r\n        if (this.storage[material])\r\n            if (this.storage[material] <= amount) delete this.storage[material];\r\n            else this.storage[material] = this.storage[material] - amount;\r\n    }\r\n\r\n    add(material, ammount, ignoreMaxStorage) {\r\n        if (!ignoreMaxStorage) if (!this.canAdd(material, ammount)) return false;\r\n\r\n        if (!this.storage[material]) this.storage[material] = 0;\r\n        this.storage[material] = this.storage[material] + ammount;\r\n\r\n        return true;\r\n    }\r\n\r\n    canAdd(material, ammount) {\r\n        let data = this.building.getData().storage;\r\n        if (!data.storage) return false;\r\n        let storageAmmount = BuildingStorage.storageAmmount(this.storage);\r\n        return this.accepts(material) && storageAmmount + ammount <= data.storage;\r\n    }\r\n\r\n    has(material, amount) {\r\n        if (!amount) return this.storage[material];\r\n        else return this.storage[material] >= amount;\r\n    }\r\n\r\n    static storageAmmount(storage) {\r\n        let ammount = 0;\r\n        Object.values(storage).forEach((item) => (ammount = ammount + item));\r\n        return ammount;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/buildingStorage.js?");

/***/ }),

/***/ "./src/data sync recursive ^\\.\\/.*\\.json$":
/*!***************************************!*\
  !*** ./src/data/ sync ^\.\/.*\.json$ ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./actions.json\": \"./src/data/actions.json\",\n\t\"./mainGame.json\": \"./src/data/mainGame.json\",\n\t\"./modules.json\": \"./src/data/modules.json\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/data sync recursive ^\\\\.\\\\/.*\\\\.json$\";\n\n//# sourceURL=webpack://my-webpack-project/./src/data/_sync_^\\.\\/.*\\.json$?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("var canvas = document.getElementById(\"canvas\");\r\n// @ts-ignore\r\nvar ctx = canvas.getContext(\"2d\");\r\nvar selectetDisplay = document.getElementById(\"selectetDisplay\");\r\nvar baseDisplay = document.getElementById(\"baseDisplay\");\r\nconst Tile = __webpack_require__(/*! ./Tile */ \"./src/Tile.js\");\r\nconst Building = __webpack_require__(/*! ./tiles/Building */ \"./src/tiles/Building.js\");\r\nconst { facingToAngle, facings } = __webpack_require__(/*! ./utils/DirectionUtils */ \"./src/utils/DirectionUtils.js\");\r\nvar mapClass = __webpack_require__(/*! ./World */ \"./src/World.js\");\r\nwindow.world = new mapClass.Map();\r\n\r\n/** @type {mapClass.Map} */\r\nlet World = window.world;\r\n\r\nvar mapDimensions = 50;\r\n\r\nstartGame();\r\n\r\nvar x, y, selectet, maxSelectet, tool;\r\nvar toolMax = 2;\r\n\r\nvar facing = 0;\r\nvar maxSelectetFacing = 3;\r\n\r\nvar tools = {\r\n    0: \"build\",\r\n    1: \"upgrade\",\r\n    2: \"delete\",\r\n};\r\n\r\nfunction startGame() {\r\n    console.log(\"game Started\");\r\n    x = 0;\r\n    y = 0;\r\n    selectet = 0;\r\n    tool = 0;\r\n    maxSelectet = 0;\r\n\r\n    maxSelectet = Object.keys(window.gameData.buildings).length;\r\n\r\n    selectetDisplay.textContent = \"Selection WIP\";\r\n    //    \"Selectet building: \" + World.TileCreator.getData(\"buildings\", getSelectet(), 1, \"name\");\r\n    World.init(50, 50);\r\n\r\n    World.set(new Building(10, 10, facings.UP, \"mover\"));\r\n\r\n    console.log(World);\r\n    //World.set(10, 10, \"buildings\", \"base\", 0, 1);\r\n    //World.Materials.set(\"water\", 20);\r\n    var interval = setInterval(gameloop, 50);\r\n}\r\n\r\nfunction gameloop() {\r\n    for (let index = 0; index < World.maxX; index++) {\r\n        for (let indexy = 0; indexy < World.maxY; indexy++) {\r\n            let tile = World.get(index, indexy);\r\n\r\n            if (!tile) continue;\r\n\r\n            tile.update();\r\n\r\n            ctx.translate(index * 12 + 6, indexy * 12 + 6);\r\n            ctx.rotate(facingToAngle(tile.facing));\r\n            ctx.drawImage(tile.getTexture(), 0 - 6, 0 - 6, 12, 12);\r\n            ctx.rotate(-facingToAngle(tile.facing));\r\n            ctx.translate(-(index * 12 + 6), -(indexy * 12 + 6));\r\n\r\n            if (tile.type == Tile.types.building) {\r\n                //TODO\r\n\r\n                ctx.drawImage(\r\n                    window.gameData.materials[\"water\"].texture,\r\n                    index * 12 + 2,\r\n                    indexy * 12 + 2,\r\n                    8,\r\n                    8\r\n                );\r\n\r\n                /*\r\n                switch (tile.space.length) {\r\n                    case 1:\r\n                        ctx.drawImage(\r\n                            window.gameData.materials[tile.storage.],\r\n                            index * 12 + 2,\r\n                            indexy * 12 + 2,\r\n                            8,\r\n                            8\r\n                        );\r\n                        break;\r\n                    case 2:\r\n                        ctx.drawImage(\r\n                            World.TileCreator.getTexture(\"materials\", tile.space[0], 1),\r\n                            index * 12 + 2,\r\n                            indexy * 12 + 6,\r\n                            8,\r\n                            4\r\n                        );\r\n                        ctx.drawImage(\r\n                            World.TileCreator.getTexture(\"materials\", tile.space[1], 1),\r\n                            index * 12 + 2,\r\n                            indexy * 12 + 6,\r\n                            8,\r\n                            4\r\n                        );\r\n                        break;\r\n                }\r\n            }\r\n*/\r\n            }\r\n        }\r\n    }\r\n    //   drawUI();\r\n}\r\n\r\nfunction drawUI() {\r\n    ctx.globalAlpha = 0.6;\r\n    ctx.translate(x * 12 + 6, y * 12 + 6);\r\n    if (tool === 0) {\r\n        ctx.rotate(facingToAngle(facing));\r\n\r\n        var selectetColor = World.TileCreator.getTexture(\"buildings\", getSelectet(), 1);\r\n        ctx.drawImage(selectetColor, 0 - 6, 0 - 6, 12, 12);\r\n        ctx.rotate(-facingToAngle(facing));\r\n    } else {\r\n        var selectetColor = World.TileCreator.getTexture(\"ui\", tools[tool], 1);\r\n        ctx.drawImage(selectetColor, 0 - 6, 0 - 6, 12, 12);\r\n    }\r\n    ctx.translate(-(x * 12 + 6), -(y * 12 + 6));\r\n    ctx.globalAlpha = 1;\r\n\r\n    ctx.font = \"12px arial\";\r\n    ctx.fillStyle = \"#FFFFFF\";\r\n    ctx.fillRect(0, 600, 600, 800);\r\n    var ids = World.Materials.getKeys();\r\n    var baseText = \"\";\r\n    for (let index = 0; index < ids.length; index++) {\r\n        ctx.fillStyle = \"#000000\";\r\n        ctx.drawImage(\r\n            World.TileCreator.getTexture(\"materials\", ids[index], 1),\r\n            50,\r\n            600 + (index + 1) * 12,\r\n            8,\r\n            8\r\n        );\r\n        ctx.fillText(\": \" + World.Materials.get(ids[index]), 50 + 12, 600 + (index + 1) * 12 + 8);\r\n        baseText = baseText + ids[index] + \":\" + World.Materials.get(ids[index]) + \"\" + \"\\n\";\r\n    }\r\n    baseDisplay.textContent = baseText;\r\n\r\n    ctx.fillText(\"Selected Building :\", 300 - 110, 600 + 12 + 12);\r\n\r\n    for (\r\n        let index = 1;\r\n        index < World.TileCreator.getEntrySize(\"buildings\", getSelectet()) + 1;\r\n        index++\r\n    ) {\r\n        ctx.drawImage(\r\n            World.TileCreator.getTexture(\"buildings\", getSelectet(), index),\r\n            300,\r\n            600 + index * 13,\r\n            12,\r\n            12\r\n        );\r\n        if (\r\n            World.TileCreator.getData(\"buildings\", getSelectet(), index, \"price\") >\r\n            World.Materials.get(\"water\")\r\n        ) {\r\n            ctx.fillStyle = \"#ff0000\";\r\n        }\r\n        ctx.fillText(\r\n            World.TileCreator.getData(\"buildings\", getSelectet(), index, \"price\"),\r\n            300 + 15,\r\n            600 + index * 12 + 12\r\n        );\r\n    }\r\n}\r\n\r\ndocument.onkeyup = function KeyEventHandler(e) {\r\n    var code = e.keyCode;\r\n    switch (code) {\r\n        case 87: //w\r\n            if (y > 0) {\r\n                y--;\r\n            }\r\n            break;\r\n        case 65: //a\r\n            if (x > 0) {\r\n                x--;\r\n            }\r\n            break;\r\n        case 83: //s\r\n            if (y < 49) {\r\n                y++;\r\n            }\r\n            break;\r\n        case 68: //d\r\n            if (x < 49) {\r\n                x++;\r\n            }\r\n            break;\r\n        case 32: //space\r\n            switch (tool) {\r\n                case 0:\r\n                    if (\r\n                        World.TileCreator.getData(\"buildings\", getSelectet(), 1, \"price\") >\r\n                            World.Materials.get(\"water\") &&\r\n                        getSelectet() ==\r\n                            World.TileCreator.getData(\"buildings\", World.get(x, y).type)\r\n                    )\r\n                        break;\r\n                    World.Materials.set(\r\n                        \"water\",\r\n                        World.Materials.get(\"water\") -\r\n                            World.TileCreator.getData(\"buildings\", getSelectet(), 1, \"price\") +\r\n                            World.TileCreator.getData(\r\n                                \"buildings\",\r\n                                World.get(x, y).type,\r\n                                World.get(x, y).level,\r\n                                \"price\"\r\n                            ) /\r\n                                2\r\n                    );\r\n                    World.set(x, y, \"buildings\", getSelectet(), facing, 1);\r\n\r\n                    break;\r\n                case 1:\r\n                    console.log(World.TileCreator.getEntrySize(\"buildings\", World.get(x, y).type));\r\n                    if (\r\n                        World.TileCreator.getEntrySize(\"buildings\", World.get(x, y).type) <=\r\n                        World.get(x, y).level\r\n                    )\r\n                        break;\r\n                    if (\r\n                        World.TileCreator.getData(\r\n                            \"buildings\",\r\n                            World.get(x, y).type,\r\n                            World.get(x, y).level + 1,\r\n                            \"price\"\r\n                        ) > World.Materials.get(\"water\")\r\n                    )\r\n                        break;\r\n                    World.Materials.set(\r\n                        \"water\",\r\n                        World.Materials.get(\"water\") -\r\n                            World.TileCreator.getData(\r\n                                \"buildings\",\r\n                                getSelectet(),\r\n                                World.get(x, y).level + 1,\r\n                                \"price\"\r\n                            ) +\r\n                            World.TileCreator.getData(\r\n                                \"buildings\",\r\n                                getSelectet(),\r\n                                World.get(x, y).level,\r\n                                \"price\"\r\n                            ) /\r\n                                2\r\n                    );\r\n                    World.levelUp(x, y);\r\n                    return;\r\n                case 2:\r\n                    World.Materials.set(\r\n                        \"water\",\r\n                        World.Materials.get(\"water\") +\r\n                            World.TileCreator.getData(\r\n                                \"buildings\",\r\n                                getSelectet(),\r\n                                World.get(x, y).level,\r\n                                \"price\"\r\n                            ) /\r\n                                2\r\n                    );\r\n                    World.set(x, y, \"buildings\", \"empty\", 0, 1);\r\n                    return;\r\n            }\r\n            break;\r\n        case 81: //q\r\n            if (selectet == maxSelectet) {\r\n                selectet = 0;\r\n            } else {\r\n                selectet++;\r\n            }\r\n            if (World.TileCreator.getData(\"buildings\", getSelectet(), 1, \"canBuild\") === false) {\r\n                if (selectet == maxSelectet) {\r\n                    selectet = 0;\r\n                } else {\r\n                    selectet++;\r\n                }\r\n            }\r\n            selectetDisplay.textContent =\r\n                \"Selectet building: \" +\r\n                World.TileCreator.getData(\"buildings\", getSelectet(), 1, \"name\");\r\n            break;\r\n        case 82: //r\r\n            if (facing == maxSelectetFacing) {\r\n                facing = 0;\r\n            } else {\r\n                facing++;\r\n            }\r\n            break;\r\n        case 69: //e\r\n            if (selectet == 0) {\r\n                selectet = maxSelectet;\r\n            } else {\r\n                selectet--;\r\n            }\r\n            if (World.TileCreator.getData(\"buildings\", getSelectet(), 1, \"canBuild\") === false) {\r\n                if (selectet == 0) {\r\n                    selectet = maxSelectet;\r\n                } else {\r\n                    selectet--;\r\n                }\r\n            }\r\n            selectetDisplay.textContent =\r\n                \"Selectet building: \" +\r\n                World.TileCreator.getData(\"buildings\", getSelectet(), 1, \"name\");\r\n            break;\r\n        case 84: //t\r\n            if (tool == toolMax) {\r\n                tool = 0;\r\n            } else {\r\n                tool++;\r\n            }\r\n            break;\r\n    }\r\n};\r\n\r\nfunction getSelectet() {\r\n    return World.TileCreator.typeNumberToName(\"buildings\", selectet);\r\n}\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/main.js?");

/***/ }),

/***/ "./src/textures sync recursive ^\\.\\/.*$":
/*!*************************************!*\
  !*** ./src/textures/ sync ^\.\/.*$ ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var map = {\n\t\"./base.png\": \"./src/textures/base.png\",\n\t\"./delete.png\": \"./src/textures/delete.png\",\n\t\"./empty.png\": \"./src/textures/empty.png\",\n\t\"./energy.png\": \"./src/textures/energy.png\",\n\t\"./factory.png\": \"./src/textures/factory.png\",\n\t\"./faster mover.png\": \"./src/textures/faster mover.png\",\n\t\"./mover.png\": \"./src/textures/mover.png\",\n\t\"./mover2.png\": \"./src/textures/mover2.png\",\n\t\"./splitter.png\": \"./src/textures/splitter.png\",\n\t\"./splitter2.png\": \"./src/textures/splitter2.png\",\n\t\"./steam.png\": \"./src/textures/steam.png\",\n\t\"./upgrade.png\": \"./src/textures/upgrade.png\",\n\t\"./water-collector.png\": \"./src/textures/water-collector.png\",\n\t\"./water.png\": \"./src/textures/water.png\"\n};\n\n\nfunction webpackContext(req) {\n\tvar id = webpackContextResolve(req);\n\treturn __webpack_require__(id);\n}\nfunction webpackContextResolve(req) {\n\tif(!__webpack_require__.o(map, req)) {\n\t\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\t\te.code = 'MODULE_NOT_FOUND';\n\t\tthrow e;\n\t}\n\treturn map[req];\n}\nwebpackContext.keys = function webpackContextKeys() {\n\treturn Object.keys(map);\n};\nwebpackContext.resolve = webpackContextResolve;\nmodule.exports = webpackContext;\nwebpackContext.id = \"./src/textures sync recursive ^\\\\.\\\\/.*$\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/_sync_^\\.\\/.*$?");

/***/ }),

/***/ "./src/tiles/Building.js":
/*!*******************************!*\
  !*** ./src/tiles/Building.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Tile = __webpack_require__(/*! ../Tile */ \"./src/Tile.js\");\r\nconst actions = (__webpack_require__(/*! ../Action */ \"./src/Action.js\").loadActions)()\r\nconst BuildingStorage = __webpack_require__(/*! ../buildingStorage */ \"./src/buildingStorage.js\");\r\nconst { facings } = __webpack_require__(/*! ../utils/DirectionUtils */ \"./src/utils/DirectionUtils.js\");\r\nmodule.exports = class Building extends Tile {\r\n    /**\r\n     *\r\n     * @param {number} x\r\n     * @param {number} y\r\n     * @param {facings} facing\r\n     * @param {string} id\r\n     */\r\n    constructor(x, y, facing, id) {\r\n        super(x, y, Tile.types.building, facing, id);\r\n        this.level = 1;\r\n        this.storage = new BuildingStorage(this);\r\n        this.currentUpdateTick = 0;\r\n    }\r\n\r\n    getTexture() {\r\n        let data = this.getData();\r\n        if (this.level == 1) return data.texture;\r\n        if (data.upgrade)\r\n            if (data.upgrade[data.level - 2]) return data.upgrade[data.level - 2].texture;\r\n    }\r\n\r\n    upgrade() {\r\n        this.level++;\r\n    }\r\n\r\n    update() {\r\n        let data = this.getData();\r\n\r\n        if (!data.action) return;\r\n        this.currentUpdateTick++;\r\n        if (this.currentUpdateTick < data.updateTicks) return;\r\n\r\n        switch (data.actionMode) {\r\n            case \"cicle\":\r\n                if (!this.lastAction) this.lastAction = 0;\r\n                this.lastAction++;\r\n                if (this.lastAction >= data.action.length) this.lastAction = 0;\r\n                let action = data.action[this.lastAction];\r\n                this.performAction(action.type, action.data);\r\n                break;\r\n            default:\r\n                data.action.forEach((action) => {\r\n                    this.performAction(action.type, action.data);\r\n                });\r\n                break;\r\n        }\r\n\r\n        this.currentUpdateTick = 0;\r\n    }\r\n\r\n    performAction(type, data) {\r\n        actions[type].performAction(this, data);\r\n    }\r\n\r\n    /**\r\n     *\r\n     * @returns {BuildingData}\r\n     */\r\n    getData() {\r\n        return super.getData();\r\n    }\r\n};\r\n\r\n/**\r\n * @typedef{{\r\n *      name:string\r\n *      texture:HTMLImageElement\r\n *      updateTicks:?number\r\n *      allowedInput:?[string]\r\n *      storage:?number\r\n *      cost:{}\r\n *      upgrade:?[{\r\n *                 cost:number\r\n *                 mod:?{}\r\n *                 texture:?HTMLImageElement\r\n *               }]\r\n *      actionMode:?string\r\n *      action:?[{\r\n *              type:string\r\n *              data:?{}\r\n *              }]\r\n * }} BuildingData\r\n */\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/tiles/Building.js?");

/***/ }),

/***/ "./src/utils/DirectionUtils.js":
/*!*************************************!*\
  !*** ./src/utils/DirectionUtils.js ***!
  \*************************************/
/***/ ((module) => {

eval("/**\r\n *\r\n * @readonly\r\n * @enum {number}\r\n */\r\n\r\nlet facings = {\r\n    UP: 0,\r\n    RIGHT: 1,\r\n    DOWN: 2,\r\n    LEFT: 3,\r\n};\r\n\r\nmodule.exports.facings = facings;\r\n\r\n/**\r\n *\r\n * @param {number} x\r\n * @param {number} y\r\n * @param {facings} facing\r\n * @returns {{x:number y:number}}\r\n */\r\nmodule.exports.facingTo = function facingTo(x, y, facing) {\r\n    switch (facing) {\r\n        case facings.UP: //up\r\n            return { x: x, y: y - 1 };\r\n        case facings.LEFT: //left\r\n            return { x: x - 1, y: y };\r\n        case facings.RIGHT: //right\r\n            return { x: x + 1, y: y };\r\n        case facings.DOWN: //down\r\n            return { x: x, y: y + 1 };\r\n    }\r\n};\r\n\r\n/**\r\n *\r\n * @param {facings} facingBase\r\n * @param {facings} facingAdd\r\n * @returns {facings} added facing\r\n */\r\nmodule.exports.addFacings = function addFacings(facingBase, facingAdd) {\r\n    return (facingBase + facingAdd) % 4;\r\n};\r\n\r\n/**\r\n *\r\n * @param {facings} facing\r\n * @returns {number}\r\n */\r\nmodule.exports.facingToAngle = function facingToAngle(facing) {\r\n    switch (facing) {\r\n        case facings.UP:\r\n            return (90 * Math.PI) / 180;\r\n        case facings.DOWN:\r\n            return (-90 * Math.PI) / 180;\r\n        case facings.LEFT:\r\n            return 0;\r\n        case facings.RIGHT:\r\n            return (-180 * Math.PI) / 180;\r\n    }\r\n};\r\n\r\n/**\r\n *\r\n * @param {facings} facing\r\n * @returns {facings} reversed facing\r\n */\r\nmodule.exports.reverseFacing = function reverseFacing(facing) {\r\n    switch (facing) {\r\n        case facings.UP:\r\n            return facings.DOWN;\r\n        case facings.DOWN:\r\n            return facings.UP;\r\n        case facings.LEFT:\r\n            return facings.RIGHT;\r\n        case facings.RIGHT:\r\n            return facings.LEFT;\r\n    }\r\n};\r\n\n\n//# sourceURL=webpack://my-webpack-project/./src/utils/DirectionUtils.js?");

/***/ }),

/***/ "./src/textures/base.png":
/*!*******************************!*\
  !*** ./src/textures/base.png ***!
  \*******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACeSURBVChTjVCxDQMhDAS+YgeEsgUdFQUzpGITFqOj8hKMkYIqRyxZTpr8CZnzceb4t7XWlJIxppQyxgBhSEtEDg5saCDh4GP4csBge+/S8DGqdoDYOadIqBoy5nTK8/GSxQrnOjDt02AHyDH9xTHJxA8k4dbDrxgjGH9tCKG1lnPee4NDRF1rnTj5H5wrKRD5+st7rx0gAKbRop77iN5Lym9AVG9hgQAAAABJRU5ErkJggg==\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/base.png?");

/***/ }),

/***/ "./src/textures/delete.png":
/*!*********************************!*\
  !*** ./src/textures/delete.png ***!
  \*********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAACUSURBVChTdZLBCsIwEESHXi20d69SvBbxIHgV/P+fsPd+wLjTbcoaNwsDm+S9kISA5558P8l1pRXSaE2MseD9So4235IKLMZYcPlsTSpVsFhfyKQEFutCLb0engr+FYp0mxxU1AdY6RDr1APDuA+s1Gsu1mHHM88Xj/rqIf7hcuZ4pyDl8L5bJqEJNyT/Gi245JDAL1qket1WuR+9AAAAAElFTkSuQmCC\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/delete.png?");

/***/ }),

/***/ "./src/textures/empty.png":
/*!********************************!*\
  !*** ./src/textures/empty.png ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAaSURBVChTY/z//z8DIcAEpfGCUUX0VcTAAAA/qQMVLcbTmwAAAABJRU5ErkJggg==\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/empty.png?");

/***/ }),

/***/ "./src/textures/energy.png":
/*!*********************************!*\
  !*** ./src/textures/energy.png ***!
  \*********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAABsSURBVChTY2RAAvYeZ/6D6IM7TBj////PBGKDFQA5jMqbfP+B2DBw128zWAETSCUjIyNYJzYAN4rhM+NfMA0DvBBxEAHSDTbBIewMGMMAyGSIbjwAZAXEJ58ZURwJswLuCxCNDEDG////nxEAoR4qyOtsuLYAAAAASUVORK5CYII=\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/energy.png?");

/***/ }),

/***/ "./src/textures/factory.png":
/*!**********************************!*\
  !*** ./src/textures/factory.png ***!
  \**********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABvSURBVChTjZGxDcAgDATZLG0aZvJwtJmGBciZlwxKiMILjPEfFoJkZjnn1kUySxUAh4IjHuel4VQn0IBmraFSCqVWE4MkmslyiIX4gIhIVtKyhMLag5javCEka/viyE9Nik5yB/TzmGz8U76+xewG+tbN4aASnqwAAAAASUVORK5CYII=\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/factory.png?");

/***/ }),

/***/ "./src/textures/faster mover.png":
/*!***************************************!*\
  !*** ./src/textures/faster mover.png ***!
  \***************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAwUExURX9/f//3hwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEtEdfIAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAcSURBVBjTY2BgYGQQYARSQEIAHwdGQQVxcgUYATJbATPjZfFFAAAAAElFTkSuQmCC\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/faster_mover.png?");

/***/ }),

/***/ "./src/textures/mover.png":
/*!********************************!*\
  !*** ./src/textures/mover.png ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABeSURBVChTfY7LEcAgCERj0gfV0BeNcaOP1OKqzPgZ5J128IFbRORZYGZVPcLbn5zQQJjSzUBwKTFAk3IDFDPLDbAVv/EREVb/zhFcGZdwHNMwDPy73JudEm8rHnvMFSoGap52VZDyAAAAAElFTkSuQmCC\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/mover.png?");

/***/ }),

/***/ "./src/textures/mover2.png":
/*!*********************************!*\
  !*** ./src/textures/mover2.png ***!
  \*********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAwUExURX9/f//3hwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEtEdfIAAAAJcEhZcwAADsIAAA7CARUoSoAAAAAcSURBVBjTY2BgYGQQYARSQEIAHwdGQQVxcgUYATJbATPjZfFFAAAAAElFTkSuQmCC\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/mover2.png?");

/***/ }),

/***/ "./src/textures/splitter.png":
/*!***********************************!*\
  !*** ./src/textures/splitter.png ***!
  \***********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAwUExURX9/f7y8vM/PzwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKRmbHAAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAwSURBVBjTY2BgYmBQYAACBSYQycAE5ggwMDCCkAAQgQgwA0JBBaFKYBqg2oGEAgMAPWUBdxQorJsAAAAASUVORK5CYII=\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/splitter.png?");

/***/ }),

/***/ "./src/textures/splitter2.png":
/*!************************************!*\
  !*** ./src/textures/splitter2.png ***!
  \************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAwUExURX9/f/z/VP/3hwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABCVFKkAAAAJcEhZcwAADsAAAA7AAWrWiQkAAAAwSURBVBjTY2BgYmBQYAACBSYQycAE5ggwMDCCkAAQgQgwA0JBBaFKYBqg2oGEAgMAPWUBdxQorJsAAAAASUVORK5CYII=\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/splitter2.png?");

/***/ }),

/***/ "./src/textures/steam.png":
/*!********************************!*\
  !*** ./src/textures/steam.png ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAXSURBVBhXY2RQ+8+ADTBBaQwwGCUYGADopwE1bm8hjgAAAABJRU5ErkJggg==\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/steam.png?");

/***/ }),

/***/ "./src/textures/upgrade.png":
/*!**********************************!*\
  !*** ./src/textures/upgrade.png ***!
  \**********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAwUExURSb/Jkj/SFn/Wcj/yMv/y+P/4+r/6vT/9P///wAAAAAAAAAAAAAAAAAAAAAAAAAAAGBybnUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAA5SURBVBjTY+joSBTr6GDoaBNgzABSiQwMYh0MbQIMDIwZDEUMQCDGoACiGBlCHRgYmIFKAvBTzB0A0/cP5SqiblEAAAAASUVORK5CYII=\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/upgrade.png?");

/***/ }),

/***/ "./src/textures/water-collector.png":
/*!******************************************!*\
  !*** ./src/textures/water-collector.png ***!
  \******************************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMBAMAAACkW0HUAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAwUExURUhISH9/fz9IzJnZ6sPDwwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACvUdjcAAAAJcEhZcwAADsIAAA7CARUoSoAAAAA3SURBVBjTY2BgNmZgACIGYwNmAwZBBjAQdFBSUmBgEBEAUgYMjiDKGEZBBaFKoBqg2kGGMRgDABwyBsuyVuZsAAAAAElFTkSuQmCC\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/water-collector.png?");

/***/ }),

/***/ "./src/textures/water.png":
/*!********************************!*\
  !*** ./src/textures/water.png ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsEAAA7BAbiRa+0AAAAXSURBVBhXY2RQ+8+ADTBBaQwwGCUYGADopwE1bm8hjgAAAABJRU5ErkJggg==\";\n\n//# sourceURL=webpack://my-webpack-project/./src/textures/water.png?");

/***/ }),

/***/ "./src/data/actions.json":
/*!*******************************!*\
  !*** ./src/data/actions.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = [\"Make\",\"Move\"];\n\n//# sourceURL=webpack://my-webpack-project/./src/data/actions.json?");

/***/ }),

/***/ "./src/data/mainGame.json":
/*!********************************!*\
  !*** ./src/data/mainGame.json ***!
  \********************************/
/***/ ((module) => {

"use strict";
eval("module.exports = JSON.parse('{\"buildings\":[{\"name\":\"boiler\",\"texture\":\"factory.png\",\"cost\":{\"energiy\":50},\"updateTicks\":40,\"storage\":1,\"allowedInput\":[\"water\"],\"actionMode\":\"cicle\",\"action\":[{\"type\":\"make\",\"data\":{\"cost\":{\"water\":\"1\"},\"product\":{\"energy\":1}}},{\"type\":\"move\",\"data\":{\"dir\":\"energy\"}}]},{\"name\":\"splitter\",\"texture\":\"splitter.png\",\"cost\":{\"energy\":10},\"updateTicks\":20,\"storage\":1,\"upgrades\":[{\"cost\":{\"energy\":20},\"mod\":{\"updateTicks\":10},\"texture\":\"splitter2.png\"}],\"actionMode\":\"cicle\",\"action\":[{\"type\":\"move\",\"data\":{\"LEFT\":\"*\"}},{\"type\":\"move\",\"data\":{\"RIGHT\":\"*\"}}]},{\"name\":\"mover\",\"texture\":\"mover.png\",\"cost\":{\"energy\":2},\"updateTicks\":20,\"storage\":1,\"upgrades\":[{\"cost\":{\"energy\":7},\"mod\":{\"updateTicks\":10},\"texture\":\"mover2.png\"}],\"action\":[{\"type\":\"move\",\"data\":{\"dir\":\"*\"}}]},{\"name\":\"water-collector\",\"texture\":\"water-collector.png\",\"cost\":{\"energiy\":20},\"updateTicks\":40,\"actionMode\":\"cicle\",\"action\":[{\"type\":\"make\",\"data\":{\"product\":{\"water\":1}}},{\"type\":\"move\",\"data\":{\"dir\":\"water\"}}]}],\"materials\":[{\"name\":\"energy\",\"texture\":\"energy.png\"},{\"name\":\"water\",\"texture\":\"water.png\"},{\"name\":\"steam\",\"texture\":\"steam.png\"}]}');\n\n//# sourceURL=webpack://my-webpack-project/./src/data/mainGame.json?");

/***/ }),

/***/ "./src/data/modules.json":
/*!*******************************!*\
  !*** ./src/data/modules.json ***!
  \*******************************/
/***/ ((module) => {

"use strict";
eval("module.exports = [\"mainGame\"];\n\n//# sourceURL=webpack://my-webpack-project/./src/data/modules.json?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/main.js");
/******/ 	
/******/ })()
;