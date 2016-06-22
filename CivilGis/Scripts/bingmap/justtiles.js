











function just_add_tiles() {

    init_tiling();

    document.getElementById("ajaxload").style.display = "none";
    document.getElementById("title_info").style.display = "none";
    document.getElementById("legend").style.display = "none";
   
}




function initialize() {
    
    initial_location = set_initial_location($("#areaID").val());


    init_base_map();

    add_area_boundary($("#areaID").val());


     geocoding();
      
     just_add_tiles();

    }// initialize
    
    
    
    
    
    
    
