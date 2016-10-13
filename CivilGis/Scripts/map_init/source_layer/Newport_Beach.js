
var Newport_Beach_Address = {

    'feature_color': 'yellow',
    'type': 'circle',
    'circle-color': 'rgba(255,255,0, 0.8)',
    'circle-color-highlight': 'rgba(255,0,0, 1)',
    'circle-radius': '6',
    'circle-radius-highlight': '12',
    'circle-blur': 0
};


var Newport_Beach_Streets = {

    'feature_color': 'blue',
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "rgba(0,0,255,0.6)",
    "line-width": 6,
    "line-width-highlight": 12
};

var Newport_Beach_Right_Of_Way = {

    'feature_color': 'green',
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "rgba(0,128,0,0.9 )",
    "line-width": 10,
    "line-width-highlight": 18
};


var Newport_Beach_Parcels = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0)',
    'fill-color-highlight': 'rgba(0,128,0,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};



var Newport_Beach_Zoning = {

    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};


var Newport_Beach_General_Land_Use = {

    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};







var Newport_Beach_Parks = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0.2)',
    'fill-color-highlight': 'rgba(0,128,0,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};





source_layer['all_layers'] = { Newport_Beach_Zoning, Newport_Beach_General_Land_Use, Newport_Beach_Parcels, Newport_Beach_Streets, Newport_Beach_Address, Newport_Beach_Parks, Newport_Beach_Right_Of_Way };

source_layer['Newport_Beach_overview'] = { Newport_Beach_Address, Newport_Beach_Parcels, Newport_Beach_Streets, Newport_Beach_Zoning };





