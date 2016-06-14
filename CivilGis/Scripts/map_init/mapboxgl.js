/// <reference path="source_layer/city.js" />
var mapboxgl_accessToken = 'pk.eyJ1IjoiaG9vZ3ciLCJhIjoiYjdlZTA1Y2YyOGM4NjFmOWI2MjY3MmI5NWM3MmUyOWMifQ.gINCV5SXFGTG5wB8ouXxOw';

var _tileserver_base_url = 'http://166.62.80.50:10/tileserver/tileserver.php?/index.json?/'; // must use this
//var _tileserver_base_url = 'http://tilevector.transparentgov.net/tileserver/tileserver.php?/index.json?/'; // must use this






var map;

var _area_polygon_coord = [];
var initial_location = [];
var _area_db = [];
var source_layer = [];
var geocoder;
var _source_layer_group_id;
var _tileserver_url;


var _flyto_zoomlevel;
var _multi_polyline;
var _area_polyline

var _areaID;
var _subjectID;


var _rendered_features = [];
var _source_features = [];

var source_layer_id = [];
var source_layer_id_highlight = [];
var highlight_geojson_source = null;
var highlight_geojson_layer = null;
var multilayer_highlight_features = {};
var multilayer_highlight_geojson = [];
var multilayer_highlight_geojson_source = [];
var multilayer_highlight_geojson_layer = [];


var _dt_columns_count = [];

var _feature_uid;



//----------- classification --------without this will failed load script for classification ------------ 
var _code_column_name;
var _designation = {};
var _designation_key;
var _designation_parentArray;

var _classify_highlight_fillcolor = 'black';
var _classify_highlight_filloutlinecolor = 'white';
var _classify_highlight_fillopacity = 0.8;

var _overlay_circle_radius = 3;
var _overlay_circle_blur = 0;
var _overlay_circle_color = 'black';
var _overlay_line_color = 'black';
var _overlay_line_width = 3;
var _overlay_fill_color = 'rgba(0, 0, 0, 0)';
var _overlay_fill_outline_color = 'rgba(0, 0, 0, 0.9)';


var _1overlay_layer_ID;
var _1overlay_layer;
var _2overlay_layer_ID;
var _2overlay_layer;
//----------- End  classification -------




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






function geocoder() {

    //--- geocoding ---------------
    // map.addControl(new mapboxgl.Geocoder());


    geocoder = new mapboxgl.Geocoder({
        container: 'geocoder-container' // Optional. Specify a unique container for the control to be added to.
    });

    map.addControl(geocoder);

    // After the map style has loaded on the page, add a source layer and default
    // styling for a single point.
    map.on('load', function () {
        map.addSource('single-point', {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        });

        map.addLayer({
            "id": "point",
            "source": "single-point",
            "type": "circle",
            "paint": {
                "circle-radius": 10,
                "circle-color": "#007cbf"
            }
        });

        // Listen for the `geocoder.input` event that is triggered when a user
        // makes a selection and add a marker that matches the result.
        geocoder.on('result', function (ev) {
            map.getSource('single-point').setData(ev.result.geometry);
        });
    });


}



function add_area_boundary(_area) {

    

    _multi_polyline = 'No';
    var _js_url = "/Scripts/area_boundary/mapboxgl/" + _area + ".js";


    


    $.when(
             $.getScript(_js_url)
     

    ).done(function () {

        

        //place your code here, when above all scripts are all loaded completely.


        //---------- mapbox GL  --------------------------


        _area_polyline = map.on('load', function () {
            map.addSource("boundary", _area_polygon_coord[_area]);

            

            map.addLayer({
                "id": "boundary",
                "type": "line",
                "source": "boundary",
                "layout": {
                    "line-join": "round",
                    "line-cap": "round"
                },
                "paint": {
                    "line-color": "#FFA500",
                    "line-width": 5
                }
            });

        });
        //--------- end mapbox GL -------



    }); // when done




}// function add_area_boundary





function init_base_map() {

    mapboxgl.accessToken = mapboxgl_accessToken;
    map = new mapboxgl.Map({
        container: 'map-canvas', // container id
        style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location

        //style: 'mapbox://styles/mapbox/emerald-v8',

        // style: 'mapbox://styles/mapbox/satellite-v8',

        //style: 'mapbox://styles/hoogw/cin2d9c6u007aafncyn8nmu36',


        center: [initial_location[2], initial_location[1]], //  starting position[-74.50, 40],
        zoom: initial_location[3] // starting zoom
    });


    map.addControl(new mapboxgl.Navigation());



}






//--------------------------  vectore tile  ------------------------------------




function multilayer_checkbox_menu_color(_area, _subject) {

   



        // ----------- add checkbox menu -----------
        _source_layer_group_id = _area + '_' + _subject;


        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {



                //var _checkbox_span = '  <span class="button-checkbox"> <button type="button" class="btn" data-color="primary" id="' + property + '">' + property + '</button><input type="checkbox" class="hidden" checked /> </span> ';


                var _checkbox_span = '  <span class="button-checkbox"> <button type="button" class="btn" data-color="'+
                                           source_layer[_source_layer_group_id][property]['feature_color']   + '" id="' + property + '">' + property + '</button><input type="checkbox" class="hidden" checked /> </span> ';
                


                $("#checkbox_menu").append(_checkbox_span);





            }//if
        }//for
        // ----------- End of add checkbox menu -----------



        $('.button-checkbox').each(function () {

            // Settings
            var $widget = $(this),
                $button = $widget.find('button'),
                $checkbox = $widget.find('input:checkbox'),
                color = $button.data('color'),
                settings = {
                    on: {
                        icon: 'glyphicon glyphicon-check'
                    },
                    off: {
                        icon: 'glyphicon glyphicon-unchecked'
                    }
                };



            // Event Handlers
            $button.on('click', function (e) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                $checkbox.triggerHandler('change');
                updateDisplay();



                //--------------------------- turn off the layer ---  when click checkbox button -----------------
                //alert(this.id);

                // e.preventDefault();
                //  e.stopPropagation();
                var visibility = map.getLayoutProperty(this.id, 'visibility');

                if (visibility === 'visible') {
                    map.setLayoutProperty(this.id, 'visibility', 'none');
                    // this.className = '';
                } else {
                    // this.className = 'active';
                    map.setLayoutProperty(this.id, 'visibility', 'visible');
                };


                //----------------------- End of -- turn off the layer ---  when click checkbox button -----------------

            });




            $checkbox.on('change', function () {
                updateDisplay();
            });


            // Actions
            function updateDisplay() {
                var isChecked = $checkbox.is(':checked');

                // Set the button's state
                $button.data('state', (isChecked) ? "on" : "off");

                // Set the button's icon
                $button.find('.state-icon')
                    .removeClass()
                    .addClass('state-icon ' + settings[$button.data('state')].icon);

                // Update the button's color
                if (isChecked) {
                    $button
                        .removeClass('btn-default')
                        .addClass('btn-' + color + ' active');
                }
                else {
                    $button
                        .removeClass('btn-' + color + ' active')
                        .addClass('btn-default');
                }
            }

            // Initialization
            function init_checkbox() {

                updateDisplay();

                // Inject the icon if applicable
                if ($button.find('.state-icon').length == 0) {
                    $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>&nbsp;');
                }
            }




            init_checkbox();
        });





   

}



function multilayer_checkbox_menu_simple(_area, _subject) {

    



        // ----------- add checkbox menu -----------
        _source_layer_group_id = _area + '_' + _subject;


        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {



                var _checkbox_span = '  <span class="button-checkbox"> <button type="button" class="btn" data-color="primary" id="'+ property + '">' + property + '</button><input type="checkbox" class="hidden" checked /> </span> ';


                $("#checkbox_menu").append(_checkbox_span);





            }//if
        }//for
        // ----------- End of add checkbox menu -----------



        $('.button-checkbox').each(function () {

            // Settings
            var $widget = $(this),
                $button = $widget.find('button'),
                $checkbox = $widget.find('input:checkbox'),
                color = $button.data('color'),
                settings = {
                    on: {
                        icon: 'glyphicon glyphicon-check'
                    },
                    off: {
                        icon: 'glyphicon glyphicon-unchecked'
                    }
                };



            // Event Handlers
            $button.on('click', function (e) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
                $checkbox.triggerHandler('change');
                updateDisplay();



                //--------------------------- turn off the layer ---  when click checkbox button -----------------
                //alert(this.id);

               // e.preventDefault();
              //  e.stopPropagation();
                var visibility = map.getLayoutProperty(this.id, 'visibility');

                if (visibility === 'visible') {
                    map.setLayoutProperty(this.id, 'visibility', 'none');
                   // this.className = '';
                } else {
                   // this.className = 'active';
                    map.setLayoutProperty(this.id, 'visibility', 'visible');
                };
            

                //----------------------- End of -- turn off the layer ---  when click checkbox button -----------------

            });




            $checkbox.on('change', function () {
                updateDisplay();
            });


            // Actions
            function updateDisplay() {
                var isChecked = $checkbox.is(':checked');

                // Set the button's state
                $button.data('state', (isChecked) ? "on" : "off");

                // Set the button's icon
                $button.find('.state-icon')
                    .removeClass()
                    .addClass('state-icon ' + settings[$button.data('state')].icon);

                // Update the button's color
                if (isChecked) {
                    $button
                        .removeClass('btn-default  btn-xs')
                        .addClass('btn-' + color +  ' btn-xs'+ ' active');
                }
                else {
                    $button
                        .removeClass('btn-' + color + ' btn-xs' + ' active')
                        .addClass('btn-default  btn-xs');
                }
            }

            // Initialization
            function init_checkbox() {

                updateDisplay();

                // Inject the icon if applicable
                if ($button.find('.state-icon').length == 0) {
                    $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>&nbsp;');
                }
            }




            init_checkbox();
        });





   

}



// ************ common function ******************

