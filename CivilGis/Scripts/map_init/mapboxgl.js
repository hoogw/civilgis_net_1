
var leaflet_open_street_map_max_zoom_level = 19;
var base_map_tile_layer;
var overlay_tile_layer;
var lasttime_overlay_tile_layer;
var geojson_default_style;
var geojson_classification_style;
var geojson_mouseover_highlight_style;
var geojson_clienttable_mouseover_highlight_style;
var geojson_Marker_style_Options;
var _current_markers_cluster;
var _last_markers_cluster;
var _click_polygon_style;
var _click_line_style;
var _mouseover_polygon_style;
var _mouseover_line_style;
var geojson_classification_mouseover_highlight_style;



var _tile_exist = false;
var _tile_list;

var _addr_info;
var search_address_marker;
var flyto_marker;
var geocoder;


var map;
//var markersArray = [];
var apiURI;
var infowindow;
var base_url;
var point_icon_url;
var initial_location = [];

var bounds;
var southWest;
var northEast;
var SWlong;
var SWlat;
var NElong;
var NElat;
var listener_center_changed;
var listener_zoom_changed;
var listener_dragend;
var listener_idle;

var _geojson_object;
var _geojson_obj_array;
var _array_feature;
var _dt_columns = [];
var _dt_columns_count;
var _area_db = [];
var _flyto_zoomlevel;

var _lat;
var _long;
var _geoFID;
var _dt_columns = [];
var _column = {};
var _geometry_type;
var _geometry_coord;
var _column_count;

var _mouseover_polygon;
var _mouseover_line;
var _mouseover_point;
var _mouseover_coord;

var _click_polygon;
var _click_line;
var _click_point;
var _click_coord;
var _area_polygon;
var _area_polygon_coord = [];
var _area_polyline;


var _highlight_marker;

// ----cluster [3]----
var markerClusterer;
var infobox;
var boxText;
var _cluster_in_use = false;
//------------end cluster [3] ------------




var _multi_polyline;
var _tile_baseURL;
var _areaID;
var _subjectID;
var tile_MapType;
var _current_geojson_layer = null;
var _last_geojson_layer = null;



//--------------classification-------------------------

var _designation = [];
var _code_column_name = '';

var _current_classifycheckbox_class;
var _designation_key;
var _designation_parentArray;
//---------------------------------



// ---------  map click event [0-4] ---------------- cluster map conflict with map click event, so do not use with cluster.------------

var listener_click;
var listener_rightclick;
var _mapclick_in_use = false;



//-----------------------------------------


// --------default feature style -----------
_default_fillOpacity = 0;
_default_strokeColor = '#0000FF'; //blue
_default_strokeWeight = 2;


_highlight_fillOpacity = 0;
_highlight_strokeColor = '#000000'; // black
_highlight_strokeWeight = 8;

_clienttable_mouseover_highlight_fillColor = '#000080';
_clienttable_mouseover_highlight_fillOpacity = 0.5;
_clienttable_mouseover_highlight_strokeColor = '#FF0000';
_clienttable_mouseover_highlight_strokeWeight = 5;



_classfiy_fillOpacity = 0;
_classfiy_strokeColor = '#0000FF'; //blue
_classfiy_strokeWeight = 0.2;


//---------------------------------


geojson_default_style = {

    "color": _default_strokeColor,
    "weight": _default_strokeWeight,
    "fillOpacity": _default_fillOpacity
};


geojson_classification_style = {

    "color": '#0000FF',
    "weight": 0.2,
    "fillOpacity": 0
};




geojson_mouseover_highlight_style = {

    "color": _highlight_strokeColor,
    "weight": _highlight_strokeWeight,
    "fillOpacity": _highlight_fillOpacity
};


geojson_clienttable_mouseover_highlight_style = {

    "color": _clienttable_mouseover_highlight_strokeColor,
    "weight": _clienttable_mouseover_highlight_strokeWeight,
    "fillColor": _clienttable_mouseover_highlight_fillColor,
    "fillOpacity": _clienttable_mouseover_highlight_fillOpacity
};


geojson_Marker_style_Options = {

    radius: 3,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8


};

_click_polygon_style = {
    
    color: '#FF0000',
    opacity: 0.8,
    weight: 12,
    fillColor: '#FF0000',
    fillOpacity: 0.01
};


_click_line_style = {

    color: '#FF0000',
    opacity: 0.8,
    weight: 12,
    fillColor: '#FF0000',
    fillOpacity: 0.01
};

_mouseover_polygon_style = {
    
    color: '#F7D358',
    opacity: 0.8,
    weight: 12,
    fillColor: '#FF0000',
    fillOpacity: 0.01
};


