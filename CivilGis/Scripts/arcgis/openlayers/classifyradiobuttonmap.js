


//-------------------------- Classification button section -------------------------------------------



function init_classification_buttons_radio(_area, _subject) {



    // --------------------- dynamic load javascript file based on area and subject ---------------------------


    //var _classification_js = base_url + "public/js/classification/area/" + _area + "/" + _subject + ".js";
    var _classification_js = "/Scripts/classification/area/" + _area + "/" + _subject + ".js";

    $.when(
             $.getScript(_classification_js)
     /*
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    */

    ).done(function () {

        //place your code here, when above all scripts are all loaded completely.

        var _buttons_group = "";

        var _code = "";
        var _description = "";
        var _color = "";

        var _labelID = "";
        var _label_Class = "";
        var _checkboxID = "";
        var _checkbox_Value = "";

        var _label_selector = "";
        // var _checkbox_selector = "";  




        _designation_key = _area + "_" + _subject;
        _designation_parentArray = _designation[_designation_key];
        var parentArray = _designation_parentArray;




        // -----------  Start  for loop append checkbox button ---------------------
        for (var i = 0; i < parentArray.length; i++) {


            _code = parentArray[i]['code'];
            _description = parentArray[i]['description'];
            _color = parentArray[i]['color'];




            _labelID = 'label_' + _code;
            _label_Class = 'btn btn-' + _color + ' btn-xs';
            _checkboxID = 'checkbox_' + _code;
            _checkbox_Value = _code + " - " + _description;



           // var _this_button = '<label id="' + _labelID + '" class="' + _label_Class + '">   <input id="' + _checkboxID + '" type="checkbox">' + _checkbox_Value + '</label>';
            var _this_button = '<label id="' + _labelID + '" class="' + _label_Class + '">   <input id="' + _checkboxID + '" type="radio" name="classification_radios">' + _checkbox_Value + '</label>';
             

            _buttons_group = _buttons_group + _this_button + '&nbsp;&nbsp;&nbsp;&nbsp;';


        }// outer for



        //------- append the last high light black(php) button ----------------                      
        //_buttons_group = _buttons_group + '<label id="label_highlight" class="btn btn-block btn-black"><input id="checkbox_highlight" type="checkbox"> </label>';
        //------- append the last high light white(.net) button ----------------                      
        _buttons_group = _buttons_group + '<br><br>' + '<label id="label_highlight" class="btn btn-block btn-white"><input id="checkbox_highlight" type="checkbox"> </label>';




        $("#classification_buttons").append(_buttons_group);
        // -------------   end of  for loop append checkbox button ---------------------






        //--------------start  add event listener --------------------------------

        for (var j = 0; j < parentArray.length; j++) {


            _code = parentArray[j]['code'];
            _description = parentArray[j]['description'];
            _color = parentArray[j]['color'];


            _label_selector = '#label_' + _code;




            $(_label_selector).mouseover(function () {


                //alert($(this).attr('id'));
                var _label_current_mouseover = $(this).attr('id');
                var _checkbox_current_mouseover = _label_current_mouseover.replace('label', 'checkbox');
                var _checkbox_current_selector = '#' + _checkbox_current_mouseover;
                var _current_code_mouseover = _label_current_mouseover.replace('label_', '');

                // alert(_current_code);



                if ($(_checkbox_current_selector).is(':checked')) {
                    // if button clicked(check box checked), do nothing. mouse over disable.
                }
                else {



                    // loop through all current featurs on map 


                    // ----------- openlayer 3 --------------





                    _geojson_vectorSource.forEachFeature(function (feature) {





                        var _object = feature.getProperties();

                        for (var _property in _object) {
                            if (_object.hasOwnProperty(_property)) {


                                var _this_code_column = '';
                                if (_property === _code_column_name) {


                                    _this_code_column = String(_object[_property]);

                                    if (_this_code_column === _current_code_mouseover) {


                                        feature.setStyle(geojson_classification_mouseover_highlight_style);


                                    }// if



                                }// if 





                            }//if
                        }//for




                    }); // foreach Feature










                    //------------ end of openlayer 3 ----------------



                }// else if not checked, not clicked, do mouse over change color



            });  // end mouseover 



            $(_label_selector).mouseout(function () {



                var _label_current_mouseout = $(this).attr('id');
                var _checkbox_current_mouseout = _label_current_mouseout.replace('label', 'checkbox');
                var _checkbox_current_selector = '#' + _checkbox_current_mouseout;
                var _current_code_mouseout = _label_current_mouseout.replace('label_', '');

                // alert(_current_code);

                if ($(_checkbox_current_selector).is(':checked')) {
                    // if button clicked(check box checked), do nothing. mouse over disable.
                }
                else {






                    // -----------openlayer restore original layer feature style --------------


                    // does not work
                    //_geojson_vectorLayer.setStyle(styleFunction);





                    _geojson_vectorSource.forEachFeature(function (feature) {





                        var _object = feature.getProperties();

                        for (var _property in _object) {
                            if (_object.hasOwnProperty(_property)) {


                                var _this_code_column = '';
                                if (_property === _code_column_name) {


                                    _this_code_column = String(_object[_property]);

                                    if (_this_code_column === _current_code_mouseout) {


                                        feature.setStyle(geojson_classification_coloroff_restore_style);


                                    }// if



                                }// if 





                            }//if
                        }//for




                    }); // foreach Feature







                    //------------ end of openlayer restore original layer feature style --------------





                }// else




            }); // end mouseout










            $(_label_selector).click(function () {
                // alert($('#checkbox_R1').is(':checked'));

                // ---------  must use $(this) to get which label being clicked.

                var _label_current_click = $(this).attr('id');
                var _checkbox_current_click = _label_current_click.replace('label', 'checkbox');
                var _checkbox_current_selector = '#' + _checkbox_current_click;
                var _current_code_click = _label_current_click.replace('label_', '');

                //alert(_current_code);






                if ($(_checkbox_current_selector).is(':checked')) {
                    //alert(" Un do it ");

                    // alert($(_checkbox_current_selector).is(':checked'));

                    // loop through all current featurs on map, un do color, revert to origianl, remove color



                    // ----------- openlayers 3  --------------


                    //_geojson_vectorSource.forEachFeature(function (feature) {





                    //    var _object = feature.getProperties();

                    //    for (var _property in _object) {
                    //        if (_object.hasOwnProperty(_property)) {


                    //            var _this_code_column = '';
                    //            if (_property === _code_column_name) {


                    //                _this_code_column = String(_object[_property]);

                    //                if (_this_code_column === _current_code_click) {


                    //                    feature.setStyle(geojson_classification_mouseout_restore_style);


                    //                }// if



                    //            }// if 





                    //        }//if
                    //    }//for




                    //}); // foreach Feature







                    //------------ end of openlayers 3  ----------------








                } // if end un do it

                else {
                    //alert("  Do it ");
                    //alert($(_checkbox_current_selector).is(':checked'));


                    //---------------radio button click, should turn other color off --------------

                    // get the feature fill color

                    var _feature_fill_color = '';
                    var parentArray = _designation_parentArray;


                    for (var i = 0; i < parentArray.length; i++) {


                        if (parentArray[i]['code'] == _current_code_click) {
                            _feature_fill_color = parentArray[i]['color'];
                        }

                    }// outer for




                    // loop through all current featurs on map, do color and turn other color off.


                    // -----------openlayers 3   --------------


                    // .......... color off ..........

                    _geojson_vectorSource.forEachFeature(function (feature) {


                        feature.setStyle(geojson_classification_coloroff_restore_style);



                    }); // foreach Feature




                    //..........End color off ............





                    // .......... do color ..........
                    _geojson_vectorSource.forEachFeature(function (feature) {





                        var _object = feature.getProperties();

                        for (var _property in _object) {
                            if (_object.hasOwnProperty(_property)) {


                                var _this_code_column = '';
                                if (_property === _code_column_name) {


                                    _this_code_column = String(_object[_property]);

                                    if (_this_code_column === _current_code_click) {


                                        feature.setStyle(

                                            new ol.style.Style({

                                                stroke: new ol.style.Stroke({
                                                    color: _feature_fill_color,
                                                    //lineDash: [1],
                                                    width: 3
                                                }),

                                                fill: new ol.style.Fill({
                                                    color: _feature_fill_color

                                                })
                                            })




                                            );


                                    }// if



                                }// if 





                            }//if
                        }//for




                    }); // foreach Feature

                    // ..........End of do color ..........






                    //------------ end of openlayers 3   ----------------




                }// else end do it


            });// end click











        }// outer for

        //--------------end of  add event listener --------------------------------



    }); // when done


    // ---- radio only -----------  high light off button   ----------------------
    $('#label_high_light_off').click(function () {






        // .......... color off ..........

        _geojson_vectorSource.forEachFeature(function (feature) {


            feature.setStyle(geojson_classification_coloroff_restore_style);



        }); // foreach Feature




        //..........End color off ............





    });








}  //function init_classification_buttons