function add_multilayer_to_map(_source, _group_id ) {

    for (var property in source_layer[_group_id]) {
        if (source_layer[_group_id].hasOwnProperty(property)) {

            var _highlight_id = property + '_highlight';

            //alert(property);

            if (source_layer[_group_id][property]['type'] === 'circle') {

                map.addLayer({
                    "id": property,
                    "type": 'circle',
                    "source": _source,

                    "source-layer": property,



                    "layout": {
                        'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                    },

                    "paint": {
                        "circle-color": source_layer[_source_layer_group_id][property]['circle-color'],
                        //"circle-radius": parseInt(source_layer[_source_layer_group_id][property]['circle-radius']),
                        "circle-radius": {


                            "stops": [[9, 1], [15, 3], [19, 5], [23, 7]]


                        },

                        "circle-blur": parseInt(source_layer[_source_layer_group_id][property]['circle-blur'])
                    },
                });





            }//if point, circle

            else if (source_layer[_group_id][property]['type'] === 'line') {

                map.addLayer({
                    "id": property,
                    "type": "line",
                    "source": _source,

                    "source-layer": property,

                    "layout": {
                        'visibility': 'visible',       // this property must be present in order for checkbox button menu work properly. 
                        "line-join": source_layer[_group_id][property]['line-join'],
                        "line-cap": source_layer[_group_id][property]['line-cap'],
                    },
                    "paint": {

                        "line-color": source_layer[_group_id][property]['line-color'],
                        // "line-width": parseInt(source_layer[_source_layer_group_id][property]['line-width'])

                        "line-width": {

                            "base": 1,
                            "stops": [[9, 1], [15, 3], [19, 7], [23, 13]]


                        }

                    }
                });






            }//else line


            else if (source_layer[_group_id][property]['type'] === 'fill') {


                map.addLayer({
                    'id': property,
                    'type': 'fill',
                    "source": _source,

                    "source-layer": property,

                    "layout": {
                        'visibility': 'visible'   // this property must be present in order for checkbox button menu work properly. 
                    },

                    'paint': {
                        'fill-color': source_layer[_group_id][property]['fill-color'],
                        'fill-outline-color': source_layer[_group_id][property]['fill-outline-color']
                        // "fill-opacity": 0
                    }
                });








            }// else polygon fill


            // for testing sample "hide show layer"
            // addLayer(property, property);



        }//if 
    }// for 



}

function show_multilayer_info_table_when_mouseover(_features, _group_id) {


    var instand_info_table = "";

    for (var i = 0; i < _features.length; i++) {



        var element = _features[i];



        // filter only display our feature, not base map feature.

        if (element.layer.id in source_layer[_group_id]) {


            var instant_info = "<br/><div><span>" + element.layer.id + "<ul>";

            for (var _key in element.properties) {
                var _value = String(element.properties[_key]);
                instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _key + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            }// for



            instant_info = instant_info + "</ul> </span></div>";


            instand_info_table = instand_info_table + instant_info;


        }// if filter






    }//for feature length



    // update bottom <div>
    document.getElementById("info-table").innerHTML = instand_info_table;




}// function


function show_multilayer_popup_when_click(_features, _group_id, _e) {

    if (!_features.length) {
        return;
    }

    var _not_popup = false;

    var _popup_html = "<div style='width:180px; height:120px;text-align: center; overflow-x:scroll; overflow-y:scroll; overflow:auto;'><table >";

    for (var j = 0; j < _features.length; j++) {

        var element = _features[j];


        // filter only display our feature, not base map feature.

        if (element.layer.id in source_layer[_group_id]) {

            _not_popup = true;

            var _popup_html_section = "<tr><td ><span style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + element.layer.id + "&nbsp;</font></span></td><td>" + " " + "</td></tr>";

            for (var _key in element.properties) {
                var _value = String(element.properties[_key]);

                _popup_html_section = _popup_html_section + "<tr><td ><span style=\"float:left; list-style: none;font-size:10px\">" + _key + "</span></td><td><span style=\"float:left; list-style: none;font-size:8px\">" + _value + "</span></td></tr>";

            }// for

            _popup_html = _popup_html + _popup_html_section;

        }//if filter

    }//for

    _popup_html = _popup_html + "</table></div>";


    if (_not_popup) {
        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(_e.point))
            .setHTML(_popup_html)
            .addTo(map);

    }//if 

}// function 


function add_singlelayer_to_map(_source, _this_layer) {



    if (source_layer['all_layers'][_this_layer]['type'] === 'circle') {

        map.addLayer({
            "id": _this_layer,
            "type": 'circle',
            "source": _source,

            "source-layer": _this_layer,



            "layout": {
                'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
            },

            "paint": {
                "circle-color": source_layer['all_layers'][_this_layer]['circle-color'],
                //"circle-radius": parseInt(source_layer['all_layers'][_this_layer]['circle-radius']),


                "circle-radius": {


                    "stops": [[9, 1], [15, 3], [19, 5], [23, 7]]


                },


                "circle-blur": parseInt(source_layer['all_layers'][_this_layer]['circle-blur'])
            },
        });







    }//if point, circle

    else if (source_layer['all_layers'][_this_layer]['type'] === 'line') {

        map.addLayer({
            "id": _this_layer,
            "type": "line",
            "source": _source,

            "source-layer": _this_layer,

            "layout": {
                'visibility': 'visible',       // this property must be present in order for checkbox button menu work properly. 
                "line-join": source_layer['all_layers'][_this_layer]['line-join'],
                "line-cap": source_layer['all_layers'][_this_layer]['line-cap'],
            },
            "paint": {

                "line-color": source_layer['all_layers'][_this_layer]['line-color'],
                // "line-width": parseInt(source_layer['all_layers'][_this_layer]['line-width'])

                "line-width": {

                    "base": 1,
                    "stops": [[9, 1], [15, 3], [19, 7], [23, 13]]


                }



            }
        });






    }//else line


    else if (source_layer['all_layers'][_this_layer]['type'] === 'fill') {


        map.addLayer({
            'id': _this_layer,
            'type': 'fill',
            "source": _source,

            "source-layer": _this_layer,

            "layout": {
                'visibility': 'visible'   // this property must be present in order for checkbox button menu work properly. 
            },

            'paint': {
                'fill-color': source_layer['all_layers'][_this_layer]['fill-color'],
                'fill-outline-color': source_layer['all_layers'][_this_layer]['fill-outline-color']
                // "fill-opacity": 0
            }
        });







    }// else polygon fill


}

function show_singlelayer_info_table_when_mouseover(_features) {

    var instand_info_table = "";

    for (var i = 0; i < _features.length; i++) {



        var element = _features[i];



        //.............. .......... info-table ..............

        var instant_info = "<br/><div><span>" + element.layer.id + "<ul>";

        for (var _key in element.properties) {
            var _value = String(element.properties[_key]);
            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _key + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

        }// for


        instant_info = instant_info + "</ul> </span></div>";


        instand_info_table = instand_info_table + instant_info;

        //.............. End ........... info-table ..............







    }//for feature length


    // update bottom <div>
    document.getElementById("info-table").innerHTML = instand_info_table;



}


function show_singlelayer_popup_when_click(_features, _e) {

    if (!_features.length) {
        return;
    }

    var _not_popup = false;

    var _popup_html = "<div style='width:180px; height:120px;text-align: center; overflow-x:scroll; overflow-y:scroll; overflow:auto;'><table >";

    for (var j = 0; j < _features.length; j++) {

        var element = _features[j];




        _not_popup = true;

        var _popup_html_section = "<tr><td ><span style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + element.layer.id + "&nbsp;</font></span></td><td>" + " " + "</td></tr>";

        for (var _key in element.properties) {
            var _value = String(element.properties[_key]);

            _popup_html_section = _popup_html_section + "<tr><td ><span style=\"float:left; list-style: none;font-size:10px\">" + _key + "</span></td><td><span style=\"float:left; list-style: none;font-size:8px\">" + _value + "</span></td></tr>";

        }// for

        _popup_html = _popup_html + _popup_html_section;



    }//for

    _popup_html = _popup_html + "</table></div>";


    if (_not_popup) {
        var popup = new mapboxgl.Popup()
            .setLngLat(map.unproject(_e.point))
            .setHTML(_popup_html)
            .addTo(map);

    }//if



}



//  ************ End of  ************ common function *********************











//..............  multilayer ............









// no highlight
function multilayer_vector_property(_area, _subject) {




    _source_layer_group_id = _area + '_' + _subject;



    //.................  object to array for id and id_highlight .......................


    source_layer_id = Object.keys(source_layer[_source_layer_group_id]);


    for (var j = 0; j < source_layer_id.length; j++) {
        source_layer_id_highlight.push(source_layer_id[j] + '_highlight');

    }

    //.................  End .............object to array for id and id_highlight .......................




    //_tileserver_base_url = 'http://vectortile.transparentgov.net/'; // NOT work,with error No 'Access-Control-Allow-Origin' header is present on the requested resource
    //   _tileserver_base_url = 'http://166.62.80.50:10/tileserver/tileserver.php?/index.json?/'; // must use this

    // _tileserver_url = 'http://localhost:10/tileserver/tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';
    //   _tileserver_url = _tileserver_base_url + 'tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';


    _tileserver_url = _tileserver_base_url + _area + '/{z}/{x}/{y}.pbf';

   


   






    map.on('load', function () {

        map.addSource(_area, {

            type: 'vector',

            //url: 'mapbox://hoogw.0pywwk0d'


            "tiles": [
                        // 'http://localhost:10/tileserver/tileserver.php?/index.json?/city/{z}/{x}/{y}.pbf'

                        _tileserver_url
            ],
            "maxzoom": 22


        });




        //==================================   add layers to map ================


        add_multilayer_to_map(_area, _source_layer_group_id);
       


        //============End ==========================   add layers to map =========================================


    }); // map.on('load')




   



    // ===========   mouse over event, show feature detail property in info-table ===============
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: source_layer_id });
        // var features_hightlight  = map.queryRenderedFeatures(e.point, { layers: source_layer_id_highlight });

        //  hand to pointer hand if there is features 
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';


        show_multilayer_info_table_when_mouseover(features, _source_layer_group_id);



    });
    // =========== End =====  mouse over event, show feature detail property in info-table ===============












    // -------------------- click event open a popup at the location of the feature -----------------------------

    map.on('click', function (e) {
        //var features = map.queryRenderedFeatures(e.point);
        var features = map.queryRenderedFeatures(e.point, { layers: source_layer_id });

        show_multilayer_popup_when_click(features, _source_layer_group_id, e);
       

    }); // map on click


    // --------------------End -------------- click event open a popup at the location of the feature -----------------------------






   


}