_mouseover_line_style = {

    color: '#F7D358',
    opacity: 0.8,
    weight: 12,
    fillColor: '#FF0000',
    fillOpacity: 0.01
};



geojson_classification_mouseover_highlight_style = {

    Weight: 2,
    Color: '#000000',
    fillColor: '#000000',
    fillOpacity: 1

};






function set_initial_location(_area) {


    _areaID = $("#areaID").val();
    _subjectID = $("#subjectID").val();

    _flyto_zoomlevel = 18; // default for parcels, point, street, small feature.

    //if (($("#areaID").val() === "county") && ($("#subjectID").val() === "cities")){  _flyto_zoomlevel = 11 }
    if ($("#subjectID").val() === "cities") { _flyto_zoomlevel = 11 }
    if ($("#subjectID").val() === "parks") { _flyto_zoomlevel = 16 }


    //SWlong/SWlat/NElong/NElat/
    // current location array ["area", init_Lat, init_long, init_zoom level, "init_bounding_box"]

    _area_db["county"] = ["county", 33.693495, -117.793350, 11, "/-118.191605/33.367237/-117.406769/33.970698/"];
    _area_db["city"] = ["city", 33.65992448007282, -117.91505813598633, 13, "/-117.963690/33.634180/-117.854780/33.702970/"];
    _area_db["Newport_Beach"] = ["Newport_Beach", 33.616478, -117.875748, 13, "/-117.979259/33.559278/-117.811031/33.679068/"];
    _area_db["Santa_Monica"] = ["Santa_Monica", 34.023143, -118.475275, 14, "/-118.523083/33.982656/-118.431931/34.073280/"];


    _area_db["Los_Angeles"] = ["Los_Angeles", 34.043556504127444, -118.24928283691406, 11, "/-118.51638793945312/33.73633183280655/-118.07281494140625/34.13908837343848/"];
    _area_db["San_Francisco"] = ["San_Francisco", 37.77559951996456, -122.41722106933594, 12, "/-122.53034591674805/37.686265625259175/-122.3573112487793/37.84164803953047/"];
    _area_db["New_York"] = ["New_York", 40.753499070431374, -73.98948669433594, 11, "/-74.29985046386719/40.463143910531016/-71.79428100585938/41.35774173825275/"];
    _area_db["Chicago"] = ["Chicago", 41.874673839758024, -87.63175964355469, 11, "/-87.75535583496094/41.56562822121976/-87.330322265625/42.03501434990212/"];
    _area_db["Denver"] = ["Denver", 39.74336227378035, -104.99101638793945, 12, "/-105.14053344726562/39.58029027440865/-104.57199096679688/39.96238554917605/"];
    _area_db["Los_Angeles_County"] = ["Los_Angeles_County", 34.05607276338366, -118.26370239257812, 10, "/-119.234619140625/33.58487928182987/-117.542724609375/34.87804506169049/"];


    _area_db["New_York_Bronx"] = ["New_York_Bronx", 40.85537053192496, -73.87687683105469, 13, "/-73.95137786865234/40.78548067439838/-73.79585266113281/40.9052096972736/"];
    _area_db["New_York_Brooklyn"] = ["New_York_Brooklyn", 40.65433643720422, -73.95206451416016, 13, "/-74.05197143554688/40.56780665420206/-73.84838104248047/40.72072146844198/"];
    _area_db["New_York_Manhattan"] = ["New_York_Manhattan", 40.764421348741976, -73.97815704345703, 13, "/-74.02416229248047/40.700682761880564/-73.91738891601562/40.86471823388759/"];
    _area_db["New_York_Queens"] = ["New_York_Queens", 40.72280306615735, -73.79997253417969, 13, "/-73.95206451416016/40.53911243826349/-73.68221282958984/40.8662760559589/"];
    _area_db["New_York_Staten_Island"] = ["New_York_Staten_Island", 40.60300547512703, -74.1353988647461, 13, "/-74.2679214477539/40.48795409096868/-74.04716491699219/40.657461921354866/"];



    _area_db["Arura"] = ["Arura", 39.723296392333026, -104.84081268310547, 13, "/-104.97127532958984/39.61573894281141/-104.501953125/39.818557296839344/"];
    _area_db["Bakersfield"] = ["Bakersfield", 39.818557296839344, -104.501953125, 13, "/-119.19822692871094/35.266365060848436/-118.78177642822266/35.44808511462123/"];
    _area_db["Baltimore"] = ["Baltimore", 35.44808511462123, -118.78177642822266, 13, "/-76.74568176269531/39.24714385893248/-76.42021179199219/39.44520783247914/"];
    _area_db["Denver"] = ["Denver", 39.44520783247914, -76.42021179199219, 13, "/-105.10276794433594/39.612565174816254/-104.59259033203125/39.90657598772841/"];
    _area_db["Orlando"] = ["Orlando", 39.90657598772841, -104.59259033203125, 13, "/-81.47872924804688/28.4463551910418/-81.265869140625/28.6080342113753/"];
    _area_db["Palo_Alto"] = ["Palo_Alto", 37.4426999532675, -122.15492248535156, 13, "/-122.22702026367188/37.339045928741186/-122.10411071777344/37.49529038649112/"];
    _area_db["Philadelphia"] = ["Philadelphia", 37.49529038649112, -122.10411071777344, 13, "/-75.24845123291016/39.87048617098581/-74.95491027832031/40.13794057716276/"];
    _area_db["Portland"] = ["Portland", 40.13794057716276, -74.95491027832031, 13, "/-122.75264739990234/45.433153642271414/-122.46803283691406/45.58473142874248/"];
    _area_db["San_Jose"] = ["San_Jose", 45.58473142874248, -122.46803283691406, 13, "/-122.06428527832031/37.22076028799717/-121.82052612304688/37.45469273789926/"];
    _area_db["Seattle"] = ["Seattle", 37.45469273789926, -121.82052612304688, 13, "/-122.43644714355469/47.514186307885765/-122.20745086669922/47.741863047356425/"];
    _area_db["Shoreline"] = ["Shoreline", 47.75479043701335, -122.34392166137695, 13, "/-122.38700866699219/47.730202558631625/-122.27182388305664/47.77936670249429/"];
    _area_db["Stockton"] = ["Stockton", 47.77936670249429, -122.27182388305664, 13, "/-121.42827987670898/37.890705366311686/-121.18932723999023/38.063635376296816/"];
    _area_db["Washington_DC"] = ["Washington_DC", 38.063635376296816, -121.18932723999023, 13, "/-77.12041854858398/38.87900680425525/-76.88146591186523/39.0045114938785/"];



    // resize map div height based on user's browser resolution.

    var browser_width = $(window).width();
    var browser_height = $(window).height();

    var _map_canvas_height_small = Math.round(browser_height / 2) - 100;
    $("#map-canvas").height(_map_canvas_height_small);


    // End of browser resize

    return _area_db[_area];

}




