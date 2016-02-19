/* 
 
 special char '&' is not allowed in code, must replace by '-'. For example I&R should be I-R here, however in database, it could have I&R.
 Other similar case do the same process.
 
 '&' fail the button and all button after. so in database, should not use '&', instead use '-' replace it. 

 */

_code_column_name ='GP_UPDATE_';


_designation['Newport_Beach_General_Land_Use']=[
    
   
    
    
    
    
    {'code':'CC','description':'Corridor Commercial', 'color':"red"},
    
    {'code':'CG','description':'General Commercial', 'color':"tomato"},
    {'code':'CN','description':'Neighborhood Commercial', 'color':"purple"},
    {'code':'CM','description':'Recreational and Marine Commercial', 'color':"plum"},
    
    {'code':'CV','description':'Visitor Serving Commercial', 'color':"violet"},
   
    
    
    {'code':'AO','description':'Airport Office and Supporting Uses', 'color':"firebrick"},
    {'code':'CO-G','description':'General Commercial Office', 'color':"fuchsia"},
    {'code':'CO-M','description':'Medical Commercial Office', 'color':"wheat"},
    {'code':'CO-R','description':'Regional Commercial Office', 'color':"tan"},
    
    
     {'code':'IG','description':'Industrial', 'color':"blue"},
     
     {'code':'OS','description':'Open Space', 'color':"skyblue"},
    {'code':'OS(RV)','description':'Open Space (Residential Village)', 'color':"orange"},
    
    {'code':'PF','description':'Public Facilities', 'color':"papayawhip"},
    {'code':'PI','description':'Private Institutions', 'color':"peachpuff"},
     {'code':'PR','description':'Parks and Recreation', 'color':"green"},
     
     
      {'code':'RM','description':'Multi-Unit Residential', 'color':"brown"},
     {'code':'RM-D','description':'Multi-Unit Residential Detached', 'color':"olive"},
     {'code':'ROW','description':'Right of Way', 'color':"aquamarine"},
     
     
     {'code':'RS-A','description':'Single-Unit Residential Attached', 'color':"yellow"}, 
     
    {'code':'RS-D','description':"Single-Unit Residential Detached", 'color':"coral"},
    
  
     {'code':'RT','description':'Two-Unit Residential', 'color':"hotpink"},
   
    
   
    
    {'code':'TS','description':'Tidelands and Submerged Lands', 'color':"lime"}
    
    
    
    
    
   
    
];