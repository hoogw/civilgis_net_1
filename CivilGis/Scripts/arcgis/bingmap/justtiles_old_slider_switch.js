













function just_add_tiles() {


    // ---- retired section -----------
    tile_slider();

    
    init_tiling_old_slider_switch();

    tile_switch_button();

    // ---- retired section -----------
     


    document.getElementById("ajaxload").style.display = "none";
    document.getElementById("title_info").style.display = "none";
    document.getElementById("legend").style.display = "none";
   


}




function initialize() {
    
   
   

    infowindow = new google.maps.InfoWindow();

    
            
             initial_location = set_initial_location($("#areaID").val());
           


            
        var mapOptions = {
                            
                             //center: new google.maps.LatLng(33.65992448007282, -117.91505813598633),
                             center: new google.maps.LatLng(initial_location[1], initial_location[2]),
                             //mapTypeId: google.maps.MapTypeId.ROADMAP
                             mapTypeId: google.maps.MapTypeId.HYBRID
                           };
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        map.setZoom(initial_location[3]);
        

        add_area_boundary($("#areaID").val());

        
       
         
   
        
        
        
        //---------- marker cluster [1]------------
       // clustering_point();
        
        
        
        
        
        geocoding();
        
        
     
         
          map.controls[google.maps.ControlPosition.TOP_CENTER].push(document.getElementById('legend'));
     
 
     
         
           
    
     just_add_tiles();

         
    
            
        
    }// initialize
    
    
    
    
    
    
    



$(document).ready(function () {

        
       


       //  load data for google map and lower datatable 
          google.maps.event.addDomListener(window, 'load', initialize);




    
    
    

    }); // document ready function