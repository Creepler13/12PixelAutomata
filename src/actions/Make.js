const Action = require("../Action");
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

        if (
            Object.keys(data.product).some(
                (material) => !building.storage.canAdd(material, data.product[material])
            )
        )
            return;

        if (data.cost)
            Object.keys(data.cost).forEach((material) =>
                building.storage.remove(material, data.cost[material])
            );
        if (data.product)
            Object.keys(data.product).forEach((material) =>
                building.storage.add(material, data.product[material])
            );
    }
};
