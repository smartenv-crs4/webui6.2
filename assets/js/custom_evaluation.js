var _authMsUrl  = "http://seidue.crs4.it:3007/";
var _userMsUrl  = "http://seidue.crs4.it:3008/";
//var _apiUrl  = "http://seidue.crs4.it:3000/";
var _apiUrl  = "http://127.0.0.1:3000/api/v1/";
_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoibXMiLCJpc3MiOiJub3QgdXNlZCBmbyBtcyIsImVtYWlsIjoibm90IHVzZWQgZm8gbXMiLCJ0eXBlIjoiYXV0aG1zIiwiZW5hYmxlZCI6dHJ1ZSwiZXhwIjoxNzg1NTc1MjQ3NTY4fQ.Du2bFjd0jB--geRhnNtbiHxcjQHr5AyzIFmTr3NFDcM";


 /*******************************************
 ************* EVALUATION START *************
 *******************************************/

function getStarRating(stars)
{
	var rate = 0;
	for (var i = 0; i < stars.length; i++) {
		if (stars[i].checked === true) {
			rate = (stars[i].id).slice(-1);
		};
	};
	return rate;
};

function sendEvaluation()
{
  var evaluation = new Object();
  var overall = jQuery("input[name='overall']");
  evaluation["overall_rate"] = getStarRating(overall);
  var quality = jQuery("input[name='quality']");
  evaluation["product_rate"] = getStarRating(quality);
  var delivery = jQuery("input[name='delivery']");
  evaluation["delivery_rate"] = getStarRating(delivery);
  evaluation["overall_review"] = jQuery("textarea[name='review']").val();
  console.log('overall rate: ' + evaluation["overall_rate"]);
  console.log('product rate: ' + evaluation["product_rate"]);
  console.log('delivery rate: ' + evaluation["delivery_rate"]);
  console.log('review: ' + evaluation["overall_review"]);
  evaluation["from"] = sessionStorage.userId;
  evaluation["to"] = sessionStorage.userId; // to be changed
  evaluation["conversationId"]= "57f4a3da85490ce1186feb7e";
  var respBlock = jQuery("#evaluationResponse");

  if(respBlock.is(":visible"))
  {
    respBlock.addClass("invisible");
  }


///

  jQuery.ajax({
    url: _apiUrl + "evaluations",
    type: "POST",
    data: JSON.stringify(evaluation),
    contentType: "application/json",
    dataType: "json",
    success: function(evaluation, textStatus, xhr)
    {
      console.log('inside success, textStatus is ' + textStatus);
      console.log('inside success, xhr is ' + xhr);
      console.log('inside success, xhr staus is ' + xhr.status);
      console.log('inside success, evaluation is ' + evaluation);
      if(xhr.status == 201)
      {
	// tbdone replace the form in html with Thank you message
	console.log('success!');
        return;
      }
      else
      {
        respBlock.html(xhr.responseJSON.message);
        respBlock.removeClass("invisible");
	console.log('error!');
        return;
      }
    },
    error: function(xhr, status)
    {
      console.log('inside error, status is ' + status);
      //console.log('inside error, xhr status is ' + xhr.status);
      //console.log('inside error, sessionStorage userId ' + sessionStorage.userId);
      //console.log('inside error, sessionStorage token ' + sessionStorage.token);
      console.log(xhr);
      //console.log('xhr responseJSON is ' + xhr.responseJSON);
      //console.log('xhr responseJSON error_message is ' + xhr.responseJSON.message);
      switch(xhr.status)
      { 
        case 400:
          if(xhr.responseJSON.error == "invalid_token")
            respBlock.html(i18next.t("error.unauthorized"))
          else if(xhr.responseJSON.error == "BadRequest")
            respBlock.html(i18next.t("error.missing_user_or_password"));
          else
            respBlock.html(xhr.responseJSON.message);
          break;
	case 401: 
	  respBlock.html(i18next.t("case error missing token (401) in post evaluation"));
	  break;
	  break;
        case 500:
          respBlock.html(i18next.t("error.internal_server_error"));
          break;
        case 403:
          respBlock.html(i18next.t("error.invalid_auth"));
          break;
        default:
	  console.log('default case error!');
          //respBlock.html(xhr.responseJSON.message);
          respBlock.html(xhr.status);
      }
      respBlock.removeClass("invisible");
      return;
    },
    beforeSend: function(xhr, settings)
    {
	    xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
    }
  });
///
};
 /*******************************************
 ************* EVALUATION END ***************
 *******************************************/


