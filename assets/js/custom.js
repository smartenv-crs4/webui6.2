/* Write here your custom javascript codes */
var _authMsUrl  = "http://seidue.crs4.it:3007/";
var _userMsUrl  = "http://seidue.crs4.it:3008/";
_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoibXMiLCJpc3MiOiJub3QgdXNlZCBmbyBtcyIsImVtYWlsIjoibm90IHVzZWQgZm8gbXMiLCJ0eXBlIjoiYXV0aG1zIiwiZW5hYmxlZCI6dHJ1ZSwiZXhwIjoxNzg1NTc1MjQ3NTY4fQ.Du2bFjd0jB--geRhnNtbiHxcjQHr5AyzIFmTr3NFDcM";



var lng = localStorage.lng;

jQuery(document).ready(function(){
  $('#header_p').html(header_template);
  if (lng != undefined)
  {
    var l = jQuery(".languages a[data-lng='" + lng +"']");
    if(l.length > 0)
    {
      if(lng != jQuery(".languages .active a").first().attr("data-lng"))
      {
        var lngSel = jQuery(".languages .active").first();
        lngSel.empty();
        lngSel.append(l[0].cloneNode(true));
        var c = document.createElement("i");
        c.className = "fa fa-check";
        lngSel.find("a").first().append(c);
        i18next.changeLanguage(lng, function(){});
      }
    }
  }

  jQuery(".languages a").click(function(){
    if(jQuery(this).attr("data-lng"))
    {
      lng = jQuery(this).attr("data-lng");
      localStorage.lng = lng;
      var lngSel = jQuery(".languages .active").first();
      lngSel.empty();
      lngSel.append(this.cloneNode(true));
      var c = document.createElement("i");
      c.className = "fa fa-check";
      lngSel.find("a").first().append(c);
      i18next.changeLanguage(lng, function(){});
    }

  });


});


//i18next.use(i18nextXHRBackend);
i18next.init({
  lng: lng, // evtl. use language-detector https://github.com/i18next/i18next-browser-languageDetector
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


function signIn()
{
  var email = jQuery("#signInEmail").val();
  var password = jQuery("#signInPassword").val();

  var respBlock = jQuery("#signInResponse");

  if(respBlock.is(":visible"))
  {
    respBlock.addClass("invisible");
  }


  if(!isValidEmailAddress(email))
  {
    respBlock.html(i18next.t("error.invalid_email"));
    respBlock.removeClass("invisible");
    return;
  }

  var data = new Object();
  //data["user"] = new Object();
  data["username"] = email;
  data["password"] = password;

  jQuery.ajax({
    url: _userMsUrl + "users/signin",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, xhr)
    {
      // success
      if(xhr.status == 201)
      {
        sessionStorage.token = data["access_credentials"]["apiKey"]["token"];
        return;
      }
      // error
      else
      {
        respBlock.html(xhr.responseJSON.error_message);
        respBlock.removeClass("invisible");
        return;
      }
    },
    error: function(xhr, status)
    {
      console.log(xhr.status);
      switch(xhr.status)
      {
        case 400:
          if(xhr.responseJSON.error == "invalid_token")
            respBlock.html(i18next.t("error.unauthorized"))
          else if(xhr.responseJSON.error == "BadRequest")
            respBlock.html(i18next.t("error.missing_user_or_password"));
          else
            respBlock.html(xhr.responseJSON.error_message);
          break;
        case 500:
          respBlock.html(i18next.t("error.internal_server_error"));
          break;
        case 403:
          respBlock.html(i18next.t("error.invalid_auth"));
          break;
        default:
          respBlock.html(xhr.responseJSON.error_message);
      }
      respBlock.removeClass("invisible");
      return;
    },
    beforeSend: function(xhr, settings)
    {
      xhr.setRequestHeader('Authorization','Bearer ' + _access_token);
    }
  });
}


function signUp()
{
  var email = jQuery("#signUpEmail").val();
  var name = jQuery("#signUpName").val();
  var password = jQuery("#signUpPassword").val();
  var password2 = jQuery("#signUpPassword2").val();
  var userType = jQuery("#signUpUserType").val();

  var respBlock = jQuery("#signUpResponse");

  if(respBlock.is(":visible"))
  {
    respBlock.addClass("invisible");
  }

  if(!isValidEmailAddress(email))
  {
    respBlock.html(i18next.t("error.invalid_email"));
    respBlock.removeClass("invisible");
    return;
  }


  if(password !== password2 || password === "")
  {
    respBlock.html(i18next.t("error.password_differs"));
    respBlock.removeClass("invisible");
    return;
  }


  if(userType !== "customer" && userType !== "supplier")
  {
    respBlock.html(i18next.t("error.unknown_user_type"));
    respBlock.removeClass("invisible");
    return;
  }

  var data = new Object();
  data["user"] = new Object();
  data["user"]["email"] = email;
  data["user"]["name"] = name;
  data["user"]["password"] = password;
  data["user"]["type"] = userType;

  jQuery.ajax({
    url: _userMsUrl + "users/signup",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, xhr)
    {
      console.log(xhr);
      // success
      if(xhr.status == 201)
      {
        sessionStorage.token = data["access_credentials"]["apiKey"]["token"];
      }
      else
      {
        respBlock.html(xhr.responseJSON.error_message);
        respBlock.removeClass("invisible");
        return;
      }
    },
    error: function(xhr, status)
    {
      switch(xhr.status)
      {
        case 400:
          if(xhr.responseJSON.error == "invalid_token")
            respBlock.html(i18next.t("error.unauthorized"))
          else if(xhr.responseJSON.error == "BadRequest")
            respBlock.html(i18next.t("error.missing_user_or_password"));
          else
            respBlock.html(xhr.responseJSON.error_message);
          break;
        case 401:
          respBlock.html(i18next.t("error.bad_request"));
          break;
        case 403:
          respBlock.html(i18next.t("error.invalid_auth"));
          break;
        case 500:
          respBlock.html(i18next.t("error.internal_server_error"));
          break;
        default:
          respBlock.html(xhr.responseJSON.error_message);
      }
      respBlock.removeClass("invisible");
      return;
    },
    beforeSend: function(xhr, settings)
    {
      xhr.setRequestHeader('Authorization','Bearer ' + _access_token);
    }
  });


}



