const Building = require("./Building");

module.exports = class BuildingStorage {
    constructor(building) {
        /**
         * @type {Building}
         */
        this.building = building;
    }

    storage = {};

    remove(type, amount) {
        if (this.storage[type])
            if (this.storage[type] <= amount) delete this.storage[type];
            else this.storage[type] = this.storage[type] - amount;
    }

    add(type, amount) {
        let storageAmmount = BuildingStorage.storageAmmount(this.storage);

        if (storageAmmount + amount >= this.building.getData().storage) return false;
        if (!this.storage[type]) this.storage[type] = 0;
        this.storage[type] = this.storage[type] + amount;
        return true;
    }

    has(type, amount) {
        if (!amount) return this.storage[type];
        else return this.storage[type] >= amount;
    }

    static storageAmmount(storage) {
        let ammount = 0;
        Object.values(storage).forEach((item) => (ammount = ammount + item));
        return ammount;
    }
};
