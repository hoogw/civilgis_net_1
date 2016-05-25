






function initialize() {








    initial_location = set_initial_location($("#areaID").val());




    init_base_map_tiling();


    document.getElementById("ajaxload").style.display = "none";
    document.getElementById("title_info").style.display = "none";
    document.getElementById("legend").style.display = "none";
    
   


   






   // geocoding();


}// initialize










$(document).ready(function () {





    initialize();





}); // document ready function