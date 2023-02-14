module.exports.Action = class Action {

performAction(building,data){

}

};

let actions = {};
let actionsFile = require("./data/actions.json");

actionsFile.forEach((file) => {
    
    actions[file.toLowerCase()] = new (require("./actions/" + file+".js"))();
});

module.exports = actions;
