/* 
 
 special char '&' is not allowed in code, must replace by '-'. For example I&R should be I-R here, however in database, it could have I&R.
 Other similar case do the same process.
 
 '&' fail the button and all button after. so in database, should not use '&', instead use '-' replace it. 

 */

_code_column_name ='GP_CODE';


_designation['city_general_land_use']=[
    
    {'code':'LDR','description':"Low Density Residential", 'color':"yellow"}, 
    {'code':'MDR','description':"Medium Density Residential", 'color':"coral"},
    {'code':'HDR','description':"High Density Residential", 'color':"chocolate"},
    
    {'code':'F','description':'Fairgrounds', 'color':"brown"},
    
    
    {'code':'G','description':'Golf Course', 'color':"firebrick"},
    {'code':'GC','description':'General Commercial', 'color':"purple"},   
    {'code':'CC','description':'Commercial Center', 'color':"plum"},
    {'code':'CR','description':'Commercial Residential', 'color':"red"},
    
    
    
    {'code':'NC','description':'Neighborhood Commercial', 'color':"tomato"},
    
    {'code':'RC','description':'Regional Commercial', 'color':"violet"},
    
    
    {'code':'UCC','description':'Urban Center Commercial', 'color':"orange"},
    
    
    
    {'code':'PI','description':'Public Institutional', 'color':"green"},
    
    {'code':'LI','description':'Light Industry', 'color':"blue"},
    {'code':'IP','description':'Industrial Park', 'color':"blueviolet"}
    
    
    
];