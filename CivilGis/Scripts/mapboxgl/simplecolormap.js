



function initialize() {


    initial_location = set_initial_location($("#areaID").val());



    //---------------- init - mapboxGL  ----------------


    mapboxgl.accessToken = mapboxgl_accessToken;
    map = new mapboxgl.Map({
        container: 'map-canvas', // container id
        //style: 'mapbox://styles/mapbox/streets-v8', //stylesheet location

        //style: 'mapbox://styles/mapbox/emerald-v8',

        style: 'mapbox://styles/mapbox/satellite-v8',

        //style: 'mapbox://styles/hoogw/cin2d9c6u007aafncyn8nmu36',


        center: [initial_location[2], initial_location[1]], //  starting position[-74.50, 40],
        zoom: initial_location[3] // starting zoom
    });


    map.addControl(new mapboxgl.Navigation());

    add_area_boundary($("#areaID").val());

    // add var geocoder
    geocoder();

    //---------------- end of  init - mapboxGL -----------






    // --------------------- dynamic load javascript file based on area and ---------------------------





    //var _vector_style_js = base_url + "public/js/map_init/source_layer/" + $("#areaID").val() + ".js";
    var _vector_style_js = "/Scripts/map_init/source_layer/" + $("#areaID").val() + ".js";

    $.when(
             $.getScript(_vector_style_js)


    ).done(function () {





        init_checkbox_menu_color($("#areaID").val(), $("#subjectID").val());

        init_vector_style($("#areaID").val(), $("#subjectID").val());



    });//done



    // --------------End of ------- dynamic load javascript file based on area and ---------------------------












}// initialize








$(document).ready(function () {





    initialize();





}); // document ready function




