//* Link api ******************************************/
// var api_url = "http://156.148.37.167:3010/api/v1/";
 var api_url = _brokerMsUrl;
 var lang =   localStorage.lng;
 
 var limit;
 var page;
 var pages;
 var total;



// inizializzo i parametri di ricerca dalla url
var arr_par = get_par('url');

//******************************************************/
// Document ready */

$( document).ready(function() {
    
    if (arr_par[0].type_search == 'p')
        $('#searchTitle').text(i18next.t("product.searchProductTitle")); 
    else
        $('#searchTitle').text(i18next.t("product.searchSupplierTitle"));
    $("#searchTitle").localize();    
    
    
    renderDropCategories(arr_par[0].id_category, arr_par[0].cat_name);
    
    
    //assegnazione dei parametri ai campi del form
    init_form(arr_par);
    
    //if (arr_par.length == 0)
    //   refresh_param();
    
    
    $('#ckProduct').click(function(e) {
        $(".search_select").attr("checked", false);
        $("#category").val('');        
        
        if ($("#ckProduct").is(':checked') == false)
            {
                $("#ckProduct").attr("checked", "true");
                $("#product").attr("placeholder", i18next.t("product.searchLabelProducts"));
                $('#searchTitle').text(i18next.t("product.searchProductTitle"));
            }
            $("#spanProduct").css("display", "block");
            
    
    });
    
    
   $('#ckSupplier').click(function(e) {
        $(".search_select").attr("checked", false);
        $("#category").val('');        
        
        if ($("#ckSupplier").is(':checked') == false)
            {
                $("#ckSupplier").attr("checked", "true");
                $("#product").attr("placeholder", i18next.t("product.searchLabelProducts"));
                $('#searchTitle').text(i18next.t("product.searchSupplierTitle"));
            }
            $("#spanSupplier").css("display", "block");
    });
    
   
    // creazione della lista dei supplier
    get_list(arr_par);
    
    
    
    // associazione action button alla tastiera
    $(document).keypress(function(e){
    if (e.which == 13){
        $("#btn_search").click();
    }
});


/*
$( document).on('translate')(function()
{});
*/

});



//******************************************************************/
//* Actions -> azioni presenti nella pagina */

$( "#btn_search" ).click(function(e) {
      
    block('Please wait');  
    
    get_list(get_par('page'));
      
    });
    
    
    
$('#divSearchMsg').click(function(e)
{
    render_searchInput();
});    


    

    
//***************************************************************/    
//* render widget -> crea gli elementi dinamici presenti nella pagina */

