module.exports = class Action {
    performAction(building, data) {}

    static loadActions() {
        let actions = {};
        let actionsFile = require("./data/actions.json");

        actionsFile.forEach((file) => {
            actions[file.toLowerCase()] = new (require("./actions/" + file + ".js"))();
        });

        return actions;
    }
};
