 var api_url = _brokerMsUrl;  
 var lang =   localStorage.lng;
 
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
                                      
                                    
                                      var str = '<div class="row"><div class="col-md-6"><ul class="dropdown-menu_items" role="menu">';
                                     
                                      var str2 = '<div class="row"><div class="col-md-12"><ul class="dropdown-menu_items" role="menu">';
                                     

                                      var str_p = '';

                                    // type 1  
                                    
                                      str2 = str2 + '<li class="visible-xs visible-sm visible-md hidden-lg">'
                                        + '<div class="row row visible-xs visible-sm visible-md hidden-lg">'
                                        + '<div ><ul class="dropdown-menu_items"><li><a href="#" type="1"><span id="title_menu_products"></span></a></li></ul></div>'
                                        + '</div>'
                                        + '</li>'
                                        + '<li class="divider visible-xs visible-sm visible-md hidden-lg"></li>'; 
                                    

                                      for (var i = 0; i < data.length; i++) {
                                       if (data[i].type== 1)
                                      {
                                      str_p = str_p + '<li><a href="#'+data[i]._id+'" type="'+ data[i].type +'">'
                                                        + '<div class="row">'
                                                        + '<div class="col-md-2"><span class="'+ data[i].css.classImg +'" style="font-size: 2em" aria-hidden="true"></span></div>'
                                                        + '<div class="col-md-10"><span>'+data[i].name[lang]+'</span>'
                                                        + '<p class="dropdown-desc">'+data[i].description[lang]+'</p>'
                                                        + '</div>'
                                                        + '</div>'
                                                        + '</a></li>';
                                      }  
                                      //console.log(str);
                                    
                                    }
                                      
                                      str_p = str_p + '</ul></div>'
                                                + '<div class="col-md-6"><ul class="dropdown-menu_items">';
                                    

                                                str = str + str_p;
                                                str2 = str2 + str_p;
          

                                    // type 2
                                                
                                                str2 = str2 + '<li class="divider visible-xs visible-sm hidden-md hidden-lg"></li>' +
                                                + '<li class="visible-xs hidden-sm visible-md hidden-lg">'
                                                + '<div class="row visible-xs visible-sm visible-md hidden-lg">'
                                                + '<div <ul class="dropdown-menu_items"><li><a href="#" type="2"><span id="title_menu_services"></span></a></ul></div>'
                                                + '</div>'
                                                + '</li>'
                                                + '<li class="divider visible-xs visible-sm visible-md hidden-lg"></li>'; 
                                                
                                                str_p = '';
                                                
                                                for (var i = 0; i < data.length; i++) {
                                          
                                                 if (data[i].type== 2)
                                                    {
                                                    str_p = str_p + '<li><a href="#'+data[i]._id+'" type="'+ data[i].type +'">'
                                                                    + '<div class="row">'
                                                                    + '<div class="col-md-2"><span class="'+ data[i].css.classImg +'" style="font-size: 2em" aria-hidden="true"></span></div>'
                                                                    + '<div class="col-md-10"><span>'+data[i].name[lang]+'</span>'
                                                                    + '<p class="dropdown-desc">'+data[i].description[lang]+'</p>'
                                                                    + '</div>'
                                                                    + '</div>'
                                                                    + '</a></li>';
                                                     } //console.log(str);
                                                  }
                                    


                                      str_p = str_p + '</ul></div></div>';
                                    

                                      str = str + str_p;
                                      str2 = str2 + str_p;

                                      $('#dropmenu').append(str);
                                      $('#dropmenu2').append(str2);

                                      $('.search-panel #dropmenu').find('a').click(function(e) {
                                        e.preventDefault();
                                        var param = $(this).attr("href").replace("#","");
                                        var type = $(this).attr("type");
                                        var concept = $(this).find("span").text();
                                        $('.search-panel span#search_concept').text(concept);
                                        $('.input-group #id_category').val(param);
                                        $('.input-group #cat_type').val(type);
                                        $('.input-group #cat_name').val(concept);
                                        });



                                        $('#dropmenu2').find('a').click(function(e) {
                                            e.preventDefault();
                                            var param = $(this).attr("href").replace("#","");
                                            var type = $(this).attr("type");
                                            var concept = $(this).find("span").text();
                                            $(' span#search_concept2').text(concept);
                                            $('.input-group #id_category').val(param);
                                            $('.input-group #cat_type').val(type);
                                            $('.input-group #cat_name').val(concept);
                                            });


                                            $("#title_menu_products").text(i18next.t("catalog.products"));
                                            $("#title_menu_services").text(i18next.t("nav.services"));
                                                                       
                                  },
                                  error: function()
                                  {
                                    alert("Errore di caricamento");
                                  }
});
        
    }
