jQuery(document).ready(function(){
  jQuery("#inupblock").keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      signIn();
      return false;
    }
  });
  jQuery("#resetblock").keypress(function (e) {
    var key = e.which;
    if(key == 13)  // the enter key code
    {
      setPassword();
      return false;
    }
  });

  if(sessionStorage.disabled === "true")
  {
    var respBlock = jQuery("#signInResponse");
    respBlock.html(i18next.t("error.user_disabled"));
    respBlock.removeClass("invisible");
  }
});


jQuery(document).on("translate", function(){
  jQuery('.selectpicker').selectpicker('refresh');
})

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
  data["email"] = email;
  data["password"] = password;
  jQuery.ajax({
    url: _brokerMsUrl + "users/signin",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, xhr)
    {
      // success
      if(xhr.status == 200)
      {
        sessionStorage.token = data["access_credentials"]["apiKey"]["token"];
        sessionStorage.userId = data["access_credentials"]["userId"];
        //sessionStorage.token = data["apiKey"]["token"];
        //sessionStorage.userId = data["userId"];
        sessionStorage.email = email;
        getProfileInfo(false);
        redirectToPrevPage();

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
    }
  });
}



function signUp(confirmNoRfq)
{
  var respBlock = jQuery("#signUpResponse");

  jQuery(".missingVld").removeClass("missingVld");

  var termsChecked  = true;
  var rfqApproval = false;

  jQuery(".checkterms").each(function()
  {
   
    if(!jQuery(this).attr("checked") && jQuery(this).attr("id") != "checkterms-rfq")
    {
      jQuery(this).parent().addClass("missingVld");
      respBlock.removeClass("invisible");
      respBlock.html(i18next.t("error.terms"));
      termsChecked = false
      return;
    }
    else if(jQuery(this).attr("id") == "checkterms-rfq" && jQuery(this).attr("checked"))
    {
      rfqApproval = true;
    }

  });

  if(!termsChecked)
  {
    return;
  }

  if(rfqApproval == false && confirmNoRfq !== true)
  {
    respBlock.removeClass("invisible");
    respBlock.html(i18next.t("warning.noRfqConfirm"));
    var b = document.createElement("button");
    b.className = "btn-u btn-block rounded";
    b.appendChild(document.createTextNode(i18next.t("login.confirm")));
    jQuery(b).click(function(){signUp(true);});
    respBlock.append(b);
    return;
  }


  var email = jQuery("#signUpEmail").val();
  var name = jQuery("#signUpName").val();
  var password = jQuery("#signUpPassword").val();
  var password2 = jQuery("#signUpPassword2").val();
  var userType = jQuery("#signUpUserType").val();



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
  data["email"] = email;
  data["name"] = name;
  data["password"] = password;
  data["type"] = userType;
  data["rfqApproval"] = rfqApproval; 

  jQuery.ajax({
    url: _brokerMsUrl + "users/signup",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, xhr)
    {
      //console.log(xhr);      
      // success
      if(xhr.status == 201)
      {
        sessionStorage.token = data["access_credentials"]["apiKey"]["token"];
        sessionStorage.userId = data["created_resource"]["_id"];
        //sessionStorage.userId = data["userId"];
        //sessionStorage.token = data["apiKey"]["token"];
        sessionStorage.email = email;
        getProfileInfo(false);
        sessionStorage.prevPage = "page_profile_settings.html";
        
        redirectToPrevPage();
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
          console.log(xhr);
          if(xhr.responseJSON.error_message.indexOf("UserExistsError") >= 0)
          {
            respBlock.html(i18next.t("error.user_already_exixts"));
          }
          else
          {
            respBlock.html(i18next.t("error.internal_server_error"));
          }
          break;
        default:
          respBlock.html(xhr.responseJSON.error_message);
      }
      respBlock.removeClass("invisible");
      return;
    }
  });
}



function resetPassword()
{
  var email = jQuery("#emailForgotPass").val();

  var respBlock = jQuery("#signInResponse");

  respBlock.addClass("alert-danger");
  respBlock.removeClass("alert-success");

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
  data["email"] = email;
  jQuery.ajax({
    url: _brokerMsUrl + "users/actions/askresetpassword",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, xhr)
    {
      if(xhr.status == 200)
      {
        respBlock.removeClass("invisible");
        respBlock.removeClass("alert-danger");
        respBlock.addClass("alert-success");
        respBlock.html(i18next.t("login.resetEmail"));
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
    }
  });
}

function setPassword()
{
  var email = getUrlParameter("email");
  var token = getUrlParameter("token");

  var password1 = jQuery("#resetPassword1").val();
  var password2 = jQuery("#resetPassword2").val();

  var respBlock = jQuery("#signInResponse");

  respBlock.addClass("alert-danger");
  respBlock.removeClass("alert-success");

  if(respBlock.is(":visible"))
  {
    respBlock.addClass("invisible");
  }


  if(!email || !token)
  {
    respBlock.html(i18next.t("error.invalid_link"));
    respBlock.removeClass("invisible");
    return;
  }

  if(password1 !== password2)
  {
    respBlock.html(i18next.t("error.password_differs"));
    respBlock.removeClass("invisible");
    return;
  }

  var data = new Object();
  data["email"] = email;
  data["password"] = password1;
  data["resetToken"] = token;
  jQuery.ajax({
    url: _brokerMsUrl + "users/actions/resetpassword",
    type: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(data, textStatus, xhr)
    {
      if(xhr.status == 200)
      {
        respBlock.removeClass("invisible");
        respBlock.removeClass("alert-danger");
        respBlock.addClass("alert-success");
        respBlock.html(i18next.t("login.resetSuccess"));
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
    }
  });
}
