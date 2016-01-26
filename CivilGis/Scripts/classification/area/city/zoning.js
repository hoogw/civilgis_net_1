/* 
 
 special char '&' is not allowed in code, must replace by '-'. For example I&R should be I-R here, however in database, it could have I&R.
 Other similar case do the same process.
 
 
 */

_code_column_name = 'ZONE_CODE';


_designation['city_zoning'] = [

    { 'code': 'R1', 'description': "Single Family Residential", 'color': "yellow" },
    { 'code': 'R2-MD', 'description': "Multiple Family Residential (Medium Density)", 'color': "blue" },
    { 'code': 'R2-HD', 'description': "Multiple Family Residential (High Density)", 'color': "green" },
    { 'code': 'R3', 'description': 'Multiple Family Residential', 'color': "gold" },
    { 'code': 'C1', 'description': 'Local Business', 'color': "red" }
];