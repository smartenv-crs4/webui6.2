/**
 * Created by michela on 06/10/16.
 */
var _authMsUrl  = "http://seidue.crs4.it:3007/";
var _userMsUrl  = "http://seidue.crs4.it:3008/";
var _localServiceUrl  = "http://localhost:3000/api/v1/";
_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoibXMiLCJpc3MiOiJub3QgdXNlZCBmbyBtcyIsImVtYWlsIjoibm90IHVzZWQgZm8gbXMiLCJ0eXBlIjoiYXV0aG1zIiwiZW5hYmxlZCI6dHJ1ZSwiZXhwIjoxNzg1NTc1MjQ3NTY4fQ.Du2bFjd0jB--geRhnNtbiHxcjQHr5AyzIFmTr3NFDcM";
var defaultImg = "assets/img/team/img32-md.jpg";
var defaultImgPr = "assets/img/port/no_image_available.png";


Handlebars.registerHelper('isCustomer', function(type) {

    if(type == 'customer') return true;
    else return false;
});

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return opts.fn(this);
    } else {
        return opts.inverse(this);
    }
});



Handlebars.registerHelper('otherName', function(customer, supplier) {
    console.log(customer._id);
    if(customer._id == sessionStorage.userId) return customer.name;
    else return supplier.name;
});

Handlebars.registerHelper('userLogo', function(customer, supplier) {
    if((customer._id == sessionStorage.userId) && customer.logo) return customer.logo;
    else if(supplier.logo) return supplier.logo;
    else return defaultImg;
});

Handlebars.registerHelper('productLogo', function(product) {
    if(product.images.length > 0) return product.images[0];
    else return defaultImgPr;
});

Handlebars.registerHelper('formatDate', function(date) {
  var d = new Date(date);
  return formatDate(d);
});


Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

Handlebars.registerHelper("lastModification", function(status, customer, supplier)
{
    if(status=='pending' || status=='acceptedByC'|| status=='rejectedByC' || status=='expired'){
        return customer.name;
    }else{
        return supplier.name;
    }
});


var inbox_rfq_template = `
<div id="inbox-rfqs" class="panel-body no-padding mCustomScrollbar" data-mcs-theme="minimal-dark">
{{#each docs}}
{{#if completed}}<div class="alert-blocks alert-blocks-pending alert-dismissable">{{else}}
<div class="alert-blocks alert-blocks-success alert-dismissable">{{/if}}
  <a style="cursor: pointer;" onclick="getConversationRequestsAndMessages('{{{_id}}}')">  <button aria-hidden="true" data-dismiss="alert" class="close" type="button">×</button>
<img class="rounded-x" src={{userLogo customer supplier}} alt="">
    <div class="overflow-h">
    <span><strong class="color-dark">{{otherName customer supplier}}</strong></span>
<small class="pull-right"><em class="color-grey">{{formatDate dateIn}}</em></small>

    <p> {{#if completed}}<small class="color-red" style="float: right; ">Close</small>{{else}}
   <small class="color-green" style="float: right; ">Pending...</small>{{/if}}
    <strong>  Subject: <small>{{subject}}</small></strong></p>
</div></a>
</div>
{{/each}}
</div>
`;

var inbox_rfq_empty_template = `
<div id="inbox-rfqs" class="panel-body no-padding mCustomScrollbar" data-mcs-theme="minimal-dark">
<div class="alert-blocks alert-dismissable">
<strong>  No RFQs Found!</strong>
</div>

</div>
`;



