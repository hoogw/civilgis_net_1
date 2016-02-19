/* 
 
 special char '&' is not allowed in code, must replace by '-'. For example I&R should be I-R here, however in database, it could have I&R.
 Other similar case do the same process.
 
 '&' fail the button and all button after. so in database, should not use '&', instead use '-' replace it. 
 */

_code_column_name ='ZONING_UPD';


_designation['Newport_Beach_Zoning']=[
    
   
    
    {'code':'CN','description':'Commercial Neighborhood', 'color':"purple"},
    {'code':'CM','description':'Commercial Recreational and Marine', 'color':"plum"},
    {'code':'CC','description':'Commercial Corridor', 'color':"red"},
    
    {'code':'CG','description':'Commercial General', 'color':"tomato"},
    
    {'code':'CV','description':'Commercial Visitor Serving', 'color':"violet"},
    {'code':'IG','description':'Industrial', 'color':"blue"},
    
    {'code':'OA','description':'Office Airport', 'color':"firebrick"},
    {'code':'OG','description':'Office General', 'color':"fuchsia"},
    {'code':'OM','description':'Office Medical', 'color':"wheat"},
    {'code':'OR','description':'Office Regional Commercial', 'color':"tan"},
    
    {'code':'OS','description':'Open Space', 'color':"skyblue"},
    {'code':'PC','description':'Newport Coast', 'color':"orange"},
    
    
    
    
    {'code':'PF','description':'Public Facilities', 'color':"papayawhip"},
    {'code':'PI','description':'Private Institutions', 'color':"peachpuff"},
     {'code':'PR','description':'Parks and Recreation', 'color':"green"},
     
     {'code':'R-1','description':"Single-Unit Residential", 'color':"yellow"}, 
     
    {'code':'R-1-10000','description':"Single-Unit Residential (10000 indicates minimum lot area)", 'color':"coral"},
    {'code':'R-1-6000','description':"Single-Unit Residential (6000 indicates minimum lot area)", 'color':"chocolate"},
    {'code':'R-1-7200','description':"Single-Unit Residential (7200 indicates minimum lot area)", 'color':"blueviolet"},
    
    
    
     {'code':'R-2','description':'Two-Unit Residential', 'color':"hotpink"},
     {'code':'R-2-6000','description':'Two-Unit Residential (6000 indicates minimum lot area)', 'color':"indigo"},
    
    
    {'code':'R-BI','description':'Balboa Island', 'color':"lightblue"},
    
    {'code':'RM','description':'Multi-Unit Residential', 'color':"brown"},
    
    {'code':'RM-6000','description':'Multi-Unit Residential (6000 indicates minimum lot area)', 'color':"lime"},
    
    {'code':'RM-D','description':'Multi-Unit Residential Detached', 'color':"olive"},
    
    {'code':'ROW','description':'Right of Way', 'color':"aquamarine"},
    
    {'code':'SP-7','description':'Santa Ana Heights Specific Plan', 'color':"saddlebrown"},
    
    {'code':'WATER','description':'WATER', 'color':"aqua"}
    
];

