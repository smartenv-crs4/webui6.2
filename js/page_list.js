//* Link api ******************************************/
 //var api_url = "http://156.148.37.167:3011/api/v1/";
 var api_url    = _brokerMsUrl;
 var lang       = localStorage.lng;
 var trend_url  = _trendsMsUrl;
 
 
 var limit;
 var page;
 var pages;
 var total;



// inizializzo i parametri di ricerca dalla url
var arr_par = get_par('url');

if (!arr_par[0].type_search)
    arr_par[0].type_search = 'p';

//******************************************************/
// Document ready */

$( document).ready(function() {
    
    
    
    if (arr_par[0].type_search == 'p')
        $('#searchTitle').text(i18next.t("product.searchProductTitle")); 
    else
        $('#searchTitle').text(i18next.t("product.searchSupplierTitle"));
    $("#searchTitle").localize();    
    
    
    renderDropCategories(arr_par[0].id_category, arr_par[0].cat_name, arr_par[0].cat_type);
    
    
    //assegnazione dei parametri ai campi del form
    init_form(arr_par);
   
    
    
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



$(document).on('translate', function()
{
    
    $(window.location).attr('href', 'list.html'+ get_par_string(get_par('page')));
    //console.log(get_par('url'));
    //console.log(api_url);
//alert(localStorage.lng);
});

// gestioen dinamica menu sinistra
if(sessionStorage.type)
    {
        $('#content-list').addClass('col-lg-9');
    }



});



//******************************************************************/
//* Actions -> azioni presenti nella pagina */

