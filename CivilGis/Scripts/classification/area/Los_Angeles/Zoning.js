/* 
 
 special char '&' is not allowed in code, must replace by '-'. For example I&R should be I-R here, however in database, it could have I&R.
 Other similar case do the same process.
 
 '&' fail the button and all button after. so in database, should not use '&', instead use '-' replace it. 
 */

_code_column_name = 'ZONE_CLASS';


_designation['Los_Angeles_Zoning'] = [







    { 'code': 'R1', 'description': "One-Family Zone", 'color': "yellow" },
    { 'code': 'R2', 'description': 'Two–family Zone', 'color': "coral" },
    { 'code': 'R3', 'description': "Multiple Dwelling Zone", 'color': "brown" },

    { 'code': 'R4', 'description': "Multiple Dwelling Zone", 'color': "chocolate" },
    { 'code': 'R4_PV', 'description': "Multiple Dwelling Zone", 'color': "chocolate" },
    { 'code': 'R4P', 'description': "Multiple Dwelling Zone", 'color': "chocolate" },

    { 'code': 'R5', 'description': 'Multiple Dwelling Zone', 'color': "papayawhip" },
    { 'code': 'R5P', 'description': 'Multiple Dwelling Zone', 'color': "papayawhip" },


    { 'code': 'RA', 'description': 'Suburban Zone', 'color': "peachpuff" },
    { 'code': 'RAP', 'description': 'Suburban Zone', 'color': "peachpuff" },


     { 'code': 'RAS3', 'description': 'Residential Accessory Services Zone', 'color': "saddlebrown" },
     { 'code': 'RAS3_UV', 'description': 'Residential Accessory Services Zone', 'color': "saddlebrown" },
    { 'code': 'RAS4', 'description': 'Residential Accessory Services Zone', 'color': "saddlebrown" },
    { 'code': 'RAS4_UV', 'description': 'Residential Accessory Services Zone', 'color': "saddlebrown" },


    { 'code': 'RD1_5', 'description': 'Restricted Density Multiple Dwelling Zone', 'color': "orange" },
    { 'code': 'RD2', 'description': 'Restricted Density Multiple Dwelling Zone', 'color': "orange" },
    { 'code': 'RD3', 'description': 'Restricted Density Multiple Dwelling Zone', 'color': "orange" },
    { 'code': 'RD4', 'description': 'Restricted Density Multiple Dwelling Zone', 'color': "orange" },
    { 'code': 'RD5', 'description': 'Restricted Density Multiple Dwelling Zone', 'color': "orange" },
    { 'code': 'RD6', 'description': 'Restricted Density Multiple Dwelling Zone', 'color': "orange" },

    { 'code': 'RE', 'description': 'Residential Estate Zone', 'color': "firebrick" },
    { 'code': 'RE11', 'description': 'Residential Estate Zone', 'color': "firebrick" },
    { 'code': 'RE15', 'description': 'Residential Estate Zone', 'color': "firebrick" },
    { 'code': 'RE20', 'description': 'Residential Estate Zone', 'color': "firebrick" },
    { 'code': 'RE40', 'description': 'Residential Estate Zone', 'color': "firebrick" },
    { 'code': 'RE9', 'description': 'Residential Estate Zone', 'color': "firebrick" },

    { 'code': 'RMP', 'description': 'Mobilehome Park Zone', 'color': "hotpink" },

    { 'code': 'RS', 'description': 'Suburban Zone', 'color': "fuchsia" },
    { 'code': 'RSP', 'description': 'Suburban Zone', 'color': "fuchsia" },
    { 'code': 'RU', 'description': 'Suburban Zone', 'color': "fuchsia" },


    { 'code': 'RW1', 'description': 'Residential Waterways Zone', 'color': "skyblue" },
     { 'code': 'RW2', 'description': 'Residential Waterways Zone', 'color': "skyblue" },


     { 'code': 'RZ2_5', 'description': 'Residential Zero Side Yard Zone', 'color': "indigo" },
    { 'code': 'RZ3', 'description': 'Residential Zero Side Yard Zone', 'color': "indigo" },
     { 'code': 'RZ4', 'description': 'Residential Zero Side Yard Zone', 'color': "indigo" },
     { 'code': 'RZ5', 'description': 'Residential Zero Side Yard Zone', 'color': "indigo" },





     { 'code': 'A1', 'description': 'Agriculture Zone', 'color': "green" },
     { 'code': 'A2', 'description': 'Agriculture Zone', 'color': "green" },
    { 'code': 'A2_PV', 'description': 'Agriculture Zone', 'color': "green" },
    { 'code': 'ADP', 'description': 'Agriculture Zone', 'color': "green" },




    { 'code': 'C1', 'description': 'Limited Commercial Zone', 'color': "red" },
    { 'code': 'C1_5', 'description': 'Limited Commercial Zone', 'color': "red" },

    { 'code': 'C2', 'description': 'Commercial Zone', 'color': "tomato" },
    { 'code': 'CEC', 'description': 'Commercial Zone', 'color': "tomato" },

    { 'code': 'C4', 'description': 'Commercial Zone', 'color': "purple" },
     { 'code': 'C4_OX', 'description': 'Commercial Zone', 'color': "purple" },
    { 'code': 'C5', 'description': 'Commercial Zone', 'color': "purple" },
    { 'code': 'CCS', 'description': 'Century City South Specific Plan Studio Zone', 'color': "purple" },



    { 'code': 'CM', 'description': 'Commercial Manufacturing Zone', 'color': "violet" },
    { 'code': 'CM_GM', 'description': 'Commercial Manufacturing Zone', 'color': "violet" },
    { 'code': 'CM_UV', 'description': 'Commercial Manufacturing Zone', 'color': "violet" },



    { 'code': 'CR', 'description': 'Limited Commercial Zone', 'color': "lightblue" },
    { 'code': 'CR_PKM', 'description': 'Limited Commercial Zone', 'color': "lightblue" },
     { 'code': 'CW', 'description': 'Central City West Specific Plan Zone', 'color': "lightblue" },
    { 'code': 'GW_CA', 'description': 'Central City West Specific Plan Zone', 'color': "lightblue" },
    { 'code': 'LASED', 'description': 'Central City West Specific Plan Zone', 'color': "lightblue" },


    { 'code': 'LAX', 'description': 'Los Angeles International Airport Specific Plan Zone', 'color': "lime" },

    { 'code': 'M1', 'description': 'Limited Industrial Zone', 'color': "blue" },


    { 'code': 'M2', 'description': 'Light Industrial Zone', 'color': "aquamarine" },

    { 'code': 'M3', 'description': 'Heavy Industrial Zone', 'color': "blueviolet" },


    { 'code': 'MR1', 'description': 'Restricted Industrial Zone', 'color': "olive" },
    { 'code': 'MR2', 'description': 'Restricted Industrial Zone', 'color': "aqua" },

     { 'code': 'OS', 'description': 'Open Space Zone', 'color': "silver" },
     { 'code': 'OS_PV', 'description': 'Open Space Zone', 'color': "silver" },


    { 'code': 'P', 'description': 'Automobile Parking Zone', 'color': "plum" },

    { 'code': 'PB', 'description': 'Parking Building Zone', 'color': "wheat" },

    { 'code': 'PF', 'description': 'Public Facilities Zone', 'color': "tan" },
    { 'code': 'PF_UV', 'description': 'Public Facilities Zone', 'color': "tan" },
     { 'code': 'PVSP', 'description': 'Public Facilities Zone', 'color': "tan" }
];

