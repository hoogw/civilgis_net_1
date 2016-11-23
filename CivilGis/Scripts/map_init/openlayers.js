var heremap_app_id = "J5aP2hv9dOa9Us8e6OPn";
var heremap_app_code = "oXTkvCJfsVdMTkD56CBy0g";
var mapquest_consumer_key = '7YyEJ1WeTzemrUYPKCuPJVx6a3kdDvlR';


var _tile_baseURL = 'http://166.62.80.50:8887/v2/';
//var _tile_baseURL = 'http://tile.transparentgov.net/v2/';
var _tile_baseURL_localhost = 'http://localhost:8887/v2/';


var base_layers;
var baseMaps;

var _tile_slider;
var _slider_control;
var _slidercontrol_handle_value;

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






var utfgrid_tile_layer;
var utfgrid_layer;
var utfgrid_source;
var _view;
var mapElement;
var _area_boundaryline_vectorSource;
var _area_boundaryline_layer;
var _geojson_vectorSource;
var _geojson_vectorLayer;
var _geojson_vectorLayer_pointcluster;
var last_geojson_vectorLayer;
var last_geojson_vectorLayer_pointcluster;
var popup;
var _raster_tile_layer;
var clusterSource;


var _highlight_featureOverlay;
var _servertable_highlight_featureOverlay;
var _servertable_click_highlight_featureOverlay;
var _current_highlight = null;
var _servertable_current_highlight = null;
var _servertable_click_current_highlight = null;


var _highlight_servertable_polygon;
var _highlight_servertable_line;
var _highlight_servertable_point;

var _highlight_servertable_feature;
var _highlight_servertable_vectorSource;
var _highlight_servertable_vectorLayer;

var _highlight_click_servertable_polygon;
var _highlight_click_servertable_line;
var _highlight_click_servertable_point;

var _highlight_click_servertable_feature;
var _highlight_click_servertable_vectorSource;
var _highlight_click_servertable_vectorLayer;





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

var _areaID;
var _subjectID;
var tile_MapType;
var _current_geojson_layer = false;
var _last_geojson_layer = false;
var _all_layers;


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






function add_area_boundary(_area) {


    _multi_polyline = 'No';
    var _js_url = "/Scripts/area_boundary/openlayers/" + _area + ".js";





    $.when(
             $.getScript(_js_url)
     /*
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    */

    ).done(function () {

        //place your code here, when above all scripts are all loaded completely.




       
        if (_multi_polyline == 'Yes') {
            // for multi line


            _area_polyline_multi = new ol.Feature({ geometry: new ol.geom.MultiLineString(_area_polygon_coord[_area]) });

            // must have this transform, otherwise, no line showup.
            _area_polyline_multi.getGeometry().transform('EPSG:4326', 'EPSG:3857');

            


            _area_boundaryline_vectorSource = new ol.source.Vector({
                features: [_area_polyline_multi]
            });

           



        }
        else {

           

            _area_polyline = new ol.Feature({ geometry : new ol.geom.LineString(_area_polygon_coord[_area]) });
                                               

            // must have this transform, otherwise, no line showup.
            _area_polyline.getGeometry().transform('EPSG:4326', 'EPSG:3857');

           

            _area_boundaryline_vectorSource = new ol.source.Vector({
                features: [_area_polyline]
            });


           

           

            // ---------- another way,    but need transform('EPSG:4326', 'EPSG:3857');-------------------
            //_area_polyline = new ol.layer.Vector({
            //    source: new ol.source.Vector({
            //        features: [new ol.Feature({
            //            geometry: new ol.geom.LineString(_area_polygon_coord[_area]),
            //            name: '_area_polyline'
            //        })]
            //    }),
            //});

            //map.addLayer(_area_polyline);
            // ---------- another way,    but need transform('EPSG:4326', 'EPSG:3857');-------------------




           
        }//else



        _area_boundaryline_layer = new ol.layer.Vector({

            source: _area_boundaryline_vectorSource,

            style: new ol.style.Style({
                fill: new ol.style.Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new ol.style.Stroke({
                    color: '#ffcc33',
                    width: 8
                }),

                image: new ol.style.Circle({
                    radius: 7,
                    fill: new ol.style.Fill({
                        color: '#ffcc33'
                    })
                })//image

            })//style
        })// vector



        map.addLayer(_area_boundaryline_layer);



    }); // when done



}// function add_area_boundary


