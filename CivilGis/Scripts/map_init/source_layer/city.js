
var city_address = {

    'feature_color': 'yellow',
    'type': 'circle',
    'circle-color': 'rgba(255,255,0, 0.8)',
    'circle-color-highlight': 'rgba(255,0,0, 1)',
    'circle-radius': '6',
    'circle-radius-highlight': '12',
    'circle-blur': 0
};


var city_streets = {

    'feature_color': 'blue',
    "type": "line",

    "line-join": "round",
    "line-cap": "round",

    "line-color": "rgba(0,0,255,0.6)",
    "line-width": 6,
    "line-width-highlight": 12
};




var city_parcels = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0)',
    'fill-color-highlight': 'rgba(0,128,0,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};



var city_zoning = {

    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};


var city_general_landuse = {

    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};




var city_neighbor = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0)',
    'fill-color-highlight': 'rgba(0,128,0,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};


var city_parks = {


    'feature_color': 'green',
    'type': 'fill',

    'fill-color': 'rgba(0,128,0,0.2)',
    'fill-color-highlight': 'rgba(0,128,0,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};


var city_schools = {


    'feature_color': 'blue',
    'type': 'fill',

    'fill-color': 'rgba(0, 255, 255,0.3)',
    'fill-color-highlight': 'rgba(0, 255, 255,0.5)',
    'fill-outline-color': 'rgba(0,128,0,0.9 )'



};


var city_law_agency = {


    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};


var city_law_reportarea = {


    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};

var city_law_geoproximity = {


    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};



var city_law_district = {


    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};



var city_law_beat = {


    'feature_color': 'red',

    'type': 'fill',
    'fill-color': 'rgba(255, 0, 0, 0)',
    'fill-color-highlight': 'rgba(255, 0, 0, 0.5)',
    'fill-outline-color': 'rgba(255, 0, 0, 0.9)'


};



var city_fire_station_boundary = {


    'feature_color': 'blue',

    'type': 'fill',
    'fill-color': 'rgba(0, 0, 255, 0)',
    'fill-color-highlight': 'rgba(0, 0, 255, 0.5)',
    'fill-outline-color': 'rgba(0, 0, 255, 0.9)'


};


var city_fire_geoproximity = {


    'feature_color': 'blue',

    'type': 'fill',
    'fill-color': 'rgba(0, 0, 255, 0)',
    'fill-color-highlight': 'rgba(0, 0, 255, 0.5)',
    'fill-outline-color': 'rgba(0, 0, 255, 0.9)'


};


var city_fire_district = {


    'feature_color': 'blue',

    'type': 'fill',
    'fill-color': 'rgba(0, 0, 255, 0)',
    'fill-color-highlight': 'rgba(0, 0, 255, 0.5)',
    'fill-outline-color': 'rgba(0, 0, 255, 0.9)'


};


var city_fire_agency = {


    'feature_color': 'blue',

    'type': 'fill',
    'fill-color': 'rgba(0, 0, 255, 0)',
    'fill-color-highlight': 'rgba(0, 0, 255, 0.5)',
    'fill-outline-color': 'rgba(0, 0, 255, 0.9)'


};



source_layer['all_layers'] = {
    city_zoning, city_general_landuse, city_parcels, city_streets, city_address, city_neighbor, city_parks, city_schools, city_law_agency, city_law_reportarea, city_law_geoproximity, city_law_district, city_law_beat,
    city_fire_station_boundary, city_fire_geoproximity, city_fire_district, city_fire_agency
};

source_layer['city_overview'] = { city_address, city_parcels, city_streets, city_zoning };

//source_layer_id['city_overview'] = [ 'city_zoning', 'city_parcels', 'city_streets', 'city_address' ];



//source_layer['city_overview'] = { city_address, city_streets, city_parcels, city_zoning };



