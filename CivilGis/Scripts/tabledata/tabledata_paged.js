

 $(document).ready(function () {

       //var base_url = document.getElementById('base_url').value;
      
       var _url = '/api/json/tabledata/' + $("#areaID").val() + '/' + $("#subjectID").val() + '/';
       var _url_header = '/api/json/tableheader/'+ $("#areaID").val() + '/' + $("#subjectID").val() + '/';
     
     
     
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
                                        $("#tableDiv").append('<table id="tabledata" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
                                      //$("#tableDiv").append('<table id="tabledata" class="display nowrap" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead><tfoot><tr>' + tableHeaders + '</tr></tfoot></table>');
                                        

                                        //$('#displayTable').dataTable(json);
                                    },
                                    "dataType": "json"
                                });// ajax
       
       
       
       // must wait until header are build in DOM then can start datatable js
       $.when( build_hearder ).done(function()
                {
    
                            //  datatable
                            $('#tabledata').DataTable({

                                                             renderer: "bootstrap",
                                                           "pagingType": "full_numbers",
                                           
                                                           //for input page number plugin
                                                           //"sPaginationType": "input",
                                                           //"sPaginationType": "scrolling",
                                           
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
                                                                },  // ajax
                                                                
                                                                scrollY: 300,
                                                                scrollX: true
                                                                
                                                                
                                                                
                                                                
                                                                
                                                        
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
                           
                           
                           
                           
                           /* click cell show cell column
                                var table = $('#tabledata').DataTable();
                                $('#tabledata tbody').on('click', 'td', function () {
                                    var idx = table.cell(this).index().column;
                                    var title = table.column(idx).header();
                                    alert('Column title clicked on: ' + $(title).html());
                                });

                        */
                           
                           
                           /* highligting column and rows on mouseover
                           var lastIdx = null;
                           $('#tabledata tbody')
                                                .on( 'mouseover', 'td', function () {
                                                    var colIdx = table.cell(this).index().column;

                                                    if ( colIdx !== lastIdx ) {
                                                        $( table.cells().nodes() ).removeClass( 'highlight' );
                                                        $( table.column( colIdx ).nodes() ).addClass( 'highlight' );
                                                    }
                                                } )
                                                .on( 'mouseleave', function () {
                                                    $( table.cells().nodes() ).removeClass( 'highlight' );
                                                } );
                           
                           */
                            
                   
                }); // when done
                
                
                



       





    }); // document ready function


