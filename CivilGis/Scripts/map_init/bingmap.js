var bing_map_key = 'oR0CRAm6LNpk1GIgfh83~gvehBkcH0drdDOAuk8puqg~Asl9G0tpwQ9HT55_FWaQ_yyRrJy9i8OIP4XotIGN53jiSPsrXwRGhtC6LusWZlor';


//var _tile_baseURL = 'http://166.62.80.50:8888/v2/';
var _tile_baseURL = 'http://tile.transparentgov.net/v2/';

var _tile_exist = false;
var _tile_list;

var _tile_slider;

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
var _geojson_layer = null;


//........ Bing map var ............
var tile_source;
var tile_layer;


//........End Bing map var ............





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
_default_fillOpacity = 'rgba(0, 0, 0, 0)';
_default_strokeColor = 'yellow';
_default_strokeWeight = 1;
_default_color = 'pink'

_highlight_fillOpacity = 0;
_highlight_strokeColor = '#fff';
_highlight_strokeWeight = 8;
_highlight_color = 'yellow'


click_highlight_fillOpacity = 0;
click_highlight_strokeColor = 'red';
click_highlight_strokeWeight = 12;
click_highlight_color = 'red'


_classfiy_fillOpacity = 0;
_classfiy_strokeColor = 'yellow';
_classfiy_strokeWeight = 0.2;


var default_geojson_style = {
    pushpinOptions: {
        //icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
        color: _default_color,
        enableHoverStyle: true,
       // enableClickedStyle: true,
        visible: true

    },
    polylineOptions: {
        strokeColor: _default_strokeColor,
        strokeThickness: _default_strokeWeight
    },
    polygonOptions: {
        fillColor: _default_fillOpacity,
        strokeColor: _default_strokeColor,
        strokeThickness: _default_strokeWeight
    }
};

var default_geojson_style_option = {
    color: _default_color,
    fillColor: _default_fillOpacity,
    strokeColor: _default_strokeColor,
    strokeThickness: _default_strokeWeight
};






var highlight_geojson_style = {
    //icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
    color: _highlight_color,
    fillColor: _highlight_fillOpacity,
    strokeColor: _highlight_strokeColor,
    strokeThickness: _highlight_strokeWeight
};





var click_highlight_geojson_style = {
    //icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
    color: click_highlight_color,
    fillColor: click_highlight_fillOpacity,
    strokeColor: click_highlight_strokeColor,
    strokeThickness: click_highlight_strokeWeight
};




var _last_click_highlighted_feature;

//---------------------------------





function set_initial_location(_area) {


    _areaID = $("#areaID").val();
    _subjectID = $("#subjectID").val();

    _flyto_zoomlevel = 17; // default for parcels, point, street, small feature.

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
    _area_db["San_Francisco"] = ["San_Francisco", 37.77559951996456, -122.41722106933594, 13, "/-122.53034591674805/37.686265625259175/-122.3573112487793/37.84164803953047/"];
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


    // bing map area boundary share with leaflet 

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

                var _one_line = parentArray[i];

                var _location_array = [];
                
                for (var k = 0; k < _one_line.length; k++) {

                    var _location_latlng = new Microsoft.Maps.Location(_one_line[k][0], _one_line[k][1]);
                    _location_array.push(_location_latlng);

                }

                _area_polyline_multi = new Microsoft.Maps.Polyline(_location_array, { strokeColor: '#FFA500', strokeThickness: 5, visible: true });
                map.entities.push(_area_polyline_multi);


            }// outer for



        }
        else {

            
            // for only one line
            var _location_array = [];
            var _one_line = _area_polygon_coord[_area];

            for (var k = 0; k < _one_line.length; k++) {

                var _location_latlng = new Microsoft.Maps.Location(_one_line[k][0], _one_line[k][1]);
                _location_array.push(_location_latlng);

            }

            _area_polyline = new Microsoft.Maps.Polyline(_location_array, { strokeColor: '#FFA500', strokeThickness: 5, visible: true  });
            map.entities.push(_area_polyline);

            
        }//else


    }); // when done


}// function add_area_boundary



