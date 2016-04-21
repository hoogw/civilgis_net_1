



function just_add_tiles() {


    init_tiling();

    tile_switch_button();


    document.getElementById("ajaxload").style.display = "none";
    document.getElementById("title_info").style.display = "none";
    document.getElementById("legend").style.display = "none";



}



function initialize() {








    initial_location = set_initial_location($("#areaID").val());




    //---------------- init - mapbox ----------------


    init_base_map();


    //---------------- end of  init - mapbox -----------



    add_area_boundary($("#areaID").val());




    just_add_tiles();



    geocoding();


}// initialize










$(document).ready(function () {





    initialize();





}); // document ready function