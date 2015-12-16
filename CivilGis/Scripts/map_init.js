

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

//------- tile[0-3] ------------
var addressMapType;
var parcelsMapType;
var streetMapType;
//---------- end tile ----------

var _multi_polyline;

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
    var _tile_baseURL = 'http://tile.transparentgov.net/v2/';
    //var _tile_baseURL = 'http://localhost:8888/v2/cityadr/{z}/{x}/{y}.png';

    city_address_MapType = new google.maps.ImageMapType({
                                                    getTileUrl: function(coord, zoom) {

                                                      

                                                        return _tile_baseURL + 'city_address' + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
                                                       

                                                    },
                                                    tileSize: new google.maps.Size(256, 256),
                                                    maxZoom: 17,
                                                    minZoom: 0

                                                  });
        
        
          city_parcels_MapType = new google.maps.ImageMapType({
                                                                        getTileUrl: function(coord, zoom) {

                                                                           

                                                                           
                                                                            return _tile_baseURL +'city_parcels' + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
                                                                           

                                                                        },
                                                                        tileSize: new google.maps.Size(256, 256),
                                                                        maxZoom: 17,
                                                                        minZoom: 0

                                                                      });

                    city_streets_MapType = new google.maps.ImageMapType({
                                                                        getTileUrl: function(coord, zoom) {

                                                                           
                                                                            return _tile_baseURL +'city_streets' + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';

                                                                        },
                                                                        tileSize: new google.maps.Size(256, 256),
                                                                        maxZoom: 17,
                                                                        minZoom: 0

                                                                      });
                                                                      
                                                                      
                                                                      
                                                                      
      county_address_MapType = new google.maps.ImageMapType({
                                                    getTileUrl: function(coord, zoom) {

                                                      

                                                        return _tile_baseURL + 'county_address' + '/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
                                                        

                                                    },
                                                    tileSize: new google.maps.Size(256, 256),
                                                    maxZoom: 17,
                                                    minZoom: 0

                                                  });                                                                
    
    
    
}// init tile



