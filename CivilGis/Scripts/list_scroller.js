

 $(document).ready(function () {

     var _area = document.getElementById('areaID').value;
     var _url = '/api/json/listcontent/' + $("#areaID").val() + '/';
       
       
    
    
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
                                                                },  // ajax
                                                                
                                                                
                                                                 // if you want page style, just remove below scroller section and the comma above
                                                           // ------------ scroller section --------     
                                                               // dom: "frtiS",
                                                                scrollY: 300,
                                                                //scrollX: true,
                                                                deferRender: true,
                                                                scrollCollapse: true,
                                                                scroller: true,
                                                                //stateSave: true,
                                                                //fixedColumns: true,
                                                                /*
                                                                initComplete: function () {
                                                                                                var api = this.api();
                                                                                                api.scroller().scrollToRow( 1000 );
                                                                                            },
                                                                 */
                                                                /*
                                                                scroller: {
                                                                    loadingIndicator: true
                                                                }
                                                                */
                                                          // ------------ scroller section end--------   
                                                                
                                                                /*
                                                                "columns": [
                                                                            
                                                                            { "data": "table_name",
                                                                               
                                                                                                "fnCreatedCell": function (nTd, sData, oData, iRow, iCol) {
                                                                                                    var full_table_name = oData.table_name;
                                                                                                        full_table_name = full_table_name.toLowerCase();
                                                                                                    var _remove_area = _area+"_";
                                                                                                    var trunk_table_name =   full_table_name.replace(_remove_area,"");
                                                                                                   
                                                                                                    $(nTd).html("<a href='/data/scroller/" + _area + "/" + trunk_table_name + "'>" + oData.table_name + "</a>");
                                                                                }
                                                                            }]
                                                                */

                                                                "columnDefs": [{
                                                                    "targets": 0,
                                                                    "data": 0,
                                                                    "render": function (data, type, full, meta) {
                                                                        var full_name = data;
                                                                        full_name = full_name.toLowerCase();
                                                                        var _remove_area = _area + "_";
                                                                        var trunk_name = full_name.replace(_remove_area, "");

                                                                        return '<a href="/data/scroller/' + _area + '/' + trunk_name + '">' + data + '</a>';
                                                                    }
                                                                }]
                                                                
                                                                
                                                                
                                                                
                                                        
                            }); // datatable
                   
                   
                   
                // ajax click row event   
               var table = $('#tabledata').DataTable();
               $('#tabledata tbody').on('click', 'tr', function () {
                                                                        var row_data = table.row( this ).data();
                                                                         //alert(  row_data[0]  );
                                                                        var full_name = row_data[0];
                                                                            full_name = full_name.toLowerCase();
                                                                         var _remove = _area+"_";
                                                                         var trunk_name =   full_name.replace(_remove,"");
                   
                                                                         
                                                                         var _url_new_tab = "/data/scroller/" + _area + "/" + trunk_name + "/";
                                                                         var win = window.open(_url_new_tab, '_self');
                                                                        win.focus();
                                                                         
                                                                     } );    
                   
               
                
                   
             

    }); // document ready function


