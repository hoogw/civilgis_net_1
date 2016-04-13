



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


    L.mapbox.accessToken = mapboxgl_accessToken;
    map = L.mapbox.map('map-canvas', 'mapbox.streets')
              .setView([initial_location[1], initial_location[2]], initial_location[3]);   // .setView([40, -74.50], 9);


    // bug fix, for first time load
    //get_map_bound();


    //---------------- end of  init - mapbox -----------



    add_area_boundary($("#areaID").val());




    just_add_tiles();



    geocoding();


}// initialize










$(document).ready(function () {





    initialize();





}); // document ready function