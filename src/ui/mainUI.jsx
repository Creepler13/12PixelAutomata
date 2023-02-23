const React = require("react");
const ReactDOM = require("react-dom/client");
const BuildingTab = require("./BuildingTab");

module.exports.InitUI = function InitUI() {
    const root = ReactDOM.createRoot(document.getElementById("buildings"));
    root.render(makeBuildingSelect());
};

function makeBuildingSelect() {
    let tabs = {};
    Object.values(window.gameData.buildings).forEach((building) => {
        if (!building.tab) building.tab = "default";
        if (!tabs[building.tab]) tabs[building.tab] = [];
        tabs[building.tab].push(building.name);
    });

    let buildingSelect = (
        <div id="buildingTabs">
            <a>Buildings</a>
            <div id="buildingTabsUL">
            {Object.keys(tabs).map((tab) => (
                <BuildingTab tab={tab} buildings={tabs[tab]} />
            ))}</div>
        </div>
    );
    return buildingSelect;
}