function tile_opacity_slider() {


   

    $('#ex1').slider({
        formatter: function (value) {

            // <input id="ex1" data-slider-id='ex1Slider' type="text" data-slider-min="0" data-slider-max="100" data-slider-step="10" data-slider-value="100" />
            tile_layer.setOpacity(Math.round(value / 10) / 10);

            return value + '%';
        } // formatter

    }); // slider




}// function




// ----------- tiling ----------------------
function init_tiling() {

    // --------------------- dynamic load javascript file  ---------------------------



    var _tile_list_js = "/Scripts/map_init/tile_list/googlemap_tile_list.js";

    $.when(
             $.getScript(_tile_list_js)


    ).done(function () {

        var _tile_name = _areaID + "_" + _subjectID;
        var _i = _tile_list.indexOf(_tile_name);
        //alert(_tile_name);


        if (_i >= 0) {

            // tile exist 

            //http://tile.transparentgov.net/v2/cityadr/{z}/{x}/{y}.png
            // _tile_baseURL = 'http://tile.transparentgov.net/v2/';
            // _tile_baseURL = 'http://localhost:8888/v2/cityadr/{z}/{x}/{y}.png';



             tile_source = new Microsoft.Maps.TileSource({
                 uriConstructor: function (coord) {



                     return _tile_baseURL + _areaID + '_' + _subjectID + '/' + coord.zoom + '/' + coord.x + '/' + coord.y + '.png';


                 },

                minZoom: 0,
                maxZoom: 22
               
             });


            tile_layer = new Microsoft.Maps.TileLayer({
                mercator: tile_source,
            });
            map.layers.insert(tile_layer);





            _tile_exist = true;

            // if tile exist, create slider
            tile_opacity_slider();


        }// if tile exist

        else {
            // tile does not exist, should hide the opacity slider control div.


            // if no tile , hide slider control
            $('#ex1').hide();


        }


    }); // when done


}// init tile



function add_tiles() {

    // alert(_tile_exist);
    if (_tile_exist) {
        // ---- if returning total number, not geoJOSN feature, then add tiling layer on top ---------------------------


        // before add tile, need to clean all previous tiles, without this line, it will add more and more layers on top to each other, color will get darker and darker.
        map.overlayMapTypes.clear();

        map.overlayMapTypes.insertAt(0, tile_MapType);

    }


}

function remove_tiles() {

    if (_tile_exist) {
        map.overlayMapTypes.clear();
        //map.overlayMapTypes.pop();
        //map.overlayMapTypes.removeAt(0);
    }
}

//--------------------End of tiling --------------------------------------








function geocodeAddress(geocoder, resultsMap) {

    var address = document.getElementById('addr_txt').value;



    _addr_info = new google.maps.InfoWindow();

    //alert(address);
    geocoder.geocode({ 'address': address }, function (results, status) {

        if (status === google.maps.GeocoderStatus.OK) {


            if (search_address_marker)  //if marker is not null then clear last marker
            {
                search_address_marker.setMap(null);

            }

            search_address_marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                // icon: iconBase + 'custome_icon.png'
                label: 'X'
            });

            //alert(address);
            // add new marker then change to marker location and trigger zoom_change event to load geojson
            //resultsMap.panTo(results[0].geometry.location);

            resultsMap.setCenter(results[0].geometry.location);
            resultsMap.setZoom(18); // to fix the bug must zoom twice, level from large to small,  getBound will get the first zoom level.  
            resultsMap.setZoom(19);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }



        // marker double click to close 
        search_address_marker.addListener('dblclick', function (event) {



            search_address_marker.setMap(null);

        });// marker listener



        // marker mouse hove over
        search_address_marker.addListener('mouseover', function (event) {

            // Set the info window's content and position.
            _addr_info.setContent(results[0].formatted_address);
            //_addr_info.setPosition(marker.);

            _addr_info.open(resultsMap, search_address_marker);

        });// marker listener


        // marker mouse out
        search_address_marker.addListener('mouseout', function (event) {



            _addr_info.close();

        });// marker listener



        // marker click 
        search_address_marker.addListener('click', function (event) {
            // _addr_info.setContent(results[0].formatted_address);
            // _addr_info.open(resultsMap, marker);

            resultsMap.panTo(event.latLng);
            //resultsMap.panBy(5,5);
            resultsMap.setZoom(18);
            resultsMap.setZoom(19);
        });





    }); //geocoder
} // function




