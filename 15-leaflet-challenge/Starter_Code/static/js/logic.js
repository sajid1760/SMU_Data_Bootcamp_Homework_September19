const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson";
const plate_url = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";
const file = 'PB2002_boundaries.json';


$(document).ready(function () {

d3.json(url).then(function(data){

    d3.json(plate_url).then(function(plate_data){

        console.log(data.features.length);
      
        makeMap(data, plate_data, data.features.length);

    });

 });

});

//  d3.select("#sel_number").on("change", function() {
//   let eq_numbers = d3.select("#sel_number").node().value;  
//   console.log(eq_numbers);
//   makeMap(data, plate_data, eq_numbers);
//  });



// Main function to make graphs  and all the layers

function makeMap(data, plate_data, eq_numbers) {

$("#mapcontainer").empty();
$("#mapcontainer").append("<div id='map'></div>");

// create base layers

var myMap = L.map("map", {
    center: [30, 0],
    zoom: 2
  });
  
var street =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

//create legend

var info = L.control({
    position: 'bottomright'
    
  });
  
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };

  info.addTo(myMap);



// create plate boundaries using L.geoJSON

  let mapStyle = {
    color: "red",
    fillColor: "pink",
    fillOpacity: 0.35,
    weight: 5
  };


  var plates2 = L.geoJSON(plate_data.features, {
    style: mapStyle,
  }).addTo(myMap);

  updateLegend();

// create plate boundaries using polyline

var plates = [];
const plate_length = plate_data.features.length;

for(j = 0; j < plate_length; j++) {

  plate_coords = plate_data.features[j].geometry.coordinates;
  plate_coords_reversed = [];
  for (k = 0; k < plate_coords.length; k++) {
    plate_coords_reversed.push([plate_coords[k][1], plate_coords[k][0]]);
  }
  plates.push(L.polyline(plate_coords_reversed, {
    color: "blue",
    weight: 1
  }).addTo(myMap));

};

//create markers

var earthquakes = [];
let lenth = eq_numbers;

for (i = 0; i < lenth; i++) {
    earthquake = data.features[i];
    coords = [earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]];
    depth = earthquake.geometry.coordinates[2];
    mag = earthquake.properties.mag;
    if (depth < 91) {
        depth_color = Math.floor((depth+10)/20)*50;
    } else {
        depth_color = 255;
    }

    neg_depth_color = 255 - depth_color;

        earthquakes.push(L.circle(coords, {
                            color: "black",
                            fillColor: `rgb(${depth_color},${neg_depth_color},0)`,
                            fillOpacity: 0.75,
                            radius: 10000*mag**2,
                            weight: 0
                        }).bindPopup(`${earthquake.properties.title} <br> Coords: ${coords[0].toFixed(2)},${coords[1].toFixed(2)} <br> Depth: ${depth} meters`).addTo(myMap));
    
                        
    
}

var earthquakes_layer = L.layerGroup(earthquakes);

var plate_layer = L.layerGroup(plates);

var plate_layer2 = L.layerGroup([plates2]);

var baseMaps = {
  Street: street,
  Topography: topo,
  Satellite: googleSat
};


var overlayMaps = {
    "Earthquakes": earthquakes_layer,
    "Plates": plate_layer,
    "Thick Plates": plate_layer2
};

L.control.layers(baseMaps, overlayMaps).addTo(myMap);

var eq_select = L.control({
  position: 'bottomleft'
  
});

eq_select.onAdd = function() {
  var div = L.DomUtil.create("div", "select");
  return div;
};
// Add the info legend to the map.
eq_select.addTo(myMap);

updateSelector();

d3.select("#sel_number").on("change", function() {

  let eq_numbers = d3.select("#sel_number").node().value;  
  if (eq_numbers == "all") {eq_numbers = data.features.length};
  makeMap(data, plate_data, eq_numbers);

});

};

function updateLegend() {
  document.querySelector(".legend").innerHTML = 

    `
    <div class="card border-primary mb-3" style="max-width: 20rem;">
    <div class="card-header" style = 'color:black;'>Depth (meters)</div>
    <div class="card-body">
       
    <p style = 'background-color:rgb(0, 255, 0); color:black;'>-10m to 10m</p>
    <p style = 'background-color:rgb(50, 205, 0); color:black;'>10m to 30m</p>
    <p style = 'background-color:rgb(100, 155, 0); color:black;'>30m to 50m</p>
    <p style = 'background-color:rgb(150, 105, 0); color:black;'>50m to 70m</p>
    <p style = 'background-color:rgb(200, 55, 0); color:black;'>70m to 90m</p>
    <p style = 'background-color:rgb(250, 5, 0); color:black;'>more than 90m</p>
    
    </div>
    </div>`  
    
}

function updateSelector() {
  document.querySelector(".select").innerHTML = 

      `
      <div class="card border-primary mb-1" style="max-width: 20rem;">
      <div class="card-header" style = 'color:black;'>Earthquakes</div>
      <div class="card-body">
        <select id="sel_number">

          <option>select</option>
          <option>100</option>
          <option>400</option>
          <option>800</option>
          <option>1200</option>
          <option>all</option>

        </select>   
      </div>
      </div>`
      


}