﻿



function initialize() {


    initial_location = set_initial_location($("#areaID").val());



    //---------------- init - mapboxGL  ----------------


    init_base_map();

    

    // add var geocoder
    geocoder();

    //---------------- end of  init - mapboxGL -----------


    var _vector_style_js = "/Scripts/map_init/source_layer/" + $("#areaID").val() + ".js";

    $.when(
             $.getScript(_vector_style_js)
                        

    ).done(function () {


        init_vector_singlelayer_highlight_layer($("#areaID").val(), $("#subjectID").val());
    
    });//done

                add_area_boundary($("#areaID").val());
                

   
   

}// initialize








$(document).ready(function () {





    initialize();





}); // document ready function




