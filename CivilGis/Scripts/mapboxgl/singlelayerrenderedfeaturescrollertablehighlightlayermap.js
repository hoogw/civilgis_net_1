



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


        singlelayer_vector_highlight_layer($("#areaID").val(), $("#subjectID").val());


        singlelayer_rendered_feature_binding_scroller_highlight_layer_property_table($("#areaID").val() + "_" + $("#subjectID").val())

    
    });//done

                add_area_boundary($("#areaID").val());
                

   
   

}// initialize








$(document).ready(function () {





    initialize();





}); // document ready function