//-------------   basic simple map function -----------------------------

function get_map_bound() {

    
    // get current map bounds as URL parameters. 


    bounds = map.getBounds();
   
    SWlong = bounds.getWest();
    SWlat = bounds.getSouth();
    NElong = bounds.getEast();
    NElat = bounds.getNorth();

    // http://localhost:10/civilgis/api/load/general_landuse/SWlong/SWlat/NElong/NElat/   This is sample URI
    //var _url = base_url + 'api/loadall/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';
    var _url = "/api/geojson/feature/" + initial_location[0] + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

    document.getElementById("ajaxload").style.display = "block";
    ajax_GeoJSON(map, _url, false);



}


function remove_map_listener() {

    google.maps.event.removeListener(listener_dragend);
    google.maps.event.removeListener(listener_zoom_changed);

}

// ---------  map click event [2] -------------------------------

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

    map.setZoom(initial_location[3]);
    map.setCenter(new google.maps.LatLng(initial_location[1], initial_location[2]));
}


//------------------ End map click event [2] -------------------------------



function add_map_listener() {


    Microsoft.Maps.Events.addHandler(map, 'viewchangeend', function () {

        get_map_bound();


    });


}


function add_mapdata_listener() {

    _geojson_layer = new Microsoft.Maps.Layer();
    map.layers.insert(_geojson_layer);




    
    Microsoft.Maps.Events.addHandler(_geojson_layer, 'mouseover', function (event) {


        _last_mousover_highlighted_feature = event.primitive;

        event.primitive.setOptions(highlight_geojson_style);

        var object = event.primitive.metadata;



        var instant_info = "<ul>";

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + object[property] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";
               // alert(property);
            }
        }
        //alert(instant_info);
        instant_info = instant_info + "</ul>";

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;


        
    });


    Microsoft.Maps.Events.addHandler(_geojson_layer, 'mouseout', function (event) {
        
        event.primitive.setOptions(default_geojson_style_option);
       

        // reserve last time click feature 'click_highlight_style'
        if (_last_click_highlighted_feature) {
            _last_click_highlighted_feature.setOptions(click_highlight_geojson_style);
        }


        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";


    });



    Microsoft.Maps.Events.addHandler(_geojson_layer, 'click', function (event) {
        


       


        // instead reset all feature style, only reset last highlighted feature.

        if (_last_click_highlighted_feature) {
        _last_click_highlighted_feature.setOptions(default_geojson_style_option);
        }



        // highlight only this one
        event.primitive.setOptions(click_highlight_geojson_style);


        _last_click_highlighted_feature = event.primitive;










    });






    //Microsoft.Maps.Events.addHandler(layer, 'rightclick', function () {
    //    document.getElementById('printoutPanel').innerHTML = 'layer rightclick';
    //});
    //Microsoft.Maps.Events.addHandler(layer, 'mouseup', function () {
    //    document.getElementById('printoutPanel').innerHTML = 'layer mouseup';
    //});
    //Microsoft.Maps.Events.addHandler(layer, 'mousedown', function () {
    //    document.getElementById('printoutPanel').innerHTML = 'layer mousedown';
    //});
    




    //// click listener
    //map.data.addListener('click', function (event) {
    //    //var myHTML = event.feature.getProperty("NAME_ABV_A");

    //    // map.data.overrideStyle(event.feature, {fillColor: 'yellow'});

    //    // info window table style
    //    var popup = "<table>";
    //    event.feature.forEachProperty(function (_value, _property) {
    //        popup = popup + "<tr><td width='50%'>" + _property + "</td><td>" + _value + "</td></tr>";
    //    });
    //    popup = popup + "</table>";

    //    infowindow.setContent("<div style='width:200px; height:150px;text-align: center;'>" + popup + "</div>");
    //    infowindow.setPosition(event.latLng);
    //    infowindow.open(map);

    //});    // click listener





    //// mouse over listener
    //map.data.addListener('mouseover', function (event) {
    //    //map.data.revertStyle();                 
    //    map.data.overrideStyle(event.feature, {
    //        strokeWeight: _highlight_strokeWeight,
    //        strokeColor: _highlight_strokeColor,
    //        fillOpacity: _highlight_fillOpacity
    //        //fillColor:''
    //    });

    //    var instant_info = "<ul>";
    //    event.feature.forEachProperty(function (_value, _property) {
    //        instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";
    //    });
    //    instant_info = instant_info + "</ul>";


    //    // update bottom <div>
    //    document.getElementById("info-table").innerHTML = instant_info;

    //});


    //// mouse out listener
    //map.data.addListener('mouseout', function (event) {
    //    map.data.revertStyle(event.feature);

    //    // empty bottom <div>
    //    document.getElementById("info-table").innerHTML = "";
    //    //infowindow.close();

    //});

}


