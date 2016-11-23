var arcgis_online_account = "http://services7.arcgis.com/DAhMOhkEzKuwPt1x/arcgis/rest/services/";

var bing_map_key = 'oR0CRAm6LNpk1GIgfh83~gvehBkcH0drdDOAuk8puqg~Asl9G0tpwQ9HT55_FWaQ_yyRrJy9i8OIP4XotIGN53jiSPsrXwRGhtC6LusWZlor';


// there is bug if use tile.transparentgov.net/v2/, when map type changed. some tile blocked. no access control allow origin 
var _tile_baseURL = 'http://166.62.80.50:8887/v2/';
//var _tile_baseURL = 'http://tile.transparentgov.net/v2/';



var max_return_feature_limit = 1000;



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
var infoboxTemplate;
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
var clusterLayer;


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
_default_color = 'pink';
_highlight_pushpin_color = 'blue';

_highlight_fillOpacity = 0;
_highlight_strokeColor = '#fff';
_highlight_strokeWeight = 8;
_highlight_color = 'yellow';


click_highlight_fillOpacity = 0;
click_highlight_strokeColor = 'red';
click_highlight_strokeWeight = 12;
click_highlight_color = 'red';


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





var highlight_pushpin_option = {
   
        //icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
         color: _highlight_pushpin_color,
        enableHoverStyle: true,
        // enableClickedStyle: true,
        visible: true

  

};



var default_pushpin_option = {

    //icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
    color: _default_color,
    enableHoverStyle: true,
    // enableClickedStyle: true,
    visible: true



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


                     // for arcgis rest api tile service( Note: the order is /zoom/y/x, no '.png'   format is: <mapservice-url>/tile/<level>/<row>/<column>
                     // return _tile_baseURL + _areaID + '_' + _subjectID + '/MapServer/tile/' + zoom + '/' + coord.y + '/' + coord.x;



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
   

    //php
    //var _url = base_url + 'api/loadall/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/' + SWlong + '/' + SWlat + '/' + NElong + '/' + NElat + '/';

    // asp.net
    //var _url = "/api/geojson/feature/" + initial_location[0] + '/' + $("#subjectID").val() + "/" + SWlong + "/" + SWlat + "/" + NElong + "/" + NElat + "/";

    //-------------- arcgis online server, rest API --------------------------------

    // this is bad request, should not use layerDefs={"0":""}, instead should use FeatureServer/0/query?...
    // http://services3.arcgis.com/VILr8UqX00eNAkeO/arcgis/rest/services/Parcels/FeatureServer/query?layerDefs={"0":""}&returnGeometry=true&f=json&geometryType=esriGeometryEnvelope&geometry={"xmin" : -117.923158, "ymin" : 33.644081, "xmax" : -117.921436, "ymax" : 33.645157,"spatialReference" : {"wkid" : 4326}}


    //var _envelope = '{"xmin" : -117.923158, "ymin" : 33.644081, "xmax" : -117.921436, "ymax" : 33.645157,"spatialReference" : {"wkid" : 4326}}';
    var _envelope = '{"xmin" : ' + SWlong + ', "ymin" : ' + SWlat + ', "xmax" : ' + NElong + ', "ymax" : ' + NElat + ',"spatialReference" : {"wkid" : 4326}}';


    // Note: must specify outFields=*, in order to get all properties, without this, properties= null
    var _url = arcgis_online_account + $("#areaID").val() + '_' + $("#subjectID").val() + '/FeatureServer/0/query?returnGeometry=true&outSR=4326&f=pgeojson&outFields=*&geometryType=esriGeometryEnvelope&geometry=' + _envelope;
    var _url_returncountonly = arcgis_online_account + $("#areaID").val() + '_' + $("#subjectID").val() + '/FeatureServer/0/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=geojson&geometryType=esriGeometryEnvelope&geometry=' + _envelope;


    //--------- End ----- arcgis online server, rest API --------------------------------




    document.getElementById("ajaxload").style.display = "block";
    ajax_GeoJSON(map, _url_returncountonly, _url, false);


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



        //............... arcgis online ......................

        var _envelope_click = '{"xmin" : ' + SWlong + ', "ymin" : ' + SWlat + ', "xmax" : ' + NElong + ', "ymax" : ' + NElat + ',"spatialReference" : {"wkid" : 4326}}';

        // Note: must specify outFields=*, in order to get all properties, without this, properties= null
        var _url_click_event = arcgis_online_account + $("#areaID").val() + '_' + $("#subjectID").val() + '/FeatureServer/0/query?returnGeometry=true&outSR=4326&f=pgeojson&outFields=*&geometryType=esriGeometryEnvelope&geometry=' + _envelope_click;
        var _url_click_returncountonly = arcgis_online_account + $("#areaID").val() + '_' + $("#subjectID").val() + '/FeatureServer/0/query?returnGeometry=false&returnCountOnly=true&outSR=4326&f=geojson&geometryType=esriGeometryEnvelope&geometry=' + _envelope_click;

        document.getElementById("ajaxload").style.display = "block";
        ajax_GeoJSON(map, _url_click_returncountonly, _url_click_event, true);

        //..............End......... arcgis online ......................



    }




}



function back_full_extend() {

    map.setZoom(initial_location[3]);
    map.setCenter(new google.maps.LatLng(initial_location[1], initial_location[2]));
}


//------------------ End map click event [2] -------------------------------



function infobox_init() {
    //============ bing map init infobox  ==============

   

    infobox = new Microsoft.Maps.Infobox();

    infobox.setOptions({
             visible: false,
            showCloseButton: true});

    infobox.setMap(map);



    //============   End  bing map init infobox  ==============


}


function add_map_listener() {

    infobox_init();


    Microsoft.Maps.Events.addHandler(map, 'viewchangeend', function () {

        get_map_bound();


    });


    



    Microsoft.Maps.Events.addHandler(map, 'click',
                                                       function (click_event_location) {
                                                           //  single click to get some data


                                                           // the current popup infowindow should be close if click anywhere on map.
                                                           infobox.setOptions({
                                                               visible: false,
                                                               showCloseButton: true
                                                           });
      

                                                           

                                                           get_click_latlng(click_event_location.location.latitude, click_event_location.location.longitude);
                                                     



                                                       });




    Microsoft.Maps.Events.addHandler(map, 'rightclick',
                                                      function () {
                                                          infobox.setOptions({
                                                              visible: false,
                                                              showCloseButton: true
                                                          });
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




        //============ bing map infobox  ==============

        infobox.setLocation(event.location);
       
       

        // info window table style
        var popup = "<table>";

        var object = event.primitive.metadata;

        for (var property in object) {
            if (object.hasOwnProperty(property)) {
                
                popup = popup + "<tr><td width='50%'><p style='color:white;'> " + property + "</p></td><td><p style='color:white;'>" + object[property] + "</p></td></tr>";
            }
        }
        
        popup = popup + "</table>";

        popup = "<div style='width:200px; height:200px; overflow:auto; text-align: center;border-style:solid; border-width:medium; border-color:white;'>" + popup + "</div>";

       
        infobox.setHtmlContent(popup);


        infobox.setOptions({
            visible: true,
            showCloseButton: true
        });
        
        //============   End  bing map infobox  ==============





    });


    
    

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

    var location_array = obj.getLocations();
    //alert(location_array[0]);

    map.setView({
        center: new Microsoft.Maps.Location(location_array[0].latitude, location_array[0].longitude),

        zoom: 17

    });



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