function init_vector_muiltilayer_highlight_geojson(_area, _subject) {


    // alert('add vector tile');



    _source_layer_group_id = _area + '_' + _subject;



    //.................  object to array for id and id_highlight .......................


    source_layer_id = Object.keys(source_layer[_source_layer_group_id]);


    for (var j = 0; j < source_layer_id.length; j++) {
        source_layer_id_highlight.push(source_layer_id[j] + '_highlight');

    }

    //.................  End .............object to array for id and id_highlight .......................




    //_tileserver_base_url = 'http://vectortile.transparentgov.net/'; // NOT work,with error No 'Access-Control-Allow-Origin' header is present on the requested resource
    //   _tileserver_base_url = 'http://166.62.80.50:10/tileserver/tileserver.php?/index.json?/'; // must use this

    // _tileserver_url = 'http://localhost:10/tileserver/tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';
    //   _tileserver_url = _tileserver_base_url + 'tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';


    _tileserver_url = _tileserver_base_url + _area + '/{z}/{x}/{y}.pbf';

    //  alert(_tileserver_url);

    //  map.on('style.load', function () {    // if not use style, should NOT use 'style.load' will cause not load vector tile problem, should use 'load' event
    map.on('load', function () {

        map.addSource(_area, {

            type: 'vector',

            //url: 'mapbox://hoogw.0pywwk0d'


            "tiles": [
                        // 'http://localhost:10/tileserver/tileserver.php?/index.json?/city/{z}/{x}/{y}.pbf'

                        _tileserver_url
            ],
            "maxzoom": 22


        });




        //==================================   add layers to map ================


        add_multilayer_to_map(_area, _source_layer_group_id);
       


        //============End ==========================   add layers to map =========================================




    }); // map.on('style.load')






    // ===========   mouse over event, show feature detail property in info-table ===============
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: source_layer_id });
        var features_hightlight = map.queryRenderedFeatures(e.point, { layers: source_layer_id_highlight });

        //  hand to pointer hand if there is features 
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';


        // ------- init highlight use later.

        for (var _layerkey in source_layer['all_layers']) {
            multilayer_highlight_features[_layerkey] = [];
        }
        // --- End ---- init highlight use later.



        var instand_info_table = "";

        for (var i = 0; i < features.length; i++) {



            var element = features[i];



            // filter only display our feature, not base map feature.

            if (element.layer.id in source_layer[_source_layer_group_id]) {

                var instant_info = "<br/><div><span>" + element.layer.id + "<ul>";

                for (var _key in element.properties) {
                    var _value = String(element.properties[_key]);
                    instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _key + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

                }// for


                instant_info = instant_info + "</ul> </span></div>";


                instand_info_table = instand_info_table + instant_info;
            }// if filter



            // sort features by layers
            // becasue of this, can't use common function

            multilayer_highlight_features[element.layer.id].push(element);





        }//for feature length


        // update bottom <div>
        document.getElementById("info-table").innerHTML = instand_info_table;



        //.............................................................. highlight add geojson layer ..............................................................



        
        var _onelayer_highlight_features = null;
        for (var _onelayer in multilayer_highlight_features) {


            var _multilayer_highlight_geojson_sourceID = _onelayer + '_highlight_geojson_sourceID';
            var _multilayer_highlight_geojson_layerID = _onelayer + '_highlight_geojson_layerID';



            _onelayer_highlight_features = multilayer_highlight_features[_onelayer];




            multilayer_highlight_geojson[_onelayer] = {
                "type": "FeatureCollection",
                "features": _onelayer_highlight_features

            }



            //// remove last time highlight source and layer
            if (multilayer_highlight_geojson_source[_onelayer]) {

                map.removeSource(_multilayer_highlight_geojson_sourceID);
                map.removeLayer(_multilayer_highlight_geojson_layerID);

            }//if



            // add current new highlight source
            multilayer_highlight_geojson_source[_onelayer] = map.addSource(_multilayer_highlight_geojson_sourceID, {
                "type": "geojson",
                "data": multilayer_highlight_geojson[_onelayer]

            });











            // add current new highlight layer
            if (source_layer['all_layers'][_onelayer]['type'] === 'circle') {

                multilayer_highlight_geojson_layer[_onelayer] = map.addLayer({
                    'id': _multilayer_highlight_geojson_layerID,
                    'type': 'circle',
                    'source': _multilayer_highlight_geojson_sourceID,

                    "layout": {
                        'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                    },

                    "paint": {
                        "circle-color": source_layer['all_layers'][_onelayer]['circle-color-highlight'],
                        "circle-radius": parseInt(source_layer['all_layers'][_onelayer]['circle-radius-highlight']),
                        "circle-blur": parseInt(source_layer['all_layers'][_onelayer]['circle-blur'])
                    }
                });





            }//if point, circle

            else if (source_layer['all_layers'][_onelayer]['type'] === 'line') {


                highlight_geojson_layer = map.addLayer({
                    'id': _multilayer_highlight_geojson_layerID,
                    'type': 'line',
                    'source': _multilayer_highlight_geojson_sourceID,
                    'layout': {},
                    'paint': {

                        "line-color": source_layer['all_layers'][_onelayer]['line-color'],
                        "line-width": parseInt(source_layer['all_layers'][_onelayer]['line-width-highlight'])


                    }
                });



            }//else line


            else if (source_layer['all_layers'][_onelayer]['type'] === 'fill') {


                highlight_geojson_layer = map.addLayer({
                    'id': _multilayer_highlight_geojson_layerID,
                    'type': 'fill',
                    'source': _multilayer_highlight_geojson_sourceID,
                    'layout': {},
                    'paint': {
                        'fill-color': source_layer['all_layers'][_onelayer]['fill-color-highlight']

                    }
                });




            }// else polygon fill



            //...............ENd ........................................... highlight add geojson layer ................

        }//for







    });
    // =========== End =====  mouse over event, show feature detail property in info-table ===============












    // -------------------- click event open a popup at the location of the feature -----------------------------

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point);


        show_multilayer_popup_when_click(features, _source_layer_group_id, e);

      

    }); // map on click


    // --------------------End -------------- click event open a popup at the location of the feature -----------------------------



}


// slow and no use of common function
function init_vector_muiltilayer_highlight_layer(_area, _subject) {


    // alert('add vector tile');



    _source_layer_group_id = _area + '_' + _subject;



    //.................  object to array for id and id_highlight .......................


    source_layer_id = Object.keys(source_layer[_source_layer_group_id]);


    for (var j = 0; j < source_layer_id.length; j++) {
        source_layer_id_highlight.push(source_layer_id[j] + '_highlight');

    }

    //.................  End .............object to array for id and id_highlight .......................




    //_tileserver_base_url = 'http://vectortile.transparentgov.net/'; // NOT work,with error No 'Access-Control-Allow-Origin' header is present on the requested resource
    //   _tileserver_base_url = 'http://166.62.80.50:10/tileserver/tileserver.php?/index.json?/'; // must use this

    // _tileserver_url = 'http://localhost:10/tileserver/tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';
    //   _tileserver_url = _tileserver_base_url + 'tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';


    _tileserver_url = _tileserver_base_url + _area + '/{z}/{x}/{y}.pbf';

    //  alert(_tileserver_url);

    //  map.on('style.load', function () {    // if not use style, should NOT use 'style.load' will cause not load vector tile problem, should use 'load' event
    map.on('load', function () {

        map.addSource(_area, {

            type: 'vector',

            //url: 'mapbox://hoogw.0pywwk0d'


            "tiles": [
                        // 'http://localhost:10/tileserver/tileserver.php?/index.json?/city/{z}/{x}/{y}.pbf'

                        _tileserver_url
            ],
            "maxzoom": 22


        });




        //==================================   add layers to map ================



        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {

                var _highlight_id = property + '_highlight';

                //alert(property);

                if (source_layer[_source_layer_group_id][property]['type'] === 'circle') {

                    map.addLayer({
                        "id": property,
                        "type": 'circle',
                        "source": _area,

                        "source-layer": property,



                        "layout": {
                            'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                        },

                        "paint": {
                            "circle-color": source_layer[_source_layer_group_id][property]['circle-color'],
                            "circle-radius": parseInt(source_layer[_source_layer_group_id][property]['circle-radius']),
                            "circle-blur": parseInt(source_layer[_source_layer_group_id][property]['circle-blur'])
                        },
                    });


                    // ............... circle highlight layer .................................



                    map.addLayer({
                        "id": _highlight_id,
                        "type": 'circle',
                        "source": _area,

                        "source-layer": property,



                        "layout": {
                            'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                        },

                        "paint": {
                            "circle-color": source_layer[_source_layer_group_id][property]['circle-color-highlight'],
                            "circle-radius": parseInt(source_layer[_source_layer_group_id][property]['circle-radius-highlight']),
                            "circle-blur": parseInt(source_layer[_source_layer_group_id][property]['circle-blur'])
                        },

                        "filter": ["==", "uid", ""]




                    });




                }//if point, circle

                else if (source_layer[_source_layer_group_id][property]['type'] === 'line') {

                    map.addLayer({
                        "id": property,
                        "type": "line",
                        "source": _area,

                        "source-layer": property,

                        "layout": {
                            'visibility': 'visible',       // this property must be present in order for checkbox button menu work properly. 
                            "line-join": source_layer[_source_layer_group_id][property]['line-join'],
                            "line-cap": source_layer[_source_layer_group_id][property]['line-cap'],
                        },
                        "paint": {

                            "line-color": source_layer[_source_layer_group_id][property]['line-color'],
                            "line-width": parseInt(source_layer[_source_layer_group_id][property]['line-width'])
                        }
                    });


                    // ............... line highlight layer .................................



                    map.addLayer({
                        "id": _highlight_id,
                        "type": "line",
                        "source": _area,

                        "source-layer": property,

                        "layout": {
                            'visibility': 'visible',       // this property must be present in order for checkbox button menu work properly. 
                            "line-join": source_layer[_source_layer_group_id][property]['line-join'],
                            "line-cap": source_layer[_source_layer_group_id][property]['line-cap'],
                        },
                        "paint": {

                            "line-color": source_layer[_source_layer_group_id][property]['line-color'],
                            "line-width": parseInt(source_layer[_source_layer_group_id][property]['line-width-highlight'])
                        },

                        "filter": ["==", "uid", ""]


                    });



                }//else line


                else if (source_layer[_source_layer_group_id][property]['type'] === 'fill') {


                    map.addLayer({
                        'id': property,
                        'type': 'fill',
                        "source": _area,

                        "source-layer": property,

                        "layout": {
                            'visibility': 'visible'   // this property must be present in order for checkbox button menu work properly. 
                        },

                        'paint': {
                            'fill-color': source_layer[_source_layer_group_id][property]['fill-color'],
                            'fill-outline-color': source_layer[_source_layer_group_id][property]['fill-outline-color']

                        }
                    });



                    // ............... fill highlight layer .................................


                    map.addLayer({
                        'id': _highlight_id,
                        'type': 'fill',
                        "source": _area,

                        "source-layer": property,

                        "layout": {
                            'visibility': 'visible'   // this property must be present in order for checkbox button menu work properly. 
                        },

                        'paint': {
                            'fill-color': source_layer[_source_layer_group_id][property]['fill-color-highlight'],
                            'fill-outline-color': source_layer[_source_layer_group_id][property]['fill-outline-color']

                        },

                        "filter": ["==", "uid", ""]

                    });







                }// else polygon fill


                // for testing sample "hide show layer"
                // addLayer(property, property);



            }//if 
        }// for 


        //============End ==========================   add layers to map =========================================




    }); // map.on('style.load')






    // ===========   mouse over event, show feature detail property in info-table ===============
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: source_layer_id });
        var features_hightlight = map.queryRenderedFeatures(e.point, { layers: source_layer_id_highlight });

        //  hand to pointer hand if there is features 
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';


        var instand_info_table = "";

        for (var i = 0; i < features.length; i++) {



            var element = features[i];



            // filter only display our feature, not base map feature.

            if (element.layer.id in source_layer[_source_layer_group_id]) {

                var instant_info = "<br/><div><span>" + element.layer.id + "<ul>";

                for (var _key in element.properties) {
                    var _value = String(element.properties[_key]);
                    instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _key + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

                }// for


                instant_info = instant_info + "</ul> </span></div>";


                instand_info_table = instand_info_table + instant_info;
            }// if filter




            //...................................... highlight feature ................................
            map.setFilter(element.layer.id + '_highlight', ["==", "uid", element.properties.uid]);


            //......................End of .......... highlight feature ................................







        }//for feature length


        // update bottom <div>
        document.getElementById("info-table").innerHTML = instand_info_table;













    });
    // =========== End =====  mouse over event, show feature detail property in info-table ===============












    // -------------------- click event open a popup at the location of the feature -----------------------------

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point);
        if (!features.length) {
            return;
        }

        var _not_popup = false;

        var _popup_html = "<div style='width:180px; height:120px;text-align: center; overflow-x:scroll; overflow-y:scroll; overflow:auto;'><table >";

        for (var j = 0; j < features.length; j++) {

            var element = features[j];


            // filter only display our feature, not base map feature.

            if (element.layer.id in source_layer[_source_layer_group_id]) {

                _not_popup = true;

                var _popup_html_section = "<tr><td ><span style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + element.layer.id + "&nbsp;</font></span></td><td>" + " " + "</td></tr>";

                for (var _key in element.properties) {
                    var _value = String(element.properties[_key]);

                    _popup_html_section = _popup_html_section + "<tr><td ><span style=\"float:left; list-style: none;font-size:10px\">" + _key + "</span></td><td><span style=\"float:left; list-style: none;font-size:8px\">" + _value + "</span></td></tr>";

                }// for

                _popup_html = _popup_html + _popup_html_section;

            }//if filter

        }//for

        _popup_html = _popup_html + "</table></div>";


        if (_not_popup) {
            var popup = new mapboxgl.Popup()
                .setLngLat(map.unproject(e.point))
                .setHTML(_popup_html)
                .addTo(map);

        }//if 

    }); // map on click


    // --------------------End -------------- click event open a popup at the location of the feature -----------------------------



}


