# leaflet-challenge

support from tutor Kourt on the following code: 

function pointToLayerFunc(feature, coordinates){
    console.log(feature)
    let magnitude = feature.properties.mag
    let depth = feature.properties.depth;
    console.log(magnitude);
    let marker_options = {
        radius: getRadius(magnitude),
        color: getColor(depth)
    }
    let marker = L.circleMarker(coordinates, marker_options)
    return marker;
}
