//WIP
function setUpSaveLoad() {
    document.getElementById("save").onclick = function save() {
        var out = "";
        var counter = 0;
        var oldsave = map[0][0].type + "," + map[0][0].facing + "," + map[0][0].level;
        for (let indexy = 0; indexy < map.length; indexy++) {
            for (let index = 0; index < map[0].length; index++) {
                var temp = map[index][indexy].type + "," + map[index][indexy].facing + "," + map[index][indexy].level;
                if (temp == oldsave) {
                    counter++;
                } else {
                    if (counter == 0) { counter = 1 };
                    out = out + counter + ":" + oldsave + "/";
                    counter = 1;
                }
                oldsave = temp;
            }
        }
        out = out + counter + ":" + oldsave + "/";
        out = out + materials["water"].amount + "," + materials["energy"].amount;
        document.getElementById("saveout").textContent = out;
    }
    //WIP
    document.getElementById("load").onclick = function load() {
        console.log("loaded")
        // @ts-ignore
        var input = document.getElementById('text').value;
        var data = input.split("/");
        var mate = data.pop();
        var tempmap = [];
        var mapdimssave = [];
        var counter = 0;
        for (let i = 0; i < data.length; i++) {
            var element = data[i];
            var datatemp = element.split(":");
            var datetemp = datatemp[1].split(",");
            counter = parseInt(datatemp[0]);
            for (let indexc = mapdimssave.length - 1; 0 < counter; indexc++) {

                console.log(datetemp[1]);

                var tiletemp = new Tile(mapdimssave.length, tempmap.length, datetemp[0], datetemp[1]);
                tiletemp.level = datetemp[2];
                mapdimssave.push(tiletemp);
                counter--;
                if (mapdimssave.length == mapDimensions) {
                    tempmap.push(mapdimssave);
                    mapdimssave = [];
                    indexc = 0;
                }
            }
        }
        map = tempmap;
    }
}