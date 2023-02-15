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

    accepts(material, ammount) {
        let data = this.building.getData();
        if (!data.allowedInput) return false;
        if (!data.allowedInput[material] && !data.allowedInput["*"]) return false;
        return (
            (this.storage[material] ? this.storage[material] : 0) + ammount <=
            data.allowedInput[data.allowedInput["*"] ? "*" : material]
        );
    }

    remove(material, amount) {
        if (this.storage[material])
            if (this.storage[material] <= amount) delete this.storage[material];
            else this.storage[material] = this.storage[material] - amount;
    }

    add(material, ammount, ignoreMaxStorage) {
        if (!ignoreMaxStorage) if (!this.canAdd(material, ammount)) return false;

        if (!this.storage[material]) this.storage[material] = 0;
        this.storage[material] = this.storage[material] + ammount;

        return true;
    }

    canAdd(material, ammount) {
        let data = this.building.getData();
        if (!data.storage) return false;
        let storageAmmount = this.storageAmmount();
        return this.accepts(material, ammount) && storageAmmount + ammount <= data.storage;
    }

    has(material, amount) {
        if (!amount) return this.storage[material];
        else return this.storage[material] >= amount;
    }

    storageAmmount() {
        let ammount = 0;
        Object.values(this.storage).forEach((item) => (ammount = ammount + item));
        return ammount;
    }
};
