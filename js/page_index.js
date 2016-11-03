  
        


    
    $( "#btn_search" ).click(function(e) {
        
      $('#product').val();
       var str_param  = '';
       if ($('#product').val())
            str_param = str_param + 'name=' + $('#product').val();
       if ($('#category').val())
            str_param = str_param + 'category=' + $('#category').val();
       if ($('#tags').val())
            str_param = str_param + 'tag =' + $('#tags').val();
       window.location.href = "list.html?" + str_param; 
       /*
      $("#form").submit(function(){
        alert("Submitted");
        });
      */  
        
      
      
    });
    
    
    
    
    