$( "#btn_search" ).click(function(e) 
{
      
    block('<span id="blockMsg"></span>');  
    $('#blockMsg').text(i18next.t("product.blockMsg"));
    
    
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
                          
                          
                        /*  
                          _str = _str +'<div class="table-search-v2" id="divSearch_table">';
                            _str = _str +'<div class="table-responsive" >';
                                _str = _str +'<table class="table table-bordered table-striped " >';
                                    _str = _str +'<thead>';
                                    _str = _str +'<tr>';
                                        _str = _str +'<th  data-i18n="product.thLogo"></th>';
                                        _str = _str +'<th class=""  data-i18n="product.thAbout"></th>';
                                       _str = _str +'<th class="hidden-xs"  data-i18n="product.thAction"></th>';
                                    _str = _str +'</tr>';
                                    _str = _str +'</thead>';
                                    _str = _str +'<tbody id="t_list">';
                                    
                                    
                        */                    
                          
                          
                          
                          for (var i = 0; i < data.docs.length; i++) {
                          
                          /*          
                                     link = ('page_catalog.html?'+var_par+'&idSupplier='+data.docs[i]._id).replace("??", "?").replace("?&", "?");    
                                        
                                    _str += '<tr>'
                                    + '<td>'
                                    + '    <img class="rounded-x" style="width: 100px" src="'; 
                                    if (data.docs[i].logo) 
                                        _str = _str +  _brokerMsUrl + "files/" + data.docs[i].logo; 
                                    else 
                                        _str = _str +  'assets/img/testimonials/user.jpg';
                                    _str = _str +  '" alt="logo">'
                                    + '</td>'
                                    + '<td>'
                                    + '    <h3><a class="aName" href="page_catalog.html?'+link+'">' + data.docs[i].name + '</a></h3>'
                                    
                                    + '<div><span style="cursor: pointer;" tabindex="0" data-trigger="focus" data-toggle="popover" data-html="true" data-content="" class="popOver" id="rates_'+data.docs[i]._id+'" data-id="'+data.docs[i]._id+'"></span></div>';
                                   
                                    
                                    
                                    if (data.docs[i].description)
                                        _str = _str +   '    <p>'+ data.docs[i].description +'</p>'
                                    
                                    _str = _str +  '    <small class="hex"><span data-i18n="product.tabLabelRegistration"></span>'+ getDateFromObjectId(data.docs[i]._id) +'</small>'
                                    + '<div><br><a class="a_productList" data-id="' + data.docs[i]._id + '" style="cursor: pointer" data-i18n="product.tabMsgProduct"></a></div>'
                                    + '<div id="divListProducts' + data.docs[i]._id + '" style="display: none"></div><br>'
                                    
                                    + '<button class="btn-u btn-block rounded hidden-sm hidden-md hidden-lg sDetails" type="button" data-par="'+var_par+'" data-id="'+ data.docs[i]._id +'" style="width: 100px"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span><span data-i18n="buttons.details"></span></button>'
                                    
                                    
                                    + '</td>'
                                     
                                    
                                    
                                    
                                    + '<td class="hidden-xs">'
                                    + '<button class="btn-u btn-block rounded sDetails" type="button" data-par="'+var_par+'" data-id="'+ data.docs[i]._id +'"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span><span data-i18n="buttons.details"></span></button>';
                                    
                                    + '</td>' 
                                + '</tr>';
                                          
                                _str += '<div id="popover-content_'+data.docs[i]._id+'" class="hide">'
                                _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.price_rate">:</span>&nbsp;<span class="pull-right" id="rates_price_value_'+data.docs[i]._id+'"></span></div>' 
                                _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.delivery_rate">:</span>&nbsp;<span class="pull-right" id="rates_delivery_'+data.docs[i]._id+'"></span></div>'  
                                _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.product_rate">:</span>&nbsp;<span class="pull-right" id="rates_product_'+data.docs[i]._id+'"></span></div>'  
                                _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.customer_rate">:</span>&nbsp;<span class="pull-right" id="rates_customer_service_'+data.docs[i]._id+'"></span></div>';
                                _str +=     '</div>';
  
                                      
                            }
                                      
                                _str = _str +'</tbody>'; 
                                _str = _str +'</table>';
                                _str = _str +'</div>';
                                _str = _str +'</div>';        
                                
                            */    
                                
                                
                                // -----------------------------------------------------------
                                
                                
                                link = ('page_catalog.html?'+var_par+'&idSupplier='+data.docs[i]._id).replace("??", "?").replace("?&", "?");    
                                
                                _str += '<div class="row">';
                                    
                                    _str +=     '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-2 text-center" href="#">';
                                    _str +=         '<img class="" style="width: 100px" src="'; 
                                    if (data.docs[i].logo) 
                                        _str = _str +  _brokerMsUrl + "files/" + data.docs[i].logo; 
                                    else 
                                        _str = _str +  'assets/img/testimonials/user.jpg';
                                    _str = _str +  '" alt="logo">';
                                    _str +=         '</div>';
                                        
                        
                                    _str += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">'
                                    _str +=    '<div class="clearfix margin_left_10" style="overflow:hidden; margin-top: 4px;">'
                                    _str +=                 '<h3><a class="aName" href="page_catalog.html?'+link+'">' + data.docs[i].name + '</a></h3>';
                                    _str +=     '</div>';
                                    _str +=     '<div class="giveMeEllipsis blog-author-desc margin_left_10">';
                                    _str +=              '<span style="cursor: pointer;" tabindex="0" data-trigger="focus" data-toggle="popover" data-html="true" data-content="" class="popOver" id="rates_'+data.docs[i]._id+'" data-id="'+data.docs[i]._id+'"></span>';
                                    _str +=      "</div>";
                                    
                                    if (data.docs[i].description)
                                        _str = _str +   '    <div class="giveMeEllipsis blog-author-desc" style="margin-left: 10px">'+ data.docs[i].description +'</div>'
                                    
                                    _str = _str +  '    <small class="hex"><span data-i18n="product.tabLabelRegistration"></span>'+ getDateFromObjectId(data.docs[i]._id) +'</small>'
                                    + '<div><br><a class="a_productList" data-id="' + data.docs[i]._id + '" style="cursor: pointer" data-i18n="product.tabMsgProduct"></a></div>'
                                    + '<div id="divListProducts' + data.docs[i]._id + '" style="display: none"></div><br>'
                                    _str +=     '</div>';
                                    
                                    _str +=     '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-2 text-left">';
                                    _str +=         '<button class="btn-u btn-block rounded sDetails" type="button" data-par="'+var_par+'" data-id="'+ data.docs[i]._id +'" style="width: 100px"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span><span data-i18n="buttons.details"></span></button>';
                                    _str +=     '</div>';
                                     
                          _str +=   "</div>";
                          _str += '<hr>';           
                          
                          
                          
                          _str += '<div id="popover-content_'+data.docs[i]._id+'" class="hide">'
                                _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.price_rate">:</span>&nbsp;<span class="pull-right" id="rates_price_value_'+data.docs[i]._id+'"></span></div>' 
                                _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.delivery_rate">:</span>&nbsp;<span class="pull-right" id="rates_delivery_'+data.docs[i]._id+'"></span></div>'  
                                _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.product_rate">:</span>&nbsp;<span class="pull-right" id="rates_product_'+data.docs[i]._id+'"></span></div>'  
                                _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.customer_rate">:</span>&nbsp;<span class="pull-right" id="rates_customer_service_'+data.docs[i]._id+'"></span></div>';
                                _str +=     '</div>';
  
                                
                          }    
                                
                                
                                // -----------------------------------------------------------
                                
                                
                                
                                      
                                      $('#div_list').append(_str);                  
                                      
                                      // star ratings
                                for (var i = 0; i < data.docs.length; i++) {
                                    
                                    let data_r = data.docs[i];
                                      
                                    renderStars(data_r, data.docs[i]._id);
                                    
                                }
                                      
                                
                                $('.popOver').popover({html: true,
                                    placement: 'bottom',
                                    content: function(){
                                        return $('#popover-content_'+ $(this).attr('data-id')).html();   
                                    },
                                    title: i18next.t("evaluation.evaluation")
                                    });
                      
                                    $(".popOver").attr("data-original-title", i18next.t("evaluation.evaluation")); 
                                      
                                      
                                      
                                
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
                                    
                                    
                                    var _img = [];
                                    
                                    
                                    for (var i = 0; i < data.docs.length; i++) { 
                                      try
                                      {
                                      
                                    
                                        _img = [];
                                        
                                        
                                        link = ('page_catalog.html?'+var_par+'&idSupplier='+data.docs[i].supplierId._id).replace("??", "?").replace("?&", "?");
                                        
                                        if (data.docs[i].images && data.docs[i].images.length > 0) 
                                        {
                                            
                                            //_img = data.docs[i].images;
                                            //_img = _brokerMsUrl + 'files/' + data.docs[i].images[0].imageId+'?tag=t';
                                            for (var j = 0; j < data.docs[i].images.length; j++) {
                                                _img.push({url: _brokerMsUrl + 'files/' + data.docs[i].images[j].imageId+'?tag=t'
                                                            , id: data.docs[i].images[j].imageId} );
                                            } 
                                        }
                                        else
                                             _img.push({url: 'assets/img/team/img1-md.jpg'
                                             , 'id': 0});
                                            
                                        
                                        
                                        
                                    _str += '<div class="row">';
                                    
                                    _str +=     '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-2 text-center" href="#">';
                                    _str +=         '<img class="" src="' + _img[0].url +'" alt="" style="max-width:80px; max-height:80px; cursor:pointer;" onclick="openGallery(this)" data-iid="'+ _img[0].id +'" onError="this.onerror=null;this.src=\'assets/img/team/img1-md.jpg\'">';
                                    _str +=     '<div class="center-block margin-left-10">';
                                    for (var t in _img)
                                    {       
                                       
                                             _str +=     '<div class="th-gallery" onclick="updateImgThumb(this)">';
                                             _str +=     '<img src="'+ _img[t].url +'" style="max-width:100%; max-height:100%" data-iid="'+ _img[t].id +'" onError="this.onerror=null;this.src=\'assets/img/team/img1-md.jpg\'">';
                                             _str +=     '</div>';
                                           
                                    }    
                                    _str +=         '</div>';
                                        
                                    _str +=     '</div>';
                                    var mcat;                                                                                                                         
                                    if(data.docs[i].categories[0])
                                      mcat = data.docs[i].categories[0];
                                    else
                                      mcat = data.docs[i].categories; 
                                    
                                    var category = ' - ';
                                    var translate = {};
                                    if (mcat)
                                        category = mcat.name[lang];
                                    
                                    translate = translate_product(data.docs[i].name, data.docs[i].description, data.docs[i].translation[0], lang);
                                    
                                    _str +=     '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8">';
                                    _str +=             '<div class="clearfix margin_left_10" style="overflow:hidden; margin-top: 4px;"> ';
                                    _str +=                 '<h4 class="media-heading">';
                                    _str +=                     '<strong style="display:block;"><a href=" '+ link + '">'+translate.name+'</a></strong>';
                                    _str +=                     '<small style="display:block; max-width:50%;">'+category+'</small>';
                                    _str +=                 '</h4>';
                                    _str +=             '</div>';
                                    _str +=             '<div class="giveMeEllipsis blog-author-desc margin_left_10">';
                                    _str +=                 "<span>"+data.docs[i].supplierId.name +"&nbsp;&nbsp;&nbsp;&nbsp;</span>"; 
                                    _str +=                 "<span style='cursor: pointer;' tabindex='0' data-trigger='focus' data-toggle='popover' data-html='true' data-content='' class='popOver' id='rates_"+data.docs[i]._id+"' data-id='"+data.docs[i]._id+"'></span>";
                                    _str +=             "</div>";
                                    
                                    _str +=             '<div class="giveMeEllipsis blog-author-desc" style="margin-left: 10px">'+translate.description+'</div>';
                                    
                                    _str +=             '<ul class="list-inline share-list margin_left_10">';  
                                    if (mcat.type == 1)
                                    {
                                        _str +=                 '<li><i class="fa fa-chevron-up"></i><span data-i18n="catalog.atleast">Min</span> '+checkValue(data.docs[i].minNum)+'</li>';
                                        _str +=                 '<li><i class="fa fa-chevron-down"></i><span data-i18n="catalog.atmost">Max</span> '+checkValue(data.docs[i].maxNum)+'</li>';
                                    }
                                    _str +=                 '<li><i class="fa fa-calendar-o"></i><span data-i18n="catalog.deliveryIn">Consegna in</span> '+checkValue(data.docs[i].deliveryIn); 
                                    _str +=                     '<span data-i18n="catalog.days"> giorni</span></li>';
                                    if (mcat.type == 1)
                                        _str +=                 '<li><i class="fa fa-inbox"></i><span data-i18n="catalog.availability"></span><span> ' +checkValue(data.docs[i].availability)+' '+translation[localStorage.lng].translation.rfq[data.docs[i].unit]+'</span></li>';
                                    _str +=                 '<li><i class="fa fa-euro"></i><span> ' +checkValue(data.docs[i].price)+ ' <span class="fa fa-euro"></span>';
                                    if (mcat.type == 1)
                                        _str +=                 ' per '+translation[localStorage.lng].translation.rfq[data.docs[i].unit]+'</span>';
                                    _str +='                </li>';
                                    _str +=                 '<li style="text-align: right; font-weight: bold">Score:<span> ' +checkValueStr(data.docs[i].score, 4, null)+ ' </span></li>';
                                    _str +=             '</ul>';
                                     
                                    _str +=     '</div>';
                                     
                                    _str +=     '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-2 text-left">';
                                    _str +=         '<button style="margin-top: 4px;" class="btn-u  rounded btn-sm sDetails margin_left_10" type="button" data-par="'+var_par+'" data-id_product="'+ data.docs[i]._id +'" data-id="'+ data.docs[i].supplierId._id +'"><span class="glyphicon glyphicon-triangle-right" aria-hidden="true"></span><span data-i18n="buttons.details"></span></button>';
                                    _str +=     '</div>';
                                     // row   
                                    _str +=     '</div>';
                                    
                                    
                                   // _str += '<div id="popover-content" class="hide">' + popUp_rates(data.docs[i].supplierId.rates) + '</div>';
                                    

                                    _str += '<div id="popover-content_'+data.docs[i]._id+'" class="hide">'
                                    _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.price_rate">:</span>&nbsp;<span class="pull-right" id="rates_price_value_'+data.docs[i]._id+'"></span></div>' 
                                    _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.delivery_rate">:</span>&nbsp;<span class="pull-right" id="rates_delivery_'+data.docs[i]._id+'"></span></div>'  
                                    _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.product_rate">:</span>&nbsp;<span class="pull-right" id="rates_product_'+data.docs[i]._id+'"></span></div>'  
                                    _str +=     '<div class="clearfix" style="padding: 4px 0"><span class="pull-left" data-i18n="evaluation.customer_rate">:</span>&nbsp;<span class="pull-right" id="rates_customer_service_'+data.docs[i]._id+'"></span></div>';
                                    _str +=     '</div>';
                                    
                                    _str += '<hr>';
                                    
                                    
                                    
                                    
                                    }
                                    catch(error){}
                      
                      }
                                    
                                    $('#div_list').append(_str);
                                
                                // star ratings
                                for (var i = 0; i < data.docs.length; i++) {
                                
                                let data_r = data.docs[i].supplierId;    
                                    
                                    renderStars(data_r, data.docs[i]._id);
                                }
                                   
                                
                                
                                
                                    $('.popOver').popover({html: true,
                                        placement: 'bottom',
                                        content: function(){ 
                                            console.log($(this).attr('data-id'));
                                            return $('#popover-content_'+ $(this).attr('data-id')).html();   
                                        },
                                        title: i18next.t("evaluation.evaluation")
                                        });
                      
                                    $(".popOver").attr("data-original-title", i18next.t("evaluation.evaluation")); 
                                    
                      
                      }
                      
                        $('.sDetails').click(function(){
                              
                              var id_product = ($(this).attr('data-id_product'));
                              var id_supplier = ($(this).attr('data-id'));
                              var par = ($(this).attr('data-par'));
                              
                             link = ('page_catalog.html?'+par+'&idSupplier='+id_supplier + '&idProduct=' + id_product).replace("??", "?").replace("?&", "?");
                              window.location.href = link;
                                
                        });          
                                
}

