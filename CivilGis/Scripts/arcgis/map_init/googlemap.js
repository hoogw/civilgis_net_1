var arcgis_online_account = "http://services7.arcgis.com/DAhMOhkEzKuwPt1x/arcgis/rest/services/";

var google_map_api_key = 'AIzaSyCeIFVL6oxxXNT7NToJjfU4J9TV2J8m4vE';


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
_default_strokeColor = 'yellow';
_default_strokeWeight = 1;


_highlight_fillOpacity = 0;
_highlight_strokeColor = '#fff';
_highlight_strokeWeight = 8;



_classfiy_fillOpacity = 0;
_classfiy_strokeColor = 'yellow';
_classfiy_strokeWeight = 0.2;
//---------------------------------




//   *******   google opacity slider control ***************
var opacityDiv;
var opacityKnobDiv;
var opacityCtrlKnob;
var initialOpacity = 100;
var OPACITY_MAX_PIXELS = 57; // Width of opacity control image
//****************************************************






function add_area_boundary(_area) {


    _multi_polyline = 'No';
    var _js_url = "/Scripts/area_boundary/googlemap/" + _area + ".js";





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




                var _area_polyline_multi = new google.maps.Polyline({

                    path: parentArray[i],
                    geodesic: true,
                    strokeColor: '#FFA500',
                    strokeOpacity: 0.8,
                    strokeWeight: 5

                });

                _area_polyline_multi.setMap(map);




            }// outer for



        }
        else {


            // for only one line
            _area_polyline = new google.maps.Polyline({

                path: _area_polygon_coord[_area],
                geodesic: true,
                strokeColor: '#FFA500',
                strokeOpacity: 0.8,
                strokeWeight: 5

            });
            _area_polyline.setMap(map);
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


// ----------- tiling ----------------------
function init_tiling(){
    
    // --------------------- dynamic load javascript file  ---------------------------


    
    var _tile_list_js = "/Scripts/map_init/tile_list/googlemap_tile_list.js";

    $.when(
             $.getScript(_tile_list_js)
    

    ).done(function () {

        var  _tile_name = _areaID + "_" + _subjectID;
        var _i = _tile_list.indexOf(_tile_name);
        //alert(_tile_name);
        if (_i >= 0) {


            //http://tile.transparentgov.net/v2/cityadr/{z}/{x}/{y}.png
           // _tile_baseURL = 'http://tile.transparentgov.net/v2/';
            // _tile_baseURL = 'http://localhost:8888/v2/cityadr/{z}/{x}/{y}.png';



            tile_MapType = new google.maps.ImageMapType({
                getTileUrl: function (coord, zoom) {



                    return _tile_baseURL + _areaID + '_' + _subjectID + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';


                    // for arcgis rest api tile service( Note: the order is /zoom/y/x, no '.png'   format is: <mapservice-url>/tile/<level>/<row>/<column>
                    // return _tile_baseURL + _areaID + '_' + _subjectID + '/MapServer/tile/' + zoom + '/' + coord.y + '/' + coord.x;


                },
                tileSize: new google.maps.Size(256, 256),
                maxZoom: 22,
                minZoom: 0

            }); // tile_maptype
            
            map.overlayMapTypes.insertAt(0, tile_MapType);



            _tile_exist = true;

           
            // Add opacity control and set initial value , this must be here after tile_MapType initialized and finished loading tiles, otherwise, tile_MapType will show un-defined.
            createOpacityControl(map, initialOpacity);


        }// if tile exist

        else {
            // tile does not exist, should hide the opacity slider control div.


            $("#opacityDiv").hide();
            $("#opacityKnobDiv").hide();


        }


    }); // when done


}// init tile



function add_tiles(){
    
   // alert(_tile_exist);
    if (_tile_exist){
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



//   ******  google map tile opacity slider control ****************


function createOpacityControl(map, opacity) {


    //  main div to hold the control.
    opacityDiv = document.getElementById('opacityDiv');

    //  knob
    opacityKnobDiv = document.getElementById('opacityKnobDiv');


    opacityCtrlKnob = new ExtDraggableObject(opacityKnobDiv, {
        restrictY: true,
        container: opacityDiv
    });

    google.maps.event.addListener(opacityCtrlKnob, "dragend", function () {
        setOpacity(opacityCtrlKnob.valueX());
    });

    google.maps.event.addDomListener(opacityDiv, "click", function (e) {
        var left = findPosLeft(this);
        var x = e.pageX - left - 5; // - 5 as we're using a margin of 5px on the div
        opacityCtrlKnob.setValueX(x);
        setOpacity(x);
    });

    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(opacityDiv);

    // Set initial value
    var initialValue = OPACITY_MAX_PIXELS / (100 / opacity);
    opacityCtrlKnob.setValueX(initialValue);
    setOpacity(initialValue);
}

function setOpacity(pixelX) {
    // Range = 0 to OPACITY_MAX_PIXELS
    var value = (100 / OPACITY_MAX_PIXELS) * pixelX;
    if (value < 0) value = 0;
    if (value == 0) {



        tile_MapType.setOpacity(Math.round(value) / 100);



    }
    else {



        tile_MapType.setOpacity(Math.round(value) / 100);



    }
}

function findPosLeft(obj) {
    var curleft = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
        } while (obj = obj.offsetParent);
        return curleft;
    }
    return undefined;
}




// ************** End of google map tile opacity slider control **************************







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




//------------- Googlemap  basic simple map function -----------------------------

function get_map_bound() {

    //document.getElementById("title_info").innerHTML = "MAP BOUNDS [SouthWest, NorthEast] "+ map.getBounds();
    // get current map bounds as URL parameters. 





    bounds = map.getBounds();
    southWest = bounds.getSouthWest();
    northEast = bounds.getNorthEast();
    SWlong = southWest.lng();
    SWlat = southWest.lat();
    NElong = northEast.lng();
    NElat = northEast.lat();

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


function add_map_listener_idle() {

    listener_idle = map.addListener('idle', function () {

        get_map_bound();


    });



    // ---------  map click event [1] ------ search for a single feature where clicked ------------
    listener_click = map.addListener('click', function (click_event_location) {

        // the current popup infowindow should be close if click anywhere on map.
        if (infowindow) {
            infowindow.close();
        }
      



        get_click_latlng(click_event_location.latLng.lat(), click_event_location.latLng.lng());
    });


    listener_rightclick = map.addListener('rightclick', function () {

        back_full_extend();
    });

    //--------------------------End  map right click event ---------- back to full extend ----------------------



}
//------------------ End map click event [2] -------------------------------



function add_map_listener() {

    //map.addListener('bounds_changed', function() {  // does not work well
    listener_dragend = map.addListener('dragend', function () {

        get_map_bound();


    });






    listener_zoom_changed = map.addListener('zoom_changed', function () {

        get_map_bound();
    });



}


function add_mapdata_listener() {

    // click listener
    map.data.addListener('click', function (event) {
        //var myHTML = event.feature.getProperty("NAME_ABV_A");

        // map.data.overrideStyle(event.feature, {fillColor: 'yellow'});

        // info window table style
        var popup = "<table>";
        event.feature.forEachProperty(function (_value, _property) {
            popup = popup + "<tr><td width='50%'>" + _property + "</td><td>" + _value + "</td></tr>";
        });
        popup = popup + "</table>";

        infowindow.setContent("<div style='width:200px; height:150px;text-align: center;'>" + popup + "</div>");
        infowindow.setPosition(event.latLng);
        infowindow.open(map);

    });    // click listener





    // mouse over listener
    map.data.addListener('mouseover', function (event) {
        //map.data.revertStyle();                 
        map.data.overrideStyle(event.feature, {
            strokeWeight: _highlight_strokeWeight,
            strokeColor: _highlight_strokeColor,
            fillOpacity: _highlight_fillOpacity
            //fillColor:''
        });

        var instant_info = "<ul>";
        event.feature.forEachProperty(function (_value, _property) {
            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";
        });
        instant_info = instant_info + "</ul>";


        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;

    });


    // mouse out listener
    map.data.addListener('mouseout', function (event) {
        map.data.revertStyle(event.feature);

        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
        //infowindow.close();

    });

}



function geocoding() {
    // --------  search address
    geocoder = new google.maps.Geocoder();

    document.getElementById('search_addr').addEventListener('click', function () {
        geocodeAddress(geocoder, map);
    });

    // ---------- 

}


function zoomToObject(obj) {
    var bounds = new google.maps.LatLngBounds();
    var points = obj.getPath().getArray();
    for (var n = 0; n < points.length ; n++) {
        bounds.extend(points[n]);
    }
    map.fitBounds(bounds);
}

//----------------End of Googlemap basic simple map function  ------------------------



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