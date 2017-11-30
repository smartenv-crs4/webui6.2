 /*******************************************
 ************* EVALUATION START *************
 *******************************************/
jQuery(document).ready(function(){

    if(sessionStorage.userId == undefined)
    {      
       redirectToLogin();
    };
});


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
  if(sessionStorage.userId == undefined)
  {      
      redirectToLogin();
  }
  var respBlock = jQuery("#evaluationResponse");
  if(respBlock.is(":visible"))
  {
    respBlock.addClass("invisible");
  }
  var evaluation = new Object();
  var overall = jQuery("input[name='overall']");
  evaluation["overall_rate"] = getStarRating(overall);
  if (evaluation["overall_rate"] == 0) {
	  respBlock.html(i18next.t("evaluation.missing_overall"));
	  respBlock.removeClass("invisible");
	  return;
  }
  var quality = jQuery("input[name='quality']");
  evaluation["product_rate"] = getStarRating(quality);
  var delivery = jQuery("input[name='delivery']");
  evaluation["delivery_rate"] = getStarRating(delivery);
  var pricevalue = jQuery("input[name='pricevalue']");
  evaluation["price_value_rate"] = getStarRating(pricevalue);
  var customerservice = jQuery("input[name='customerservice']");
  evaluation["customer_service_rate"] = getStarRating(customerservice);
  evaluation["pros_review"] = jQuery("textarea[name='pros_review']").val();
  evaluation["cons_review"] = jQuery("textarea[name='cons_review']").val();
  console.log('overall rate: ' + evaluation["overall_rate"]);
  console.log('product rate: ' + evaluation["product_rate"]);
  console.log('delivery rate: ' + evaluation["delivery_rate"]);
  console.log('price value rate: ' + evaluation["price_value_rate"]);
  console.log('customer service rate: ' + evaluation["customer_service_rate"]);
  console.log('pros review: ' + evaluation["pros_review"]);
  console.log('cons review: ' + evaluation["cons_review"]);
  if (evaluation["pros_review"] == '')
  {
	  console.log('empty pros review');
  } else {
	  console.log('pros review is not empty:' + evaluation["pros_review"]);
  }
  if (evaluation["cons_review"] == '')
  {
	  console.log('empty cons review');
  } else {
	  console.log('cons review is not empty:' + evaluation["cons_review"]);
  }
  evaluation["from"] = sessionStorage.userId;
//  evaluation["conversationId"]= "5816fe1c747418055f9e921d"; //will be get from link to evaluation page in email or from a closed conversation
  evaluation["conversationId"]= getParameter("convId");


///

  jQuery.ajax({
    url: _brokerMsUrl + "evaluations",
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
       if(respBlock.is(":visible"))
        {
		respBlock.addClass("invisible");
	}

      if(xhr.status == 201)
      {
	// Show thank you message
	console.log('success!');
        //respBlock.html(i18next.t("evaluation.thank_you"));
	//jQuery("#evaluationResponse").html(i18next.t("evaluation.thank_you"));
	window.location.replace("response_evaluation.html");
	//respBlock.removeClass("invisible");
	return;
        }
	else {
        //respBlock.html(i18next.t("evaluation.invalid_evaluation"));
	jQuery("#evaluationResponse").html(i18next.t("evaluation.invalid_evaluatoin"));
	respBlock.removeClass("invisible");
	console.log('uffa!');
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
};
 /*******************************************
 ************* EVALUATION END ***************
 *******************************************/


