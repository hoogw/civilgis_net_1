

function init_classification_buttons(_area, _subject) {
    
    
    
    // --------------------- dynamic load javascript file based on area and subject ---------------------------
    
    
    var _classification_js = "/Scripts/classification/area/" + _area + "/" + _subject + ".js";
	
    
                $.when(
                         $.getScript(_classification_js)
                 /*
                $.getScript( "/mypath/myscript1.js" ),
                $.getScript( "/mypath/myscript2.js" ),
                $.getScript( "/mypath/myscript3.js" ),
                */

                ).done(function(){

                   

                //place your code here, when above all scripts are all loaded completely.
                
                        var _buttons_group="";
                        
                        var _code ="";
                        var _description ="";                       
                        var _color="";
                        
                        var _labelID="";
                        var _label_Class="";
                        var _checkboxID="";
                        var _checkbox_Value="";
                          
                        var _label_selector = "";  
                        var _checkbox_selector = "";  
                        
                        
                        
                          
                                            var _designation_key = _area + "_"+ _subject;
                                            var parentArray = _designation[_designation_key];

                                  // -----------  Start  for loop append checkbox button ---------------------
                                             for(var i = 0; i < parentArray.length; i++)
                                             {
                                                 
                                                 
                                                     _code =    parentArray[i]['code'];
                                                     _description =  parentArray[i]['description'];
                                                     _color =  parentArray[i]['color'];
                                                                   
                                                    
                                                    
                                                    
                                                     _labelID = 'label_'+ _code;
                                                     _label_Class = 'btn btn-'+ _color;
                                                     _checkboxID = 'checkbox_'+_code;
                                                     _checkbox_Value = _code + " - " + _description;
                                                    
                                                    var _this_button = '<label id="'+_labelID + '" class="' + _label_Class+ '">   <input id="' + _checkboxID + '" type="checkbox">' + _checkbox_Value + '</label>';
                                                             
                                                      // alert(_this_button);      
                                                             
                                                   _buttons_group = _buttons_group + _this_button + '&nbsp;&nbsp;&nbsp;&nbsp;';
                                                    
                                                                   
                                              }// outer for

                                             //alert(_buttons_group);
                    
                                             $("#classification_buttons").append(_buttons_group);
                                // -------------   end of  for loop append checkbox button ---------------------
                    
                    
                    
                    
                    
                    
                                 //--------------start  add event listener --------------------------------
                    
                                               for(var j = 0; j < parentArray.length; j++)
                                             {
                                                 
                                                 
                                                     _code =    parentArray[j]['code'];
                                                     _description =  parentArray[j]['description'];
                                                     _color =  parentArray[j]['color'];
                                                                   
                                                    
                                                    _label_selector = '#label_'+_code;
                                                    
                                                    
                                                    
                                                    
                                                     $(_label_selector).mouseover(function(){
        
                                                                                       
                                                                                        //alert($(this).attr('id'));
                                                                                        var _label_current_ID = $(this).attr('id');
                                                                                        var _checkbox_current_ID = _label_current_ID.replace('label','checkbox');
                                                                                        
                                                                                        //alert(_checkbox_current_ID);
                                                                                        
                                                                                        
                                                                                        
                                                                                         });


                                                     $(_label_selector).mouseout(function(){

                                                                                     
                                                                                       
                                                                                        var _label_current_ID = $(this).attr('id');
                                                                                        var _checkbox_current_ID = _label_current_ID.replace('label','checkbox');
                                                                                        
                                                                                       // alert(_checkbox_current_ID);
                                                                                       
                                                                                       
                                                                                         });




                                                     $(_label_selector).click(function(){
                                                                                        // alert($('#checkbox_R1').is(':checked'));
                                                                                        
                                                                                        // ---------  must use $(this) to get which label being clicked.
                                                                                        
                                                                                        var _label_current_ID = $(this).attr('id');
                                                                                        var _checkbox_current_ID = _label_current_ID.replace('label','checkbox');
                                                                                          _checkbox_selector = '#'+_checkbox_current_ID;

                                                                                         //alert(_label_selector);

                                                                                        if ($(_checkbox_selector).is(':checked')){
                                                                                            alert(" Un do it ");
                                                                                        }
                                                                                        else {
                                                                                            alert("  Do it ");

                                                                                        }


                                                                                         });
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                    
                                                                   
                                              }// outer for
                                              
                                 //--------------end of  add event listener --------------------------------
                

                    }); // when done
    
    
    
    
    
    
    
    
    
    //--------------------test  mouse over click event ---------------------------
    /*
    $('#label_1').mouseover(function(){
        
                                       // alert("mouse over ");
                                        });
                                        
                                        
    $('#label_1').mouseout(function(){
        
                                       // alert("mouse OUT ");
                                        });
    
    $('#label_1').click(function(){
                                       // alert($('#checkbox_R1').is(':checked'));
                                       
                                       if ($('#checkbox_1').is(':checked')){
                                           alert(" Un do it ");
                                       }
                                       else {
                                           alert("  Do it ");
                                           
                                       }
                                       
                                       
                                        });
                                       
                                       
                                       
   $('#label_2').mouseover(function(){
        
                                       // alert("mouse over ");
                                        });
                                        
                                        
    $('#label_2').mouseout(function(){
        
                                       // alert("mouse OUT ");
                                        });
    
    $('#label_2').click(function(){
                                       // alert($('#checkbox_R1').is(':checked'));
                                       
                                       if ($('#checkbox_2').is(':checked')){
                                           alert(" Un do it ");
                                       }
                                       else {
                                           alert("  Do it ");
                                           
                                       }
                                       
                                       
                                        });
                                       
                                       

    
    $('#label_3').mouseover(function(){
        
                                       // alert("mouse over ");
                                        });
                                        
                                        
    $('#label_3').mouseout(function(){
        
                                       // alert("mouse OUT ");
                                        });
    
    $('#label_3').click(function(){
                                       // alert($('#checkbox_R1').is(':checked'));
                                       
                                       if ($('#checkbox_3').is(':checked')){
                                           alert(" Un do it ");
                                       }
                                       else {
                                           alert("  Do it ");
                                           
                                       }
                                       
                                       
                                        });
     //----------------------------------------------------------                                   
                                        
                                        
    */
   
}  //function init_classification_buttons