function remove_anylast_highlight_style_checkbox_button() {

    var pArray = _designation_parentArray;

    // -----------  Start  for loop  checkbox button ---------------------
    for (var i = 0; i < pArray.length; i++) {

        var _label_selector = '#label_' + pArray[i]['code'];
        var _checkbox_selector = '#checkbox_' + pArray[i]['code'];

        var _code_ = pArray[i]['code'];
        var _description_ = pArray[i]['description'];
        var _color_ = pArray[i]['color'];
        var _label_Class_ = 'btn btn-' + _color_ + ' btn-xs';


        $(_label_selector).removeClass("btn btn-black").addClass(_label_Class_);


        $("#label_highlight").text("");




    }// outer for



} // function



function uncheck_all_checkbox_button() {



    var pArray = _designation_parentArray;

    // -----------  Start  for loop  checkbox button ---------------------
    for (var i = 0; i < pArray.length; i++) {

        var _label_selector = '#label_' + pArray[i]['code'];
        var _checkbox_selector = '#checkbox_' + pArray[i]['code'];

        //a class active is added to the label (not the checkbox input) when the button is clicked. 
        //change both the appearance of the button and the checked property of the checkbox within
        if ($(_checkbox_selector).is(':checked')) {
            $(_label_selector).removeClass('active');
            $(_checkbox_selector).removeAttr('checked')
        }

    }// outer for

}