function tile_opacity_slider(_layer_group_title) {

   
    $('#ex1').slider({
        formatter: function (value) {




            var all_layer_groups = map.getLayers();
            //var all_layer_groups = map.getLayerGroup();


            var layer_group;

            for (i = 0, n = all_layer_groups.getLength() ; i < n; i++) {

                layer_group = all_layer_groups.item(i);



                if (layer_group.get('title') == _layer_group_title) {

                   

                            if (layer_group.getLayers) {
                                var _inner_layers = layer_group.getLayers().getArray();

                                _raster_tile_layer = _inner_layers[0];  // 0 = tile raster image layer,   1 = utfgrid 
                            }// if
                    break;
                }//if
            }//for

            if (_raster_tile_layer) {
                // Do with layer

               // alert(_raster_tile_layer.get('title'));

                _raster_tile_layer.setOpacity(value/100)

            }



            





            return  value + '%';
        }
    });




}






//------------- basic simple map function -----------------------------

function get_map_bound() {

    
    // get current map bounds as URL parameters. 


    bounds = map.getView().calculateExtent(map.getSize());
    bounds = ol.proj.transformExtent(bounds, 'EPSG:3857', 'EPSG:4326');
    //bounds = ol.proj.toLonLat(bounds);
    
    southWest = ol.extent.getBottomLeft(bounds);
    northEast = ol.extent.getTopRight(bounds);
    SWlong = southWest[0];
    SWlat = southWest[1];
    NElong = northEast[0];
    NElat = northEast[1];

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

    map.setView(_view);
}


function add_map_listener_idle() {







    listener_idle = map.on('moveend', function (e) {
        //alert(e.latlng);
        get_map_bound();


    });






                                //.................  openlayer map add interaction ..................

                                var select = null;  // ref to currently selected interaction
                                var select1 = null;


                                // select interaction working on "singleclick"
                                var selectSingleClick = new ol.interaction.Select();

                                // select interaction working on "click"
                                var selectClick = new ol.interaction.Select({
                                    condition: ol.events.condition.click
                                });

                                // select interaction working on "pointermove"
                                var selectPointerMove = new ol.interaction.Select({
                                    condition: ol.events.condition.pointerMove
                                });

                                var selectAltClick = new ol.interaction.Select({
                                    condition: function (mapBrowserEvent) {
                                        return ol.events.condition.click(mapBrowserEvent) &&
                                            ol.events.condition.altKeyOnly(mapBrowserEvent);
                                    }
                                });


                                var _feature_info = "";
    


                                              //...... mouse over event................
                                                select = selectPointerMove;
                                                map.addInteraction(select);
                                                select.on('select', function(e) {


        
                                                    _feature_info = "<ul>";
        
                                                    e.selected.forEach(function (_feature) {

                                                                            var _object = _feature.getProperties();

                                                                            for (var _property in _object) {
                                                                                if (_object.hasOwnProperty(_property)) {

                                                                                    if (_property !== 'geometry') {

                                                                                    _feature_info = _feature_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + String(_object[_property]) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

                                                                                   }// if 
                                                                                }//if
                                                                            }//for


                                                                                                }); // for each 


                                                    _feature_info = _feature_info + "</ul>";
                                                    document.getElementById('info-table').innerHTML = _feature_info;
        


                                                 }); // select on select
 
                                                 //......End.............. mouse over event................

                                 

                                              

                                                //...... mouse click event................


                                                   
                                                popup = new ol.Overlay.Popup();
                                                map.addOverlay(popup);
                                               

                                               
                                                select1 = selectClick;
                                                map.addInteraction(select1);
                                                select1.on('select', function (e) {

                                                   
                                                   
                                                    _feature_info = "<table>";
                                                    var _show_popup = false;


                                                    e.selected.forEach(function (_feature) {

                                                        var _object = _feature.getProperties();

                                                      


                                                        for (var _property in _object) {
                                                            if (_object.hasOwnProperty(_property)) {

                                                                if (_property !== 'geometry') {

                                                                    
                                                                    //_feature_info = _feature_info + "<tr><td><span style=\'background-color: #454545;\'><font color=\'white\'>" + _property + "</span>&nbsp;&nbsp;</td><td>&nbsp;&nbsp;" + String(_object[_property]) + "</td></tr>";
                                                                    _feature_info = _feature_info + "<tr><td><span style=\'background-color: #454545;\'><font color=\'white\'>" + _property + "</span></td><td>" + String(_object[_property]) + "</td></tr>";

                                                                    _show_popup = true;

                                                                }// if 
                                                            }//if
                                                        }//for


                                                    }); // for each 


                                                    _feature_info = _feature_info + "</table>";
                                                    
                                                    // alert(e.mapBrowserEvent.coordinate);

                                                    if (_show_popup){
                                                        popup.show(e.mapBrowserEvent.coordinate, _feature_info);
                                                    }



                                                }); // select on select


                                                

                                               //......End.............. mouse click event................








                            //.....................End ....... openlayer map add interaction ..................












    // ---------  map click event [1] ------ search for a single feature where clicked ------------
  listener_click = map.on('singleclick', function (click_event_location) {


        //'EPSG:4326' = lat long (geographic coordinate)    'EPSG:3857' = feet unit (projected coordinate)
       // alert(click_event_location.coordinate[0]);
       // alert(ol.proj.transform(click_event_location.coordinate, 'EPSG:4326', 'EPSG:3857')[0]);
        // alert(ol.proj.toLonLat(click_event_location.coordinate, 'EPSG:3857')[0]);

        var _event_lat = ol.proj.toLonLat(click_event_location.coordinate, 'EPSG:3857')[1];
        var _event_lng = ol.proj.toLonLat(click_event_location.coordinate, 'EPSG:3857')[0];
        get_click_latlng(_event_lat, _event_lng);
    });


  listener_rightclick = map.on('dblclick', function () {

        back_full_extend();
    });

    //--------------------------End  map right click event ---------- back to full extend ----------------------




}// function


