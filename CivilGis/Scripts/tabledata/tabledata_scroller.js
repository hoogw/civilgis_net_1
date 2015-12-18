

 $(document).ready(function () {

     var _url = '/api/json/tabledata/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/';
     var _url_header = '/api/json/tableheader/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/';
       
     
            // get column name and build table header and footer in DOM
        var  build_hearder =  $.ajax({
                                    "url": _url_header,
                                    "success": function(json) {
                                       
                                        // must define tableHeaders =""; otherwise, will output "undefineundefine" above header on page.
                                        var tableHeaders="";
                                        
                                        $.each(json.columns, function(i, val){
                                            tableHeaders += "<th>" + val + "</th>";
                                        });

                                        $("#tableDiv").empty();
                                        $("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>'+ tableHeaders + '</tr></tfoot></table>');
                                        //$("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
                                        //$("#tableDiv").find("table thead tr").append(tableHeaders);  

                                        //$('#displayTable').dataTable(json);
                                    },
                                    "dataType": "json"
                                });// ajax
       
       
       
       // must wait until header are build in DOM then can start datatable js
       $.when( build_hearder ).done(function()
                {
    
                            //  datatable
                            $('#tabledata').DataTable({
                                           
                                                            "processing": true,
                                                            "serverSide": true,
                                                            "ajax":{
                                                                    url :_url, // json datasource
                                                                    type: "post",  // method  , by default get
                                                                    error: function(){  // error handling
                                                                            $(".tabledata-error").html("");
                                                                            $("#tabledata").append('<tbody class="tabledata-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                                                                            $("#tabledata_processing").css("display","none");

                                                                    }// error
                                                                },   // ajax
                                                                
                                                            // if you want page style, just remove below scroller section and the comma above
                                                           // ------------ scroller section --------     
                                                               // dom: "frtiS",
                                                                scrollY: 300,
                                                                scrollX: true,
                                                                deferRender: true,
                                                                scrollCollapse: true,
                                                                scroller: true
                                                           /*
                                                                //stateSave: true,
                                                                //fixedColumns: true,
                                                                initComplete: function () {
                                                                                                var api = this.api();
                                                                                                api.scroller().scrollToRow( 1000 );
                                                                                            }
                                                                
                                                                scroller: {
                                                                    loadingIndicator: true
                                                                }
                                                           */
                                                          // ------------ scroller section end--------    
                                        
                            }); // datatable
                            
                            
                            
                            
                             // ajax click row event show row content at bottom 
                            var table = $('#tabledata').DataTable();
                            $('#tabledata tbody').on('mouseover', 'td', function () 
                                   {
                                           var instant_info = "<ul>";
                                                                                    
                                           var colIdx = table.cell(this).index().column;
                                                                                     
                                           var rowIdx =  table.cell(this).index().row;
                                                                                     
                                           table.columns().every( function (cllmnIndex) 
                                                {                                 
                                                   // alert(table.cell(rowIdx, cllmnIndex ).data());
                                                            
                                                  var _property = table.column(cllmnIndex).header();
                                                  var _value = table.cell(rowIdx, cllmnIndex ).data();
                                                    
                                                  instant_info = instant_info + "<li style=\"float:left; list-style: none;\"><span style=\"background-color: #454545;\"><font color=\"white\">&nbsp;"+ $(_property).html() + "&nbsp;</font></span>" + "&nbsp;&nbsp;" + _value + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"+ "</li>";

                                                  instant_info = instant_info + "</ul>";
                                                                                      
                                                } );// loop through each column for that specific row
                                                   
                                                // update bottom <div>
                                             document.getElementById("info-table").innerHTML = instant_info;   
                                                                   
                                   } ); // click cell event    
                            
                            
                         $('#tabledata tbody').on('mouseout', 'td', function () 
                                   {
                                        // empty bottom <div>
                                         document.getElementById("info-table").innerHTML = "";
                            } ); 
                            
                            
                            
                            
                            
                            
                            
                   
                }); // when done
/*
        var table = $('#example').DataTable();
        $('#example tbody').on('click', 'td', function () {
            var idx = table.cell(this).index().column;
            var title = table.column(idx).header();
            alert('Column title clicked on: ' + $(title).html());
        });

*/

    }); // document ready function