//--------------------------End of Classification button section -------------------------------------------











//................... common function ................


function init_base_map_tiling_classification() {


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

        tile_opacity_slider(_tile_name);

        add_map_listener_idle_classification();



    });// function done loading script



}// init_base_map_tiling




function add_map_listener_idle_classification() {







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
    select.on('select', function (e) {


        var _highlight_button_value = '';

        _feature_info = "<ul>";

        e.selected.forEach(function (_feature) {

            var _object = _feature.getProperties();

            for (var _property in _object) {
                if (_object.hasOwnProperty(_property)) {

                    if (_property !== 'geometry') {

                        _feature_info = _feature_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + String(_object[_property]) + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";


                        if (_property === _code_column_name) {

                            _highlight_button_value = String(_object[_property]);

                        }


                    }// if 
                }//if
            }//for


        }); // for each 


        _feature_info = _feature_info + "</ul>";
        document.getElementById('info-table').innerHTML = _feature_info;












        //---------------------- classification ---when -   mouse over  ------ highlight button and bottom big button ---------------------


        remove_anylast_highlight_style_checkbox_button();



        var _highlight_button = '#label_' + _highlight_button_value;


        // **** if that element exist length >0  *******
        if ($(_highlight_button).length) {

            _current_classifycheckbox_class = $(_highlight_button).attr('class');
            $(_highlight_button).removeClass(_current_classifycheckbox_class).addClass("btn btn-black");


            $("#label_highlight").text($(_highlight_button).text());


        }




        //----------------------End  classification ---when -   mouse over  ------ highlight button and bottom big button ---------------------









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

        if (_show_popup) {
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




//..................... End common function ......................







function ajax_GeoJSON(gmap,_apiURI_returncountonly,_apiURI,_map_click_event) {
    
    // Load a GeoJSON from the server 
   
   
    $.get(_apiURI_returncountonly, function(data_count_only){
                
                
        //{"type":"FeatureCollection","properties":{"count":24362},"features":[]}  
        var data = JSON.parse(data_count_only).properties.count;
                
        if (parseInt(data) < max_return_feature_limit)
                
        {
             


            // test url if return a number means too many polygon to show.otherwise add polygon to map.
            $.get(_apiURI, function (data) {



            // ---------   processing data(geoJson) to fill datatables -----------------





            _geojson_object = JSON.parse(data);

            //...................... openlayers ..........................


            _geojson_vectorSource = new ol.source.Vector({
                features: (new ol.format.GeoJSON()).readFeatures(_geojson_object, { featureProjection: 'EPSG:3857' })


            });



            _geojson_vectorLayer = new ol.layer.Vector({
                source: _geojson_vectorSource,
                style: styleFunction
            });


            map.addLayer(_geojson_vectorLayer);


            _current_geojson_layer = true;



            $('#utfgrid_info').hide();









            if (_last_geojson_layer) {

                // layers start from 0 = base map, 1 = raster tile, 2 = utfgrid_tile, 3 = last time geojson,  4 = current geojson  / so 3 = array.lenghth - 2

                _all_layers = map.getLayers().getArray();

                map.removeLayer(_all_layers[_all_layers.length - 2]);

            }
            else {

                _last_geojson_layer = true;


            }// if


            //------------------------end add new geojson, then remove last geojson------------------------- ---------------





            // hidden the title_info
            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "none";
            document.getElementById("legend").style.display = "none";


            // do not use this, because it have place holder for blank
            //document.getElementById("title_info").style.visibility = "hidden";


            document.getElementById("title_info").innerHTML = "";
            document.getElementById("legend").innerHTML = "";






            // ------------- map click event [3] -------------------
            if (_map_click_event) {
            }
            else {
                _mapclick_in_use = false;
            }

            //-------------------------------------------------------------


            });// get// end get process geojson


        }
            // returning number of count
        else {







            // ---------- if return number, should remove last time geojson -----------

            if (_last_geojson_layer) {


                _all_layers = map.getLayers().getArray();


                // layers start from 0 = base map, 1 = raster tile, 2 = utfgrid_tile, 3 = geojson = array.lenghth - 1


                map.removeLayer(_all_layers[_all_layers.length - 1]);


                _last_geojson_layer = false;
                _current_geojson_layer = false;

            }// if
            //-------------------- end remove last geojson ------------------------------



            // show 'utfgrid_info' <div>
            $('#utfgrid_info').show();
            // empty bottom <div>
            document.getElementById("info-table").innerHTML = "";


            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "inline";
            document.getElementById("legend").style.display = "inline";

            if (data > 0) {

                document.getElementById("title_info").innerHTML = "Found [ " + data + " ] records ZOOM IN for Details  ";

                document.getElementById('legend').innerHTML = "Found [ " + data + " ] records ZOOM IN for Details ";

            } else {

                document.getElementById("title_info").innerHTML = "Nothing found";
                document.getElementById("legend").innerHTML = "Nothing found";
            }



            // ------------- map click event [4] -------------------

            _mapclick_in_use = true;

            //-------------------------------------------------------------


            // -------------- classification [5] --------------------
            uncheck_all_checkbox_button();




        }// else return number only

    });// get


}// function ajax_GeoJSON








function initialize() {







    initial_location = set_initial_location($("#areaID").val());


    init_base_map_tiling_classification();



    // load classification button [1]
    init_classification_buttons_radio($("#areaID").val(), $("#subjectID").val());




}// initialize









// datatables paged js
$(document).ready(function () {




    initialize();



}); // document ready function

