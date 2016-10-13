



var Santa_Monica_Streets = {

    'feature_color': 'blue',
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "rgba(0,0,255,0.6)",
    "line-width": 6,
    "line-width-highlight": 12
};



var Santa_Monica_Bike_Route = {

    'feature_color': 'red',
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "rgba(255, 0, 0, 0.9)",
    "line-width": 15,
    "line-width-highlight": 18
};




var Santa_Monica_Speed_Limit = {

    'feature_color': 'green',
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "rgba(0,128,0,0.9 )",
    "line-width": 15,
    "line-width-highlight": 18
};




var Santa_Monica_Streets_Sweeping = {

    'feature_color': 'green',
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "rgba(0,128,0,0.9 )",
    "line-width": 15,
    "line-width-highlight": 18
};





var Santa_Monica_Parcels = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0)',
    'fill-color-highlight': 'rgba(0,128,0,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};



var Santa_Monica_Zoning = {

    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};






var Santa_Monica_Blocks = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0)',
    'fill-color-highlight': 'rgba(0,128,0,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};


var Santa_Monica_Buildings = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0.2)',
    'fill-color-highlight': 'rgba(0,128,0,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};





source_layer['all_layers'] = { Santa_Monica_Zoning, Santa_Monica_Parcels, Santa_Monica_Streets, Santa_Monica_Buildings, Santa_Monica_Blocks, Santa_Monica_Streets_Sweeping, Santa_Monica_Speed_Limit, Santa_Monica_Bike_Route };

source_layer['Santa_Monica_overview'] = { Santa_Monica_Parcels, Santa_Monica_Streets, Santa_Monica_Zoning };