function add_area_boundary(_area) {


    _multi_polyline = 'No';
    var _js_url = "/Scripts/area_boundary/leaflet/" + _area + ".js";





    // NOTE:  Polyline use path: no S, while  polygon, use paths:   have S,   if you missing S will fail drawing


    $.when(
             $.getScript(_js_url)
     /*
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    */

    ).done(function () {

        //place your code here, when above all scripts are all loaded completely.



        //if(_area_polygon_coord[_area][0] instanceof Array)
        if (_multi_polyline == 'Yes') {
            // for multi line



            var parentArray = _area_polygon_coord[_area];


            for (var i = 0; i < parentArray.length; i++) {




                var _area_polyline_multi = L.polyline(parentArray[i], { color: '#0000FF', weight: 5, opacity: 0.8 }).addTo(map);

                   

            }// outer for



        }
        else {

           


            _area_polyline = L.polyline(_area_polygon_coord[_area], { color: '#0000FF', weight: 5, opacity: 0.8 }).addTo(map);

           

           
        }//else


    }); // when done






    /*
    
                                    For 2 dimenional Arrays:
    
                                    for(var i = 0; i < parentArray.length; i++){
                                        for(var j = 0; j < parentArray[i].length; j++){
    
                                            console.log(parentArray[i][j]);
                                        }
                                    }
                                    For arrays with an unknown number of dimensions you have to use recursion:
    
                                    function printArray(arr){
                                        for(var i = 0; i < arr.length; i++){
                                            if(arr[i] instanceof Array){
                                                printArray(arr[i]);
                                            }else{
                                                console.log(arr[i]);
                                            }
                                        }
                                    }
    
                                    or
    
                                    var printArray = function(arr) {
                                        if ( typeof(arr) == "object") {
                                            for (var i = 0; i < arr.length; i++) {
                                                printArray(arr[i]);
                                            }
                                        }
                                        else document.write(arr);
                                    }
    
                                    printArray(parentArray);
    
    
    
    */



}// function add_area_boundary