// render star rating
function getStars(el, count)
{
    
    let _rates = 0;
    
    if(count) {
        _rates = count;
    }    
   

        jQuery(el).starRating({
            starSize: 18,
            readOnly:true,
            totalStar:5, 
            starGradient:{start:"#D40000",end:"#FF0000"},
            initialRating: _rates
            
});

}

function renderStars(data_r, id)
{
    if (!data_r.rates) data_r.rates = {};
    if (!data_r.rates.bayesian_overall_rate) data_r.rates.bayesian_overall_rate = 0;
    if (!data_r.rates.bayesian_price_value_rate) data_r.rates.bayesian_price_value_rate = 0;
    if (!data_r.rates.bayesian_delivery_rate) data_r.rates.bayesian_delivery_rate = 0;
    if (!data_r.rates.bayesian_product_rate) data_r.rates.bayesian_product_rate = 0;
    if (!data_r.rates.bayesian_customer_service_rate) data_r.rates.bayesian_customer_service_rate = 0;
         
    getStars("#rates_" +id,                            data_r.rates.bayesian_overall_rate);
    getStars("#rates_price_value_" + id,                data_r.rates.bayesian_price_value_rate);
    getStars("#rates_delivery_" + id,                   data_r.rates.bayesian_delivery_rate);
    getStars("#rates_product_" + id,                    data_r.rates.bayesian_product_rate);
    getStars("#rates_customer_service_" + id,           data_r.rates.bayesian_customer_service_rate); 
}