function geocoding() {

    // --------  search address ------- geocoding -----------
   

     geocoder = new Geocoder('nominatim', {
         provider: 'osm',     //'mapquest', 'google', 'photon', 'pelias'
        key: mapquest_consumer_key,
        lang: 'pt-BR', //en-US, fr-FR
        placeholder: 'Search for ...',
        limit: 5,
        keepOpen: false
    });
    map.addControl(geocoder);



    // ---------- End of search address ------- geocoding -----------



}




function init_base_map_tiling() {


    // local testing only
    // _tile_baseURL = _tile_baseURL_localhost;



     mapElement = document.getElementById('map-canvas');
     //_tile_name = _areaID + "_" + _subjectID;
    var overlay_tile_Url = _tile_baseURL + _areaID + '_' + _subjectID + '/{z}/{x}/{y}.png';


    //var utfGrid_tile_Url = _tile_baseURL + _areaID + '_' + _subjectID + '/{z}/{x}/{y}.grid.json?callback={cb}';
    //var utfGrid_tile_Url = _tile_baseURL + _areaID + '_' + _subjectID + '/{z}/{x}/{y}.grid.json';

    // leaflet, and mapbox js, use above 2 verison of URL, but in openlayer, must use below URL version, no x,y,z
     var utfGrid_tile_Url = _tile_baseURL + _areaID + '_' + _subjectID + '.json';



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
       
         _view = new ol.View({
             //center: ol.proj.transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),

             center: ol.proj.transform([initial_location[2], initial_location[1]], 'EPSG:4326', 'EPSG:3857'),
             zoom: initial_location[3]
         });






         if (_i >= 0) {

             // tile exist, add overlay on base map.



                                 //............. utf layer and source ...............

                                 //utfgrid_source = new ol.source.TileUTFGrid({
                                 //    tileJSON: {
                                 //        "tilejson": "2.1.0",
                                 //        "tiles": [overlay_tile_Url],
                                 //        "grids": [utfGrid_tile_Url]
                                 //    }

                                 //});


                                 utfgrid_source = new ol.source.TileUTFGrid({
                                     url: utfGrid_tile_Url
                                    // url: 'http://api.tiles.mapbox.com/v3/mapbox.geography-class.json'
                                 });




                                 utfgrid_layer = new ol.source.XYZ({
                                     url: overlay_tile_Url,
                                     attribution: "Data copyright transparentgov.net"

                                 });



                                  //.........End .... utf layer and source ...............   





             var thunderforestAttributions = [
                 new ol.Attribution({
                     html: 'Tiles &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>'
                 }),
                 ol.source.OSM.ATTRIBUTION
             ];

              map = new ol.Map({
                  target: mapElement,
                 layers: [
                     new ol.layer.Group({
                         'title': 'Base maps',
                         layers: [





                             new ol.layer.Tile({
                                 title: 'Stamen - Water color',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.Stamen({
                                     layer: 'watercolor'
                                 })
                             }),
                             new ol.layer.Tile({
                                 title: 'Stamen - Toner',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.Stamen({
                                     layer: 'toner'
                                 })
                             }),



                              new ol.layer.Tile({
                                  title: 'MapQuest - Hybrid',
                                  type: 'base',
                                  visible: false,
                                  source: new ol.source.MapQuest({
                                      layer: 'hyb'
                                  })
                              }),

                               new ol.layer.Tile({
                                   title: 'MapQuest - OSM',
                                   type: 'base',
                                   visible: false,
                                   source: new ol.source.MapQuest({
                                       layer: 'osm'
                                   })
                               }),
                             new ol.layer.Tile({
                                 title: 'MapQuest - Satellite',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.MapQuest({
                                     layer: 'sat'
                                 })
                             }),


                               new ol.layer.Tile({
                                   title: 'Thunderforest - OpenCycleMap',
                                   type: 'base',
                                   visible: false,
                                   source: new ol.source.OSM({
                                       url: 'http://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
                                       attributions: thunderforestAttributions
                                   })
                               }),
                             new ol.layer.Tile({
                                 title: 'Thunderforest - Outdoors',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.OSM({
                                     url: 'http://{a-c}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
                                     attributions: thunderforestAttributions
                                 })
                             }),
                             new ol.layer.Tile({
                                 title: 'Thunderforest - Landscape',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.OSM({
                                     url: 'http://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
                                     attributions: thunderforestAttributions
                                 })
                             }),
                             new ol.layer.Tile({
                                 title: 'Thunderforest - Transport',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.OSM({
                                     url: 'http://{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
                                     attributions: thunderforestAttributions
                                 })
                             }),
                             new ol.layer.Tile({
                                 title: 'Thunderforest - Transport Dark',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.OSM({
                                     url: 'http://{a-c}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',
                                     attributions: thunderforestAttributions
                                 })
                             }),






                             new ol.layer.Tile({
                                 title: 'OSM',
                                 type: 'base',
                                 visible: true,
                                 source: new ol.source.OSM()
                             })
                         ]
                     }),



                    
                     new ol.layer.Group({
                         title: _tile_name,
                         layers: [

                             new ol.layer.Tile({
                                 title: _tile_name+'_tile_layers',
                                 source: utfgrid_layer
                             }),


                             new ol.layer.Tile({
                                 title:_tile_name+'_UTFGrid',
                                 source: utfgrid_source
                             }),




                         ]
                     })
                 ],




                 view: _view
             });



              map.addControl(new ol.control.LayerSwitcher());



             // ................NOT IN USE...... get utfgrid layers under layer group .................
             

              //var all_layer_groups = map.getLayers();
              
              //var layer_group;

              //for (i = 0, n = all_layer_groups.getLength() ; i < n; i++) {

              //    layer_group = all_layer_groups.item(i);

                 

              //    if (layer_group.get('title') == _tile_name) {
                      
              //                if (layer_group.getLayers) {
              //                    var _inner_layers = layer_group.getLayers().getArray();

              //                    utfgrid_layer = _inner_layers[1];
              //                }// if
              //        break;
              //    }//if
              //}//for

              //if (utfgrid_layer) {
              //    // Do with layer

              //  //  alert(utfgrid_layer.get('title'));



              //}



             // ...............NOT IN USE................ End ......get utfgrid layers by name







             // .............. utf grid control ..................

             

              var displayInfo = function (coordinate) {
                  var viewResolution = /** @type {number} */ (_view.getResolution());
                  
                  utfgrid_source.forDataAtCoordinateAndResolution(coordinate, viewResolution,
                      function (data) {

                          
                          // If you want to use the template from the TileJSON,
                          //  load the mustache.js library separately and call
                          //  info.innerHTML = Mustache.render(gridSource.getTemplate(), data);
                          mapElement.style.cursor = data ? 'pointer' : '';

                         
                          if (data) {
                             
                            // there is info to display

                              var _utfgrid_info = "<ul>";
                              var _object = data;

                              for (var _property in _object) {
                                  if (_object.hasOwnProperty(_property)) {

                                     

                                      _utfgrid_info = _utfgrid_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + String(_object[_property]) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

                                  }
                              }


                             

                              _utfgrid_info = _utfgrid_info + "</ul>";
                              document.getElementById('utfgrid_info').innerHTML = _utfgrid_info;




                          }//if
                          else {
                              // data === null, no info to display


                              document.getElementById('utfgrid_info').innerHTML = '';

                          }



                          
                      });// function
              }; // display








              map.on('pointermove', function (evt) {
                  if (evt.dragging) {
                      return;
                  }
                  var coordinate = map.getEventCoordinate(evt.originalEvent);
                  displayInfo(coordinate);
                

              });// pointermove




              map.on('click', function (evt) {
                  displayInfo(evt.coordinate);

              }); // click


             




             // .........End..... utf grid control ..................









             // if tile exist, create slider
              tile_opacity_slider(_tile_name);



         }//if i>0

         else {
             // no tile exist, no overlay, only base map.



             var thunderforestAttributions = [
                new ol.Attribution({
                    html: 'Tiles &copy; <a href="http://www.thunderforest.com/">Thunderforest</a>'
                }),
                ol.source.OSM.ATTRIBUTION
             ];

              map = new ol.Map({
                  target: mapElement,
                 layers: [
                     new ol.layer.Group({
                         'title': 'Base maps',
                         layers: [





                             new ol.layer.Tile({
                                 title: 'Stamen - Water color',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.Stamen({
                                     layer: 'watercolor'
                                 })
                             }),
                             new ol.layer.Tile({
                                 title: 'Stamen - Toner',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.Stamen({
                                     layer: 'toner'
                                 })
                             }),



                              new ol.layer.Tile({
                                  title: 'MapQuest - Hybrid',
                                  type: 'base',
                                  visible: false,
                                  source: new ol.source.MapQuest({
                                      layer: 'hyb'
                                  })
                              }),

                               new ol.layer.Tile({
                                   title: 'MapQuest - OSM',
                                   type: 'base',
                                   visible: false,
                                   source: new ol.source.MapQuest({
                                       layer: 'osm'
                                   })
                               }),
                             new ol.layer.Tile({
                                 title: 'MapQuest - Satellite',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.MapQuest({
                                     layer: 'sat'
                                 })
                             }),


                               new ol.layer.Tile({
                                   title: 'Thunderforest - OpenCycleMap',
                                   type: 'base',
                                   visible: false,
                                   source: new ol.source.OSM({
                                       url: 'http://{a-c}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png',
                                       attributions: thunderforestAttributions
                                   })
                               }),
                             new ol.layer.Tile({
                                 title: 'Thunderforest - Outdoors',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.OSM({
                                     url: 'http://{a-c}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png',
                                     attributions: thunderforestAttributions
                                 })
                             }),
                             new ol.layer.Tile({
                                 title: 'Thunderforest - Landscape',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.OSM({
                                     url: 'http://{a-c}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
                                     attributions: thunderforestAttributions
                                 })
                             }),
                             new ol.layer.Tile({
                                 title: 'Thunderforest - Transport',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.OSM({
                                     url: 'http://{a-c}.tile.thunderforest.com/transport/{z}/{x}/{y}.png',
                                     attributions: thunderforestAttributions
                                 })
                             }),
                             new ol.layer.Tile({
                                 title: 'Thunderforest - Transport Dark',
                                 type: 'base',
                                 visible: false,
                                 source: new ol.source.OSM({
                                     url: 'http://{a-c}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png',
                                     attributions: thunderforestAttributions
                                 })
                             }),






                             new ol.layer.Tile({
                                 title: 'OSM',
                                 type: 'base',
                                 visible: true,
                                 source: new ol.source.OSM()
                             })
                         ]
                     })


                     
                 ],




                 view: _view
             });

              map.addControl(new ol.control.LayerSwitcher());



             // if no tile , hide slider control
              $('#ex1').hide();


         } //else 









         add_area_boundary($("#areaID").val());

         geocoding();

        // tile_opacity_slider(_tile_name);

         add_map_listener_idle();



     });// function done loading script



}// init_base_map_tiling