//..... single layer ..................
function singlelayer_vector_highlight_geojson(_area, _subject) {


    var _current_layer = _area + '_' + _subject;
    var  _current_layer_highlight = _current_layer + '_highlight';


    _tileserver_url = _tileserver_base_url + _area + '/{z}/{x}/{y}.pbf';

   
    map.on('load', function () {

        map.addSource(_area, {

            type: 'vector',

            //url: 'mapbox://hoogw.0pywwk0d'


            "tiles": [
                        // 'http://localhost:10/tileserver/tileserver.php?/index.json?/city/{z}/{x}/{y}.pbf'

                        _tileserver_url
            ],
            "maxzoom": 22


        });




        //==================================   add layers to map ================



        add_singlelayer_to_map(_area, _current_layer);


               
        //============End ==========================   add layers to map =========================================




    }); // map.on('style.load')






    // ===========   mouse over event, show feature detail property in info-table ===============
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: [_current_layer] });
        var features_hightlight = map.queryRenderedFeatures(e.point, { layers: [_current_layer_highlight] });

        //  hand to pointer hand if there is features 
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';


        


        show_singlelayer_info_table_when_mouseover(features);




      

        //.............................................................. highlight add geojson layer ..............................................................


        var _highlight_features_geojson = {
                                                "type": "FeatureCollection",
                                                "features": features

                                        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

                                                map.removeSource("highlight_geojson");
                                                map.removeLayer('highlight_geojson_layer');

                                            }//if


        // add current new highlight source
        highlight_geojson_source =    map.addSource("highlight_geojson", {
                                                                                "type": "geojson",
                                                                                "data": _highlight_features_geojson

                                                                            });




        // add current new highlight layer
            if (source_layer['all_layers'][_current_layer]['type'] === 'circle') {

                            highlight_geojson_layer = map.addLayer({
                                'id': 'highlight_geojson_layer',
                                'type': 'circle',
                                'source': 'highlight_geojson',
                                
                                "layout": {
                                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                                },

                                "paint": {
                                    "circle-color": source_layer['all_layers'][_current_layer]['circle-color-highlight'],
                                    "circle-radius": parseInt(source_layer['all_layers'][_current_layer]['circle-radius-highlight']),
                                    "circle-blur": parseInt(source_layer['all_layers'][_current_layer]['circle-blur'])
                                }
                            });





                    }//if point, circle

                    else if (source_layer['all_layers'][_current_layer]['type'] === 'line') {

                                        
                                    highlight_geojson_layer = map.addLayer({
                                        'id': 'highlight_geojson_layer',
                                        'type': 'line',
                                        'source': 'highlight_geojson',
                                        'layout': {},
                                        'paint': {
                                           
                                            "line-color": source_layer['all_layers'][_current_layer]['line-color'],
                                            "line-width": parseInt(source_layer['all_layers'][_current_layer]['line-width-highlight'])
                                               

                                        }
                                    });



                                }//else line


                                else if (source_layer['all_layers'][_current_layer]['type'] === 'fill') {


                                            highlight_geojson_layer = map.addLayer({
                                                'id': 'highlight_geojson_layer',
                                                'type': 'fill',
                                                'source': 'highlight_geojson',
                                                'layout': {},
                                                'paint': {
                                                    'fill-color': source_layer['all_layers'][_current_layer]['fill-color-highlight']
               
                                                }
                                            });




                                }// else polygon fill

        

        //...............ENd ........................................... highlight add geojson layer .................




    });
    // =========== End =====  mouse over event, show feature detail property in info-table ===============












    // -------------------- click event open a popup at the location of the feature -----------------------------

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: [_current_layer] });

        show_singlelayer_popup_when_click(features, e);
         

    }); // map on click


    // --------------------End -------------- click event open a popup at the location of the feature -----------------------------



}


function singlelayer_vector_highlight_layer(_area, _subject) {


    var _current_layer = _area + '_' + _subject;
    var _current_layer_highlight = _current_layer + '_highlight';


    _tileserver_url = _tileserver_base_url + _area + '/{z}/{x}/{y}.pbf';


    map.on('load', function () {

        map.addSource(_area, {

            type: 'vector',

            //url: 'mapbox://hoogw.0pywwk0d'


            "tiles": [
                        // 'http://localhost:10/tileserver/tileserver.php?/index.json?/city/{z}/{x}/{y}.pbf'

                        _tileserver_url
            ],
            "maxzoom": 22


        });




        //==================================   add layers to map ================

        add_singlelayer_to_map(_area, _current_layer);


        // here only add highlight layer, the common function add layer above.



        if (source_layer['all_layers'][_current_layer]['type'] === 'circle') {

            


            // ............... circle highlight layer .................................



            map.addLayer({
                "id": _current_layer_highlight,
                "type": 'circle',
                "source": _area,

                "source-layer": _current_layer,



                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_current_layer]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_current_layer]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_current_layer]['circle-blur'])
                },

                "filter": ["==", "uid", ""]




            });




        }//if point, circle

        else if (source_layer['all_layers'][_current_layer]['type'] === 'line') {

            


            // ............... line highlight layer .................................



            map.addLayer({
                "id": _current_layer_highlight,
                "type": "line",
                "source": _area,

                "source-layer": _current_layer,

                "layout": {
                    'visibility': 'visible',       // this property must be present in order for checkbox button menu work properly. 
                    "line-join": source_layer['all_layers'][_current_layer]['line-join'],
                    "line-cap": source_layer['all_layers'][_current_layer]['line-cap'],
                },
                "paint": {

                    "line-color": source_layer['all_layers'][_current_layer]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_current_layer]['line-width-highlight'])
                },

                "filter": ["==", "uid", ""]


            });



        }//else line


        else if (source_layer['all_layers'][_current_layer]['type'] === 'fill') {


            



            // ............... fill highlight layer .................................


            map.addLayer({
                'id': _current_layer_highlight,
                'type': 'fill',
                "source": _area,

                "source-layer": _current_layer,

                "layout": {
                    'visibility': 'visible'   // this property must be present in order for checkbox button menu work properly. 
                },

                'paint': {
                    'fill-color': source_layer['all_layers'][_current_layer]['fill-color-highlight'],
                    'fill-outline-color': source_layer['all_layers'][_current_layer]['fill-outline-color']
                    
                },

                "filter": ["==", "uid", ""]

            });







        }// else polygon fill



        //============End ==========================   add layers to map =========================================




    }); // map.on('style.load')






    // ===========   mouse over event, show feature detail property in info-table ===============
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: [_current_layer] });
       // var features_hightlight = map.queryRenderedFeatures(e.point, { layers: [_current_layer_highlight] });

        //  hand to pointer hand if there is features 
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';


        var instand_info_table = "";

        for (var i = 0; i < features.length; i++) {



            var element = features[i];





            var instant_info = "<br/><div><span>" + element.layer.id + "<ul>";

            for (var _key in element.properties) {
                var _value = String(element.properties[_key]);
                instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _key + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            }// for


            instant_info = instant_info + "</ul> </span></div>";


            instand_info_table = instand_info_table + instant_info;




            // because of this, not use common function
            //...................................... highlight feature ................................
            map.setFilter(element.layer.id + '_highlight', ["==", "uid", element.properties.uid]);


            //......................End of .......... highlight feature ................................







        }//for feature length


        // update bottom <div>
        document.getElementById("info-table").innerHTML = instand_info_table;




    });
    // =========== End =====  mouse over event, show feature detail property in info-table ===============












    // -------------------- click event open a popup at the location of the feature -----------------------------

    map.on('click', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: [_current_layer] });

        show_singlelayer_popup_when_click(features, e)

    }); // map on click


    // --------------------End -------------- click event open a popup at the location of the feature -----------------------------



}





//----------------------End ----  vectore tile  ------------------------------------












//------------------------ muiltilayer ------ muiltilayer---------- binding datatable with map feature  -------------------------------



function multilayer_property_tab(_area, _subject) {





    _source_layer_group_id = _area + '_' + _subject;




    // ..................   build tabs  .....................
    var _isFirstElement = true;
    var _tab_nav_li = '';
    var _tab_content_div = '';
    var _tab_content_id = '';

    for (var property in source_layer[_source_layer_group_id]) {
        if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {

            _tab_content_id = property.replace('_', '');

            if (_isFirstElement) {

                _tab_nav_li = '<li class="active"> <a href="#' + _tab_content_id + '" data-toggle="tab">' + property + '</a></li>';

                //_tab_content_div = '<div class="tab-pane fade in active" id="' + _tab_content_id + '"> <h4> ' + property + '</h4><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';
                _tab_content_div = '<div class="tab-pane fade in active" id="' + _tab_content_id + '"><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';

                _isFirstElement = false;
            }
            else {
                _tab_nav_li = '<li> <a href="#' + _tab_content_id + '" data-toggle="tab">' + property + '</a></li>';


                // must put "active" otherwise, datatable layout will be shrinked.
                //_tab_content_div = '<div class="tab-pane fade active" id="' + _tab_content_id + '"> <h4> ' + property + '</h4><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';
               // _tab_content_div = '<div class="tab-pane fade active" id="' + _tab_content_id + '"><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';
                _tab_content_div = '<div class="tab-pane fade " id="' + _tab_content_id + '"><div id="' + _tab_content_id + 'tbldiv"> </div>   </div>';
            }




            $("#feature_property_tab_navigation").append(_tab_nav_li);


            $("#feature_property_tab_content").append(_tab_content_div);



        }//if
    }//for

    // .................End ........   build tabs  .....................    




}





