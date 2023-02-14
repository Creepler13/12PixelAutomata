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

    accepts(material) {
        let data = this.building.getData();
        if (!data.allowedInput) return false;
        return data.allowedInput.some(
            (allowedMaterial) => allowedMaterial == "*" || allowedMaterial == material
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
        let data = this.building.getData().storage;
        if (!data.storage) return false;
        let storageAmmount = BuildingStorage.storageAmmount(this.storage);
        return this.accepts(material) && storageAmmount + ammount <= data.storage;
    }

    has(material, amount) {
        if (!amount) return this.storage[material];
        else return this.storage[material] >= amount;
    }

    static storageAmmount(storage) {
        let ammount = 0;
        Object.values(storage).forEach((item) => (ammount = ammount + item));
        return ammount;
    }
};