var inbox_rfq_requests_messages = `

							<div class="col-lg-6 panel panel-default	">
								<div class="panel-heading overflow-h">
									<i class="fa fa-tasks fa-fw"></i> Requests

								</div>
							<div class="panel-group acc-v1" id="accordion-1">
							{{#each requests}}
								<div class="rfq panel panel-default">
									<div class="panel-heading">
										<h4 class="panel-title">
											<a class="accordion-toggle" data-toggle="collapse" data-parent="#accordion-1" href="#collapse-{{inc @index}}">
												{{inc @index}} - RFQ Subject: {{product.name}}
												<i class="fa  fa-check-circle fa-lg pull-right"></i>
											</a>

										</h4>
									</div>
									<div id="collapse-{{inc @index}}" class="panel-collapse collapse">
										<div class="service-block-v3 alert-blocks service-block-u">
											<img class="rounded-x" src={{productLogo product}} alt="">
											<strong class="service-heading">{{product.name}}</strong>
											<p><h3 class="heading-xs">{{formatDate dateIn}}</h3></p>
                                           <hr>
											<div class="clearfix margin-bottom-10"></div>

											<div class="row margin-bottom-20">
												<div class="col-xs-6 service-in">
													<small>Quote</small>
													<h4 class="counter">{{quote}}</h4>
												</div>
												<div class="col-xs-6 text-right service-in">
													<small>Quantity</small>
													<h4 class="counter">{{quantity}}</h4>
												</div>
											</div>
											
											<div class="statistics">
											
												<h3 class="heading-xs">Status <span class="pull-right">{{status}}</span></h3>
												<!--<div class="progress progress-u progress-xxs">
													<div style="width: 67%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="67" role="progressbar" class="progress-bar progress-bar-light">
													</div>
												</div>-->
												
												<hr>
												<small>Last modification <strong> {{lastModification status ../customer ../supplier}}</strong></small>
												
												
											</div>
											
											<p><button class=" btn-u btn-u-default" type="button">Cancel</button><button class=" btn-u btn-u-sea" type="button">Save</button></p>
										</div>
									</div>
								</div>
								{{/each}}
							</div>							
                            </div>	
                            <div class="col-lg-6 chat-panel panel panel-default">
								<div class="panel-heading overflow-h">
									<i class="fa fa-comments fa-fw"></i> Messages

								</div>
								<!-- /.panel-heading -->
								
								<div class="panel-body">
									<ul class="chat">
									{{#each messages}}
										<li class="{{#if_eq type 'customer'}}left{{else}}right{{/if_eq}} clearfix">
                                    <span class="chat-img {{#if_eq type 'customer'}}pull-left{{else}}pull-right{{/if_eq}}">
                                        <img src="{{sender.logo}}" alt="User Avatar" class="img-circle">
                                    </span>
											<div class="chat-body clearfix">
												<div class="header">
													<strong class="{{#if_eq type 'supplier'}}pull-right{{/if_eq}} primary-font">{{sender.name}}</strong>
													<small class="{{#if_eq type 'customer'}}pull-right{{/if_eq}} text-muted">
														<i class="fa fa-clock-o fa-fw"></i> {{formatDate dateIn}}
													</small>
												</div>
												<p>
													{{text}}
												</p>
											</div>
										</li>
										{{/each}}   
										</ul>
								</div>
										<!-- /.panel-body -->
								<div class="panel-footer">
									<div class="input-group">
										<input id="btn-input" type="text" class="form-control input-sm" placeholder="Type your message here...">
                                            <span class="input-group-btn">
                                            <button class="btn btn-warning btn-sm" id="btn-chat">
                                            Send
                                            </button>
                                         </span>
									</div>
								</div>
								<!-- /.panel-footer -->
							</div>
		
`;

jQuery(document).ready(function() {
    jQuery('#inbox-rfqs-container').html(inbox_rfq_template);

});


function getConversations()
{
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }

    //console.log(sessionStorage.token);
    //console.log(sessionStorage.userId);
     jQuery.ajax({
        url: _localServiceUrl + "conversations?by_uid="+ sessionStorage.userId,
        type: "GET",
        contentType: "application/json",
         dataType: 'json',
        success: function(data, textStatus, xhr)
        {

            if(data.docs.length>0){
                // Compile the template
                var theTemplate = Handlebars.compile(inbox_rfq_template);

                console.log(data);
                // Pass our data to the template
                var theCompiledHtml = theTemplate(data);

                // Add the compiled html to the page
                $("#inbox-rfqs-container").html(theCompiledHtml);
            }




        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            switch(xhr.status)
            {
                case 404:
                    if(xhr.responseJSON.error == "Not Found")
                        $("#inbox-rfqs-container").html(Handlebars.compile(inbox_rfq_empty_template));
                    break;
                case 500:
                    $("#inbox-rfqs-container").html("error.internal_server_error");
                    break;
                default:
                    $("#inbox-rfqs-container").html(xhr.responseJSON.error_message);
            }
            return;
        },
        beforeSend: function(xhr, settings)
        {
            console.log(xhr);
            console.log(sessionStorage.token);
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });
}


function getConversationRequestsAndMessages(id_conv)
{
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
console.log("getConversationRequestsAndMessages");
    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+ id_conv,
        type: "GET",
        contentType: "application/json",
        dataType: 'json',
        success: function(data, textStatus, xhr)
        {

            if(data){
                // Compile the template
                var theTemplate = Handlebars.compile(inbox_rfq_requests_messages);

                console.log(data);
                // Pass our data to the template
                var theCompiledHtml = theTemplate(data);

                // Add the compiled html to the page
                $("#inbox-rfqs-container").html(theCompiledHtml);
            }




        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            switch(xhr.status)
            {
                case 404:
                    if(xhr.responseJSON.error == "Not Found")
                        $("#inbox-rfqs-container").html(Handlebars.compile(inbox_rfq_empty_template));
                    break;
                case 500:
                    $("#inbox-rfqs-container").html("error.internal_server_error");
                    break;
                default:
                    $("#inbox-rfqs-container").html(xhr.responseJSON.error_message);
            }
            return;
        },
        beforeSend: function(xhr, settings)
        {
            console.log(xhr);
            console.log(sessionStorage.token);
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });
}

