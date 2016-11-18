  
   
   $( document).ready(function() {
    
       
    autoCompleteCat("category");     


    
    $( "#btn_search" ).click(function(e) {
        
      $('#product').val();
       var str_param  = '';
       if ($('#product').val())
            str_param = str_param + '&name=' + $('#product').val();
       if ($('#category').val())
       {
            str_param = str_param + '&cat_name='   + $('#category').data("cat-name");
            str_param = str_param + '&categories=' + $('#category').data('cat-id');
       }
       if ($('#tags').val())
            str_param = str_param + 'tag =' + $('#tags').val();
       
       
       window.location.href = "list.html?" + str_param; 
       
       // reset dei campi in caso di tasto back
       $("#tags").val('');
       $("#category").typeahead('val', ''); 
       $("#product").val('');
       $(".search_select").attr("checked", false);
       $("#ckProduct").attr("checked", "true");
       
      
    });
    
    
    $('#ckProduct').click(function(e) {
        $(".search_select").attr("checked", false);
        $(".spanSearch").css("display", "none");
        $("#tags").val('');
        $("#category").typeahead('val', '');        
        
        if ($("#ckProduct").is(':checked') == false)
            {
                $("#ckProduct").attr("checked", "true");
            }
            $("#spanProduct").css("display", "block");
            
    
    });
    
    
    $('#ckCategory').click(function(e) {
        $(".search_select").attr("checked", false);
        $(".spanSearch").css("display", "none");
        
        $("#tags").val('');
        $("#product").val('');        
        
        if ($("#ckCategory").is(':checked') == false)
            {
                $("#ckCategory").attr("checked", "true");
            }
            $("#spanCategory").css("display", "block");
    
    });
    
    
    $('#ckTags').click(function(e) {
        $(".search_select").attr("checked", false);
        $(".spanSearch").css("display", "none");
        $("#category").typeahead('val', '');        
        $("#product").val('');
        
        if ($("#ckTags").is(':checked') == false)
            {
                $("#ckTags").attr("checked", "true");
            }
            $("#spanTags").css("display", "block");
    
    });
    
    
    
    
    
    
    });