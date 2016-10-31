// var api_url = "http://156.148.37.167:3010/api/v1/";
 var api_url = _brokerMsUrl;

 
 
 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function getDateFromObjectId(objectId)
{
 var d = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    
 var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear();
 
    return datestring;
}

var limit;
var page;
var pages;
var total;

var var_par        = '?';
var var_name       = getParameterByName('name');
var var_category   = getParameterByName('category');
var var_tag        = getParameterByName('tag');


if (var_name) var_par = var_par + '&name=' + var_name;
if (var_category) var_par = var_par + '&category=' + var_category;
if (var_tag) var_par = var_par + '&tag=' + var_tag;
var_par = var_par.replace("?&", "?");


/******************************************************/
/* Document ready */

$( document).ready(function() {
    
    $('#product').val(var_name);
    get_list(var_par);
    
    
});



/******************************************************************/
/* Actions */

$( "#btn_search" ).click(function(e) {
      
    block('Please wait');  
    
    $('#product').val();
       var str_param  = '?';
       if ($('#product').val())
            str_param = str_param + 'name=' + ($('#product').val()).trim();
       if ($('#category').val())
            str_param = str_param + 'category=' + ($('#category').val()).trim();
       if ($('#tags').val())
            str_param = str_param + 'tags=' + ($('#tags').val()).trim();  
      str_param = str_param.replace("?&", "?");
       
      get_list(str_param);
      //$(document).ajaxStop($.unblockUI);
      //setTimeout(alert(10), 1000);
      
      
  
      
    });
    
    
    
    


    

    
/***************************************************************/    
/* render widget */

function render_row(data, var_par)
{
    $('#divNoResult').css('display', 'none');
    
    
    var link = '';
    
    var tab = '';
                                    for (var i = 0; i < data.docs.length; i++) {
                                    
                                            tab += '<tr>'
                                    + '<td>'
                                    + '    <img class="rounded-x" style="width: 80%; height: 80%" src="'; 
                                    if (data.docs[i].logo) 
                                        tab = tab +  data.docs[i].logo; 
                                    else 
                                        tab = tab +  'assets/img/testimonials/user.jpg';
                                    tab = tab +  '" alt="logo">'
                                    + '</td>'
                                    + '<td>'
                                    + '    <h3><a href="#">' + data.docs[i].name + '</a></h3>'
                                    + '    <p>Descr</p>'
                                    + '    <small class="hex"><span data-i18n="product.tabLabelRegistration"></span>'+ getDateFromObjectId(data.docs[i]._id) +'</small>'
                                    + '<div><br><a class="a_productList" data-id="' + data.docs[i]._id + '" style="cursor: pointer" data-i18n="product.tabMsgProduct"></a></div>'
                                    + '<div id="divListProducts' + data.docs[i]._id + '" style="display: none"></div><br>'
                                    + '</td>'
                                     
                                    + '  <!--  <span><a href="#">' + data.docs[i].email + '</a></span>';
                                    if (data.docs[i].website) tab = tab + '<span><a href="#">'+ data.docs[i].website +'</a></span>';
                                    if (data.docs[i].phone) tab = tab + '<span>'+ data.docs[i].phone +'</span>';
                                    tab = tab + '</td> -->'
                                    + '<td>'
                                    // if (data.docs[i].rates)
                                    tab = tab +  '    <ul class="list-inline star-vote" style="display: inline-flex">'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-half-o"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>'
                                    + '    </ul>';
                                    
                                    
                                    tab = tab +   '</td>'
                                    
                                    + '<td>'
                                    + '<button class="btn-u btn-block rounded sDetails" type="button" data-par="'+var_par+'" data-id="'+ data.docs[i]._id +'"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span><span data-i18n="buttons.details"></span></button>';
                                    
                                    + '</td>' 
                                + '</tr>';
                                          
                                      
                                      
                                      }
                                      $('#t_list').append(tab);                  
                                
                                
                                
                                
                                $('.sDetails').click(function(){
                                      var id = ($(this).attr('data-id'));
                                      var par = ($(this).attr('data-par'));
                                      
                                      link = ('page_catalog.html?'+par+'&idSupplier='+id).replace("??", "?").replace("?&", "?");
                                      window.location.href = link;
                                        
                                });
                                
                                
                                $('.a_productList').click(function(){
                                      var id = ($(this).attr('data-id'));
                                      
                                      var str_par = '?supplierId=' + $(this).attr('data-id') + '&limit=3';
                                      
                                      if (var_name)     str_par =   str_par + '&name=' + var_name;
                                      if (var_category) str_par =   str_par + '&categories=' + var_category;
                                      if (var_tag)      str_par =   str_par + '&tag=' + var_tag;

                                      
                                          
                                      if($('#divListProducts' + id).css('display') == 'block')
                                      {
                                          $('#divListProducts' + id).css('display', 'none');
                                          $('#divListProducts' + id).empty();
                                      }
                                      else
                                      {
                                          getProductsSupplier(id, str_par);
                                      }
                                      
                                      
                                });
                                
                                
}