function add_tiles(){
    
     // ---- if returning total number, not geoJOSN feature, then add tiling layer on top ---------------------------
                            
                            if (($("#areaID").val() ==='city') && ($("#subjectID").val() ==='address')) {
                                                                                                            map.overlayMapTypes.insertAt(0, city_address_MapType);
                                                                                                        }
                            if (($("#areaID").val() ==='city') && ($("#subjectID").val() ==='parcels')) {
                                                                                                            map.overlayMapTypes.insertAt(0, city_parcels_MapType);
                                                                                                        }
                                                                                                        
                             if (($("#areaID").val() ==='city') && ($("#subjectID").val() ==='streets')) {
                                                                                                            map.overlayMapTypes.insertAt(0, city_streets_MapType);
                                                                                                        }         
                                                                                                        
                             if (($("#areaID").val() ==='county') && ($("#subjectID").val() ==='address')) {
                                                                                                            map.overlayMapTypes.insertAt(0, county_address_MapType);
                                                                                                        }                                                                                   
                                                                                                        
                             //-------------------------------------- end  tile ----------------------------------------------------------------          
    
    
    
}




 /* color zoning
    function styleFeature(feature) {


        var _strokecolor = "000000";
        var _fillcolor = "000000";
        var _fillopacity = 0.1;
        var _zone = "";

        if ($("#subjectID").val() == 'zoning') {
             _zone = feature.getProperty('ZONE_CODE')

        }
        else   // general_landuse
                { 


            _zone = feature.getProperty('GP_CODE')

                }

        
        // zoning

        // residential
        if ((_zone == 'R1') || (_zone == 'R3') || (_zone == 'R2-MD') || (_zone == 'R2-HD') || (_zone == 'LDR') || (_zone == 'MDR') || (_zone == 'HDR')) {
          
            _fillcolor = "#FFFF66";
            _fillopacity = 0.6;
        }
        
        // commercial

        if ((_zone == 'CL') || (_zone == 'C1') || (_zone == 'C1-S') || (_zone == 'C2') || (_zone == 'TC') || (_zone == 'PDC') || (_zone == 'CC') || (_zone == 'GC') || (_zone == 'CR') || (_zone == 'NC') || (_zone == 'RC') || (_zone == 'UCC')) {
           
            _fillcolor = "#FF0000";
            _fillopacity = 0.6;
        }


        // industrial

        if ((_zone == 'MG') || (_zone == 'MP') || (_zone == 'PDI') || (_zone == 'LI') || (_zone == 'IP') || (_zone == 'CAC')) {
           
            _fillcolor = "#0000FF";
            _fillopacity = 0.6;
        }


        // recreation institutional 

        if ((_zone == 'I&R') || (_zone == 'PI') || (_zone == 'F') || (_zone == 'GC')) {
           
            _fillcolor = "#669900";
            _fillopacity = 0.6;
        }


        // general landuse 

        // residential
        if (  (_zone == 'MDR') || (_zone == 'HDR')) {

            _fillcolor = "#99CCFF";
            _fillopacity = 0.6;
        }

        if ((_zone == 'LDR') ) {

            _fillcolor = "#FFFF00";
            _fillopacity = 0.6;
        }


        // commercial

        if ( (_zone == 'CC') || (_zone == 'GC') || (_zone == 'CR') || (_zone == 'NC') || (_zone == 'RC') || (_zone == 'UCC')) {

            _fillcolor = "#66FF66";
            _fillopacity = 0.6;
        }


        // industrial

        if ( (_zone == 'LI') || (_zone == 'IP') || (_zone == 'CAC')) {

            _fillcolor = "#CC6699";
            _fillopacity = 0.6;
        }


        // recreation institutional 

        if ( (_zone == 'PI') || (_zone == 'F') || (_zone == 'GC')) {

            _fillcolor = "#669999";
            _fillopacity = 0.6;
        }



        return {
            // disable stroke color looks like google bug, fail to correctly color it. 
            // strokeColor: _strokecolor,

            strokeWeight: 0,
            fillColor: _fillcolor,
            
            fillOpacity: _fillopacity,
            //visible: true

        };


    }// style Feature

    */


function geocodeAddress(geocoder, resultsMap) {

    var address = document.getElementById('addr_txt').value;



    _addr_info = new google.maps.InfoWindow();

    //alert(address);
    geocoder.geocode({ 'address': address }, function (results, status) {

        if (status === google.maps.GeocoderStatus.OK) {
           
            
            if(marker)  //if marker is not null then clear last marker
            {
                marker.setMap(null);

             }

             marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                // icon: iconBase + 'custome_icon.png'
                label: 'X'
             });


            // add new marker then change to marker location and trigger zoom_change event to load geojson
            //resultsMap.panTo(results[0].geometry.location);

             resultsMap.setCenter(results[0].geometry.location);
             resultsMap.setZoom(18); // to fix the bug must zoom twice, level from large to small,  getBound will get the first zoom level.  
             resultsMap.setZoom(19);

        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }



        // marker double click to close 
        marker.addListener('dblclick', function (event) {



            marker.setMap(null);

        });// marker listener



        // marker mouse hove over
        marker.addListener('mouseover', function (event) {

            // Set the info window's content and position.
            _addr_info.setContent(results[0].formatted_address);
            //_addr_info.setPosition(marker.);

            _addr_info.open(resultsMap, marker);

        });// marker listener


        // marker mouse out
        marker.addListener('mouseout', function (event) {

            

            _addr_info.close();

        });// marker listener



        // marker click 
        marker.addListener('click', function (event) {
           // _addr_info.setContent(results[0].formatted_address);
           // _addr_info.open(resultsMap, marker);

            resultsMap.panTo(event.latLng);
            //resultsMap.panBy(5,5);
            resultsMap.setZoom(18);
            resultsMap.setZoom(19);
        });





    }); //geocoder
} // function
