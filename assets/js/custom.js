/* Write here your custom javascript codes */
var _authMsUrl  = "http://seidue.crs4.it:3007/";
var _userMsUrl  = "http://seidue.crs4.it:3008/";
var _brokerMsUrl  = "http://seidue.crs4.it:3009/api/v1/";
var _uploadMsUrl = "http://seidue.crs4.it:3011/api/v1/file/";
_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoibXMiLCJpc3MiOiJub3QgdXNlZCBmbyBtcyIsImVtYWlsIjoibm90IHVzZWQgZm8gbXMiLCJ0eXBlIjoiYXV0aG1zIiwiZW5hYmxlZCI6dHJ1ZSwiZXhwIjoxNzg1NTc1MjQ3NTY4fQ.Du2bFjd0jB--geRhnNtbiHxcjQHr5AyzIFmTr3NFDcM";
var defaultImg = "assets/img/team/img32-md.jpg";
jQuery(document).ready(function(){
  var sb = jQuery("#sidebar");

  if(sb.length > 0)
  {
    //var isSupplier = sessionStorage.type && sessionStorage.type == "supplier";
    var sbT = Handlebars.compile(sidebarTemplate);
    jQuery("#sidebar").html(sbT({
      isSupplier : isSupplier(),
      idSupplier : isSupplier() ? sessionStorage.userId : ""
    }));
    jQuery("#sidebar").localize();


    if(sessionStorage.logo && sessionStorage.logo.trim() != "")
    {
      jQuery("#imgBox").attr("src", sessionStorage.logo);
    }
    else
    {
      jQuery("#imgBox").attr("src", defaultImg);
    }

    if(sessionStorage.token)
    {
      sb.show();
    }


  }

  var headerCompiled = Handlebars.compile(header_template);
  var headerHTML = headerCompiled({
    isLogged: isLogged(),
    showSearch : isSearchVisible(),
    isHome : window['isHome'] || false,
    isRFQ : window['isRFQ'] || false
  });

  jQuery('#header_p').html(headerHTML);
  
  
  if(jQuery("#smallSearch").length > 0)
  {
    document.getElementById("smallSearch").onkeydown = function(e){
      if(e.keyCode == 13)
      {
        window.location = 'list.html?name=' + jQuery('#smallSearch').val();
      }      
    };    
  }
  
  if(jQuery('#footer_p').length > 0)
  {
    var footerCompiled = Handlebars.compile(footer_template);        
    jQuery('#footer_p').html(footerCompiled);    
  }
  
  jQuery('body').localize();

  if(localStorage.lng)
  {
    var l = jQuery(".languages a[data-lng='" + localStorage.lng +"']");
    if(l.length > 0)
    {
      if(localStorage.lng != jQuery(".languages .active a").first().attr("data-lng"))
      {
        var lngSel = jQuery(".languages .active").first()
        lngSel.empty();
        lngSel.append(l[0].cloneNode(true));
        var c = document.createElement("i");
        c.className = "fa fa-check";
        lngSel.find("a").first().append(c);
        i18next.changeLanguage(localStorage.lng, function(){});
      }
      i18next.changeLanguage(localStorage.lng, function(){});
      jQuery('body').localize();
    }
  }
  else
  {
    localStorage.lng = jQuery(".languages .active a").first().data("lng");

    i18next.changeLanguage(localStorage.lng, function(){});
    jQuery('body').localize();
  }
  jQuery(".languages a").click(function(){
    if(jQuery(this).attr("data-lng"))
    {
      localStorage.lng = jQuery(this).attr("data-lng");
      var lngSel = jQuery(".languages .active").first();
      lngSel.empty();
      lngSel.append(this.cloneNode(true));
      var c = document.createElement("i");
      c.className = "fa fa-check";
      lngSel.find("a").first().append(c);
      i18next.changeLanguage(localStorage.lng, function(){});
      jQuery('body').localize();
      jQuery(document).trigger('translate');
    }
  });

  if(jQuery(".footer-language").length > 0)
  {
    var fl = jQuery(".footer-language select").first();

    if (localStorage.lng != undefined)
    {
      fl.val(localStorage.lng);
    }

    fl.change(function(){
      var lng = jQuery(this).val();
      localStorage.lng = lng;
      i18next.changeLanguage(localStorage.lng, function(){});
      jQuery('body').localize();
      jQuery(document).trigger('translate');

    });
  }

  if(sessionStorage.token)
  {
    jQuery("#h_login").hide();
    jQuery("#h_user strong").html(sessionStorage.email);
  }
  else
  {
    jQuery("#h_logout").hide();
    jQuery("#h_user").hide();
  }
  loadCookieLawBar();
});
//i18next.use(i18nextXHRBackend);
i18next.init({
  lng: localStorage.lng, // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
  fallbackLng: "en",
  resources:  translation
}, function (err, t) {
  jqueryI18next.init(i18next, jQuery,
      {
        tName: 't', // --> appends $.t = i18next.t
        i18nName: 'i18n', // --> appends $.i18n = i18next
        handleName: 'localize', // --> appends $(selector).localize(opts);
        selectorAttr: 'data-i18n', // selector for translating elements
        targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
        optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
        useOptionsAttr: false, // see optionsAttr
        parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
      });
});
/*
 jqueryI18next.init(i18next, jQuery,
 {
 tName: 't', // --> appends $.t = i18next.t
 i18nName: 'i18n', // --> appends $.i18n = i18next
 handleName: 'localize', // --> appends $(selector).localize(opts);
 selectorAttr: 'data-i18n', // selector for translating elements
 targetAttr: 'i18n-target', // data-() attribute to grab target element to translate (if diffrent then itself)
 optionsAttr: 'i18n-options', // data-() attribute that contains options, will load/set if useOptionsAttr = true
 useOptionsAttr: false, // see optionsAttr
 parseDefaultValueFromContent: true // parses default values from content ele.val or ele.text
 });
 */
