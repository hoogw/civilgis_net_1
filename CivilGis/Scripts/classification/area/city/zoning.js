/* 
 
 special char '&' is not allowed in code, must replace by '-'. For example I&R should be I-R here, however in database, it could have I&R.
 Other similar case do the same process.
 '&' fail the button and all button after. so in database, should not use '&', instead use '-' replace it. 


 Do not define var _designation[] here, must define first in the common file var..... here is give some value
 
 */




 _code_column_name ='ZONE_CODE';


 _designation['city_zoning']=[
    
    {'code':'R1','description':"Single Family Residential", 'color':"yellow"}, 
    {'code':'R2-MD','description':"Multiple Family Residential (Medium Density)", 'color':"coral"},
    {'code':'R2-HD','description':"Multiple Family Residential (High Density)", 'color':"chocolate"},
    {'code':'R3','description':'Multiple Family Residential', 'color':"brown"},
    
    {'code':'AP','description':'Administrative and Professional', 'color':"cornsilk"},
    {'code':'CL','description':'Commercial Limited', 'color':"purple"},
    {'code':'C1-S','description':'Shopping Cener', 'color':"plum"},
    {'code':'C1','description':'Local Business', 'color':"red"},
    
    {'code':'C2','description':'General Business', 'color':"tomato"},
    {'code':'TC','description':'Town Center', 'color':"violet"},
    {'code':'PDR-LD','description':'Planned Development Residential-Low_Density', 'color':"papayawhip"},
    {'code':'PDR-MD','description':'Planned Development Residential-Medium_Density', 'color':"peachpuff"},
    {'code':'PDR-HD','description':'Planned Development Residential-High Density', 'color':"saddlebrown"},
    {'code':'PDC','description':'Planned Development Commercial', 'color':"orange"},
    {'code':'PDI','description':'Planned Development Industrial', 'color':"skyblue"},
    {'code':'I-R','description':'I and R-Institutional and Recreationalshp', 'color':"green"},
    {'code':'MG','description':'General Industrial', 'color':"blue"},
    {'code':'MP','description':'Industrial Park', 'color':"blueviolet"}
    
    
];