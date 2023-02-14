const  Action  = require("../Action");
const Building = require("../tiles/Building");
module.exports = class Make extends Action {
    /**
     * 
     * @param {Building} building 
    
     */
    performAction(building, data) {
        let hasMaterials;
        if (!data.cost) hasMaterials = true;
        else
            hasMaterials = Object.keys(data.cost).every((material) =>
                building.storage.has(material, data.cost[material])
            );

        if (!hasMaterials) return;

        Object.keys(data.cost).forEach((material) =>
            building.storage.remove(material, data.cost[material])
        );
        Object.keys(data.product).forEach((material) =>
            building.storage.add(material, data.cost[material], true)
        );
    }
};
