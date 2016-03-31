


//-------------------------- Classification button section -------------------------------------------

function init_classification_buttons_checkbox(_area, _subject) {



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

            var _this_button = '<label id="' + _labelID + '" class="' + _label_Class + '">   <input id="' + _checkboxID + '" type="checkbox">' + _checkbox_Value + '</label>';

            // alert(_this_button);      

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
                    map.data.forEach(function (_feature) {

                        if (_feature.getProperty(_code_column_name) == _current_code_mouseover) {

                            //map.data.revertStyle();
                            map.data.overrideStyle(_feature, {
                                strokeWeight: 1,
                                strokeColor: 'white',
                                fillColor: 'white',
                                fillOpacity: 0.7
                            });// overrideStyle


                        }//if
                    });// map.data.foreach



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

                    // loop through all current featurs on map 
                    map.data.forEach(function (_feature) {

                        if (_feature.getProperty(_code_column_name) == _current_code_mouseout) {

                            map.data.revertStyle(_feature);
                            /*
                            map.data.overrideStyle(_feature, {
                                                                  fillOpacity: 0,
                                                                  strokeColor: 'yellow',
                                                                  strokeWeight: 1
                                                               });// overrideStyle
                             */

                        }//if
                    });// map.data.foreach


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
                    map.data.forEach(function (_feature) {

                        if (_feature.getProperty(_code_column_name) == _current_code_click) {

                            map.data.revertStyle(_feature);
                            /*
                             map.data.overrideStyle(_feature, {
                          
                                                                   fillOpacity: 0,
                                                                  strokeColor: 'yellow',
                                                                  strokeWeight: 1
                                                               });// overrideStyle
                              */

                        }//if
                    });// map.data.foreach









                } // if end un do it

                else {
                    //alert("  Do it ");
                    //alert($(_checkbox_current_selector).is(':checked'));




                    // get the feature fill color

                    var _feature_fill_color = '';
                    var parentArray = _designation_parentArray;


                    for (var i = 0; i < parentArray.length; i++) {


                        if (parentArray[i]['code'] == _current_code_click) {
                            _feature_fill_color = parentArray[i]['color'];
                        }

                    }// outer for




                    // loop through all current featurs on map 
                    map.data.forEach(function (_feature) {

                        if (_feature.getProperty(_code_column_name) == _current_code_click) {

                            //map.data.revertStyle();
                            map.data.overrideStyle(_feature, {

                                strokeWeight: 1,
                                strokeColor: _feature_fill_color,
                                fillColor: _feature_fill_color,
                                fillOpacity: 0.7
                            });// overrideStyle


                        }//if
                    });// map.data.foreach




                }// else end do it


            });// end click











        }// outer for

        //--------------end of  add event listener --------------------------------



    }); // when done

    // color_tiles_switch button
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







}  //function init_classification_buttons


function apply_checkbox() {

    var pArray = _designation_parentArray;

    // -----------  loop  checkbox button ---------------------
    for (var i = 0; i < pArray.length; i++) {

        var _label_selector = '#label_' + pArray[i]['code'];
        var _checkbox_selector = '#checkbox_' + pArray[i]['code'];

        //a class active is added to the label (not the checkbox input) when the button is clicked. 
        //change both the appearance of the button and the checked property of the checkbox within
        if ($(_checkbox_selector).is(':checked')) {
            //$(_label_selector).removeClass('active');
            //$(_checkbox_selector).removeAttr('checked')


            // get the feature fill color

            var _feature_fill_color = pArray[i]['color'];




            // loop through all current featurs on map 
            map.data.forEach(function (_feature) {

                if (_feature.getProperty(_code_column_name) == pArray[i]['code']) {

                    //map.data.revertStyle();
                    map.data.overrideStyle(_feature, {

                        strokeWeight: 1,
                        strokeColor: _feature_fill_color,
                        fillColor: _feature_fill_color,
                        fillOpacity: 0.7
                    });// overrideStyle


                }//if
            });// map.data.foreach




        }//if

    }// outer for


}



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







