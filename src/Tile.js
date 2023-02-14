module.exports =class Tile {
    constructor(x, y, type, id) {
        this.x = x;
        this.y = y;
        this.type = type;
        this.id;
    }

    static types = {
        building: "buildings",
        material: "materials",
    };



   
    getData() {
        return window.gameData[this.type][this.id];
    }
}