function init_tiling(){
    
    // --------------------- dynamic load javascript file  ---------------------------


    
    var _tile_list_js = "/Scripts/map_init/tile_list/googlemap_tile_list.js";

    $.when(
             $.getScript(_tile_list_js)
     /*
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    */

    ).done(function () {

        var  _tile_name = _areaID + "_" + _subjectID;
        var _i = _tile_list.indexOf(_tile_name);
        //alert(_tile_name);
        if (_i >= 0) {





                        //http://tile.transparentgov.net/v2/cityadr/{z}/{x}/{y}.png
                         _tile_baseURL = 'http://tile.transparentgov.net/v2/';
                        // _tile_baseURL = 'http://localhost:8888/v2/cityadr/{z}/{x}/{y}.png';


                         var overlay_tile_Url = _tile_baseURL + _areaID + '_' + _subjectID + '/{z}/{x}/{y}.png';
                         var overlay_tile_Attrib = 'Map data &#169; <a href="http://transparentgov.net">transparentgov.net</a> contributors';
                         tile_MapType = new L.TileLayer(overlay_tile_Url, { minZoom: 3, maxZoom: 22, errorTileUrl:'  ', unloadInvisibleTiles: true, reuseTiles:true, attribution: overlay_tile_Attrib });

                        // ===== above must define errorTileUrl:'  ', must have some character or space in '  ' above. If not define this, missing tile will show a broken image icon on map everywhere, if define this, it just failed to load empty URL, not showing broken image icon


                         overlay_tile_layer = map.addLayer(tile_MapType);


                         _tile_exist = true;

                     }// if


    }); // when done


}// init tile



function add_tiles(){
    
   

    
   
        tile_MapType.bringToFront();
        
  
}

function remove_tiles() {


    tile_MapType.bringToBack();


}


//------------- leaflet basic simple map function -----------------------------

function get_map_bound() {

    //document.getElementById("title_info").innerHTML = "MAP BOUNDS [SouthWest, NorthEast] "+ map.getBounds();
    // get current map bounds as URL parameters. 






    bounds = map.getBounds();
    southWest = bounds.getSouthWest();
    northEast = bounds.getNorthEast();
    SWlong = southWest.lng;
    SWlat = southWest.lat;
    NElong = northEast.lng;
    NElat = northEast.lat;

    //alert(SWlong);

    // http://localhost:10/civilgis/api/load/general_landuse/SWlong/SWlat/NElong/NElat/   This is sample URI
    //var _url = base_url + 'api/loadall/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';
    var _url = "/api/geojson/feature/" + initial_location[0] + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

    document.getElementById("ajaxload").style.display = "block";
    ajax_GeoJSON(map, _url, false);




}


function get_click_latlng(_click_event_lat, _click_event_lng) {


    if (_mapclick_in_use) {


        // --- current use 2X2 grid boundary (as click event latlong is on center point), you can use 3x3 grid or adjust house length to make larger/smaller select area. 
        var _square_house_length = 0.0004; // average is 0.0003-0.0004


        SWlong = _click_event_lng - _square_house_length;
        SWlat = _click_event_lat - _square_house_length;
        NElong = _click_event_lng + _square_house_length;
        NElat = _click_event_lat + _square_house_length;




        var _url_click_event = "/api/geojson/feature/" + $("#areaID").val() + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

        document.getElementById("ajaxload").style.display = "block";
        ajax_GeoJSON(map, _url_click_event, true);



    }




}



function back_full_extend() {

    map.setView(new L.LatLng(initial_location[1], initial_location[2]), initial_location[3]);
}


function add_map_listener_idle() {







    listener_idle = map.on('moveend', function (e) {
        //alert(e.latlng);
        get_map_bound();


    });









    // ---------  map click event [1] ------ search for a single feature where clicked ------------
    listener_click = map.on('click', function (click_event_location) {

        // alert(click_event_location.latlng.lat);
        get_click_latlng(click_event_location.latlng.lat, click_event_location.latlng.lng);
    });


    listener_rightclick = map.on('rightclick', function () {

        back_full_extend();
    });

    //--------------------------End  map right click event ---------- back to full extend ----------------------




}


function geocoding() {

    // --------  search address ------- geocoding -----------
    new L.Control.GeoSearch({


        provider: new L.GeoSearch.Provider.Esri(),

        // google and open streetmap is ok, but result zoom level is too high for open street map. 
        //provider: new L.GeoSearch.Provider.Google(),
        //provider: new L.GeoSearch.Provider.OpenStreetMap(),

        retainZoomLevel: false
    }).addTo(map);

    // ---------- End of search address ------- geocoding -----------



}

//----------------End of leaflet basic simple map function  ------------------------