// render pagination number
function render_paginate(tot_page, act_page, arr_par)
{
    index = 4;
    
    var_par = get_par_string(arr_par);
    
    var str = '<div class="text-left" id="divPagination">'
    + '<ul class="pagination pagination-sm" ><li><a ';
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
                else if (act_page < index)
                {
                    console.log('actual page: ' + act_page);
                    start = 1;
                    limit = index;
                }
                else if (act_page == tot_page)
                {
                    str = str + '<li><a href="#" class="p_link" data-par="'+var_par+'" data-page="1">1</a></li>'
                        + '<li><a>...</a></li>';
                          
                    
                    start = tot_page - (index - 1);
                    limit = tot_page;
                
                
                }
                else if (act_page >= index)
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
                    //if (page == i)
                        check_Active = 'class="active"';
                    
                    str = str + '<li '+ check_Active +'><a href="#" class="p_link" data-par="'+var_par+'" data-page="'+i+'">'+i+'</a></li>';
                }
                    
                                
                if ((tot_page == limit + 1 && act_page < index) || (tot_page > ((act_page - 1) + 3) && tot_page > index))
                {
                    //if (tot_page > index + 1)
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
        
        //console.log(arr_par);
          
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
function get_list(_arr_par)
{
    if (_arr_par[0].type_search == 's')
         url = "products/supplier";                           
    else
    {
        url = "products";
    }
    
    _var_par = get_par_string(_arr_par);
    
    
    
    
    $.ajax({
                                  type: "GET",
                                  url: api_url + url  + _var_par + '&lang=' + lang,
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
                                      
                                      if (!_arr_par[0].page && (_arr_par[0].name != '' || _arr_par[0].id_category != ''))
                                      {
                                          insertTrend(_arr_par, data);
                                      }
                                      
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
    _arr_par[0].cat_type= '';
    _arr_par[0].page= '';
    _arr_par[0].type_search= '';
    _var_par =get_par_string(_arr_par);
    
    
    $.ajax({
                                  type: "GET",
                                  url: api_url + "products" + _var_par + '&supplierId=' + id + '&lang=' + lang,
                                  dataType: "json",
                                  success: function(data)
                                  {
                                      $('#divListProducts' + id).empty();
                                      $('#divListProducts' + id).css('display', 'block');
                                      
                                      var str_listProducts2 = '<table>';
                                      var translate;
                                      console.log(data);
                                      for (var c = 0; c < data.total; c++) {
                                      
                                            translate = translate_product(data.docs[c].name, data.docs[c].description, data.docs[c].translation[0], lang);
                                         
                                          str_listProducts2 = str_listProducts2 + '<tr>'
                                        + '<td style="padding-top: 5px" ><span class="glyphicon glyphicon-chevron-right"></span>&nbsp;'+ translate.name +'</td>'
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


function insertTrend(_arr_par, data)
{
    var currentDate = new Date();
    
    
    
    var formData = {
        "results": data.total,
        "keyword": arr_par[0].name,
        "category": arr_par[0].id_category,
        "userType": sessionStorage.type,
        "typeUser": sessionStorage.type,
        "searchType": arr_par[0].type_search,
        "lang": localStorage.lng,
        "createdAt": currentDate
    };
    
    
    $.ajax({
          type: "POST",
          url: trend_url,
          data: formData,
          success: function()
            {
               
            },
            error: function(xhr, textStatus, error){
                /* 
                console.log(textStatus);     
                console.log(error);
                */
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
        /*
        $('#search_concept').text(arr_par[0].cat_name);
        $('.input-group #id_category').val(arr_par[0].id_category);
        $('.input-group #cat_name').val(arr_par[0].cat_name);
        */
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
    if ($('#cat_type').val())
        arr_par[0].cat_type = $('#cat_type').val();
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
            , "cat_type":       getParameterByName('cat_type')
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
        , "cat_type":       $('#cat_type').val()
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
    if (array_par[0].cat_type)      var_par = var_par + '&cat_type=' + array_par[0].cat_type;
    if (array_par[0].id_category)   var_par = var_par + '&id_category=' + array_par[0].id_category;
    if (array_par[0].type_search)   var_par = var_par + '&type_search=' + array_par[0].type_search;
    if (array_par[0].tag)           var_par = var_par + '&tag=' + array_par[0].tag;
    if (array_par[0].page)          var_par = var_par + '&page=' + array_par[0].page;

    var_par = var_par.replace("?&", "?");
    
    return var_par;
}



// restituisce i dati del prodotto nella lingua scelta

function translate_product(name, description, translation, lang)
       
                                    {
                                         
                                       switch(lang) {
                                            case 'en':
                                            {
                                              if (translation.name)
                                                name_tr = translation.name;
                                              else
                                                  name_tr = name;
                                                  
                                              if (translation.description)
                                                  description_tr = translation.description;
                                              else
                                                  description_tr = description;
                                                  
                                              break; 
                                            }
                                            case 'it':
                                            {
                                                name_tr = name;
                                                description_tr = description;
                                                break;
                                            }
                                            default:
                                            {
                                                name_tr = name;
                                                description_tr = description;
                                            }
                                                
                                        }
                                        return {"name": name_tr, "description": description_tr}; 
                                         
                                    }


/* ******************/
// dropdown categories
/* ******************/

function renderDropCategories(id_category, cat_name, cat_type)
{
    $.ajax({
        type: "GET",
        url: api_url + "categories/drop?liv=1&lang="+lang,
        data: 
        {
          
        },

        dataType: "json",
        success: function(data)
        {
            renderListCategories_1(data, id_category, cat_name, cat_type);
            renderListCategories_2(data, id_category, cat_name, cat_type)
        },
        error: function()
        {
          alert("Errore di caricamento");
        }
});
}


function renderListCategories_1(data, id_category, cat_name, cat_type)
{
    var str = '<div class="row"><div class="col-md-6"><ul class="dropdown-menu_items" role="menu">';  
                                      for (var i = 0; i < data.length; i++) {
                                          
                                      
                                      if (data[i].type== 1)
                                      {
                                      str = str + '<li><a href="#'+data[i]._id+'" type="'+ data[i].type +'">'
                                                        + '<div class="row">'
                                                        + '<div class="col-md-2"><span class="'+ data[i].css.classImg +'" style="font-size: 2em" aria-hidden="true"></span></div>'
                                                        + '<div class="col-md-10"><span>'+data[i].name[lang]+'</span>'
                                                        + '<p class="dropdown-desc">'+data[i].description[lang]+'</p>'
                                                        + '</div>'
                                                        + '</div>'
                                                        + '</a></li>';
                                      }  
                                      //console.log(str);

                                      if (id_category && id_category == data[i]._id)
                                    {
                                        //console.log(lang + ' ' + data[i]._id + ' ' + data[i].name[lang]);
                                        $('.search-panel span#search_concept').text(data[i].name[lang]);
                                        $('.input-group #id_category').val(data[i]._id);
                                        $('.input-group #cat_name').val(data[i].name[lang]);
                                        $('.input-group #cat_type').val(data[i].type);
                                    }

                                    
                                    }
                                      
                                      str = str + '</ul></div>'
                                                + '<div class="col-md-6"><ul class="dropdown-menu_items">';


                                    for (var i = 0; i < data.length; i++) {
                                
                                        if (data[i].type== 2)
                                        {
                                        str = str + '<li><a href="#'+data[i]._id+'" type="'+ data[i].type +'">'
                                                        + '<div class="row">'
                                                        + '<div class="col-md-2"><span class="'+ data[i].css.classImg +'" style="font-size: 2em" aria-hidden="true"></span></div>'
                                                        + '<div class="col-md-10"><span>'+data[i].name[lang]+'</span>'
                                                        + '<p class="dropdown-desc">'+data[i].description[lang]+'</p>'
                                                        + '</div>'
                                                        + '</div>'
                                                        + '</a></li>';
                                            } //console.log(str);


                                            if (id_category && id_category == data[i]._id)
                                            {
                                                $('.search-panel span#search_concept').text(data[i].name[lang]);
                                                $('.input-group #id_category').val(data[i]._id);
                                                $('.input-group #cat_name').val(data[i].name[lang]);
                                                $('.input-group #cat_type').val(data[i].type);
                                            }

                                        }


                                      str = str + '</ul></div></div>';
                                        
                                      
                                                  
                                      
                                      
                                      
                                      $('#dropmenu').append(str);
                                      
                                      
                                      
                                      
                                      $('.search-panel #dropmenu').find('a').click(function(e) {
                                        e.preventDefault();
                                        var param = $(this).attr("href").replace("#","");
                                        var type = $(this).attr("type");
                                        var concept = $(this).find("span").text();
                                        $('.search-panel span#search_concept').text(concept);
                                        $('.input-group #id_category').val(param);
                                        $('.input-group #cat_type').val(type);
                                        $('.input-group #cat_name').val(concept);
                                        
                                        $("html, body").animate({ scrollTop: 0 }, "slow");
                                        
                                        $(this).addclass('dropdown-toggle');
                                        $(this).attr('data-toggle', 'dropdown');

                                        return false;
                                        });
}




function renderListCategories_2(data, id_category, cat_name, cat_type)
{
    var str = '<div class="row"><div class="col-md-12"><ul class="dropdown-menu_items" role="menu">';  
    
    str = str + '<li><a href="#" type="1"><span id="title_menu_products"></span></a></li>'
                                        + '<li class="divider visible-xs visible-sm visible-md hidden-lg"></li>'; 
    
    
                    for (var i = 0; i < data.length; i++) {
                                           
                                      
                        if (data[i].type== 1)
                        {
                        str = str + '<li><a href="#'+data[i]._id+'" type="'+ data[i].type +'">'
                                        + '<div class="row">'
                                        + '<div class="col-xs-1 col-sm-1 col-md-1"><span class="'+ data[i].css.classImg +'" style="font-size: 2em" aria-hidden="true"></span></div>'
                                        + '<div class="col-xs-11 col-sm-11 col-md-11"><span>'+data[i].name[lang]+'</span>'
                                        + '<p class="dropdown-desc">'+data[i].description[lang]+'</p>'
                                        + '</div>'
                                        + '</div>'
                                        + '</a></li>';
                        } 
                        
                        if (id_category && id_category == data[i]._id)
                        {
                            $('.search-panel span#search_concept2').text(data[i].name[lang]);
                            $('.input-group #id_category').val(data[i]._id);
                            $('.input-group #cat_name').val(data[i].name[lang]);
                            $('.input-group #cat_type').val(data[i].type);
                        }
                                      
                                    
                }
                                    
                str = str + '<li class="divider visible-xs visible-sm visible-md hidden-lg"></li>'
                + '<li><a href="#" type="2"><span id="title_menu_services"></span></a>'
                + '</li>'
                + '<li class="divider visible-xs visible-sm visible-md hidden-lg"></li>'; 

                    for (var i = 0; i < data.length; i++) {
                                          
                        if (data[i].type== 2)
                        {
                        str = str + '<li><a href="#'+data[i]._id+'" type="'+ data[i].type +'">'
                                        + '<div class="row">'
                                        + '<div class="col-xs-1 col-sm-1 col-md-1"><span class="'+ data[i].css.classImg +'" style="font-size: 2em" aria-hidden="true"></span></div>'
                                        + '<div class="col-xs-11 col-sm-11 col-md-11"><span>'+data[i].name[lang]+'</span>'
                                        + '<p class="dropdown-desc">'+data[i].description[lang]+'</p>'
                                        + '</div>'
                                        + '</div>'
                                        + '</a></li>';
                            }

                            if (id_category && id_category == data[i]._id)
                            {
                                $('.search-panel span#search_concept2').text(data[i].name[lang]);
                                $('.input-group #id_category').val(data[i]._id);
                                $('.input-group #cat_name').val(data[i].name[lang]);
                                $('.input-group #cat_type').val(data[i].type);
                            }

                    }


                                                  str = str + '</ul></div></div>';
                                                  
                                                $('#dropmenu2').append(str);
                                     
                                    
                                                $('#dropmenu2').find('a').click(function(e) {
                                                    e.preventDefault();
                                                    var param = $(this).attr("href").replace("#","");
                                                    var type = $(this).attr("type");
                                                    var concept = $(this).find("span").text();
                                                    $(' span#search_concept2').text(concept);
                                                    $('.input-group #id_category').val(param);
                                                    $('.input-group #cat_type').val(type);
                                                    $('.input-group #cat_name').val(concept);
                                                    
                                        
                                                    $("html, body").animate({ scrollTop: 0 }, "slow");

                                                    $(this).addclass('dropdown-toggle');
                                                    $(this).attr('data-toggle', 'dropdown');

                                                    return false;
                                                    
                                                    });
        
        
                                                    $("#title_menu_products").text(i18next.t("catalog.products"));
                                                    $("#title_menu_services").text(i18next.t("nav.services"));
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
function checkValueStr(value, len, sub)
{
    if (sub == null)
        sub = ' -- ';
    
    
    
    if (value)
    {
        let val = value.toString();
            
        if (val.length > 4)
        {
            val = val.substring(0, 4);
        }
        return val;
    }
    else
    {
        return sub;
    }    
}


// check valore render div
function checkValue(value)
{
    console.log();
    if (value)
    {
        if (value.length > 4)
            value.substring(4,0);
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
        message: '<img src="assets/img/rolling.gif"><div font-weight: bold" style="background-color: #555; -webkit-border-radius: 10px; padding: 8px; margin-top: 10px">&nbsp;'+ msg +'</div>',
            css: {
            width: '200px', 
            border: 'none', 
            padding: '15px', 
            '-webkit-border-radius': '10px', 
            '-moz-border-radius': '10px', 
            opacity: 0.5, 
            color: '#fff' 
        } });
        
        //setTimeout($.unblockUI, 8000);
}

/*********************************************/

function updateImgThumb(node)
{
          var src = jQuery(node).find(":nth-child(1)").attr("src");
          jQuery(node).parent().parent().find(":nth-child(1)").first().attr("src", src);
        }


function openGallery(node)
{
          var src = jQuery(node).attr("src").replace("tag=t", "tag=o");
          jQuery("#galleryImg").hide();
          var spinner = document.createElement("span");
          spinner.className = "fa fa-spinner fa-spin";
          spinner.style.fontSize = "50pt";
          spinner.id = "gallerySpinner";
          jQuery("#galleryContainer").prepend(spinner);
                    
          jQuery("#galleryImg").off("load")
            .on("load", function(){
              jQuery("#galleryImg").show();
              jQuery("#gallerySpinner").remove();                            
            });                              
          
          jQuery("#galleryImg").attr("src", src);          
          
          if(!window.gallery) window.gallery = {};
          
          window.gallery.images = [];
          window.gallery.index = 0;
          var c = 0;
          jQuery(node).siblings().first().find("img").each(function(){
            var tsrc = this.src.replace("tag=t", "tag=o");
            window.gallery.images.push(tsrc);
            
            if(tsrc == src)
            {              
              window.gallery.index = c;              
            }
            c++;
          })          
          
          $('#modalGallery').modal('show'); 
          
        }
        
function slidePic(dir)
{
          var x;          
          if(dir == "next")        
            x = 1;          
          else
            x = -1;          
          var idx = (window.gallery.index + x) % window.gallery.images.length;
          if(idx < 0) idx = window.gallery.images.length - 1;
          
          jQuery("#galleryImg").hide();
          var spinner = document.createElement("span");
          spinner.className = "fa fa-spinner fa-spin";
          spinner.style.fontSize = "50pt";
          spinner.id = "gallerySpinner";
          jQuery("#galleryContainer").append(spinner);                    
          
          jQuery("#galleryImg").attr("src", window.gallery.images[idx]);
          window.gallery.index = idx;          
        }