//----------------End of  basic simple map function  ------------------------




//............. openlayer highlight style ...................


var _clienttable_mouseover_row_highlight_feature_style = new ol.style.Style({

    stroke: new ol.style.Stroke({
        color: '#f00',
        width: 9
    }),

    fill: new ol.style.Fill({
        color: 'rgba(255,0,0,0.5)'
    }),


    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,1)'
        }),
        stroke: new ol.style.Stroke({
            color: '#f00',
            width: 3
        }),
        radius: 7
    }),

});// new style



var _servertable_mouseover_row_highlight_feature_style = new ol.style.Style({

    stroke: new ol.style.Stroke({
        color: '#f00',
        width: 9
    }),

    fill: new ol.style.Fill({
        color: 'rgba(255,0,0,0.5)'
    }),


    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: 'rgba(0,0,255,1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(255, 255, 0, 1)',
            width: 3
        }),
        radius: 5
    }),

});// new style




var _servertable_click_row_highlight_feature_style = new ol.style.Style({

    stroke: new ol.style.Stroke({
        color: '#8B008B',
        width: 16
    }),

    fill: new ol.style.Fill({
        color: 'rgba(255,0,0,0)'
    }),


    image: new ol.style.Circle({
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0,1)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgb(75, 0, 130)',
            width: 3
        }),
        radius: 7
    }),

});// new style





