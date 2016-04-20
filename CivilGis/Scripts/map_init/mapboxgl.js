/// <reference path="source_layer/city.js" />
var mapboxgl_accessToken = 'pk.eyJ1IjoiaG9vZ3ciLCJhIjoiYjdlZTA1Y2YyOGM4NjFmOWI2MjY3MmI5NWM3MmUyOWMifQ.gINCV5SXFGTG5wB8ouXxOw';

var _tileserver_base_url = 'http://166.62.80.50:10/tileserver/tileserver.php?/index.json?/'; // must use this







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





//--------------------------  vectore tile section ------------------------------------




function init_checkbox_menu_color(_area, _subject) {

    // --------------------- dynamic load javascript file based on area and ---------------------------


    //var _vector_style_js = base_url + "public/js/map_init/source_layer/" + _area + ".js";
    var _vector_style_js = "/Scripts/map_init/source_layer/" + _area + ".js";

    $.when(
             $.getScript(_vector_style_js)
     /*
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    */

    ).done(function () {



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





    });//done

}



function init_checkbox_menu_simple(_area, _subject) {

    



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



function init_vector_style(_area, _subject) {

    
   // alert('add vector tile');



        _source_layer_group_id = _area + '_' + _subject;


       
    //_tileserver_base_url = 'http://vectortile.transparentgov.net/'; // NOT work,with error No 'Access-Control-Allow-Origin' header is present on the requested resource
        _tileserver_base_url = 'http://166.62.80.50:10/tileserver/tileserver.php?/index.json?/'; // must use this



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
                                'fill-outline-color': source_layer[_source_layer_group_id][property]['fill-outline-color'],
                            }
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
            var features = map.queryRenderedFeatures(e.point);


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

            }//for


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


            var _popup_html = "<div style='width:180px; height:120px;text-align: center; overflow-x:scroll; overflow-y:scroll; overflow:auto;'><table >";

            for (var j = 0; j < features.length; j++) {

                var element = features[j];

                var _popup_html_section = "<tr><td ><span style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + element.layer.id + "&nbsp;</font></span></td><td>" + " " + "</td></tr>";

                for (var _key in element.properties) {
                    var _value = String(element.properties[_key]);

                    _popup_html_section = _popup_html_section + "<tr><td ><span style=\"float:left; list-style: none;font-size:10px\">" + _key + "</span></td><td><span style=\"float:left; list-style: none;font-size:8px\">" + _value + "</span></td></tr>";

                }// for

                _popup_html = _popup_html + _popup_html_section;

            }//for

            _popup_html = _popup_html + "</table></div>";

            var popup = new mapboxgl.Popup()
                .setLngLat(map.unproject(e.point))
                .setHTML(_popup_html)
                .addTo(map);

        });


        // --------------------End -------------- click event open a popup at the location of the feature -----------------------------



}









//--------------------------  vectore tile section ------------------------------------






//############### NOT IN USE ###############







function init_vector_style_withloadscript(_area, _subject) {

    // --------------------- dynamic load javascript file based on area and ---------------------------


    //var _vector_style_js = base_url + "public/js/map_init/source_layer/" + _area + ".js";
    var _vector_style_js = "/Scripts/map_init/source_layer/" + _area + ".js";

    $.when(
             $.getScript(_vector_style_js)
     /*
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    */

    ).done(function () {




        _source_layer_group_id = _area + '_' + _subject;

        _tileserver_url = 'http://localhost:10/tileserver/tileserver.php?/index.json?/' + _area + '/{z}/{x}/{y}.pbf';


        map.on('style.load', function () {


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
                                'fill-outline-color': source_layer[_source_layer_group_id][property]['fill-outline-color'],
                            }
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
            var features = map.queryRenderedFeatures(e.point);


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

            }//for


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


            var _popup_html = "<div style='width:180px; height:120px;text-align: center; overflow-x:scroll; overflow-y:scroll; overflow:auto;'><table >";

            for (var j = 0; j < features.length; j++) {

                var element = features[j];

                var _popup_html_section = "<tr><td ><span style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + element.layer.id + "&nbsp;</font></span></td><td>" + " " + "</td></tr>";

                for (var _key in element.properties) {
                    var _value = String(element.properties[_key]);

                    _popup_html_section = _popup_html_section + "<tr><td ><span style=\"float:left; list-style: none;font-size:10px\">" + _key + "</span></td><td><span style=\"float:left; list-style: none;font-size:8px\">" + _value + "</span></td></tr>";

                }// for

                _popup_html = _popup_html + _popup_html_section;

            }//for

            _popup_html = _popup_html + "</table></div>";

            var popup = new mapboxgl.Popup()
                .setLngLat(map.unproject(e.point))
                .setHTML(_popup_html)
                .addTo(map);

        });


        // --------------------End -------------- click event open a popup at the location of the feature -----------------------------
















    }); // when done

}

function init_checkbox_menu_simple_withloadscript(_area, _subject) {

    // --------------------- dynamic load javascript file based on area and ---------------------------


    //var _vector_style_js = base_url + "public/js/map_init/source_layer/" + _area + ".js";
    var _vector_style_js = "/Scripts/map_init/source_layer/" + _area + ".js";

    $.when(
             $.getScript(_vector_style_js)
     /*
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    */

    ).done(function () {



        // ----------- add checkbox menu -----------
        _source_layer_group_id = _area + '_' + _subject;


        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {



                var _checkbox_span = '  <span class="button-checkbox"> <button type="button" class="btn" data-color="primary" id="' + property + '">' + property + '</button><input type="checkbox" class="hidden" checked /> </span> ';


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





    });//done

}


function init_checkbox_menu_color_withloadscript(_area, _subject) {

    // --------------------- dynamic load javascript file based on area and ---------------------------


    //var _vector_style_js = base_url + "public/js/map_init/source_layer/" + _area + ".js";
    var _vector_style_js = "/Scripts/map_init/source_layer/" + _area + ".js";

    $.when(
             $.getScript(_vector_style_js)
     /*
    $.getScript( "/mypath/myscript1.js" ),
    $.getScript( "/mypath/myscript2.js" ),
    $.getScript( "/mypath/myscript3.js" ),
    */

    ).done(function () {



        // ----------- add checkbox menu -----------
        _source_layer_group_id = _area + '_' + _subject;


        for (var property in source_layer[_source_layer_group_id]) {
            if (source_layer[_source_layer_group_id].hasOwnProperty(property)) {



                //var _checkbox_span = '  <span class="button-checkbox"> <button type="button" class="btn" data-color="primary" id="' + property + '">' + property + '</button><input type="checkbox" class="hidden" checked /> </span> ';


                var _checkbox_span = '  <span class="button-checkbox"> <button type="button" class="btn" data-color="' +
                                           source_layer[_source_layer_group_id][property]['feature_color'] + '" id="' + property + '">' + property + '</button><input type="checkbox" class="hidden" checked /> </span> ';



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





    });//done

}

//############### END NOT IN USE ################