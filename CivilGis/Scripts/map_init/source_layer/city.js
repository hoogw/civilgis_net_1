
var city_address = {

    'feature_color':'yellow',
    'type': 'circle',
    'circle-color': 'rgba(255,255,0, 0.8)',
    'circle-radius': '3',
    'circle-blur': 0
};


var city_streets = {

    'feature_color': 'blue',
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "rgba(0,0,255,0.8)",
    "line-width": 1
};




var city_parcels = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0)',
    'fill-outline-color': 'rgba(0,128,0,0.6 )'



};



var city_zoning = {

    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.6)'


};




source_layer['city_overview'] = { city_zoning, city_parcels, city_streets, city_address };

//source_layer['city_overview'] = { city_address, city_streets, city_parcels, city_zoning };