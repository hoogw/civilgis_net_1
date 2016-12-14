


//-------------------------- Classification button section -------------------------------------------


function set_feature_style_option_for_all(_this_feature_style_option) {


    var array_shapes = _geojson_layer.getPrimitives();

    var length = array_shapes.length;
    var element = null;



    for (var x = 0; x < length; x++) {
        element = array_shapes[x];


            element.setOptions(_this_feature_style_option);


    }// for loop array_shapes


}// function

function set_feature_style_option(_this_column_name, _this_code, _this_feature_style_option) {


    var array_shapes = _geojson_layer.getPrimitives();

    var length = array_shapes.length;
    var element = null;



    for (var x = 0; x < length; x++) {
        element = array_shapes[x];



        if (element.metadata[_this_column_name] === _this_code) {



            element.setOptions(_this_feature_style_option);


        }// if 

    }// for loop array_shapes


}// function






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

            var _this_button = '<label id="' + _labelID + '" class="' + _label_Class + '">   <input id="' + _checkboxID + '" type="radio" name="classification_radios">' + _checkbox_Value + '</label>';

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


                    var checkboxbutton_highlight_style_option = {
                        //icon: 'https://www.bingmapsportal.com/Content/images/poi_custom.png',
                        color: 'white',
                        fillColor: new Microsoft.Maps.Color(0.6, 255, 255, 255),
                        //fillColor: 'white',
                        strokeColor: 'white',
                        strokeThickness: 3
                    };

                    set_feature_style_option(_code_column_name, _current_code_mouseover, checkboxbutton_highlight_style_option);



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




                    set_feature_style_option(_code_column_name, _current_code_mouseout, default_geojson_style_option);



                }// else




            }); // end mouseout










            $(_label_selector).click(function () {
                // alert($('#checkbox_R1').is(':checked'));

                // ---------  must use $(this) to get which label being clicked.

                var _label_current_click = $(this).attr('id');
                var _checkbox_current_click = _label_current_click.replace('label', 'checkbox');
                var _checkbox_current_selector = '#' + _checkbox_current_click;
                var _current_code_click = _label_current_click.replace('label_', '');

               

                



                if ($(_checkbox_current_selector).is(':checked')) {
                    //alert(" Un do it ");
                    
                   
                } // if end un do it

                else {
                    //alert("  Do it ");
                    //alert($(_checkbox_current_selector).is(':checked'));



                    //---------------radio button click, should turn other color off --------------
                    set_feature_style_option_for_all(default_geojson_style_option);





                    // get the feature fill color

                    var _feature_fill_color = '';
                    var parentArray = _designation_parentArray;


                    for (var i = 0; i < parentArray.length; i++) {


                        if (parentArray[i]['code'] == _current_code_click) {
                            _feature_fill_color = parentArray[i]['color'];
                        }

                    }// outer for




                    // loop through all current featurs on map 


                    var radiobutton_color_style_option = {

                        // fillColor: new Microsoft.Maps.Color(0.6, 255, 255, 255),
                        // can not do opacity 
                        fillColor: _feature_fill_color,
                        strokeColor: _feature_fill_color,
                        strokeThickness: 3
                    };



                    set_feature_style_option(_code_column_name, _current_code_click, radiobutton_color_style_option);

                   


                }// else end do it


            });// end click



        }// outer for

        //--------------end of  add event listener --------------------------------


    }); // when done




    // high light off button  
    $('#label_high_light_off').click(function () {


        set_feature_style_option_for_all(default_geojson_style_option);

       

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
            var checkboxbutton_color_style_option = {

                // fillColor: new Microsoft.Maps.Color(0.6, 255, 255, 255),
                // can not do opacity 
                fillColor: _feature_fill_color,
                strokeColor: _feature_fill_color,
                strokeThickness: 3
            };


            set_feature_style_option(_code_column_name, pArray[i]['code'], checkboxbutton_color_style_option)




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




function add_mapdata_listener_classification_radio() {

    _geojson_layer = new Microsoft.Maps.Layer();
    map.layers.insert(_geojson_layer);




    //================== mouse over listener =============================
    Microsoft.Maps.Events.addHandler(_geojson_layer, 'mouseover', function (event) {


        _last_mousover_highlighted_feature = event.primitive;

        event.primitive.setOptions(highlight_geojson_style);

        var object = event.primitive.metadata;



        var instant_info = "<ul>";

        for (var property in object) {
            if (object.hasOwnProperty(property)) {

                var _value = object[property];


                instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + property + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + object[property] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "</li>";
                // alert(property);



                //------------------------------mouse over event for classify check box --------classification [2]-----------    

                if (property == _code_column_name) {


                    // ********** special char '&' is not allowed, must replace with '-'  ****************
                    if (typeof _value === 'string' || _value instanceof String) {
                        if (_value.indexOf('&') >= 0) {

                            _value = _value.replace("&", "-");

                        }
                    }
                    // **********  end special char '&' is not allowed, must replace with '-'  **************** 





                    var _highlight_button = '#label_' + _value;


                    // **** if that element exist length >0  *******
                    if ($(_highlight_button).length) {

                        _current_classifycheckbox_class = $(_highlight_button).attr('class');
                        $(_highlight_button).removeClass(_current_classifycheckbox_class).addClass("btn btn-black");


                        $("#label_highlight").text($(_highlight_button).text());


                    }

                }

                //------------------------------End of mouse over event for classify check box ------------------- 








            } // if 
        } // for


        //alert(instant_info);
        instant_info = instant_info + "</ul>";

        // update bottom <div>
        document.getElementById("info-table").innerHTML = instant_info;







    });

    //==================End of mouse over listener =============================






    // =============== mouse out listener ===================================   

    Microsoft.Maps.Events.addHandler(_geojson_layer, 'mouseout', function (event) {

        event.primitive.setOptions(default_geojson_style_option);


        // reserve last time click feature 'click_highlight_style'
        if (_last_click_highlighted_feature) {
            _last_click_highlighted_feature.setOptions(click_highlight_geojson_style);
        }


        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";




        //------------------------------mouse out event for classify check box --------classification [3]-----------    

        var object = event.primitive.metadata;

        for (var property in object) {
            if (object.hasOwnProperty(property)) {

                var _value = object[property];

                if (property == _code_column_name) {

                    // ********** special char '&' is not allowed, must replace with '-'  ****************                                                 
                    if (typeof _value === 'string' || _value instanceof String) {
                        if (_value.indexOf('&') >= 0) {

                            _value = _value.replace("&", "-");

                        }
                    }
                    // **********  end special char '&' is not allowed, must replace with '-'  ****************                     


                    var _highlight_button = '#label_' + _value;


                    if ($(_highlight_button).length) {

                        //_current_classifycheckbox_class = $(_highlight_button).attr('class');
                        $(_highlight_button).removeClass("btn btn-black").addClass(_current_classifycheckbox_class);


                        $("#label_highlight").text("");

                    }

                }
            }// if
        }//for

        //------------------------------End of mouse out event for classify check box -------------------    




    });

    // ===============End of  mouse out listener ===================================  






    // ================= click listener ================
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

    // =================End of  click listener ================



}






function add_mapdata_listener_classification_radio__________() {


    // ================= click listener ================
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





    //================== mouse over listener =============================
    map.data.addListener('mouseover', function (event) {


        // map.data.revertStyle();                 
        map.data.overrideStyle(event.feature, {
            strokeWeight: _highlight_strokeWeight,
            //strokeColor: '#fff',
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




        //------------------------------mouse over event for classify radio --------classification [2]-----------    

        event.feature.forEachProperty(function (_value, _property) {

            if (_property == _code_column_name) {


                // ********** special char '&' is not allowed, must replace with '-'  ****************
                if (typeof _value === 'string' || _value instanceof String) {
                    if (_value.indexOf('&') >= 0) {

                        _value = _value.replace("&", "-");

                    }
                }
                // **********  end special char '&' is not allowed, must replace with '-'  **************** 





                var _highlight_button = '#label_' + _value;


                // **** if that element exist length >0  *******
                if ($(_highlight_button).length) {

                    _current_classifycheckbox_class = $(_highlight_button).attr('class');
                    $(_highlight_button).removeClass(_current_classifycheckbox_class).addClass("btn btn-black");


                    $("#label_highlight").text($(_highlight_button).text());


                }

            }

        });




        //------------------------------End of mouse over event for classify radio -------------------    

    }); //mouse over listener








    // =============== mouse out listener ===================================          
    map.data.addListener('mouseout', function (event) {


        map.data.revertStyle(event.feature);




        // empty bottom <div>
        document.getElementById("info-table").innerHTML = "";
        //infowindow.close();


        //------------------------------mouse out event for classify radio --------classification [3]-----------    

        event.feature.forEachProperty(function (_value, _property) {

            if (_property == _code_column_name) {

                // ********** special char '&' is not allowed, must replace with '-'  ****************                                                 
                if (typeof _value === 'string' || _value instanceof String) {
                    if (_value.indexOf('&') >= 0) {

                        _value = _value.replace("&", "-");

                    }
                }
                // **********  end special char '&' is not allowed, must replace with '-'  ****************                     


                var _highlight_button = '#label_' + _value;


                if ($(_highlight_button).length) {

                    //_current_classifycheckbox_class = $(_highlight_button).attr('class');
                    $(_highlight_button).removeClass("btn btn-black").addClass(_current_classifycheckbox_class);


                    $("#label_highlight").text("");

                }

            }

        });

        //------------------------------End of mouse out event for classify radio -------------------    




    });    //mouse out listener 

}


//--------------------------End of Classification button section -------------------------------------------





function ajax_GeoJSON(gmap, _apiURI, _map_click_event) {

    // Load a GeoJSON from the server 


    // test url if return a number means too many polygon to show.otherwise add polygon to map.
    $.get(_apiURI, function (data) {

        if (isNaN(data)) {



            // ---------   processing data(geoJson) to fill datatables -----------------


            // ************ bing map geojson loader pushpin(point) bug fix************

            // raw geojson string has "_id":  as point(works fine with polygon/line), bing map will fail display pushpin( marker/icon ), only display first one, hidden the rest.
            // Fix by replace all "_id" to "id", you must have "id" field, if no 'id' field, failed show pushpin. 


            var data_fix_id = data.replace(/_id/g, 'id');



            // ************  End bing map geojson loader point bug fix ************


            // 'data' is string of geojson,  _geojson_object is javascript object, bing map accept both format  
            var _geojson_object = JSON.parse(data_fix_id);




            //----------------Bing map  add new geojson, then remove last geojson --------------------


            _geojson_layer.clear();





            Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {


                // 'data' is string of geojson,  _geojson_object is javascript object, bing map accept both format, google only accept javascript object format, no string.
                // featureCollection is array of shapes(Pushpin, Polyline, Polygon)
                //featureCollection = Microsoft.Maps.GeoJson.read(_geojson_object, default_geojson_style);
                featureCollection = Microsoft.Maps.GeoJson.read(data_fix_id, default_geojson_style);
                //featureCollection = Microsoft.Maps.GeoJson.read(data_fix_id);

                _geojson_layer.add(featureCollection);





            }); // loadmodule

            //------------------------Bing map  end add new geojson, then remove last geojson------------------------- ---------------

            // hidden the title_info
            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "none";
            // document.getElementById("legend").style.display = "none";


            // do not use this, because it have place holder for blank
            //document.getElementById("title_info").style.visibility = "hidden";


            document.getElementById("title_info").innerHTML = "";
            // document.getElementById("legend").innerHTML = "";

            // ------------- map click event [3] -------------------
            if (_map_click_event) {
            }
            else {
                _mapclick_in_use = false;
            }

            //-------------------------------------------------------------

            // everytime load new geojson, need to apply color on those checkbox which is checked------------------------ classification [4] --------------------
            apply_checkbox();



        }
            // returning number of count
        else {


            // ---------- if return number, should remove last time geojson -----------



            _geojson_layer.clear();


            //-------------------- end remove last geojson ------------------------------




            document.getElementById("ajaxload").style.display = "none";
            document.getElementById("title_info").style.display = "inline";
            //  document.getElementById("legend").style.display = "inline";

            if (data > 0) {

                document.getElementById("title_info").innerHTML = "Found [ " + data + " ] records ZOOM IN for Details  ";

                // document.getElementById('legend').innerHTML = "Found [ " + data + " ] records ZOOM IN for Details ";

            } else {

                document.getElementById("title_info").innerHTML = "Nothing found";
                //   document.getElementById("legend").innerHTML = "Nothing found";
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

    // load classification button [1]
    init_classification_buttons_radio($("#areaID").val(), $("#subjectID").val());


    initial_location = set_initial_location($("#areaID").val());


    init_base_map();

    add_area_boundary($("#areaID").val());


    geocoding();

    init_tiling();

    add_mapdata_listener_classification_radio();


    add_map_listener();


    // first time load geojson
    get_map_bound();



}// initialize