function render_paginate(tot_page, act_page, var_par)
{
   if (!var_par)
        var_par = '';
        
    $('#divSearch_table').css('display', 'block');
                                          
    
    var str = '<div class="text-left" id="divPagination">'
    + '<ul class="pagination"><li><a ';
   if (act_page > 1) 
        str = str + ' href="#" class="p_link" ';
     
    str = str + 'data-par="'+var_par+'" data-page="' + (act_page - 1) + '"><span class="glyphicon glyphicon-backward" aria-hidden="true"></span></a></li>';
    
            var start;
            var limit;
            var check_Active = '';
                
    
                if (tot_page <=4)
                {
                    start = 1;
                    limit = tot_page;
                }
                else if (act_page < 4)
                {
                    start = 1;
                    limit = 4;
                }
                else if (act_page == tot_page)
                {
                    str = str + '<li><a href="#" class="p_link" data-par="'+var_par+'" data-page="1">1</a></li>'
                        + '<li><a>...</a></li>';
                          
                    
                    start = tot_page - 3;
                    limit = tot_page;
                
                
                }
                else if (act_page >= 4)
                {
                    str = str + '<li><a href="#" class="p_link" data-par="'+var_par+'" data-page="1">1</a></li>'
                        + '<li><a>...</a></li>';
                          
                    
                    start = act_page - 1;
                    if (act_page + 2 < tot_page)
                            limit = act_page + 1;
                        else
                            limit = tot_page;
                
                
                }
                
                
                
                
                
                for (var i = start; i <= limit; i++)
                {
                    check_Active = '';
                    if (act_page == i)
                    if (page == i)
                        check_Active = 'class="active"';
                    
                    str = str + '<li '+ check_Active +'><a href="#" class="p_link" data-par="'+var_par+'" data-page="'+i+'">'+i+'</a></li>';
                }
                    
                                
                   
                if ((tot_page > ((act_page - 1) + 3)))
                {
                    str = str + '<li><a>...</a></li>';
                    str = str + '<li><a href="#" class="p_link" data-par="'+var_par+'" data-page="'+tot_page+'">'+tot_page+'</a></li>';
                }
    
    
    
    str = str  
    + '<li><a ';
    if (act_page < tot_page) 
    str = str + 'href="#" class="p_link"';
    str = str + ' data-par="'+var_par+'" data-page="'+(act_page + 1)+'">' 
    +'<span class="glyphicon glyphicon-forward" aria-hidden="true"></span></a></li>'
    + '</ul></div>';
    
    $('#t_paginate').append(str);
    
    $('.p_link').click(function(){
        
        var page = ($(this).attr('data-page'));
        var par = ($(this).attr('data-par'));
          
          var str_prm = par + '?page='+page;
          
          $('#divPagination').remove();
          
          get_list(str_prm);                            
                                        
    });
}



/**************************************************************/
/* proxy data */
function get_list(var_par)
{
    $.ajax({
                                  type: "GET",
                                  url: api_url + "products/supplier" + var_par,
                                  data: 
                                  {
                                    
                                  },

                                  dataType: "json",
                                  success: function(data)
                                  {
                                      limit     = data.limit;
                                      page      = data.page;
                                      pages     = data.pages;
                                      total     = data.total;
                                      
                                      $('#t_list').empty();
                                      $('#t_paginate').empty();
                                          
                                      
                                      
                                      if (data.total > 0)
                                      {
                                          render_row(data, var_par);
                                          if (pages > 1)
                                          {
                                              render_paginate(pages, page);
                                          }
                                          
                                          $("#divSearch_table").localize();
                                          
                                      setTimeout($.unblockUI, 1000);      
                                      }
                                      else
                                      {
                                          $('#divSearch_table').css('display', 'none');
                                          $('#divNoResult').css('display', 'block');
                                      }
                                      
                                                                              
                                  },
                                  error: function()
                                  {
                                    alert("Errore di caricamento");
                                  }
});
}

function getProductsSupplier(id, var_par)
{
    $.ajax({
                                  type: "GET",
                                  url: api_url + "products" + var_par,
                                  dataType: "json",
                                  success: function(data)
                                  {
                                      $('#divListProducts' + id).empty();
                                      $('#divListProducts' + id).css('display', 'block');
                                      
                                      var str_listProducts2 = '<table>';
                                      
                                      for (var c = 0; c < data.total; c++) {
                                          str_listProducts2 = str_listProducts2 + '<tr>'
                                        + '<td style="padding-top: 5px" ><span class="glyphicon glyphicon-chevron-right"></span>&nbsp;'+ data.docs[c].name+'</td>'
                                        + '</tr>';
                                      } 
                                      
                                      str_listProducts2 = str_listProducts2 + '</table>';
                                      
                                      $('#divListProducts' + id).append(str_listProducts2); 
                                  },
                                  error: function()
                                  {
                                    alert("Errore di caricamento");
                                  }
});
}



/***********************************************/

function block(msg)
{
    $.blockUI({ 
        message: '<img src="assets/img/balls.gif"><span font-weight: bold">&nbsp;'+ msg +'</span>',
            css: { 
            border: 'none', 
            padding: '15px', 
            backgroundColor: '#000', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: .5, 
            color: '#fff' 
        } });
        
        //setTimeout($.unblockUI, 8000);
}