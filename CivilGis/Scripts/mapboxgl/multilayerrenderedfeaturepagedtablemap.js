









function initialize() {


    initial_location = set_initial_location($("#areaID").val());



    //---------------- init - mapboxGL  ----------------


    init_base_map();



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
        //init_checkbox_menu_simple($("#areaID").val(), $("#subjectID").val());

        property_tab($("#areaID").val(), $("#subjectID").val());

        
     
        multilayer_vector_property($("#areaID").val(), $("#subjectID").val());

        

        rendered_feature_binding_property_table();


        


        


    });//done



    // --------------End of ------- dynamic load javascript file based on area and ---------------------------






    add_area_boundary($("#areaID").val());


   

    



}// initialize








$(document).ready(function () {





    initialize();





}); // document ready function





    
    
    
    
    
    
    
