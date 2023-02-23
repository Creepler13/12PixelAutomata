const React = require("react");

module.exports = class BuildingTab extends React.Component {
    constructor(probs) {
        super(probs);
        console.log(probs);
    }

    render() {
        let tab = (
            <div id="buildingsTab">
                <a>{this.props.tab}</a>
                <ul id="buildingList">
                    {this.props.buildings.map((building) => this.building(building))}
                </ul>
            </div>
        );

        return tab;
    }

    building(buildingID) {
        /** @type {import("../tiles/Building").BuildingData} */
        let building = window.gameData.buildings[buildingID];

        return (
            <li id="buildingListEntry" key={buildingID + "_btn"}>
                <div id="building" onClick={() => {(window.selectedBuilding = buildingID);}}>
                    <img src={window.gameData.buildings[buildingID].texture.src} />
                    <a>{buildingID}</a>
                    {this.getmaterialCostEmbed(building)}
                </div>
            </li>
        );
    }

    getmaterialCostEmbed(building) {
        console.log(building);
        return (
            <div className="buildingCost">
                {Object.keys(building.cost).map((material) => {
                    return (
                        <div>
                            <img src={window.gameData.materials[material].texture.src} />
                            <a>{building.cost[material]}</a>
                        </div>
                    );
                })}
            </div>
        );
    }
};