geojson_classification_mouseover_highlight_style = new ol.style.Style({

    stroke: new ol.style.Stroke({
        color: 'black',
        //lineDash: [1],
        width: 3
    }),

    fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.5)'
    })
});



geojson_classification_coloroff_restore_style = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: 'blue',
        lineDash: [4],
        width: 1
    }),
    fill: new ol.style.Fill({
        color: 'rgba(0, 0, 255, 0.1)'
    })
});






//............END...... openlayer highlight  style ...................






// =========== openlayer  geojson style =========================
var image = new ol.style.Circle({
    radius: 4,
    fill: null,
    stroke: new ol.style.Stroke({ color: 'red', width: 2 })
});

var styles = {
    'Point': new ol.style.Style({
        image: image
    }),
    'LineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiLineString': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'green',
            width: 1
        })
    }),
    'MultiPoint': new ol.style.Style({
        image: image
    }),
    'MultiPolygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'yellow',
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255, 255, 0, 0.1)'
        })
    }),
    'Polygon': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'blue',
            lineDash: [4],
            width: 1
        }),
        fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
        })
    }),
    'GeometryCollection': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'magenta',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'magenta'
        }),
        image: new ol.style.Circle({
            radius: 10,
            fill: null,
            stroke: new ol.style.Stroke({
                color: 'magenta'
            })
        })
    }),
    'Circle': new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: 'red',
            width: 2
        }),
        fill: new ol.style.Fill({
            color: 'rgba(255,0,0,0.2)'
        })
    })
};

var styleFunction = function (feature) {
    return styles[feature.getGeometry().getType()];
};






//===========End =========openlayer = geojson style =========================







// ############# testing and retired ######################




//############### End  ############# retired   #####################