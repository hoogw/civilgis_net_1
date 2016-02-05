

 $(document).ready(function () {

     var _area = document.getElementById('areaID').value;
     var _url = '/api/geojson/maplistcontent/' + $("#areaID").val() + '/';
       
       
    
    
                            //  datatable
                            $('#tabledata').DataTable({
                                           
                                                           
                                                            "ajax":{
                                                                    url :_url, // json datasource
                                                                    type: "post",  // method  , by default get
                                                                    error: function(){  // error handling
                                                                            $(".tabledata-error").html("");
                                                                            $("#tabledata").append('<tbody class="tabledata-error"><tr><th colspan="3">No data found in the server</th></tr></tbody>');
                                                                            $("#tabledata_processing").css("display","none");

                                                                    },// error
                                                                "dataSrc": ""
                                                                },  // ajax
                                                                
                                                                
                                                                 // if you want page style, just remove below scroller section and the comma above
                                                           // ------------ scroller section --------     
                                                               // dom: "frtiS",
                                                                scrollY: 300,
                                                                //scrollX: true,
                                                                deferRender: true,
                                //scrollCollapse: true, //only use it on client side, Do not use it on server side, it cause not draw, not send request to server until 25 record after 
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
                                                                
                                                                "columnDefs": [{
                                                                    "targets": 1,
                                                                    "data": 1,
                                                                    "render": function (data, type, full, meta) {
                                                                        var full_name = data;
                                                                        full_name = full_name.toLowerCase();
                                                                        var _remove_area = _area + "_";
                                                                        var trunk_name = full_name.replace(_remove_area, "");

                                                                        return '<a href="/localmap/localsimplemap/' + _area + "/" + trunk_name + '">' + data + '</a>';
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
                   
                                                                         
                                                                         var _url_new_tab = "/localmap/localsimplemap/" + _area + "/" + trunk_name + "/";
                                                                         var win = window.open(_url_new_tab, '_self');
                                                                        win.focus();
                                                                         
                                                                     } );    
                   
               
                
                   
             

    }); // document ready function


