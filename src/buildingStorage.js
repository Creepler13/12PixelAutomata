const Building = require("./tiles/Building");

module.exports = class BuildingStorage {
    /**
     *
     * @param {Building} building
     */
    constructor(building) {
        this.building = building;
    }

    storage = {};

    bufferedStorage = {};

    onBeforeTick() {
        this.bufferedStorage = {};
    }

    onAfterTick() {
        Object.keys(this.bufferedStorage).forEach((material) => {
            if (!this.storage[material]) this.storage[material] = 0;
            this.storage[material] = this.storage[material] + this.bufferedStorage[material];
            if (this.storage[material] <= 0) delete this.storage[material];
        });
    }

    accepts(material, ammount) {
        let data = this.building.getData();
        if (!data.allowedInput) return false;
        if (!data.allowedInput[material] && !data.allowedInput["*"]) return false;
        return (
            (this.storage[material] ? this.storage[material] : 0) +
                (this.bufferedStorage[material] ? this.bufferedStorage[material] : 0) +
                ammount <=
            data.allowedInput[data.allowedInput["*"] ? "*" : material]
        );
    }

    remove(material, ammount) {
        if (this.storage[material])
            if (!this.bufferedStorage[material])
                //      if (this.storage[material] <= amount) delete this.bufferedStorage[material];

                this.bufferedStorage[material] = -ammount;
            else this.bufferedStorage[material] = this.bufferedStorage[material] - ammount;
    }

    add(material, ammount, ignoreMaxStorage) {
        if (!ignoreMaxStorage) if (!this.canAdd(material, ammount)) return false;

        if (!this.bufferedStorage[material]) this.bufferedStorage[material] = ammount;
        else this.bufferedStorage[material] = this.bufferedStorage[material] + ammount;

        return true;
    }

    canAdd(material, ammount) {
        let data = this.building.getData();
        if (!data.allowedInput) return false;

        return (
            this.accepts(material, ammount) &&
            this.storageAmmount() +
                (this.bufferedStorage[material] ? this.bufferedStorage[material] : 0) +
                ammount <=
                this.storageAmmount(data.allowedInput)
        );
    }

    has(material, amount) {
        if (!amount) return this.storage[material];
        else return this.storage[material] >= amount;
    }

    storageAmmount(optinalStorage) {
        let ammount = 0;
        Object.values(optinalStorage ? optinalStorage : this.storage).forEach(
            (item) => (ammount = ammount + item)
        );
        return ammount;
    }
};