function render_row(data, arr_par)
{
    var_par = get_par_string(arr_par);
    
    $('#divNoResult').css('display', 'none');
    
    
    var link = '';
    
    var _str = '';
                                    
                                    
                      if (arr_par[0].type_search == 's')
                      {              
                          _str = _str +'<div class="table-search-v2" id="divSearch_table">';
                            _str = _str +'<div class="table-responsive" >';
                                _str = _str +'<table class="table table-bordered table-striped" >';
                                    _str = _str +'<thead>';
                                    _str = _str +'<tr>';
                                        _str = _str +'<th style="width: 10%" data-i18n="product.thLogo"></th>';
                                        _str = _str +'<th class="hidden-sm" style="width: 70%" data-i18n="product.thAbout"></th>';
                                        _str = _str +'<th style="width: 10%" data-i18n="product.thRates"></th>';
                                        _str = _str +'<th style="width: 10%" data-i18n="product.thAction"></th>';
                                    _str = _str +'</tr>';
                                    _str = _str +'</thead>';
                                    _str = _str +'<tbody id="t_list">';
                                    
                                    
                                            
                          
                          
                          
                          for (var i = 0; i < data.docs.length; i++) {
                                    
                                    //console.log(data.docs[i]);
                                    
                                    str_rates = render_rates(data.docs[i].rates.overall_rate);
                                        
                                        link = ('page_catalog.html?'+var_par+'&idSupplier='+data.docs[i]._id).replace("??", "?").replace("?&", "?");    
                                        
                                            _str += '<tr>'
                                    + '<td>'
                                    + '    <img class="rounded-x" style="width: 100px" src="'; 
                                    if (data.docs[i].logo) 
                                        _str = _str +  data.docs[i].logo; 
                                    else 
                                        _str = _str +  'assets/img/testimonials/user.jpg';
                                    _str = _str +  '" alt="logo">'
                                    + '</td>'
                                    + '<td>'
                                    + '    <h3><a class="aName" href="page_catalog.html?'+link+'">' + data.docs[i].name + '</a></h3>'
                                    + '    <p>Descr</p>'
                                    + '    <small class="hex"><span data-i18n="product.tabLabelRegistration"></span>'+ getDateFromObjectId(data.docs[i]._id) +'</small>'
                                    + '<div><br><a class="a_productList" data-id="' + data.docs[i]._id + '" style="cursor: pointer" data-i18n="product.tabMsgProduct"></a></div>'
                                    + '<div id="divListProducts' + data.docs[i]._id + '" style="display: none"></div><br>'
                                    + '</td>'
                                     
                                    + '  <!--  <span><a href="#">' + data.docs[i].email + '</a></span>';
                                    if (data.docs[i].website) _str = _str + '<span><a href="#">'+ data.docs[i].website +'</a></span>';
                                    if (data.docs[i].phone) _str = _str + '<span>'+ data.docs[i].phone +'</span>';
                                    _str = _str + '</td> -->'
                                    + '<td>'
                                    // if (data.docs[i].rates)
                                    _str = _str +  str_rates;
                                    
                                    
                                    _str = _str +   '</td>'
                                    
                                    + '<td>'
                                    + '<button class="btn-u btn-block rounded sDetails" type="button" data-par="'+var_par+'" data-id="'+ data.docs[i]._id +'"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span><span data-i18n="buttons.details"></span></button>';
                                    
                                    + '</td>' 
                                + '</tr>';
                                          
                                      
                                      
                                      }
                                      
                                _str = _str +'</tbody>';
                                _str = _str +'</table>';
                                _str = _str +'</div>';
                                _str = _str +'</div>';        
                                      
                                      
                                      $('#div_list').append(_str);                  
                                
                                
                                
                                
                                
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
                      else
                      if (arr_par[0].type_search == 'p')
                      {             
                                    _str = '';
                                    
                                    
                                    var _img;
                                    
                                    
                                    for (var i = 0; i < data.docs.length; i++) {        
                                    
                                        if (
                                        data.docs[i].images &&  data.docs[i].images.length > 0
                                        ) 
                                        {
                                             _img = _brokerMsUrl + 'files/' + data.docs[i].images[0].imageId+'?tag=t'; 
                                        }
                                        else
                                             _img = 'assets/img/team/img1-md.jpg';
                                            
                                        
                                        
                                        
                                    _str += '<div class="row">';
                                    
                                    _str +=     '<div class="col-md-2 text-center" href="#">';
                                    _str +=         '<img class="media-s100 img-circle" src="' + _img +'" alt="" style="cursor:pointer; height: 100px; width:100px">';
                                    _str +=     '</div>';
                                    
                                    
                                    
                                    _str +=     '<div class="col-md-8">';
                                    _str +=         '<div class="clearfix" style="overflow:hidden; ">';
                                    _str +=             '<h4 class="media-heading">';
                                    _str +=                 '<strong style="display:block;"><a href="#">'+data.docs[i].name+'</a></strong>';
                                    _str +=                 '<small style="display:block; max-width:50%;">'+data.docs[i].categories[0].name[lang]+'</small>';
                                    _str +=             '</h4>';
                                    _str +=         '</div><br>';
                                    _str +=         '<div class="giveMeEllipsis blog-author-desc"><span>'+data.docs[i].supplierId.name +'&nbsp;&nbsp;&nbsp;&nbsp;</span><span>'+ render_rates(data.docs[i].supplierId.rates.overall_rate);+'</span></div>';
                                    _str +=         '<div class="giveMeEllipsis blog-author-desc">'+data.docs[i].description+'</div>';
                                    
                                    _str +=         '<ul class="list-inline share-list">';  
                                    _str +=             '<li><i class="fa fa-chevron-up"></i><span data-i18n="catalog.atleast">Min</span> '+checkValue(data.docs[i].minNum)+'</li>';
                                    _str +=             '<li><i class="fa fa-chevron-down"></i><span data-i18n="catalog.atmost">Max</span> '+checkValue(data.docs[i].maxNum)+'</li>';
                                    _str +=             '<li><i class="fa fa-calendar-o"></i><span data-i18n="catalog.deliveryIn">Consegna in</span> '+checkValue(data.docs[i].deliveryIn); 
                                    _str +=                 '<span data-i18n="catalog.days"> giorni</span></li>';
                                    _str +=             '<li><i class="fa fa-inbox"></i><span data-i18n="catalog.availability"></span><span> ' +checkValue(data.docs[i].availability)+' '+data.docs[i].unit+'</span></li>';
                                    _str +=             '<li><i class="fa fa-euro"></i><span> ' +checkValue(data.docs[i].price)+ ' <span class="fa fa-euro"></span> per '+data.docs[i].unit+'</span></li>';
                                    _str +=             '<li style="text-align: right; font-weight: bold">Score:<span> ' +checkValue(data.docs[i].score)+ ' </span></li>';
                                    _str +=         '</ul>';
                                     
                                    _str +=     '</div></div>';
                                     
                                    _str += '<div class="col-md-2 text-left">';
                                    _str += '<button class="btn-u  rounded btn-sm sDetails" type="button" data-par="'+var_par+'" data-id="'+ data.docs[i].supplierId._id +'"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span><span data-i18n="buttons.details"></span></button>';
                                    _str += '</div>';
                                        
                                    _str += '</div>';
                                    
                                    _str += '<hr>';
                                    
                                    
                                }
                                    
                                    $('#div_list').append(_str);
                                    
                      }
                      
                        $('.sDetails').click(function(){
                              var id = ($(this).attr('data-id'));
                              var par = ($(this).attr('data-par'));
                              
                              link = ('page_catalog.html?'+par+'&idSupplier='+id).replace("??", "?").replace("?&", "?");
                              window.location.href = link;
                                
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


function render_rates(_rates)
{
    
    var tab = '<ul class="list-inline star-vote" style="display: inline-flex">';
    
    
    
    switch (_rates) {
      case 1:
            tab = tab +  '    <ul class="list-inline star-vote" style="display: inline-flex">'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>'
                                    + '    </ul>';
      break;
      case 2:
            tab = tab +  '            <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>';
                                    
      break;
      case 3:
            tab = tab +  '    <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>';
                                    
      break;
      case 4:
            tab = tab +  '    <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star-o"></i></li>';
                                    
      break;
      case 5:
            tab = tab +  '    <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>'
                                    + '        <li><i class="color-green fa fa-star"></i></li>';
      break;
      
        
        
    }
    
    tab = tab +  '    </ul>';
    
    
    return tab;
    
}


function renderDropCategories(id_category, cat_name)
{
       /*
        if (id_category)
        {
            $('#search_concept').text(cat_name);
            $('.input-group #id_category').val(id_category);
            $('.input-group #cat_name').val(cat_name);
        }
        else
        {
            $('#search_concept').attr("placeholder", i18next.t("profile.categories"));
        }
        */    
        $.ajax({
                                  type: "GET",
                                  url: api_url + "categories/drop?liv=2&lang="+lang,
                                  data: 
                                  {
                                    
                                  },

                                  dataType: "json",
                                  success: function(data)
                                  {
                                      var str = '';  
                                      for (var i = 0; i < data.length; i++) {
                                          
                                      
                                        str = str + '<li><a href="#'+data[i]._id+'">'+data[i].name[lang]+'</a></li>';
                                        console.log(lang);
                                      }
                                      
                                      $('.dropdown-menu').append(str);
                                      
                                      $('.search-panel .dropdown-menu').find('a').click(function(e) {
                                        e.preventDefault();
                                        var param = $(this).attr("href").replace("#","");
                                        var concept = $(this).text();
                                        $('.search-panel span#search_concept').text(concept);
                                        $('.input-group #id_category').val(param);
                                        $('.input-group #cat_name').val(concept);
                                        });
                                                                      
                                  },
                                  error: function()
                                  {
                                    alert("Errore di caricamento");
                                  }
});
        
    }

//**************************************************************/
//* proxy -> chaimate ajax alle api data*/


// estrae tutti i supplier associati ai prodotti cercati
function get_list(_arr_par)
{
    if (_arr_par[0].type_search == 's')
         url = "products/supplier";                           
    else
    {
        url = "products";
    }
    
    _var_par = get_par_string(_arr_par);
    
    console.log(api_url + url  + _var_par);
    $.ajax({
                                  type: "GET",
                                  url: api_url + url  + _var_par,
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
                                      
                                      $('#div_list').empty();
                                      $('#t_paginate').empty();
                                          
                                      if (data.total > 0)
                                      {
                                          $('#divSearch_table').css('display', 'block');
                                          $('#divNoResult').css('display', 'none');
                                          
                                           
                                          
                                          render_row(data, _arr_par);
                                          if (pages > 1)
                                          {
                                             
                                              
                                              render_paginate(pages, page, arr_par);
                                          }
                                      }
                                      else
                                      {
                                          $('#divSearch_table').css('display', 'none');
                                          $('#divNoResult').css('display', 'block');
                                          
                                          if(_arr_par[0].type_search == 'p')
                                          {
                                            $("#titleNoResult").text(i18next.t("product.noProductSearch"));
                                            }
                                          else
                                          {
                                            $("#titleNoResult").text(i18next.t("profile.noSupplierSearch"));
                                          }
                                          $("#titleNoResult").localize();
                                      }
                                      $("#div_list").localize();
                                      setTimeout($.unblockUI, 500);
                                      
                                                                              
                                  },
                                  error: function()
                                  {
                                    alert("Errore di caricamento");
                                  }
});
}


// estrae tutti i prodotti associati al dato supplier in relazione ai parametri di ricerca effettuata
function getProductsSupplier(id, _arr_par)
{
    _arr_par[0].cat_name= '';
    _arr_par[0].page= '';
    _arr_par[0].type_search= '';
    _var_par =get_par_string(_arr_par);
    
    $.ajax({
                                  type: "GET",
                                  url: api_url + "products" + _var_par + '&supplierId=' + id,
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


// inizializza i parametri della ricerca
// assegna i parametri url ai campi del form

function init_form(arr_par)
{
    if (arr_par[0].name)
    {
        $('#product').val(arr_par[0].name);
    }
    
    if (arr_par[0].id_category)  
    {
        $('#search_concept').text(arr_par[0].cat_name);
        $('.input-group #id_category').val(arr_par[0].id_category);
        $('.input-group #cat_name').val(arr_par[0].cat_name);
    }
    else
    {
        $('#search_concept').text(i18next.t("profile.categories"));
    } 
    
    if (arr_par[0].type_search == 's')
    {
        $("#ckSupplier").attr("checked", true);
        $("#ckProduct").attr("checked", false);
    }
    else
    {
        $("#ckProduct").attr("checked", true);
        $("#ckSupplier").attr("checked", false);
    }
}


// refresh della pagina 
// al refresh devo allineare i dati passati alla url di rcerca con i dati del form
    
function refresh_param()
{
    if ($('#product').val())
        arr_par[0].name = $('#product').val();
    if ($('#cat_name').val())
        arr_par[0].cat_name = $('#cat_name').val();
    if ($('#id_category').val())
        arr_par[0].id_category = $('#id_category').val();
    if ($("#ckSupplier").is(':checked') == false)
    {
        arr_par[0].type_search == 's';
    }
    else
        arr_par[0].type_search == 'p';    
}
    


// crea array con i filtri di ricerca dalla url o dagli input di pagina
function get_par(_from)
{
    var array_par = [];
    
    if (_from == 'url')
    {
    array_par.push({"name":     getParameterByName('name')
            , "cat_name":       getParameterByName('cat_name')
            , "id_category":    getParameterByName('id_category')
            , "type_search":    getParameterByName('type_search')
            , "page":           getParameterByName('page')});
    }
    else if (_from == 'page')
    {
        var _type = 's';
        
        if ($("#ckProduct").is(':checked') == true)
        {
            _type = 'p';
        }
        
        
        array_par.push({"name": $('#product').val()
        , "cat_name":       $('#cat_name').val()
        , "id_category":    $('#id_category').val()
        , "type_search":    _type
        , "page": ''});
    }
    
    //allinea la variabile globale arr_par
    arr_par = array_par;
        
    return array_par;
}

// crea la get dei parametri
function get_par_string(array_par)
{
    var var_par        = '?';
    if (array_par[0].name)          var_par = var_par + '&name=' + array_par[0].name;
    if (array_par[0].cat_name)      var_par = var_par + '&cat_name=' + array_par[0].cat_name;
    if (array_par[0].id_category)   var_par = var_par + '&id_category=' + array_par[0].id_category;
    if (array_par[0].type_search)   var_par = var_par + '&type_search=' + array_par[0].type_search;
    if (array_par[0].tag)           var_par = var_par + '&tag=' + array_par[0].tag;
    if (array_par[0].page)          var_par = var_par + '&page=' + array_par[0].page;

    var_par = var_par.replace("?&", "?");
    
    return var_par;
}



//************************************************/
//* common function 


// preleva un dato parametro dalla url 
function getParameterByName(name) 
{
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

// check valore render div
function checkValue(value)
{
    if (value)
    {
       return value; 
    }
    else
    {
        return(' -- ');
    }    
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