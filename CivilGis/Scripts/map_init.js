

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




function add_area_boundary(_area) {


    _multi_polyline = 'No';
    var _js_url = "/Scripts/area_boundary/" + _area + ".js";





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
                    strokeColor: '#0000FF',
                    strokeOpacity: 0.8,
                    strokeWeight: 2

                });

                _area_polyline_multi.setMap(map);




            }// outer for



        }
        else {


            // for only one line
            _area_polyline = new google.maps.Polyline({

                path: _area_polygon_coord[_area],
                geodesic: true,
                strokeColor: '#0000FF',
                strokeOpacity: 0.8,
                strokeWeight: 2

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


function set_initial_location(_area) {


         _areaID = $("#areaID").val();
         _subjectID = $("#subjectID").val();

          _flyto_zoomlevel = 18; // default for parcels, point, street, small feature.

         //if (($("#areaID").val() === "county") && ($("#subjectID").val() === "cities")){  _flyto_zoomlevel = 11 }
             if  ($("#subjectID").val() === "cities"){  _flyto_zoomlevel = 11 }
             if  ($("#subjectID").val() === "parks"){  _flyto_zoomlevel = 16 }
             
         

        // current location array ["area", init_Lat, init_long, init_zoom level, "init_bounding_box"]
        
        _area_db["county"] = ["county", 33.693495, -117.793350, 9, "/-118.191605/33.367237/-117.406769/33.970698/"];
        _area_db["city"] = ["city", 33.65992448007282, -117.91505813598633, 12, "/-117.963690/33.634180/-117.854780/33.702970/"];
        
        
        return _area_db[_area];
        
    }


function init_tiling(){
    
    //http://tile.transparentgov.net/v2/cityadr/{z}/{x}/{y}.png
     _tile_baseURL = 'http://tile.transparentgov.net/v2/';
    // _tile_baseURL = 'http://localhost:8888/v2/cityadr/{z}/{x}/{y}.png';



     tile_MapType = new google.maps.ImageMapType({
         getTileUrl: function (coord, zoom) {



             return _tile_baseURL + _areaID + '_' + _subjectID + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';


         },
         tileSize: new google.maps.Size(256, 256),
         maxZoom: 19,
         minZoom: 0

     });

}// init tile



function add_tiles(){
    
     // ---- if returning total number, not geoJOSN feature, then add tiling layer on top ---------------------------
                            

    map.overlayMapTypes.insertAt(0, tile_MapType);

   
    
    
}

function remove_tiles() {

    //map.overlayMapTypes.clear();
    //map.overlayMapTypes.pop();
    map.overlayMapTypes.removeAt(0);

}




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