//..............Bing Map geo coding ...............
function selectedSuggestion(suggestionResult) {
    map.entities.clear();
    map.setView({ bounds: suggestionResult.bestView });
    var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
    map.entities.push(pushpin);
    //document.getElementById('printoutPanel').innerHTML =
    //    'Suggestion: ' + suggestionResult.formattedSuggestion +
    //        '<br> Lat: ' + suggestionResult.location.latitude +
    //        '<br> Lon: ' + suggestionResult.location.longitude;
}

function geocoding() {



    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
        var options = {
            maxResults: 4,
            map: map
        };
        var manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest('#searchBox', '#searchBoxContainer', selectedSuggestion);
    });



}
//..............Bing Map geo coding ...............





function zoomToObject(obj) {
    var bounds = new google.maps.LatLngBounds();
    var points = obj.getPath().getArray();
    for (var n = 0; n < points.length ; n++) {
        bounds.extend(points[n]);
    }
    map.fitBounds(bounds);
}


function init_base_map() {

   

    map = new Microsoft.Maps.Map(document.getElementById('map-canvas'), {
        credentials: bing_map_key,
        
        center: new Microsoft.Maps.Location(initial_location[1], initial_location[2]),
        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: initial_location[3]

    });




}




//----------------End of  basic simple map function  ------------------------



// ############### retired function ############################

function tile_switch_button() {



    // ----------- color_tiles_switch button --------------
    // init on off switch button  
    $("[name='color_tiles_switch']").bootstrapSwitch();

    $('input[name="color_tiles_switch"]').on('switchChange.bootstrapSwitch', function (event, state) {
        // console.log(this); // DOM element
        //console.log(event); // jQuery event
        // console.log(state); // true | false
        if (state) {

            add_tiles();
        }
        else {

            remove_tiles();
        }
    });

    // ----------End of  color_tiles_switch button          --------------






}

function tile_slider() {


    _tile_slider = document.getElementById('tile_slider');

    noUiSlider.create(_tile_slider, {
        start: [100],
        connect: 'lower',
        //  tooltips: true,
        range: {
            'min': 0,
            'max': 100
        }
    });



}


function init_tiling_old_slider_switch() {

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

        var _tile_name = _areaID + "_" + _subjectID;
        var _i = _tile_list.indexOf(_tile_name);
        //alert(_tile_name);
        if (_i >= 0) {


            //http://tile.transparentgov.net/v2/cityadr/{z}/{x}/{y}.png
            // _tile_baseURL = 'http://tile.transparentgov.net/v2/';
            // _tile_baseURL = 'http://localhost:8888/v2/cityadr/{z}/{x}/{y}.png';



            tile_MapType = new google.maps.ImageMapType({
                getTileUrl: function (coord, zoom) {



                    return _tile_baseURL + _areaID + '_' + _subjectID + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';


                },
                tileSize: new google.maps.Size(256, 256),
                maxZoom: 22,
                minZoom: 0

            }); // tile_maptype

            map.overlayMapTypes.insertAt(0, tile_MapType);




            //............................ bind opacity to slider ........................

            _tile_slider.noUiSlider.on('set', function (values, handle, unencoded, tap, positions) {


                var _slider_handle_value = values[handle];
                _slider_handle_value = Math.round(_slider_handle_value) / 100;

                tile_MapType.setOpacity(_slider_handle_value);

            });
            //................End ....... bind opacity to slider ........................





            _tile_exist = true;




        }// if tile exist


    }); // when done


}// init tile

// ############### retired function ############################