// ^^^^^^^^^^^^^^ tables  ^^^^^^^^^^^^^^^^^

function multilayer_rendered_paged_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);


    // **************  bug fix 1 ****************

    var _remove_class = true;
    // add active class to div 
    var _tab_id = '#' + _layer_name.replace('_', '');
    if ($(_tab_id).hasClass("active")) {
        _remove_class = false;
    }
    else {
        $(_tab_id).addClass('active');
    }


    // ***********End of ***  bug fix  1****************






    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';




       




    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    //$("#tableDiv").empty();
    $(_table_div_id).empty();

    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */

    //  alert(_table_div_id);


    $(_table_div_id).append('<table id="' + _layer_name.replace('_', '') + 'tbl' + '" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
    //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
    //$("#tableDiv").find("table thead tr").append(tableHeaders); 




    //  datatable
    //$('#tabledata').DataTable({
    $(_table_id).DataTable({
        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 
    var table = $(_table_id).DataTable();

    //$('#tabledata tbody').on('mouseover', 'td', function () 
    $(_table_id + ' tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................


        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    //$('#tabledata tbody').on('mouseout', 'td', function ()
    $(_table_id + ' tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out





    // **************  bug fix 2 ****************

    if (_remove_class) {
        $(_tab_id).removeClass('active');

    }
   


    // ***********End of ***  bug fix  2****************




}



function multilayer_rendered_scroller_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);

    // **************  bug fix 1 ****************

    var _remove_class = true;
    // add active class to div 
    var _tab_id = '#' + _layer_name.replace('_', '');
    if ($(_tab_id).hasClass("active")) {
        _remove_class = false;
    }
    else {
        $(_tab_id).addClass('active');
    }


    // ***********End of ***  bug fix  1****************


    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    //$("#tableDiv").empty();
    $(_table_div_id).empty();

    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */

    //  alert(_table_div_id);


    $(_table_div_id).append('<table id="' + _layer_name.replace('_', '') + 'tbl' + '" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
    //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
    //$("#tableDiv").find("table thead tr").append(tableHeaders); 




    //  datatable
    //$('#tabledata').DataTable({
    $(_table_id).DataTable({
        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        //"pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true,

        // ------------ scroller section --------     

        deferRender: true,
        scrollCollapse: true,
        scroller: true

        // ------------ scroller section end--------  



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 
    var table = $(_table_id).DataTable();

    //$('#tabledata tbody').on('mouseover', 'td', function () 
    $(_table_id + ' tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................


        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    //$('#tabledata tbody').on('mouseout', 'td', function ()
    $(_table_id + ' tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out



    // **************  bug fix 2 ****************

    if (_remove_class) {
        $(_tab_id).removeClass('active');

    }



    // ***********End of ***  bug fix  2****************




}




function multilayer_source_paged_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);



    // **************  bug fix 1 ****************

    var _remove_class = true;
    // add active class to div 
    var _tab_id = '#' + _layer_name.replace('_', '');
    if ($(_tab_id).hasClass("active")) {
        _remove_class = false;
    }
    else {
        $(_tab_id).addClass('active');
    }


    // ***********End of ***  bug fix  1****************




    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    //$("#tableDiv").empty();
    $(_table_div_id).empty();

    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */

    //  alert(_table_div_id);


    $(_table_div_id).append('<table id="' + _layer_name.replace('_', '') + 'tbl' + '" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
    //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
    //$("#tableDiv").find("table thead tr").append(tableHeaders); 




    //  datatable
    //$('#tabledata').DataTable({
    $(_table_id).DataTable({
        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true


        



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 
    var table = $(_table_id).DataTable();

    //$('#tabledata tbody').on('mouseover', 'td', function () 
    $(_table_id + ' tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................


        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    //$('#tabledata tbody').on('mouseout', 'td', function ()
    $(_table_id + ' tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out




    // ================ source feature property table when click  -- will fly to feature -------------------



    // click row event fly to on map 
    $(_table_id + ' tbody').on('click', 'tr', function () {



        //------ click select the row --------------
        if ($(this).hasClass('selected')) {
            //  $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //-------------------------------------





        //------------ get current row data uid  -------------------------                                              

        var _rowIdx = table.row(this).index();

        table.columns().every(function (cllmnIndex) {


            var _header_tag_node = table.column(cllmnIndex).header();

            var _column_nm = $(_header_tag_node).html();



            if (_column_nm === 'uid') {
                _feature_uid = table.cell(_rowIdx, cllmnIndex).data();
            }// if uid 

        });// loop through each column for that specific row

        //-----------------end of get current row data uid ------------------------------------------------------  







        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _feature_uid) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................







        // +++++++++++++++++++++  fly to added geojson feature   +++++++++++++++++++++++++++

        var _first_lat;
        var _first_lng;

        if (element.geometry.type === 'Polygon') {

            _first_lng = element.geometry.coordinates[0][0][0];
            _first_lat = element.geometry.coordinates[0][0][1];
        }
        else if (element.geometry.type === 'LineString') {

            _first_lng = element.geometry.coordinates[0][0];
            _first_lat = element.geometry.coordinates[0][1];


        }
        else if (element.geometry.type === 'Point') {


            _first_lng = element.geometry.coordinates[0];
            _first_lat = element.geometry.coordinates[1];

        }


        map.flyTo({
            center: [_first_lng, _first_lat],
            zoom: 17,
            speed: 1.2,
            curve: 1,
            easing: function (t) {
                return t;
            }
        });


        // +++++++++++++++++++++++ End of fly to added geojson feature +++++++++++++++


    }); // click cell event  



    // ===================== End ============= source feature property table when click  -- will fly to feature -------------------



    // **************  bug fix 2 ****************

    if (_remove_class) {
        $(_tab_id).removeClass('active');

    }



    // ***********End of ***  bug fix  2****************




}


function multilayer_source_scroller_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);



    // **************  bug fix 1 ****************

    var _remove_class = true;
    // add active class to div 
    var _tab_id = '#' + _layer_name.replace('_', '');
    if ($(_tab_id).hasClass("active")) {
        _remove_class = false;
    }
    else {
        $(_tab_id).addClass('active');
    }


    // ***********End of ***  bug fix  1****************




    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    //$("#tableDiv").empty();
    $(_table_div_id).empty();

    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */

    //  alert(_table_div_id);


    $(_table_div_id).append('<table id="' + _layer_name.replace('_', '') + 'tbl' + '" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
    //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
    //$("#tableDiv").find("table thead tr").append(tableHeaders); 




    //  datatable
    //$('#tabledata').DataTable({
    $(_table_id).DataTable({
        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        //"pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true,


        // ------------ scroller section --------     

        deferRender: true,
        scrollCollapse: true,
        scroller: true

        // ------------ scroller section end--------  



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 
    var table = $(_table_id).DataTable();

    //$('#tabledata tbody').on('mouseover', 'td', function () 
    $(_table_id + ' tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................


        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    //$('#tabledata tbody').on('mouseout', 'td', function ()
    $(_table_id + ' tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out




      // ================ source feature property table when click  -- will fly to feature -------------------



    // click row event fly to on map 
    $(_table_id + ' tbody').on('click', 'tr', function () {



        //------ click select the row --------------
        if ($(this).hasClass('selected')) {
            //  $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //-------------------------------------





        //------------ get current row data uid  -------------------------                                              

        var _rowIdx = table.row(this).index();

        table.columns().every(function (cllmnIndex) {
            

            var _header_tag_node = table.column(cllmnIndex).header();

            var _column_nm = $(_header_tag_node).html();

           

            if (_column_nm === 'uid') {
                _feature_uid = table.cell(_rowIdx, cllmnIndex).data();
            }// if uid 

        });// loop through each column for that specific row

        //-----------------end of get current row data uid ------------------------------------------------------  


      




                            //.............................................................. highlight add geojson layer ..............................................................

                            // loop through all element of the features array, find the one with uid = _u_ID


                            var features = [];
                            var element = null;
                            for (var i = 0; i < _features_array.length; i++) {
                                element = _features_array[i];
                                if (element.properties.uid === _feature_uid) {

                                    features.push(element);
                                    break;
                                } // if
                            }// for




                            var _highlight_features_geojson = {
                                "type": "FeatureCollection",
                                "features": features

                            }



                            // remove last time highlight source and layer
                            if (highlight_geojson_source) {

                                map.removeSource("highlight_geojson");
                                map.removeLayer('highlight_geojson_layer');

                            }//if


                            // add current new highlight source
                            highlight_geojson_source = map.addSource("highlight_geojson", {
                                "type": "geojson",
                                "data": _highlight_features_geojson

                            });




                            // add current new highlight layer
                            if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

                                highlight_geojson_layer = map.addLayer({
                                    'id': 'highlight_geojson_layer',
                                    'type': 'circle',
                                    'source': 'highlight_geojson',

                                    "layout": {
                                        'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                                    },

                                    "paint": {
                                        "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                                        "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                                        "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                                    }
                                });





                            }//if point, circle

                            else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


                                highlight_geojson_layer = map.addLayer({
                                    'id': 'highlight_geojson_layer',
                                    'type': 'line',
                                    'source': 'highlight_geojson',
                                    'layout': {},
                                    'paint': {

                                        "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                                        "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                                    }
                                });



                            }//else line


                            else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


                                highlight_geojson_layer = map.addLayer({
                                    'id': 'highlight_geojson_layer',
                                    'type': 'fill',
                                    'source': 'highlight_geojson',
                                    'layout': {},
                                    'paint': {
                                        'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                                    }
                                });




                            }// else polygon fill



                            //...............ENd ........................................... highlight add geojson layer .................







                        // +++++++++++++++++++++  fly to added geojson feature   +++++++++++++++++++++++++++

                        var _first_lat;
                        var _first_lng;

                        if (element.geometry.type === 'Polygon') {

                            _first_lng = element.geometry.coordinates[0][0][0];
                            _first_lat = element.geometry.coordinates[0][0][1];
                        }
                        else if (element.geometry.type === 'LineString') {

                            _first_lng = element.geometry.coordinates[0][0];
                            _first_lat = element.geometry.coordinates[0][1];


                        }
                        else if (element.geometry.type === 'Point') {


                            _first_lng = element.geometry.coordinates[0];
                            _first_lat = element.geometry.coordinates[1];

                        }

           
                        map.flyTo({
                            center: [_first_lng, _first_lat],
                            zoom: 17,
                            speed: 1.2,
                            curve: 1,
                            easing: function (t) {
                                return t;
                            }
                        });


                        // +++++++++++++++++++++++ End of fly to added geojson feature +++++++++++++++


               }); // click cell event  



    // ===================== End ============= source feature property table when click  -- will fly to feature -------------------


    // **************  bug fix 2 ****************

    if (_remove_class) {
        $(_tab_id).removeClass('active');

    }



    // ***********End of ***  bug fix  2****************




}










 //  ^^^^^^^^^^ binding ^^^^^^^^^^^^^^^^^^^^^^^

function multilayer_rendered_feature_binding_paged_property_table() {


    // only first time load map data need this event. 
    //map.on('render', function () {

    //    _rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });

    //   //  alert(_rendered_features.length);

    //    if (_rendered_features.length > 0) {
    //        populate_property_tables('city_address', _rendered_features);

    //    }
    //});





    map.on('moveend', function () {



        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {





                //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
                _rendered_features = map.queryRenderedFeatures({ layers: [property] });

                //  alert(_rendered_features.length);

                if (_rendered_features.length > 0) {
                    //populate_property_tables('city_address', _rendered_features);
                    multilayer_rendered_paged_property_tables(property, _rendered_features);

                }//if 





            }//if
        }//for







    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        //  map.off('render');


    }, 2000);




}



function multilayer_source_feature_binding_paged_property_table(_sourceId) {



    map.on('moveend', function () {



        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {





                //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
                _source_features = map.querySourceFeatures(_sourceId, { sourceLayer: [property] });

               

                if (_source_features.length > 0) {
                    //populate_property_tables('city_address', _rendered_features);
                    multilayer_source_paged_property_tables(property, _source_features);

                }//if 





            }//if
        }//for







    }); // moveend






    setTimeout(function () {


        map.fire('moveend');

        map.off('moveend');


    }, 2000);
   


}



function multilayer_rendered_feature_binding_scroller_property_table() {


    // only first time load map data need this event. 
    //map.on('render', function () {

    //    _rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });

    //   //  alert(_rendered_features.length);

    //    if (_rendered_features.length > 0) {
    //        populate_property_tables('city_address', _rendered_features);

    //    }
    //});





    map.on('moveend', function () {



        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {





                //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
                _rendered_features = map.queryRenderedFeatures({ layers: [property] });

                //  alert(_rendered_features.length);

                if (_rendered_features.length > 0) {
                    //populate_property_tables('city_address', _rendered_features);
                    multilayer_rendered_scroller_property_tables(property, _rendered_features);

                }//if 





            }//if
        }//for







    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        //  map.off('render');


    }, 2000);




}



function multilayer_source_feature_binding_scroller_property_table(_sourceId) {



    map.on('moveend', function () {



        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {





                //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
                _source_features = map.querySourceFeatures(_sourceId, { sourceLayer: [property] });



                if (_source_features.length > 0) {
                    //populate_property_tables('city_address', _rendered_features);
                    multilayer_source_scroller_property_tables(property, _source_features);

                }//if 





            }//if
        }//for







    }); // moveend






    setTimeout(function () {


        map.fire('moveend');

        map.off('moveend');


    }, 2000);



}



//------------------------end muiltilayer-------------- End of binding datatable with map ------------------------------------







//----------------- single layer ---------- binding datatable with map feature  -------------------------------








                 // ^^^^^^^^^^^^^^^^^^^^ table  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// ^^^^^^^^^^^^^^^^^^^^  rendered table (only mouse over highlight, when click no flyto)  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

function singlelayer_rendered_paged_highlight_layer_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);

    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    $("#tableDiv").empty();
   

    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */

   

      $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
    




    //  datatable
    $('#tabledata').DataTable({
   
        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 
   

    var table = $('#tabledata').DataTable();
                            
    $('#tabledata tbody').on('mouseover', 'td', function () 

      {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);



                //...................................... highlight feature layer................................
                map.setFilter(element.layer.id + '_highlight', ["==", "uid", element.properties.uid]);


                //......................End of .......... highlight feature ................................




                break;
            } // if
        }// for





        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    $('#tabledata tbody').on('mouseout', 'td', function ()
     {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out






}


function singlelayer_rendered_scroller_highlight_layer_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);


    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';



    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    $("#tableDiv").empty();


    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */



    $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');





    //  datatable
    $('#tabledata').DataTable({

        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


       // "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true,

        // ------------ scroller section --------     

        deferRender: true,
        scrollCollapse: true,
        scroller: true

        // ------------ scroller section end--------  



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 


    var table = $('#tabledata').DataTable();

    $('#tabledata tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);



                //...................................... highlight feature layer................................
                map.setFilter(element.layer.id + '_highlight', ["==", "uid", element.properties.uid]);


                //......................End of .......... highlight feature ................................




                break;
            } // if
        }// for





        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    $('#tabledata tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out






}



function singlelayer_rendered_paged_highlight_geojson_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);

    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    $("#tableDiv").empty();


    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */



    $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');





    //  datatable
    $('#tabledata').DataTable({

        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 


    var table = $('#tabledata').DataTable();

    $('#tabledata tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................


        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    $('#tabledata tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out






}


function singlelayer_rendered_scroller_highlight_geojson_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);

    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    $("#tableDiv").empty();


    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */



    $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');





    //  datatable
    $('#tabledata').DataTable({

        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


       // "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true,

        // ------------ scroller section --------     

        deferRender: true,
    scrollCollapse: true,
    scroller: true

    // ------------ scroller section end--------  



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 


    var table = $('#tabledata').DataTable();

    $('#tabledata tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................


        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    $('#tabledata tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out






}


//    ^^^^^^^^^^^^^^^^ sourced table (can click fly to ) ^^^^^^^^^^^^^^^^^^^^^^

function singlelayer_source_paged_highlight_layer_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);

    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    $("#tableDiv").empty();


    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */



    $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');





    //  datatable
    $('#tabledata').DataTable({

        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 


    var table = $('#tabledata').DataTable();

    $('#tabledata tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);



                //...................................... highlight feature layer................................
                map.setFilter(_layer_name + '_highlight', ["==", "uid", element.properties.uid]);


                //......................End of .......... highlight feature ................................




                break;
            } // if
        }// for





        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    $('#tabledata tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out







    // ================ source feature property table when click  -- will fly to feature -------------------



    // click row event fly to on map 
    $('#tabledata tbody').on('click', 'tr', function () {



        //------ click select the row --------------
        if ($(this).hasClass('selected')) {
            //  $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //-------------------------------------





        //------------ get current row data uid  -------------------------                                              

        var _rowIdx = table.row(this).index();

        table.columns().every(function (cllmnIndex) {


            var _header_tag_node = table.column(cllmnIndex).header();

            var _column_nm = $(_header_tag_node).html();



            if (_column_nm === 'uid') {
                _feature_uid = table.cell(_rowIdx, cllmnIndex).data();
            }// if uid 

        });// loop through each column for that specific row

        //-----------------end of get current row data uid ------------------------------------------------------  







        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _feature_uid) {

                features.push(element);

                //...................................... highlight feature layer................................
                map.setFilter(_layer_name + '_highlight', ["==", "uid", element.properties.uid]);


                //......................End of .......... highlight feature ................................

               







        //...............ENd ........................................... highlight add geojson layer .................







        // +++++++++++++++++++++  fly to added geojson feature   +++++++++++++++++++++++++++

        var _first_lat;
        var _first_lng;

        if (element.geometry.type === 'Polygon') {

            _first_lng = element.geometry.coordinates[0][0][0];
            _first_lat = element.geometry.coordinates[0][0][1];
        }
        else if (element.geometry.type === 'LineString') {

            _first_lng = element.geometry.coordinates[0][0];
            _first_lat = element.geometry.coordinates[0][1];


        }
        else if (element.geometry.type === 'Point') {


            _first_lng = element.geometry.coordinates[0];
            _first_lat = element.geometry.coordinates[1];

        }


        map.flyTo({
            center: [_first_lng, _first_lat],
            zoom: 17,
            speed: 1.2,
            curve: 1,
            easing: function (t) {
                return t;
            }
        });


        // +++++++++++++++++++++++ End of fly to added geojson feature +++++++++++++++



        break;
    } // if
}// for


    }); // click cell event  



    // ===================== End ============= source feature property table when click  -- will fly to feature -------------------




}

function singlelayer_source_scroller_highlight_layer_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);

    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    $("#tableDiv").empty();


    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */



    $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');





    //  datatable
    $('#tabledata').DataTable({

        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        //"pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true,

        // ------------ scroller section --------     

        deferRender: true,
        scrollCollapse: true,
        scroller: true

        // ------------ scroller section end--------  



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 


    var table = $('#tabledata').DataTable();

    $('#tabledata tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);



                //...................................... highlight feature layer................................
                map.setFilter(_layer_name + '_highlight', ["==", "uid", element.properties.uid]);


                //......................End of .......... highlight feature ................................




                break;
            } // if
        }// for





        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    $('#tabledata tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out







    // ================ source feature property table when click  -- will fly to feature -------------------



    // click row event fly to on map 
    $('#tabledata tbody').on('click', 'tr', function () {



        //------ click select the row --------------
        if ($(this).hasClass('selected')) {
            //  $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //-------------------------------------





        //------------ get current row data uid  -------------------------                                              

        var _rowIdx = table.row(this).index();

        table.columns().every(function (cllmnIndex) {


            var _header_tag_node = table.column(cllmnIndex).header();

            var _column_nm = $(_header_tag_node).html();



            if (_column_nm === 'uid') {
                _feature_uid = table.cell(_rowIdx, cllmnIndex).data();
            }// if uid 

        });// loop through each column for that specific row

        //-----------------end of get current row data uid ------------------------------------------------------  







        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _feature_uid) {

                features.push(element);

                //...................................... highlight feature layer................................
                map.setFilter(_layer_name + '_highlight', ["==", "uid", element.properties.uid]);


                //......................End of .......... highlight feature ................................









                //...............ENd ........................................... highlight add geojson layer .................







                // +++++++++++++++++++++  fly to added geojson feature   +++++++++++++++++++++++++++

                var _first_lat;
                var _first_lng;

                if (element.geometry.type === 'Polygon') {

                    _first_lng = element.geometry.coordinates[0][0][0];
                    _first_lat = element.geometry.coordinates[0][0][1];
                }
                else if (element.geometry.type === 'LineString') {

                    _first_lng = element.geometry.coordinates[0][0];
                    _first_lat = element.geometry.coordinates[0][1];


                }
                else if (element.geometry.type === 'Point') {


                    _first_lng = element.geometry.coordinates[0];
                    _first_lat = element.geometry.coordinates[1];

                }


                map.flyTo({
                    center: [_first_lng, _first_lat],
                    zoom: 17,
                    speed: 1.2,
                    curve: 1,
                    easing: function (t) {
                        return t;
                    }
                });


                // +++++++++++++++++++++++ End of fly to added geojson feature +++++++++++++++



                break;
            } // if
        }// for


    }); // click cell event  



    // ===================== End ============= source feature property table when click  -- will fly to feature -------------------




}




function singlelayer_source_paged_highlight_geojson_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);

    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    $("#tableDiv").empty();


    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */



    $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');





    //  datatable
    $('#tabledata').DataTable({

        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        "pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 


    var table = $('#tabledata').DataTable();

    $('#tabledata tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................


        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    $('#tabledata tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out







    // ================ source feature property table when click  -- will fly to feature -------------------



    // click row event fly to on map 
    $('#tabledata tbody').on('click', 'tr', function () {



        //------ click select the row --------------
        if ($(this).hasClass('selected')) {
            //  $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //-------------------------------------





        //------------ get current row data uid  -------------------------                                              

        var _rowIdx = table.row(this).index();

        table.columns().every(function (cllmnIndex) {


            var _header_tag_node = table.column(cllmnIndex).header();

            var _column_nm = $(_header_tag_node).html();



            if (_column_nm === 'uid') {
                _feature_uid = table.cell(_rowIdx, cllmnIndex).data();
            }// if uid 

        });// loop through each column for that specific row

        //-----------------end of get current row data uid ------------------------------------------------------  







        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _feature_uid) {

                features.push(element);

              
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill

        //----------------------------- end of highlight geojson -----------------------------------




                // +++++++++++++++++++++  fly to added geojson feature   +++++++++++++++++++++++++++

                var _first_lat;
                var _first_lng;

                if (element.geometry.type === 'Polygon') {

                    _first_lng = element.geometry.coordinates[0][0][0];
                    _first_lat = element.geometry.coordinates[0][0][1];
                }
                else if (element.geometry.type === 'LineString') {

                    _first_lng = element.geometry.coordinates[0][0];
                    _first_lat = element.geometry.coordinates[0][1];


                }
                else if (element.geometry.type === 'Point') {


                    _first_lng = element.geometry.coordinates[0];
                    _first_lat = element.geometry.coordinates[1];

                }


                map.flyTo({
                    center: [_first_lng, _first_lat],
                    zoom: 17,
                    speed: 1.2,
                    curve: 1,
                    easing: function (t) {
                        return t;
                    }
                });


                // +++++++++++++++++++++++ End of fly to added geojson feature +++++++++++++++



              


    }); // click cell event  



    // ===================== End ============= source feature property table when click  -- will fly to feature -------------------




}



function singlelayer_source_scroller_highlight_geojson_property_tables(_layer_name, _features_array) {

    // alert(_features_array.length);

    var _table_div_id = '#' + _layer_name.replace('_', '') + 'tbldiv';
    var _table_id = '#' + _layer_name.replace('_', '') + 'tbl';


    // get the key [column name]
    var _properties = _features_array[0].properties;




    var tableHeaders = "";
    $("#tableDiv").empty();


    /* 
     var _column_def = [
                                                { data : 'properties.LANDNAME' },
                                                { data: 'properties.ID' },
                                                { data: 'properties.COUNTY' },
                                                { data: 'properties.CFCC' }
                                            ];
    */
    _dt_columns_count[_table_id] = 0;
    var _column_def = [];
    var _column0 = {};
    /*
     _column0['data'] = 'properties.LANDNAME';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.ID';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.COUNTY';
     _column_def.push(_column0);
     _column0 = {};
     _column0['data'] = 'properties.CFCC';
     _column_def.push(_column0);
    */

    Object.keys(_properties).forEach(function (k) {


        tableHeaders += "<th>" + k + "</th>";

        // build column.data def
        _column0 = {};
        _column0['data'] = 'properties.' + k;

        //---------- hide last uid column ---------
        //if (k === 'uid') {

        //    _column0['visible'] = false;

        //}
        //--------------------------------------------------------


        _column_def.push(_column0);

        _dt_columns_count[_table_id] = _dt_columns_count[_table_id] + 1;


    }); // object key

    /* define last column as geo feaure ID
    tableHeaders += "<th> Geo.Feature.ID</th>";   
    _column0 = {};
    _column0['data'] = '_id.$id';
    _column_def.push(_column0); 
    */



    $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');





    //  datatable
    $('#tabledata').DataTable({

        // must put destroy:true, to destroy last time old datatable initialization, before put new initialization
        destroy: true,
        data: _features_array,


        columns: _column_def,


        //"pagingType": "full_numbers",

        // resize the datatables height here scrollY:150,   
        scrollY: 200,
        scrollX: true,

        // ------------ scroller section --------     

        deferRender: true,
        scrollCollapse: true,
        scroller: true

        // ------------ scroller section end--------  



    }); // datatable





    //  mouseover row event show corespoinding data.feature[] on map 


    var table = $('#tabledata').DataTable();

    $('#tabledata tbody').on('mouseover', 'td', function () {


        var instant_info = "<ul>";

        var colIdx = table.cell(this).index().column;

        var rowIdx = table.cell(this).index().row;

        var _u_ID = table.cell(rowIdx, _dt_columns_count[_table_id] - 1).data();





        // -----------Mapbox GL  --------------





        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _u_ID) {

                features.push(element);
                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill



        //...............ENd ........................................... highlight add geojson layer .................


        //------------ end of Mapbox GL ----------------





        table.columns().every(function (cllmnIndex) {
            // alert(table.cell(rowIdx, cllmnIndex ).data());

            var _property = table.column(cllmnIndex).header();
            var _value = table.cell(rowIdx, cllmnIndex).data();

            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

            instant_info = instant_info + "</ul>";

        });// loop through each column for that specific row

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;





    }); // mouse over   





    $('#tabledata tbody').on('mouseout', 'td', function () {



        // remove last time highlight source and layer
        //if (highlight_geojson_source) {

        //    map.removeSource("highlight_geojson");
        //    map.removeLayer('highlight_geojson_layer');

        //}//if




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
    }); // mouse out







    // ================ source feature property table when click  -- will fly to feature -------------------



    // click row event fly to on map 
    $('#tabledata tbody').on('click', 'tr', function () {



        //------ click select the row --------------
        if ($(this).hasClass('selected')) {
            //  $(this).removeClass('selected');
        }
        else {
            table.$('tr.selected').removeClass('selected');
            $(this).addClass('selected');
        }
        //-------------------------------------





        //------------ get current row data uid  -------------------------                                              

        var _rowIdx = table.row(this).index();

        table.columns().every(function (cllmnIndex) {


            var _header_tag_node = table.column(cllmnIndex).header();

            var _column_nm = $(_header_tag_node).html();



            if (_column_nm === 'uid') {
                _feature_uid = table.cell(_rowIdx, cllmnIndex).data();
            }// if uid 

        });// loop through each column for that specific row

        //-----------------end of get current row data uid ------------------------------------------------------  







        //.............................................................. highlight add geojson layer ..............................................................

        // loop through all element of the features array, find the one with uid = _u_ID


        var features = [];
        var element = null;
        for (var i = 0; i < _features_array.length; i++) {
            element = _features_array[i];
            if (element.properties.uid === _feature_uid) {

                features.push(element);


                break;
            } // if
        }// for




        var _highlight_features_geojson = {
            "type": "FeatureCollection",
            "features": features

        }



        // remove last time highlight source and layer
        if (highlight_geojson_source) {

            map.removeSource("highlight_geojson");
            map.removeLayer('highlight_geojson_layer');

        }//if


        // add current new highlight source
        highlight_geojson_source = map.addSource("highlight_geojson", {
            "type": "geojson",
            "data": _highlight_features_geojson

        });




        // add current new highlight layer
        if (source_layer['all_layers'][_layer_name]['type'] === 'circle') {

            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'circle',
                'source': 'highlight_geojson',

                "layout": {
                    'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                },

                "paint": {
                    "circle-color": source_layer['all_layers'][_layer_name]['circle-color-highlight'],
                    "circle-radius": parseInt(source_layer['all_layers'][_layer_name]['circle-radius-highlight']),
                    "circle-blur": parseInt(source_layer['all_layers'][_layer_name]['circle-blur'])
                }
            });





        }//if point, circle

        else if (source_layer['all_layers'][_layer_name]['type'] === 'line') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'line',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {

                    "line-color": source_layer['all_layers'][_layer_name]['line-color'],
                    "line-width": parseInt(source_layer['all_layers'][_layer_name]['line-width-highlight'])


                }
            });



        }//else line


        else if (source_layer['all_layers'][_layer_name]['type'] === 'fill') {


            highlight_geojson_layer = map.addLayer({
                'id': 'highlight_geojson_layer',
                'type': 'fill',
                'source': 'highlight_geojson',
                'layout': {},
                'paint': {
                    'fill-color': source_layer['all_layers'][_layer_name]['fill-color-highlight']

                }
            });




        }// else polygon fill

        //----------------------------- end of highlight geojson -----------------------------------




        // +++++++++++++++++++++  fly to added geojson feature   +++++++++++++++++++++++++++

        var _first_lat;
        var _first_lng;

        if (element.geometry.type === 'Polygon') {

            _first_lng = element.geometry.coordinates[0][0][0];
            _first_lat = element.geometry.coordinates[0][0][1];
        }
        else if (element.geometry.type === 'LineString') {

            _first_lng = element.geometry.coordinates[0][0];
            _first_lat = element.geometry.coordinates[0][1];


        }
        else if (element.geometry.type === 'Point') {


            _first_lng = element.geometry.coordinates[0];
            _first_lat = element.geometry.coordinates[1];

        }


        map.flyTo({
            center: [_first_lng, _first_lat],
            zoom: 17,
            speed: 1.2,
            curve: 1,
            easing: function (t) {
                return t;
            }
        });


        // +++++++++++++++++++++++ End of fly to added geojson feature +++++++++++++++






    }); // click cell event  



    // ===================== End ============= source feature property table when click  -- will fly to feature -------------------




}




//******************************************** binding *********************************************************************************************************************

//^^^^^^^^^^^^^^^^^^^ bingding ^^^^^^^^^^^^^^^^ highlight_layer  ^^^^^^^^

function singlelayer_rendered_feature_binding_paged_highlight_layer_property_table(_currentlayer) {


    // only first time load map data need this event. 
    //map.on('render', function () {

    //    _rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });

    //   //  alert(_rendered_features.length);

    //    if (_rendered_features.length > 0) {
    //        populate_property_tables('city_address', _rendered_features);

    //    }
    //});





    map.on('moveend', function () {






                //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
                _rendered_features = map.queryRenderedFeatures({ layers: [_currentlayer] });

                //  alert(_rendered_features.length);

                if (_rendered_features.length > 0) {
                    //populate_property_tables('city_address', _rendered_features);
                    singlelayer_rendered_paged_highlight_layer_property_tables(_currentlayer, _rendered_features);

                }//if 









    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        //  map.off('render');


    }, 2000);




}



function singlelayer_source_feature_binding_paged_highlight_layer_property_table(_sourceId, _currentlayer) {





    map.on('moveend', function () {


        
        _source_features = map.querySourceFeatures(_sourceId, { sourceLayer: [_currentlayer] });

        //alert(_source_features.length);

        if (_source_features.length > 0) {
            //populate_property_tables('city_address', _rendered_features);
            singlelayer_source_paged_highlight_layer_property_tables(_currentlayer, _source_features);

        }//if 









    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        map.off('moveend');


    }, 2000);




}



function singlelayer_rendered_feature_binding_scroller_highlight_layer_property_table(_currentlayer) {


    // only first time load map data need this event. 
    //map.on('render', function () {

    //    _rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });

    //   //  alert(_rendered_features.length);

    //    if (_rendered_features.length > 0) {
    //        populate_property_tables('city_address', _rendered_features);

    //    }
    //});





    map.on('moveend', function () {






        //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
        _rendered_features = map.queryRenderedFeatures({ layers: [_currentlayer] });

        //  alert(_rendered_features.length);

        if (_rendered_features.length > 0) {
            //populate_property_tables('city_address', _rendered_features);
            singlelayer_rendered_scroller_highlight_layer_property_tables(_currentlayer, _rendered_features);

        }//if 









    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        //  map.off('render');


    }, 2000);




}



function singlelayer_source_feature_binding_scroller_highlight_layer_property_table(_sourceId, _currentlayer) {





    map.on('moveend', function () {



        _source_features = map.querySourceFeatures(_sourceId, { sourceLayer: [_currentlayer] });



        if (_source_features.length > 0) {
            //populate_property_tables('city_address', _rendered_features);
            singlelayer_source_scroller_highlight_layer_property_tables(_currentlayer, _source_features);

        }//if 









    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        map.off('moveend');


    }, 2000);




}



//^^^^^^^^^^^^^^^^^^^ bingding ^^^^^^^^^^^^^^^^ highlight_geojson  ^^^^^^^^



function singlelayer_rendered_feature_binding_paged_highlight_geojson_property_table(_currentlayer) {


  





    map.on('moveend', function () {






        //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
        _rendered_features = map.queryRenderedFeatures({ layers: [_currentlayer] });

        //  alert(_rendered_features.length);

        if (_rendered_features.length > 0) {
            //populate_property_tables('city_address', _rendered_features);
            singlelayer_rendered_paged_highlight_geojson_property_tables(_currentlayer, _rendered_features);

        }//if 









    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        //  map.off('render');


    }, 2000);




}


function singlelayer_source_feature_binding_paged_highlight_geojson_property_table(_sourceId, _currentlayer) {





    map.on('moveend', function () {

                               

       
        _source_features = map.querySourceFeatures(_sourceId, { sourceLayer: [_currentlayer] });


        //alert(_source_features.length);

        if (_source_features.length > 0) {
            //populate_property_tables('city_address', _rendered_features);
            singlelayer_source_paged_highlight_geojson_property_tables(_currentlayer, _source_features);

        }//if 









    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        map.off('moveend');


    }, 2000);




}



function singlelayer_rendered_feature_binding_scroller_highlight_geojson_property_table(_currentlayer) {


    // only first time load map data need this event. 
    //map.on('render', function () {

    //    _rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });

    //   //  alert(_rendered_features.length);

    //    if (_rendered_features.length > 0) {
    //        populate_property_tables('city_address', _rendered_features);

    //    }
    //});





    map.on('moveend', function () {






        //_rendered_features = map.queryRenderedFeatures({ layers: ['city_address'] });
        _rendered_features = map.queryRenderedFeatures({ layers: [_currentlayer] });

        //  alert(_rendered_features.length);

        if (_rendered_features.length > 0) {
            //populate_property_tables('city_address', _rendered_features);
            singlelayer_rendered_scroller_highlight_geojson_property_tables(_currentlayer, _rendered_features);

        }//if 









    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        //  map.off('render');


    }, 2000);




}



function singlelayer_source_feature_binding_scroller_highlight_geojson_property_table(_sourceId, _currentlayer) {





    map.on('moveend', function () {



        _source_features = map.querySourceFeatures(_sourceId, { sourceLayer: [_currentlayer] });



        if (_source_features.length > 0) {
            //populate_property_tables('city_address', _rendered_features);
            singlelayer_source_scroller_highlight_geojson_property_tables(_currentlayer, _source_features);

        }//if 









    }); // moveend







    // this is first time and one time trigger moveend event to load property table data. this temperary fix
    setTimeout(function () {


        map.fire('moveend');

        map.off('moveend');


    }, 2000);




}










//-----------------End -------------- single layer ---------- binding datatable with map feature  -------------------------------





//################## NOT IN USE ################################

// no highlight
function init_vector_multilayer(_area, _subject) {


    // alert('add vector tile');



    _source_layer_group_id = _area + '_' + _subject;



    //.................  object to array for id and id_highlight .......................


    source_layer_id = Object.keys(source_layer[_source_layer_group_id]);


    for (var j = 0; j < source_layer_id.length; j++) {
        source_layer_id_highlight.push(source_layer_id[j] + '_highlight');

    }

    //.................  End .............object to array for id and id_highlight .......................




    //_tileserver_base_url = 'http://vectortile.transparentgov.net/'; // NOT work,with error No 'Access-Control-Allow-Origin' header is present on the requested resource
    //   _tileserver_base_url = 'http://166.62.80.50:10/tileserver/tileserver.php?/index.json?/'; // must use this

    // _tileserver_url = 'http://localhost:10/tileserver/tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';
    //   _tileserver_url = _tileserver_base_url + 'tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';


    _tileserver_url = _tileserver_base_url + _area + '/{z}/{x}/{y}.pbf';

    //  alert(_tileserver_url);

    //  map.on('style.load', function () {    // if not use style, should NOT use 'style.load' will cause not load vector tile problem, should use 'load' event
    _map_on_load = map.on('load', function () {

        map.addSource(_area, {

            type: 'vector',

            //url: 'mapbox://hoogw.0pywwk0d'


            "tiles": [
                        // 'http://localhost:10/tileserver/tileserver.php?/index.json?/city/{z}/{x}/{y}.pbf'

                        _tileserver_url
            ],
            "maxzoom": 22


        });




        //==================================   add layers to map ================



        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {

                var _highlight_id = property + '_highlight';

                //alert(property);

                if (source_layer[_source_layer_group_id][property]['type'] === 'circle') {

                    map.addLayer({
                        "id": property,
                        "type": 'circle',
                        "source": _area,

                        "source-layer": property,



                        "layout": {
                            'visibility': 'visible'             // this property must be present in order for checkbox button menu work properly. 
                        },

                        "paint": {
                            "circle-color": source_layer[_source_layer_group_id][property]['circle-color'],
                            "circle-radius": parseInt(source_layer[_source_layer_group_id][property]['circle-radius']),
                            "circle-blur": parseInt(source_layer[_source_layer_group_id][property]['circle-blur'])
                        },
                    });





                }//if point, circle

                else if (source_layer[_source_layer_group_id][property]['type'] === 'line') {

                    map.addLayer({
                        "id": property,
                        "type": "line",
                        "source": _area,

                        "source-layer": property,

                        "layout": {
                            'visibility': 'visible',       // this property must be present in order for checkbox button menu work properly. 
                            "line-join": source_layer[_source_layer_group_id][property]['line-join'],
                            "line-cap": source_layer[_source_layer_group_id][property]['line-cap'],
                        },
                        "paint": {

                            "line-color": source_layer[_source_layer_group_id][property]['line-color'],
                            "line-width": parseInt(source_layer[_source_layer_group_id][property]['line-width'])
                        }
                    });






                }//else line


                else if (source_layer[_source_layer_group_id][property]['type'] === 'fill') {


                    map.addLayer({
                        'id': property,
                        'type': 'fill',
                        "source": _area,

                        "source-layer": property,

                        "layout": {
                            'visibility': 'visible'   // this property must be present in order for checkbox button menu work properly. 
                        },

                        'paint': {
                            'fill-color': source_layer[_source_layer_group_id][property]['fill-color'],
                            'fill-outline-color': source_layer[_source_layer_group_id][property]['fill-outline-color']
                            // "fill-opacity": 0
                        }
                    });








                }// else polygon fill


                // for testing sample "hide show layer"
                // addLayer(property, property);



            }//if 
        }// for 


        //============End ==========================   add layers to map =========================================





    }); // map.on('load')






    // ===========   mouse over event, show feature detail property in info-table ===============
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point, { layers: source_layer_id });
        // var features_hightlight  = map.queryRenderedFeatures(e.point, { layers: source_layer_id_highlight });

        //  hand to pointer hand if there is features 
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';


        var instand_info_table = "";

        for (var i = 0; i < features.length; i++) {



            var element = features[i];



            // filter only display our feature, not base map feature.

            if (element.layer.id in source_layer[_source_layer_group_id]) {

                var instant_info = "<br/><div><span>" + element.layer.id + "<ul>";

                for (var _key in element.properties) {
                    var _value = String(element.properties[_key]);
                    instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _key + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

                }// for


                instant_info = instant_info + "</ul> </span></div>";


                instand_info_table = instand_info_table + instant_info;
            }// if filter









        }//for feature length


        // update bottom <div>
        document.getElementById("info-table").innerHTML = instand_info_table;













    });
    // =========== End =====  mouse over event, show feature detail property in info-table ===============












    // -------------------- click event open a popup at the location of the feature -----------------------------

    map.on('click', function (e) {
        //var features = map.queryRenderedFeatures(e.point);
        var features = map.queryRenderedFeatures(e.point, { layers: source_layer_id });


        if (!features.length) {
            return;
        }

        var _not_popup = false;

        var _popup_html = "<div style='width:180px; height:120px;text-align: center; overflow-x:scroll; overflow-y:scroll; overflow:auto;'><table >";

        for (var j = 0; j < features.length; j++) {

            var element = features[j];


            // filter only display our feature, not base map feature.

            if (element.layer.id in source_layer[_source_layer_group_id]) {

                _not_popup = true;

                var _popup_html_section = "<tr><td ><span style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + element.layer.id + "&nbsp;</font></span></td><td>" + " " + "</td></tr>";

                for (var _key in element.properties) {
                    var _value = String(element.properties[_key]);

                    _popup_html_section = _popup_html_section + "<tr><td ><span style=\"float:left; list-style: none;font-size:10px\">" + _key + "</span></td><td><span style=\"float:left; list-style: none;font-size:8px\">" + _value + "</span></td></tr>";

                }// for

                _popup_html = _popup_html + _popup_html_section;

            }//if filter

        }//for

        _popup_html = _popup_html + "</table></div>";


        if (_not_popup) {
            var popup = new mapboxgl.Popup()
                .setLngLat(map.unproject(e.point))
                .setHTML(_popup_html)
                .addTo(map);

        }//if 

    }); // map on click


    // --------------------End -------------- click event open a popup at the location of the feature -----------------------------






    //  return _map_on_load;





}

//##################  End  NOT IN USE ################################
