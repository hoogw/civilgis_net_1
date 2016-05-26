
function init_base_map_tiling_forjusttile() {


    // local testing only
    _tile_baseURL = _tile_baseURL_localhost;



    mapElement = document.getElementById('map-canvas');
    var _tile_name = _areaID + "_" + _subjectID;
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
                                title: _tile_name + '_tile_layers',
                                source: utfgrid_layer
                            }),


                            new ol.layer.Tile({
                                title: _tile_name + '_UTFGrid',
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

        } //else 









        add_area_boundary($("#areaID").val());

        geocoding();



    });// function done loading script



}// init_base_map_tiling







function initialize() {








    initial_location = set_initial_location($("#areaID").val());




    init_base_map_tiling_forjusttile();


    document.getElementById("ajaxload").style.display = "none";
    document.getElementById("title_info").style.display = "none";
    document.getElementById("legend").style.display = "none";
    
   


   






   


}// initialize










$(document).ready(function () {





    initialize();





}); // document ready function