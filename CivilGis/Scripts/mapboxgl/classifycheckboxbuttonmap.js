

// no highlight
function single_classify_polygon_vector(_area, _subject) {


    // alert('add vector tile');



   var _source_layer= _area + '_' + _subject;



    




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




        //==================================   add classify layers to map ================




        
        var _code = "";
        var _description = "";
        var _color = "";

        var _layerID = "";
        
        
        

        



        _designation_key = _area + "_" + _subject;
        _designation_parentArray = _designation[_designation_key];
        var parentArray = _designation_parentArray;





        // -----------  Start  for loop classify layers ---------------------
        for (var i = 0; i < parentArray.length; i++) {


            _code = parentArray[i]['code'];
            _description = parentArray[i]['description'];
            _color = parentArray[i]['color'];




            _layerID = 'layer_' + _code;
            

            map.addLayer({
                'id': _layerID,
                'type': 'fill',
                "source": _area,

                "source-layer": _source_layer,

                "layout": {
                    'visibility': 'visible'   // this property must be present in order for checkbox button menu work properly. 
                },

                'paint': {
                    'fill-color': _color,
                    'fill-outline-color': _color,
                    'fill-opacity': 0.8
                },

                "filter": ["==", _code_column_name, _code]

            });



          

        }//  for  parentArray.length


        // ----------- End of for loop classify layers -----------



        //============End ==========================   add layers to map =========================================



    }); // map.on('load')








    // ===========   mouse over event, show feature detail property in info-table ===============
    map.on('mousemove', function (e) {
        var features = map.queryRenderedFeatures(e.point);
       

        //  hand to pointer hand if there is features 
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';


        var instand_info_table = "";

        for (var i = 0; i < features.length; i++) {



            var element = features[i];



            // filter only display our feature, not base map feature.

            if (element.layer.id.startsWith('layer_')) {


                // find the description
                        var _classification_code = element.layer.id.substring(6);
                        var _classification_description = "";
                        var _classification_color = "";

                        _designation_key = _area + "_" + _subject;
                        _designation_parentArray = _designation[_designation_key];

                        var parentArray = _designation_parentArray;

                        // -----------  Start  for loop classify layers ---------------------
                        for (var i = 0; i < parentArray.length; i++) {


                            

                            if (parentArray[i]['code'] === _classification_code) {

                                _classification_description = parentArray[i]['description'];
                                _classification_color = parentArray[i]['color'];
                                break;
                            }

                        }//for


                // End of find the description





                        var instant_info = "<br/><div><span>" + _classification_code + " - " + _classification_description + "<ul>";

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
        var features = map.queryRenderedFeatures(e.point);
       
        if (!features.length) {
            return;
        }

        var _not_popup = false;

        var _popup_html = "<div style='width:180px; height:120px;text-align: center; overflow-x:scroll; overflow-y:scroll; overflow:auto;'><table >";

        for (var j = 0; j < features.length; j++) {

            var element = features[j];


            // filter only display our feature, not base map feature.

            if (element.layer.id.startsWith('layer_')) {



                // ========== find the description ===========
                var _classification_code = element.layer.id.substring(6);
                var _classification_description = "";
                var _classification_color = "";

                _designation_key = _area + "_" + _subject;
                _designation_parentArray = _designation[_designation_key];

                var parentArray = _designation_parentArray;

                // -----------  Start  for loop classify layers ---------------------
                for (var i = 0; i < parentArray.length; i++) {




                    if (parentArray[i]['code'] === _classification_code) {

                        _classification_description = parentArray[i]['description'];
                        _classification_color = parentArray[i]['color'];
                        break;
                    }

                }//for


                // =========== End of find the description ==============




                _not_popup = true;

                var _popup_html_section = "<tr><td ><span style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;" + _classification_code + " - " + _classification_description + "&nbsp;</font></span></td><td>" + " " + "</td></tr>";

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




function single_classify_checkbox_button_color(_area, _subject) {

    

    // ----------- add classify checkbox button  -----------
        
                        var _code = "";
                        var _description = "";
                        var _color = "";

                        var _layerID = "";
                        
                        var _checkbox_Value = "";

                       



                        _designation_key = _area + "_" + _subject;
                        _designation_parentArray = _designation[_designation_key];
                        var parentArray = _designation_parentArray;


      


                        // -----------  Start  for loop append checkbox button ---------------------
                        for (var i = 0; i < parentArray.length; i++) {


                            _code = parentArray[i]['code'];
                            _description = parentArray[i]['description'];
                            _color = parentArray[i]['color'];




                           
                            _layerID = 'layer_' + _code;
                            _checkbox_Value = _code + " - " + _description;

           

                            var _checkbox_span = '  <span class="button-checkbox"> <button type="button" class="btn" data-color="' +
                                                       _color + '" id="' + _layerID + '">' + _checkbox_Value + '</button><input type="checkbox" class="hidden" checked /> </span> ';



                            $("#checkbox_menu").append(_checkbox_span);


                        }//  for  parentArray.length


    // ----------- End of add classification checkbox button  -----------


       


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
            alert(this.id);

            // e.preventDefault();
            //  e.stopPropagation();


            //var visibility = map.getLayoutProperty(this.id, 'visibility');

            //if (visibility === 'visible') {
            //    map.setLayoutProperty(this.id, 'visibility', 'none');
            //    // this.className = '';
            //} else {
            //    // this.className = 'active';
            //    map.setLayoutProperty(this.id, 'visibility', 'visible');
            //};


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
        }  //updateDisplay



        // Initialization
        function init_checkbox() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i>&nbsp;');
            }
        } //init_checkbox




           init_checkbox();

       });  // .button-checkbox .each function 




    


}// function 




function initialize() {


    initial_location = set_initial_location($("#areaID").val());



    //---------------- init - mapboxGL  ----------------


    init_base_map();



    // add var geocoder
    geocoder();

    //---------------- end of  init - mapboxGL -----------






   

    // --------------------- dynamic load javascript file based on area and subject ---------------------------


    //var _classification_js = base_url + "public/js/classification/area/" + $("#areaID").val() + "/" + $("#subjectID").val() + ".js";
    var _classification_js = "/Scripts/classification/area/" + $("#areaID").val() + "/" + $("#subjectID").val() + ".js";

   

    //var _vector_style_js = base_url + "public/js/map_init/source_layer/" + $("#areaID").val() + ".js";
    var _vector_style_js = "/Scripts/map_init/source_layer/" + $("#areaID").val() + ".js";


    
   

    $.when(
             $.getScript(_vector_style_js),
             $.getScript(_classification_js)

    ).done(function () {


        
        single_classify_polygon_vector($("#areaID").val(), $("#subjectID").val());

        single_classify_checkbox_button_color($("#areaID").val(), $("#subjectID").val());

   



    });//done



    // --------------End of ------- dynamic load javascript file based on area and ---------------------------








    add_area_boundary($("#areaID").val());



}// initialize








$(document).ready(function () {





    initialize();





}); // document ready function