/*
 jQuery(document).ready(function(){
 console.log(jQuery.i18n.language)
 console.log(jQuery.i18n.t("error.invalid_email"))
 });
 */
/*******************************************
 ****************** UTILS ******************
 *******************************************/
function isValidEmailAddress(emailAddress)
{
  var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  return pattern.test(emailAddress);
};
/*******************************************
 *******************************************/
function logout()
{
  //sessionStorage.token = undefined;
  //sessionStorage.userId = undefined;
  sessionStorage.clear();
  window.location.replace("page_login_and_registration2.html");
}
function redirectToLogin()
{
  sessionStorage.prevPage = window.location.href;
  window.location.href = "page_login_and_registration2.html";
}
function redirectToHome()
{
  window.location.href = "index.html";
}
function redirectToPrevPage()
{
  if(sessionStorage.prevPage != undefined)
  {
    var p = sessionStorage.prevPage;
    sessionStorage.prevPage = undefined;
    window.location.href = p;
  }
  else
  {
    redirectToHome();
  }
}
function getProfileInfo(async)
{
  if(sessionStorage.userId == undefined)
  {
    return;
  }

  if(async == undefined)
    async = true;


  jQuery.ajax({
    url: _userMsUrl + "users/" + sessionStorage.userId,
    type: "GET",
    async: async,
    contentType: "application/json; charset=utf-8",
    success: function(data, textStatus, xhr)
    {
      sessionStorage.type = data.type;
      sessionStorage.name = data.name;
      sessionStorage.logo = data.logo;


    },
    error: function(xhr, status)
    {
    },
    beforeSend: function(xhr, settings)
    {
      xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
    }
  });
}
function getUrlParameter(sParam)
{
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;
  for (i = 0; i < sURLVariables.length; i++)
  {
    sParameterName = sURLVariables[i].split('=');
    if (sParameterName[0] === sParam)
    {
      return sParameterName[1] === undefined ? true : sParameterName[1];
    }
  }
}
function autoCompleteCat(tagId)
{
  var acCategories = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function(datum){
      console.log(datum);
      return datum.id;

    },
    //prefetch: '../data/films/post_1960.json',
    remote: {
      url: _brokerMsUrl + "categories/drop?",
      transform: function(response){
        var ret = [];

        if(response.statusCode == 404)
        {
          return ret;
        }

        for(var i in response)
        {
          ret.push({"name": response[i].name[localStorage.lng],
            "id": response[i]._id});
        }
        return ret;
      },
      prepare: function(query, settings){
        settings.url = settings.url + "name=" + query + "&lang=" + localStorage.lng;
        return settings;
      },
      transport(opts, onSuccess, onError){
        jQuery.ajax({
          url: opts.url,
          type: "GET",
          success: onSuccess,
          error: function(xhr)
          {
            onSuccess(xhr.responseJSON);
          }
        });
      }
    }
  });
  jQuery('#' + tagId).typeahead(null, {
    name: 'categories',
    display: 'name',
    source: acCategories
  });
  jQuery('#' + tagId).bind('typeahead:selected', function(obj, datum, name){
    jQuery('#' + tagId).data("cat-id", datum.id);
    jQuery('#' + tagId).data("cat-name", datum.name);
  });

  jQuery('#' + tagId).data("cat-id", "");
  jQuery('#' + tagId).data("cat-name", "");

}
function loadCookieLawBar()
{
  var links = document.getElementsByTagName('link');
  var needCSS = true;

  for ( var i = 0; i < links.length; i++ )
  {
    if ( links[i].href == "assets/css/jquery.cookiebar.css" )
      needCSS = false;
  }

  if ( needCSS )
  {
    var ls = document.createElement('link');
    ls.rel="stylesheet";
    ls.href="assets/css/jquery.cookiebar.css";
    document.getElementsByTagName('head')[0].appendChild(ls);
  }

  if(jQuery.cookieBar != "function")
  {
    var j = document.createElement('script');
    j.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(j);
    j.src = 'assets/js/plugins/jquery.cookiebar.js';

    j.onload = function()
    {
      initCookieBar();
    }
  }
  else
  {
    initCookieBar();
  }


  jQuery(document).on("translate", function(){
    if(jQuery("#cookie-bar .cb-enable").length > 0)
    {
      var button = jQuery("#cookie-bar .cb-enable").first()[0].cloneNode(true);
      jQuery("#cookie-bar p").html(jQuery.i18n.t("cookieLaw.message"));
      button.innerHTML = jQuery.i18n.t("cookieLaw.accept");
      jQuery("#cookie-bar p").append(button);
    }
  })
}
function initCookieBar()
{
  jQuery.cookieBar({
    message: jQuery.i18n.t("cookieLaw.message"),
    //declineButton: true,
    acceptText: jQuery.i18n.t("cookieLaw.accept"),
    declineText: jQuery.i18n.t("cookieLaw.decline"),
    declineFunction: function() {
      window.location.href = "http://www.crs4.it";
    },
    //renewOnVisit: true,
    expireDays: 90,
    //autoEnable: false,
  });

  jQuery("#cookie-bar p").css("color", "#FFFFFF");
}
