jQuery(document).ready(function(){
  var sid = getUrlParameter("sid");
  
  if(sid == undefined)
  {
    var tNoSupplier = Handlebars.compile(noSupplierTemplate);     
    jQuery("#profile-body").html(tNoSupplier);
    jQuery('#profile-body').localize();             
  }
  else
  {
    jQuery.ajax({
    url: _brokerMsUrl + "users/supplier/" + sid,
    type: "GET",    
    contentType: "application/json; charset=utf-8",
    success: function(dataResp, textStatus, xhr)
    {        
      if(sessionStorage.type == "customer")
      {
        dataResp[0].isCustomer = true;
        
        dataResp[0].noFavorite = true;
        
        var supList = [];
        jQuery.ajax({
          url: _brokerMsUrl + "users/favorites",
          type: "GET",    
          contentType: "application/json; charset=utf-8",
          async: false,
          success: function(dataResp, textStatus, xhr)
          {        
            supList = dataResp;            
              
          },     
          error: function(xhr, status)
          {
          },
          beforeSend: function(xhr, settings) 
          { 
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token); 
          }                    
        });
        
        for(var i in supList)  
        {
          if(supList[i]["_id"] == sid)
          {
            dataResp[0].noFavorite = false;
          }
        }

      }
      var tProfile = Handlebars.compile(pTemplate); 
      jQuery("#profile-body").append(tProfile(dataResp[0]));        
      jQuery('#profile-body').localize();
      
      getDocumentList(sid);                    
    },     
    error: function(xhr, status)
    {
      var msg;
      try
      {        
        msg = xhr.responseJSON.message;
      }
      catch(err)
      {
        msg = i18next.t("error.internal_server_error");
      }
      
      //jQuery.jGrowl(msg, {theme:'bg-color-red', life: 5000});
      console.log(msg);
            
      return;    
    },
    beforeSend: function(xhr, settings) 
    { 
      xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token); 
    }                    
  });  
    
  }    
});


function getDocumentList(sid)
{
  
  jQuery.ajax({
    url: _brokerMsUrl + "users/attachment/" + sid,     
    type: "GET",
    contentType: "application/json; charset=utf-8",
    success: function(data, textStatus, xhr)
    {      
      var dd = [];
      for(var i in data.files)
      {
        var d ={}
        d.url = _brokerMsUrl + "users/attachment/" + sid + "/" + data.files[i];
        d.name = data.files[i];
        dd.push(d);
      }
        
      var tDocTable = Handlebars.compile(documentsListTemplate);      
      jQuery("#documentsList").html(tDocTable(dd));
      jQuery("#documentsList").localize();
                      
            
    },
    error: function(xhr, status)
    {
      var msg;
      
      switch(xhr.status)
      {
        case 400:
          msg = i18next.t("error.invalid_pdf");
          break;
        case 403:
          msg = i18next.t("error.unauthorized");
          break;
        case 500:
          msg = i18next.t("disk_quota_exceeded");
          break;
        default:
          try
          {        
            msg = xhr.responseJSON.message;
          }
          catch(err)
          {
            msg = i18next.t("error.internal_server_error");
          }
      }
      
      jQuery.jGrowl(msg, {theme:'bg-color-red', life: 5000});
    },
    beforeSend: function(xhr, settings) 
    { 
      xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token); 
    } 
  });
}


function addToFavorite()
{
  if(sessionStorage.token)
  {
    var data = {};
    data.supplier = getUrlParameter("sid");
    
    jQuery.ajax({
      url: _brokerMsUrl + "users/actions/favorites",           
      type: "POST",
      data: JSON.stringify(data),
      dataType: "json",
      contentType: "application/json; charset=utf-8",
      success: function(dataResp, textStatus, xhr)
      {      
         var starTemplate = Handlebars.compile(starFullTemplate); 
         jQuery("#starBlock").empty();
         jQuery("#starBlock").append(starTemplate());        
         jQuery("#starBlock").localize(); 
        //jQuery.jGrowl("OK", {theme:'bg-color-green', life: 5000});                            
      },
      error: function(xhr, status)
      {
        var msg;
        
        try
        {        
          msg = xhr.responseJSON.message;
        }
        catch(err)
        {
          msg = i18next.t("error.internal_server_error");
        }
        
        jQuery.jGrowl(msg, {theme:'bg-color-red', life: 5000});
      },
      beforeSend: function(xhr, settings) 
      { 
        xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token); 
      } 
    });
    
    
    
  }
}





