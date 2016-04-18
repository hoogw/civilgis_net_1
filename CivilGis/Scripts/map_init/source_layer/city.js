
var city_address = {
    'type': 'circle',
    'circle-color': 'rgba(0,255,0,1)',
    'circle-radius': '3',
    'circle-blur': 0
};


var city_streets = {
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "#FFD700",
    "line-width": 1
};




var city_parcels = {

    'type': 'fill',

    'fill-color': 'rgba(200, 100, 240, 0)',
    'fill-outline-color': 'rgba(200, 100, 240, 1)'



};



var city_zoning = {

    'type': 'fill',
    'fill-color': 'rgba(218,165,32, 0)',
    'fill-outline-color': '#FFFAFA'


};




source_layer['city_overview'] = { city_address, city_streets, city_parcels };