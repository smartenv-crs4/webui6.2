/* Write here your custom javascript codes */

var _brokerMsUrl  = "http://seidue.crs4.it/api/broker/v1/";
var _trendsMsUrl;
var _socketBaseUrl;
var _socketPath;
var _messagingMsSocketUrl;
var _messagingMsSocketPath;


//var _authMsUrl;
//var _uploadMsUrl;
//var _messagingMsUrl;

jQuery.ajax({
  url: _brokerMsUrl + "sys/urls",
  type: "GET",
  async: false,
  contentType: "application/json; charset=utf-8",
  success: function(data, textStatus, xhr)
  {
    //_authMsUrl = data.authMsUrl + "/";
    //_uploadMsUrl = data.uploadMsUrl + "/file/";
    //_messagingMsUrl = data.messagingMsUrl + "/";
    _trendsMsUrl = data.trendsMsUrl + "/";

    _socketBaseUrl = data.socketBaseUrl;
    _socketPath = data.socketPath;

    _messagingMsSocketBaseUrl = data.messagingMsSocketBaseUrl;
    _messagingMsSocketPath = data.messagingMsSocketPath;

  },
  error: function(xhr, status)
  {
    console.error("Impossible to retrieve microservices url");
  }
});


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
    isApplicativeUser: isApplicativeUser(),
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
        window.location = 'list.html?name=' + jQuery('#smallSearch').val() + "&type_search=p";
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
  window.location.replace("page_login_and_registration.html");
}
function redirectToLogin()
{
  sessionStorage.prevPage = window.location.href;
  window.location.href = "page_login_and_registration.html";
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
    url: _brokerMsUrl + "users/profile/",
    type: "GET",
    async: async,
    contentType: "application/json; charset=utf-8",
    success: function(data, textStatus, xhr)
    {
      console.log(data);

      sessionStorage.type = data.type;
      sessionStorage.name = data.name;
      sessionStorage.removeItem("disabled");    
      
      if(data.logo != undefined)
      {
        if(data.logo.startsWith("http"))
        {
          sessionStorage.logo = data.logo;
        }
        else
        {
          sessionStorage.logo = _brokerMsUrl + "files/" + data.logo;
        }
      }


    },
    error: function(xhr, status)
    {
      if(sessionStorage.getItem("token") !== undefined)
      {
        sessionStorage.disabled = true;
      }
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
  
  return undefined;
}

function removeImage(iid, pid)
{
  jQuery.ajax({
    url: _brokerMsUrl + "files/actions/imageproduct/" + iid + "/" + pid,      
    type: "DELETE",
    success: function(data){
    },
    error: function(xhr)
    {
      console.log("image " + iid + " doesn't removed")      
    },
    beforeSend: function(xhr, settings)
    {
      xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
    }
  });        
}


function getCategoryName(cid, callback)
{
  jQuery.ajax({
    url: _brokerMsUrl + "categories/" + cid,
    type: "GET",    
    contentType: "application/json; charset=utf-8",
    success: function(data, textStatus, xhr)
    {
      if(callback)
        callback(data);
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

function autoCompleteCat(tagId, callback)
{
  var acCategories = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,    
    identify: function(datum){      
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
            "id": response[i]._id, "type"  :response[i].type});
        }
        //console.log(JSON.stringify(ret));
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
    source: acCategories,
    limit: 10
  });
  
  jQuery('#' + tagId).bind('typeahead:selected', function(obj, datum, name){
    jQuery('#' + tagId).data("cat-id", datum.id);
    jQuery('#' + tagId).data("cat-type", datum.type);
    jQuery('#' + tagId).data("cat-name", datum.name);

    if(callback)
    {
      callback(datum);
    }

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


if(typeof Handlebars !== 'undefined')
{
  Handlebars.registerHelper('for', function(from, to, incr, block) 
  {
    var accum = '';
    for(var i = from; i < to; i += incr)
     accum += block.fn(i);
    return accum;
  });


  Handlebars.registerHelper('if_eq', function(a, b, opts) {
      if(a) a=a.toString();
      if(b) b=b.toString();
      if (a == b) {
          return opts.fn(this);
      } else {
          return opts.inverse(this);
      }
  });

  Handlebars.registerHelper('if_not_eq', function(a, b, opts) {
      if(a) a=a.toString();
      if(b) b=b.toString();
      if (a != b) {
          return opts.fn(this);
      } else {
          return opts.inverse(this);
      }
  });

  Handlebars.registerHelper('if_eq_or_eq', function(a, b, c, d, opts) {
      if (a.toString() == b.toString() || c.toString() == d.toString()) {
          return opts.fn(this);
      } else {
          return opts.inverse(this);
      }
  });

  Handlebars.registerHelper('iff', function(a, operator, b, opts) {
      var bool = false;
      switch(operator) {
          case '==':
              bool = a.toString() == b.toString();
              break;
          case 'gt':
              bool = a.toString() > b.toString();
              break;
          case 'lt':
              bool = a.toString() < b.toString();
              break;
          default:
              throw "Unknown operator " + operator;
      }

      if (bool) {
          return opts.fn(this);
      } else {
          return opts.inverse(this);
      }
  });


  Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);
                  
    return {
      "+": lvalue + rvalue,
      "-": lvalue - rvalue,
      "*": lvalue * rvalue,
      "/": lvalue / rvalue,
      "%": lvalue % rvalue
    }[operator];
  });

  Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
  });

  Handlebars.registerHelper('json64', function(context) {
        return btoa(encodeURIComponent(JSON.stringify(context)).replace(/%([0-9A-F]{2})/g, function(match, p1) {
          return String.fromCharCode(parseInt(p1, 16))
        }));
  });
}
