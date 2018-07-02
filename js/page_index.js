 var api_url = _brokerMsUrl;  
 var lang =   localStorage.lng;
 
 var data_categories;

   $( document).ready(function() {
       renderDropCategories();
       
       $("#product").val('');
       $(".search_select").attr("checked", false);
       $("#ckProduct").attr("checked", "true");
    
    $( "#btn_search" ).click(function(e) {
        
       var str_param  = '';
       if ($('#product').val())
            str_param = str_param + '&name=' + $('#product').val();
       if ($('#category').val())
       {
            str_param = str_param + '&categories=' + $('#category').data('cat-id');
       }
       if ($("#id_category").val())
            str_param = str_param + '&id_category=' + $('#id_category').val(); 
       if ($("#cat_name").val())
            str_param = str_param + '&cat_name=' + $('#cat_name').val();
        if ($("#cat_type").val())
            str_param = str_param + '&cat_type=' + $('#cat_type').val();
       if ($('#ckProduct').is(':checked'))
            str_param = str_param + '&type_search=p';
       if ($('#ckSupplier').is(':checked'))
            str_param = str_param + '&type_search=s';
       
       window.location.href = "list.html?" + str_param; 
       
       // reset dei campi in caso di tasto back
       $("#category").val('');
       $("#product").val('');
       $("#cat_name").val('');
       $("#id_category").val('');
       
       $(".search_select").attr("checked", false);
       $("#ckProduct").attr("checked", "true");
       
      
    });
    
    
    $('#ckProduct').click(function(e) {
        $(".search_select").attr("checked", false);
        $("#category").val('');        
        
        if ($("#ckProduct").is(':checked') == false)
            {
                $("#ckProduct").attr("checked", "true");
                $("#product").attr("placeholder", i18next.t("product.searchLabelProducts"));
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
            }
            $("#spanSupplier").css("display", "block");
    }); 
    
    
   $(document).keypress(function(e){
    if (e.which == 13){
        $("#btn_search").click();
    }
}); 
    
    
    $(document).on('translate', function()
{
    
    $(window.location).attr('href', 'index.html');
    //console.log(get_par('url'));
    //console.log(api_url);
//alert(localStorage.lng);
});
    
    
    });
    
   // category menu
   
  
function renderListCategories_1(data)
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
                                                         //console.log(lang + ' ' + data[i]._id + ' ' + data[i].name[lang]);
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




function renderListCategories_2(data)
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
                                                     } //console.log(str);

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
                                                    
                                        
                                                    $("html, body").animate({ scrollTop: 300 }, "slow");

                                                    $(this).addclass('dropdown-toggle');
                                                    $(this).attr('data-toggle', 'dropdown');

                                                    return false;
                                                    
                                                    });
        
        
                                                    $("#title_menu_products").text(i18next.t("catalog.products"));
                                                    $("#title_menu_services").text(i18next.t("nav.services"));
}

 

 
function renderDropCategories()
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
            renderListCategories_1(data);
            renderListCategories_2(data)
        },
        error: function()
        {
          alert("Errore di caricamento");
        }
});
}




