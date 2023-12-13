//PART ONE: CREATE A MAP 
const QUERY_URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
const RADIUS_SCALE = 5;
const RADIUS_MIN = 5;

let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);



//var legend = L.control({
    //position: 'bottomright'
//});
//legend.onAdd = function (){
    //var div = L.DomUtil.create("div","info legend");
    //{ label: 'Depth > 90', color: '#ea2c2c' },
    //{ label: '70 < Depth <= 90', color: '#FF8C00' },
    //{ label: '50 < Depth <= 70', color: '#FFA500' },
    //{ label: '30 < Depth <= 50', color: '#FFFF00' },
    //{ label: '10 < Depth <= 30', color: '#7CFC00' },
    //{ label: 'Depth <= 10', color: '#008000' }
    //return div;
//};
//legend.addTo(map);


d3.json(QUERY_URL).then(function(data){
    console.log(myMap, data);
    let options = {
        pointToLayer:  pointToLayerFunc,
    };
    L.geoJson(data, options).addTo(myMap);
    function getRadius(magnitude){
        let scaled_magnitude = magnitude * RADIUS_SCALE;
        let radius = Math.max(scaled_magnitude, RADIUS_MIN);
        return radius;
    }
    function pointToLayerFunc(feature, coordinates){
        console.log(feature)
        let magnitude = feature.properties.mag
        let depth = feature.properties.depth;
        console.log(magnitude);
        console.log(depth)
        let marker_options = {
            radius: getRadius(magnitude),
            color: getColor(depth)
        }
        let marker = L.circleMarker(coordinates, marker_options)
        return marker;
        let popupContent = `<b>Magnitude:</b> ${magnitude}<br><b>Depth:</b> ${depth}`;
        marker.bindPopup(popupContent);
    
        return marker 
    }
    function getColor(depth){
        switch (true) {
            case depth>90:
            return "#ea2c2c";
            case  depth > 70:
            return "#FF8C00";
            case depth > 50:
            return "#FFA500";
            case depth > 30:
                return "#FFFF00";
            case depth > 10:
                return "#7CFC00"; 
            default:
                return "#008000"; 
        }
    }
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let limits = [-10, 10, 30, 50, 70, 90];
      let colors = ["#008000", "#7CFC00", "#FFFF00", "#FFA500","#FF8C00","#ea2c2c"];
      for (let i = 0; i < limits.length; i++) {
        div.innerHTML += "<i style = 'background:" + colors[i] + "'></i>" + limits[i] + (limits[i + 1] ? "&ndash;" + limits[i+1] + "<br>":"+");

     }
     return div;
    }
    legend.addTo(myMap);
 
});  



// function styleInfo(features){
//         return {
//             fillColor: getColor(feature.geometry.coordinates[2]),
//             color: "red",
//             radius: getRadius(feature.properties.mag)
//         }
//     }
//         function getColor(depth){
//         switch (true){
//             case depth > 90:
//             return "#ea2c2c";
//             }
//         }
// });
//for (i = 0; i < earthquake_data.length; i++) {
    //let earthquake = earthquakes[i];
    
//}