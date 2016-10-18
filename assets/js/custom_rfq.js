/**
 * Created by michela on 06/10/16.
 */
var _authMsUrl  = "http://seidue.crs4.it:3007/";
var _userMsUrl  = "http://seidue.crs4.it:3008/";
var _localServiceUrl  = "http://localhost:3000/api/v1/";
_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoibXMiLCJpc3MiOiJub3QgdXNlZCBmbyBtcyIsImVtYWlsIjoibm90IHVzZWQgZm8gbXMiLCJ0eXBlIjoiYXV0aG1zIiwiZW5hYmxlZCI6dHJ1ZSwiZXhwIjoxNzg1NTc1MjQ3NTY4fQ.Du2bFjd0jB--geRhnNtbiHxcjQHr5AyzIFmTr3NFDcM";
var defaultImg = "assets/img/team/img32-md.jpg";
var defaultImgPr = "assets/img/port/no_image_available.png";






Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a) a=a.toString();
    if(b) b=b.toString();
    if (a == b) {
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
        case '>':
            bool = a.toString() > b.toString();
            break;
        case '<':
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

Handlebars.registerHelper('userLogo', function(customer, supplier) {
    if((customer._id == sessionStorage.userId) && supplier.logo) return supplier.logo;
    else if(customer.logo) return customer.logo;
    else return defaultImg;
});

Handlebars.registerHelper('productLogo', function(product) {
    if(product.images && product.images.length > 0) return product.images[0];
    else return defaultImgPr;
});

Handlebars.registerHelper('formatStatus', function(status) {
    console.log(status);
    var s = '';
    switch(status) {
        case 'pending':
            s = 'Pending';
            break;
        case 'acceptedByC':
            s = 'Accepted by Customer';
            break;
        case 'acceptedByS':
            s = 'Accepted by Supplier';
            break;
        case 'rejectedByS':
            s = 'Rejected by Supplier';
            break;
        case 'rejectedByC':
            s = 'Rejected by Customer';
            break;
        default:
            throw "Unknown status ";
    }
    return s;
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

jQuery(document).ready(function() {
    $('#inbox-rfqs-container').html("<div>Loading data ... </div>");
    $("body").localize();




});


function getConversations()
{
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
     jQuery.ajax({
        url: _localServiceUrl + "conversations?by_uid="+ sessionStorage.userId,
        type: "GET",
        contentType: "application/json",
         dataType: 'json',
        success: function(data, textStatus, xhr)
        {

            if(data.docs.length>0){
                // Compile the template
                var source = $("#inbox_rfq_template").html();
                var theTemplate = Handlebars.compile(source);


                // Pass our data to the template
                data.currentUser = sessionStorage.type;
                console.log(data);
                var theCompiledHtml = theTemplate(data);

                // Add the compiled html to the page
                $("#inbox-rfqs-container").html(theCompiledHtml);


                $("body").localize();
            }




        },
        error: function(xhr, status)
        {
            switch(xhr.status)
            {   case 401:
                window.location.replace("page_login_and_registration.html");
                    break;
                case 404:
                    if(xhr.responseJSON.error == "Not Found")
                        $("#inbox-rfqs-container").html(Handlebars.compile($("#inbox_rfq_empty_template").html()));
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

            var socket = io.connect('http://localhost:3000',{reconnection:false});
            socket.once('connect', function() {
                socket.emit('join', data._id);
            });

            socket.on('message', function(msg){
                var source = $("#rfq_new_message_template").html();
                var theTemplate = Handlebars.compile(source);


                // Pass our data to the template
                var theCompiledHtml = theTemplate(msg);

                // Add the compiled html to the page
                $("#rfq-list-messages").append(theCompiledHtml);

            });

            socket.on('request', function(rqs){
                console.log(rqs);
                var source = $("#request-partial").html();
                var theTemplate = Handlebars.compile(source);


                // Pass our data to the template
                rqs.completed = data.completed;
                rqs.expired = data.expired;
                rqs.currentUser = sessionStorage.type;
                rqs.customer = data.customer;
                rqs.supplier = data.supplier;
                rqs._id_c = data._id;

                var theCompiledHtml = theTemplate(rqs);

                // Add the compiled html to the page
              //  $("#rfq-panel-"+rqs._id).replaceWith(theCompiledHtml);
            });

            socket.on('error', function(msg){
                console.log(msg);
                alert('error: ' + msg);
            });


            if(data){
                // Compile the template

                var source = $("#inbox_rfq_requests_messages").html();
                Handlebars.registerPartial("request", $("#request-partial").html());
                var theTemplate = Handlebars.compile(source);

                // Pass our data to the template
                var userType =sessionStorage.type;
                data.currentUser = userType;
                console.log(data);
                var theCompiledHtml = theTemplate(data);


                // Add the compiled html to the page
                $("#inbox-rfqs-container").html(theCompiledHtml);

                $("body").localize();


                if(sessionStorage.type =="customer")
                    $("#inbox-rfq-header-name").text(data.supplier.name);
                else
                    $("#inbox-rfq-header-name").text(data.customer.name);





                $('.editable-field').editable();
                $('.editable-field').on('save', function(e, params) {
                    var userType =sessionStorage.type;
                    data.currentUser = userType;
                    var newStatus = '';

                    var id = (e.target.id);
                    id = id.split("-")[1];


                    $('#unsaved_'+ id).removeClass('hidden');
                    $("#cancel-req-"+id).removeClass("hidden");
                    $("#save-accept-req-"+id).removeClass("hidden");
                    $("#supplier-accept-"+id).addClass("hidden");
                    $("#supplier-reject-"+id).addClass("hidden");
                    $("#customer-accept-"+id).addClass("hidden");
                    $("#customer-reject-"+id).addClass("hidden");

                });

                $("body").localize();


            }




        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            switch(xhr.status)
            {
                case 401:
                    window.location.replace("page_login_and_registration.html");
                    break;
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


function resetRequest(num_req, old_quote, old_quantity){

    console.log(old_quantity);
    $('#unsaved_'+ num_req).addClass('hidden');
    $("#cancel-req-"+num_req).addClass("hidden");
    $("#save-accept-req-"+num_req).addClass("hidden");
    $("#supplier-accept-"+num_req).removeClass("hidden");
    $('#quote-'+num_req).text(old_quote);
    $('#quantity-'+num_req).text(old_quantity);

    $("#customer-accept-"+num_req).removeClass("hidden");
    $("#customer-reject-"+num_req).removeClass("hidden");

}


function createRequest(completed, expired, customer, supplier, id_conv, rqs){
    $("#rfq-panel-"+rqs._id+".quote a").val(rqs.quote);
    $("#rfq-panel-"+rqs._id+".quantity a").val(rqs.quantity);

}

function acceptByCustomer(id_conv, id_req, num_req, name) {
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    jQuery.ajax({
         url: _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/custaccept",
         type: "POST",
        contentType: "application/json",
        dataType: 'json',
        success: function(data, textStatus, xhr)
        {
            console.log("Request modify correctly by customer");

            $("#status-"+num_req).text("Modificated By Customer");
            $("#last-modify-"+num_req).text(name);
            $("#req-buttons-"+num_req).addClass("hidden");

            $("#quote-"+num_req).editable('disable');
            $("#quantity-"+num_req).editable('disable');
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


function modifyByCustomer(id_conv, id_req, num_req, name) {
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    var quote = $("#quote-"+num_req).text();
    var quantity = $("#quantity-"+num_req).text();
    var data = {'quantity' : quantity, 'quote' : quote};
    console.log(data);
    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/custmodify",
        type: "POST",
        contentType: "application/json",
       // dataType: 'json',
        data: JSON.stringify(data),
        success: function(data, textStatus, xhr)
        {
            console.log("Request modify correctly by customer");
            $('#unsaved_'+ num_req).addClass('hidden');
            $("#status-"+num_req).text("Modified By Customer");
            $("#last-modify-"+num_req).text(name);
            $("#req-buttons-"+num_req).addClass("hidden");
            $("#quote-"+num_req).editable('disable');
            $("#quantity-"+num_req).editable('disable');
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

function acceptBySupplier(id_conv, id_req, num_req, old_quote, old_quantity, name) {
    var url = _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/suppaccept";
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    var quote = $("#quote-"+num_req).text();
    var quantity = $("#quantity-"+num_req).text();
    var data = {quantity : quantity, quote : quote};
    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/suppaccept",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(data, textStatus, xhr)
        {
            console.log("Request accepted correctly by supplier");
            if(old_quote!=quote || old_quantity!= quantity)
                $("#status-"+num_req).html("Modified&Accepted By Supplier");
            else
                $("#status-"+num_req).text("Accepted By Supplier");
            $("#last-modify-"+num_req).text(name);


            $('#unsaved_'+ num_req).addClass('hidden');
            $("#req-buttons-"+num_req).addClass("hidden");
            $("#quote-"+num_req).editable('disable');
            $("#quantity-"+num_req).editable('disable');
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

function rejectedBySupplier(id_conv, id_req, num_req, name) {
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }

    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/suppreject",
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        success: function(data, textStatus, xhr)
        {
            console.log("Request rejected correctly by supplier");
            $("#status-"+num_req).text("Rejected By Supplier");
            $("#last-modify-"+num_req).text(name);
            $("#req-buttons-"+num_req).addClass("hidden");
            $("#quote-"+num_req).editable('disable');
            $("#quantity-"+num_req).editable('disable');

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

function rejectedByCustomer(id_conv, id_req, num_req, name) {

    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }

    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/custreject",
        type: "POST",
        contentType: "application/json",
        dataType: 'json',
        success: function(data, textStatus, xhr)
        {
            console.log("Request rejected correctly by customer");
            $("#status-"+num_req).text("Rejected By Customer");
            $("#last-modify-"+num_req).text(name);
            $("#req-buttons-"+num_req).addClass("hidden");
            $("#quote-"+num_req).editable('disable');
            $("#quantity-"+num_req).editable('disable');

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

function sendMessage(id_conv) {

    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    var text = $("#rfq-input-msg").val();
    var data = {
        sender: sessionStorage.userId,
        type: sessionStorage.type,
        dateIn: new Date(),
        draft: false,
        automatic: false,
        text: text
      //  attachments: ["http//:url"]
    };
    console.log(JSON.stringify(data));
    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+ id_conv+"/messages",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(data, textStatus, xhr)
        {


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
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });


}
