const React = require("react");

module.exports = class BuildingTab extends React.Component {
    constructor(probs) {
        super(probs);
        console.log(probs);
    }

    render() {
        let tab = (
            <div>
                <h1>{this.props.tab}</h1>
                <ul>{this.props.buildings.map((building) => this.button(building))}</ul>
            </div>
        );

        return tab;
    }

    button(buildingID) {
        /** @type {import("../tiles/Building").BuildingData} */
        let building = window.gameData[buildingID];

        return (
            <li key={buildingID + "_btn"}>
                <button onClick={()=>(window.selectedBuilding = buildingID)}>{buildingID}</button>
                <h3>Test</h3>
            </li>
        );
    }
};
