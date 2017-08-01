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
                                      var str = ''; 
                                      console.log(data); 
                                      for (var i = 0; i < data.length; i++) {
                                          
                                      
                                        str = str + '<li><a href="#'+data[i]._id+'">'
                                                        + '<div class="row">'
                                                        + '<div class="col-md-1"><span class="'+ data[i].css.classImg +'" style="font-size: 2em" aria-hidden="true"></span></div>'
                                                        + '<div class="col-md-11"><span>'+data[i].name[lang]+'</span>'
                                                        + '<p class="dropdown-desc">'+data[i].description[lang]+'</p>'
                                                        + '</div>'
                                                        + '</div>'
                                                        + '</a></li>';
                                        //console.log(str);
                                      }
                                      
                                      $('.dropdown-menu').append(str);
                                      
                                      $('.search-panel .dropdown-menu').find('a').click(function(e) {
                                        e.preventDefault();
                                        var param = $(this).attr("href").replace("#","");
                                        var concept = $(this).find("span").text();
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