function ajax_GeoJSON(gmap, _apiURI, _map_click_event) {

    // Load a GeoJSON from the server 









    // test url if return a number means too many polygon to show.otherwise add polygon to map.

    $.get(_apiURI, function (data) {

        if (isNaN(data)) {





            _geojson_object = JSON.parse(data);



            // ================= append two column GeoFeatureType GeoFeatureID to properties. =========================
            //-------------    php format add each _id:{"$id": "55e8c24e382f9fe337f0d8fe"}  to properties before draw on map. -------------
            //-------------asp.net format add each  {"_id" : "55c532cf21167708171b02a2"}  to properties before draw on map. -------------

            var _features_array = _geojson_object['features'];

            var _id_obj;
            var _id_obj_id;
            var _propty_obj;

            _features_array.forEach(function (eachFeatueItem) {


                /*
                  // --- php format ------
                  
                     _id_obj = eachFeatueItem['_id'];
                     _id_obj_id = _id_obj['$id'];
                    _propty_obj = eachFeatueItem['properties'];
                    var _geo_type = eachFeatueItem['geometry'];
                    
                    _propty_obj['GeoFeatureType']=_geo_type['type'];
                    _propty_obj['GeoFeatureID'] = _id_obj_id;



              
                    // ---end  php format ------
                 */


                // ------ asp.net format -----------
                var _geo_type = eachFeatueItem['geometry'];



                _propty_obj = eachFeatueItem['properties'];

                _propty_obj['GeoFeatureType'] = _geo_type['type'];
                _propty_obj['GeoFeatureID'] = eachFeatueItem['_id'];


            });// features_array_foreach

            _geojson_object['features'] = {};
            _geojson_object['features'] = _features_array;
            //---------------------------------------------------------------

            // =================End of  append two column GeoFeatureType GeoFeatureID to properties. =========================




            //----------------  add new geojson, then remove last geojson --------------------



            _last_geojson_layer = _current_geojson_layer;

            _current_geojson_layer = L.geoJson(_geojson_object, {



                // for point feature, by default it use marker, but instead of use marker, here change marker to polygon (circle marker) 
                pointToLayer: function (feature, latlng) {
                    return L.circleMarker(latlng, geojson_Marker_style_Options);
                },


                style: geojson_default_style,

                onEachFeature: function onEachFeature(feature, layer) {







                    //bind click
                    layer.on('mouseover', function (e) {
                        // e = event
                        // console.log(e); 

                        // You can make your ajax call declaration here
                        //$.ajax(... 


                        layer.setStyle(geojson_mouseover_highlight_style);



                        var instant_info = "<ul>";


                        for (var _key in layer.feature.properties) {
                            var _value = String(layer.feature.properties[_key]);
                            instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _key + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";

                        }


                        instant_info = instant_info + "</ul>";


                        // update bottom <div>
                        document.getElementById("info-table").innerHTML = instant_info;



                    });// layer.on mouseover


                    layer.on('mouseout', function (e) {

                        layer.setStyle(geojson_default_style);

                        // empty bottom <div>
                        document.getElementById("info-table").innerHTML = "";
                        //infowindow.close();

                    });// layer.on mouseout

                }// oneach function

            }).bindPopup(function (layer) {


                // when user click each feature, it will popup a info window by the feature.


                var popup = "<table>";
                for (var _key in layer.feature.properties) {
                    var _value = String(layer.feature.properties[_key]);
                    // popup = popup + "<tr><td>" + _key + "</td><td>" + _value + "</td></tr>";

                    popup = popup + "<tr><td><span style=\'background-color: #454545;\'><font color=\'white\'>" + _key + "</span>&nbsp;&nbsp;</td><td>&nbsp;&nbsp;" + _value + "</td></tr>";

                }
                popup = popup + "</table>";


                return popup;


            }).addTo(map);


            // ---- after add new geojson, now remove last time old geojson -------------
            // don't use Array.ForEach is about 95% slower than for() in JavaScript.

            if (_last_geojson_layer) {

                //alert("remove last geojson");

                map.removeLayer(_last_geojson_layer);

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




        }
            // returning number of count, no geojson, clean the datatables
        else {

            // ---------- if return number, should remove last time geojson -----------
            _last_geojson_layer = _current_geojson_layer;
            if (_last_geojson_layer) {

                map.removeLayer(_last_geojson_layer);


            }// if
            //-------------------- end remove last geojson ------------------------------


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




        }// if else



    });// get // promist.then







}// function ajax_GeoJSON









function initialize() {






    initial_location = set_initial_location($("#areaID").val());




    // set up the map
    map = new L.Map('map-canvas');


    add_map_listener_idle();


    // create the tile layer with correct attribution
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    var osmAttrib = 'Map data &#169; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
    var osm = new L.TileLayer(osmUrl, { minZoom: 3, maxZoom: 22, attribution: osmAttrib });

    // start the map
    map.setView(new L.LatLng(initial_location[1], initial_location[2]), initial_location[3]);



    base_map_tile_layer = map.addLayer(osm);



    add_area_boundary($("#areaID").val());







    //------tile[1] ---------
    init_tiling();


    geocoding();



    // load classification button [1]
    init_classification_buttons_checkbox($("#areaID").val(), $("#subjectID").val());



}// initialize









// datatables paged js
$(document).ready(function () {




    initialize();



}); // document ready function

