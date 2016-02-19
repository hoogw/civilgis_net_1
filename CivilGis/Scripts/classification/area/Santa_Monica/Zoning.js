/* 
 
 special char '&' is not allowed in code, must replace by '-'. For example I&R should be I-R here, however in database, it could have I&R.
 Other similar case do the same process.
 
 '&' fail the button and all button after. so in database, should not use '&', instead use '-' replace it. 

 */

_code_column_name ='ZONING';


_designation['Santa_Monica_Zoning']=[
    
    
    {'code':'Airport','description':'Airport', 'color':"blue"},
    
     {'code':'Beach','description':"Beach", 'color':"coral"},
   
    {'code':'BCD','description':"Broadway Commercial", 'color':"blueviolet"},
    
    
    
    {'code':'BSC1','description':'Bayside Commercial', 'color':"saddlebrown"},
    
    {'code':'BSC2','description':'Bayside Commercial', 'color':"saddlebrown"},
    {'code':'BSC3','description':'Bayside Commercial', 'color':"saddlebrown"},
    {'code':'BSC4','description':'Bayside Commercial', 'color':"saddlebrown"},
    
    
    
    {'code':'BPD','description':'Beach Parking', 'color':"aqua"},
    
    
    
    {'code':'C2','description':'Neighborhood Commercial', 'color':"purple"},
    {'code':'C3','description':'Downtown Commercial', 'color':"plum"},
     {'code':'C3C','description':'Downtown Commercial', 'color':"plum"},
    
    {'code':'C4','description':'Highway Commercial', 'color':"red"},
    
    {'code':'C5','description':'Special Office Commercial', 'color':"tomato"},
    
    {'code':'C6','description':'Boulevard Commercial', 'color':"violet"},
    
    
    
    
    {'code':'CC','description':'Civic Center', 'color':"blue"},
    
    {'code':'CM2','description':'Main Street Special Commercial', 'color':"firebrick"},
    {'code':'CM3','description':'Main Street Special Commercial', 'color':"firebrick"},
    {'code':'CM4','description':'Main Street Special Commercial', 'color':"firebrick"},
    
    
    
    {'code':'CP3','description':'Commercial Professional', 'color':"fuchsia"},
    {'code':'CP5','description':'Commercial Professional', 'color':"fuchsia"},
    
    
    {'code':'DP','description':'Designated Parks', 'color':"green"},
    
    
    
    {'code':'LMSD','description':'Light Manufacturing Studio District', 'color':"wheat"},
    {'code':'M1','description':'Industrial Conservation', 'color':"tan"},
    
    
    
    
    {'code':'OP','description':'Ocean Park Duplex', 'color':"skyblue"},
    {'code':'OP1','description':'Ocean Park Single Family', 'color':"orange"},
    
    
    
    
    {'code':'OP2','description':'Ocean Park Low Multiple Family', 'color':"papayawhip"},
    {'code':'OP3','description':'Ocean Park Medium Multiple Family', 'color':"peachpuff"},
     
     
     {'code':'R1','description':"Single Family Residential", 'color':"yellow"}, 
     
   
    {'code':'OP4','description':"Ocean Park High Multiple Family", 'color':"chocolate"},
   
    
    
    
     {'code':'R2','description':'Low Density Multiple Residential', 'color':"hotpink"},
     {'code':'R2B','description':'Low Density Multiple Family Coastal Residential', 'color':"indigo"},
    {'code':'R2R','description':'Low Density Multiple Family Coastal Residential', 'color':"indigo"},
    
    {'code':'R3','description':'Medium Density Multiple Family Residential', 'color':"lightblue"},
    
    {'code':'R3R','description':'Medium Density Multiple Family Coastal Residential', 'color':"brown"},
    
    {'code':'R4','description':'High Density Multiple Family Residential', 'color':"lime"},
    
    {'code':'RMH','description':'Residential Mobile Home Park', 'color':"olive"},
    
    {'code':'RVC','description':'Right of Way', 'color':"Residential-Visitor Commercial"}
    
   
    
];