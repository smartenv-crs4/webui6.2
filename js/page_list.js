//* Link api ******************************************/
// var api_url = "http://156.148.37.167:3010/api/v1/";
 var api_url = _brokerMsUrl;

 var limit;
 var page;
 var pages;
 var total;



// inizializzo i parametri di ricerca dalla url
var arr_par = get_par('url');




//******************************************************/
// Document ready */

$( document).ready(function() {
    
    autoCompleteCat("categories");
    $("#categories").typeahead('val', '');
    
    
    // set degli input della pagina in caso di provvenienza da altre pagine
    if (arr_par[0].name)  
    {
        $('#product').val(arr_par[0].name);
    }
    if (arr_par[0].categories)
    {
        $('#categories').data("cat-id", arr_par[0].categories);
        
    }
    if (arr_par[0].cat_name)
    {
        $('#categories').data("cat-name", arr_par[0].cat_name);
        $("#categories").typeahead('val',arr_par[0].cat_name);
    }
    
    
    // refresh della pagina 
    
    if ($('#product').val())
        arr_par[0].name = $('#product').val();
    
    
    if ($('#categories').attr('#cat-id'))
        arr_par[0].categories = $('#categories').data('cat-id');
    if ($('#categories').attr('#cat-name'))
        arr_par[0].cat_name = $('#categories').data('cat-name');
    
    // creazione della lista dei supplier
    get_list(arr_par);
    
    
});



//******************************************************************/
//* Actions -> azioni presenti nella pagina */

$( "#btn_search" ).click(function(e) {
      
    block('Please wait');  
    
    get_list(get_par('page'));
      
    });
    
    
    
$('#divSearchMsg').click(function(e){
    render_searchInput();
});    


    

    
//***************************************************************/    
//* render widget -> crea gli elementi dinamici presenti nella pagina */

function render_row(data, arr_par)
{
    var_par = get_par_string(arr_par);
    
    $('#divNoResult').css('display', 'none');
    
    
    var link = '';
    
    var tab = '';
                                    for (var i = 0; i < data.docs.length; i++) {
                                    
                                            tab += '<tr>'
                                    + '<td>'
                                    + '    <img class="rounded-x" style="width: 100px;" src="'; 
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
                                          
                                      if($('#divListProducts' + id).css('display') == 'block')
                                      {
                                          $('#divListProducts' + id).css('display', 'none');
                                          $('#divListProducts' + id).empty();
                                      }
                                      else
                                      {
                                          getProductsSupplier(id, arr_par);
                                      }
                                      
                                      
                                });
                                
                                
}


function render_paginate(tot_page, act_page, arr_par)
{
   var_par = get_par_string(arr_par);
    
    
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
        
        arr_par[0].page = $(this).attr('data-page');
        
        console.log(arr_par);
          
          $('#divPagination').remove();
          
          get_list(arr_par);                            
                                        
    });
}

function render_searchInput()
{
    if ($("#divSearch1").css("display") == 'none')
    {
        $("#divSearch1").css("display", "block");
        $("#divSearch2").css("display", "none");
    }
    else if ($("#divSearch2").css("display") == 'none')
    {
        $("#divSearch1").css("display", "none");
        $("#divSearch2").css("display", "block");
    }     
}

//**************************************************************/
//* proxy -> chaimate ajax alle api data*/


// estrae tutti i supplier associati ai prodotti cercati
function get_list(arr_par)
{
    //console.log($("#categories").typeahead('val'));
                                              if ($("#categories").typeahead('val') == '')
                                              {
                                                  arr_par[0].cat_name = '';
                                                 arr_par[0].categories = ''; 
                                                 console.log(arr_par);
                                              }
    
    var_par =get_par_string(arr_par);
    
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
                                          $('#divSearch_table').css('display', 'block');
                                          $('#divNoResult').css('display', 'none');
                                          
                                           
                                          
                                          render_row(data, arr_par);
                                          if (pages > 1)
                                          {
                                             
                                              
                                              render_paginate(pages, page, arr_par);
                                          }
                                          
                                          $("#divSearch_table").localize();
                                          
                                            
                                      }
                                      else
                                      {
                                          $('#divSearch_table').css('display', 'none');
                                          $('#divNoResult').css('display', 'block');
                                      }
                                      setTimeout($.unblockUI, 500);
                                      
                                                                              
                                  },
                                  error: function()
                                  {
                                    alert("Errore di caricamento");
                                  }
});
}


// estrae tutti i prodotti associati al dato supplier in relazione ai parametri di ricerca effettuata
function getProductsSupplier(id, arr_par)
{
    arr_par[0].cat_name= '';
    arr_par[0].page= '';
    var_par =get_par_string(arr_par);
    
    $.ajax({
                                  type: "GET",
                                  url: api_url + "products" + var_par + '&supplierId=' + id,
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




//************************************************/
//* page function 

// crea array con i filtri di ricerca dalla url o dagli input di pagina
function get_par(_from)
{
    var array_par = [];
    
    if (_from == 'url')
    {
    array_par.push({"name": getParameterByName('name')
        , "cat_name": getParameterByName('cat_name')
        , "categories": getParameterByName('categories')
        , "tag": getParameterByName('tag')
        , "page": getParameterByName('page')});
    }
    else if (_from == 'page')
    {
    array_par.push({"name": $('#product').val()
        , "cat_name": $('#categories').data("cat-name")
        , "categories": $('#categories').data("cat-id")
        , "tag": $('#tags').val()
        , "page": ''});
    }
   
    return array_par;
}

// crea la get dei parametri
function get_par_string(array_par)
{
    var var_par        = '?';
    if (array_par[0].name)          var_par = var_par + '&name=' + array_par[0].name;
    if (array_par[0].cat_name)      var_par = var_par + '&cat_name=' + array_par[0].cat_name;
    if (array_par[0].categories)    var_par = var_par + '&categories=' + array_par[0].categories;
    if (array_par[0].tag)           var_par = var_par + '&tag=' + array_par[0].tag;
    if (array_par[0].page)          var_par = var_par + '&page=' + array_par[0].page;

    var_par = var_par.replace("?&", "?");
    
    return var_par;
}



//************************************************/
//* common function 


// preleva un dato parametro dalla url 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// estrae la data da una variabile di tipo ObjectId
function getDateFromObjectId(objectId)
{
 var d = new Date(parseInt(objectId.substring(0, 8), 16) * 1000);
    
 var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear();
 
    return datestring;
}



//***********************************************/

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
