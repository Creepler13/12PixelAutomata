exports.DataStorage = class DataStorage {

    constructor() {
        this.data = {};

        this.set = (key, data) => {
            this.data[key] = data;
        }

        this.get = (key) => {
            return this.data[key]
        }

        this.getKeys = () => {
            var temp = [];
            for (const e in this.data) temp.push(e);
            return temp;
        }


    }

}