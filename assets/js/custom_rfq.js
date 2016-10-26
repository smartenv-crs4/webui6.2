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


var formatStatus = function(status) {
    console.log(status);
    var s = '';
    switch(status) {
        case 'pending':
            s = i18next.t("rfq.pending");
            break;
        case 'acceptedByC':
            s = i18next.t("rfq.acceptedByC");
            break;
        case 'acceptedByS':
            s = i18next.t("rfq.acceptedByS");
            break;
        case 'rejectedByS':
            s = i18next.t("rfq.rejectedByS");
            break;
        case 'rejectedByC':
            s = i18next.t("rfq.rejectedByC");
            break;
        default:
            throw "Unknown status ";
    }
    return s;
};


Handlebars.registerHelper('formatStatus', formatStatus);

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
  //  $("body").localize();




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
                var theCompiledHtml = theTemplate(data);

                // Add the compiled html to the page
                $("#inbox-rfqs-container").html(theCompiledHtml);


                $("body").localize();
            }




        },
        error: function(xhr, status)
        {
            viewError(xhr.status)
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

            var socket = io.connect('http://localhost:3000',{reconnection:true});
            socket.once('connect', function() {
                socket.emit('join', data._id);
            });




            socket.on('message', function(msg){
                var source;
                var theTemplate;
                var theCompiledHtml;
                if(msg.automatic){
                     msg.text = i18next.t(msg.text);
                    source = $("#rfq_new_message_auto_template").html();
                    theTemplate = Handlebars.compile(source);

                    // Pass our data to the template
                    theCompiledHtml = theTemplate(msg);
                }
                else{
                     source = $("#rfq_new_message_template").html();
                     theTemplate = Handlebars.compile(source);

                    // Pass our data to the template
                     theCompiledHtml = theTemplate(msg);
                }


                // Add the compiled html to the page
                $("#rfq-list-messages").append(theCompiledHtml);


            });

            socket.on('request', function(rqs){

                // Pass our data to the template
                updateRequest(rqs);

            });

            socket.on('error', function(msg){
                console.log(msg);
            });


            if(data){
                // Compile the template

                var source = $("#inbox_rfq_requests_messages").html();
                Handlebars.registerPartial("request", $("#request-partial").html());
                Handlebars.registerPartial("message", $("#rfq_new_message_template").html());
                Handlebars.registerPartial("message-auto", $("#rfq_new_message_auto_template").html());
                var theTemplate = Handlebars.compile(source);

                // Pass our data to the template
                var userType =sessionStorage.type;
                data.currentUser = userType;

                data.measureunits = ['--','unty', 'ltr', 'kg','g','mtr', 'fot','lbr'];
                console.log(data);
                var theCompiledHtml = theTemplate(data);

                // Add the compiled html to the page
                $("#inbox-rfqs-container").html(theCompiledHtml);

                if(sessionStorage.type =="customer")
                    $("#inbox-rfq-header-name").text(data.supplier.name);
                else
                    $("#inbox-rfq-header-name").text(data.customer.name);

                $("body").localize();
                setEditableField(".editable-field");
                setEnableSelect();

                $("body").localize();

            }

        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            viewError(xhr.status)
        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });
}

function setEditableField(field){
    $(field).editable("enable");
    jQuery(document).on("translate", function(){
        jQuery(".editable").each(function(){
            jQuery(this).editable("option", "emptytext", jQuery(this).data("emptytext"));
        });
        jQuery(".editable-empty").each(function(){
            jQuery(this).html(jQuery(this).data("emptytext"));
        });

    });

    $(field).on("save", onSaveEditableField);


    $(field).editable('option', 'validate', function(v) {
            var id_field = $(".editable-open:first").attr("id");
            id_field = id_field.split("-")[1];
            if(!v){

                $("#selectqnty-"+id_field).val('--');
                $("#selectqnty-"+id_field).prop('disabled','disabled');
            }

            else{
                console.log("entra e set");
               $("#selectqnty-"+id_field).val('unty');
                $("#selectqnty-"+id_field).prop('disabled',false);
            }


        if(v && (!$.isNumeric(v) || v < 0)){
            jQuery.jGrowl(i18next.t("rfq.NaN"), {theme:'bg-color-red', life: 5000});
            return i18next.t("rfq.NaN");
        }

    });



}

function setEnableSelect(){

    $( ".editable-disabled").nextAll("form").find("select:first").each(function(index){
        $(this).prop('disabled', 'disabled');
    });
    $( ".editable:not('.editable-disabled')").nextAll("form").find("select:first").each(function(index){
        $(this).prop('disabled', false);
    });
    $( ".editable-empty").nextAll("form").find("select:first").each(function(index){
        $(this).prop('disabled', 'disabled');
    });

    $(".rfq-select").change(onSaveEditableField);

}


function onSaveEditableField(e, params){
    var id = (e.target.id);
    id = id.split("-")[1];

    $('#unsaved_'+ id).removeClass('hidden');
    $("#cancel-req-"+id).removeClass("hidden");
    $("#save-accept-req-"+id).removeClass("hidden");
    $("#req-buttons-"+id+" .default-button").addClass("hidden");

}

function resetRequest(num_req, old_quote, old_quantity, old_unity){

    $('#unsaved_'+ num_req).addClass('hidden');
    $("#cancel-req-"+num_req).addClass("hidden");
    $("#save-accept-req-"+num_req).addClass("hidden");
    $('#quote-'+num_req).editable("setValue",old_quote);
    $('#quantity-'+num_req).editable("setValue",old_quantity);
    $('#selectqnty-'+num_req).val(i18next.t("rfq."+old_unity)); //TO_CHANGE
    $('#selectqnty-'+num_req).attr("value",old_unity); //TO_CHANGE

    $("#accept-"+num_req).removeClass("hidden");
    $("#reject-"+num_req).removeClass("hidden");

}


function updateRequest(rqs){

    $("#rfq-panel-"+rqs._id+" .quote a").editable("setValue",rqs.quote);
    $("#rfq-panel-"+rqs._id+" .quantity a").editable("setValue",rqs.quantity.number);


    var num_req = $("#rfq-panel-"+rqs._id).attr("data-value");

    $("#selectqnty-"+num_req).val(rqs.quantity.unity);
    console.log(rqs.quantity.unity);
    if(!rqs.quantity){
        console.log("empty");
        console.log(num_req);
        $("#selectqnty-"+num_req).prop('disabled','disabled');
    }

    var s = formatStatus(rqs.status);
    var cuser = sessionStorage.type;
    var iconPanelRqs;

    $("#status-"+num_req).text(s);
    if(rqs.status == 'acceptedByS' || rqs.status == 'rejectedByS')
        $("#last-modify-"+num_req).text(rqs.conversation.supplier.name);
    else
        $("#last-modify-"+num_req).text(rqs.conversation.customer.name);

    $('#unsaved_'+ num_req).addClass('hidden');

    if((rqs.status == 'pending'&& cuser == 'customer' )||
        (rqs.status == 'acceptedByS'&& cuser == 'supplier' ) ||
        (rqs.status == 'rejectedByC' || rqs.status == 'rejectedByS' ||
        rqs.status == 'acceptedByC')){
        $("#req-buttons-"+num_req+" .default-button").addClass("hidden");
        $("#cancel-req-"+num_req).addClass("hidden");
        $("#save-accept-req-"+num_req).addClass("hidden");
        $("#quote-"+num_req).editable('disable');
        $("#quantity-"+num_req).editable('disable');
    }
    else if((rqs.status == 'pending'&& cuser == 'supplier' )||
        (rqs.status == 'acceptedByS'&& cuser == 'customer' )){
        //$("#req-buttons-"+num_req).removeClass("hidden");
        setEditableField("#quote-"+num_req);
        setEditableField("#quantity-"+num_req);
        $("#req-buttons-"+num_req+" .default-button").removeClass("hidden");

    }

    if(rqs.status == 'acceptedByS' || rqs.status == 'pending')
        iconPanelRqs =  "fa-exclamation-circle";
    else if(rqs.status == 'acceptedByC')
        iconPanelRqs =  "fa-check-circle";
    else iconPanelRqs =  "fa-times-circle";

    $("a[data-parent='#accordion-"+num_req+"'] i").
    replaceWith("<i class='fa "+iconPanelRqs+" fa-lg pull-right'></i>");
    setEnableSelect();


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
            /* updateRequest(data);*/
            sendMessage(data.conversation._id, true, "rfq.confirmedRequestMsg",+num_req);
            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});
        },
        error: function(xhr, status)
        {
            //console.log(xhr.responseJSON.error);

            viewError(xhr.status)
        },
        beforeSend: function(xhr, settings)
        {
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
    var unity = $("#selectqnty-"+num_req).attr("value");

    var data = {'quantity' : {"number":quantity,"unity":unity}, 'quote' : quote};
    console.log(data);
    for(var k in data){
        if($("#"+k+"-"+num_req).hasClass("editable-empty")){
            if("k" == "quantity") data[k]={"number":"","unity":'--'}
            else data[k]="";
        }


    }


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
           /* updateRequest(data);*/
            sendMessage(data.conversation._id, true,"rfq.modifiedRequestMsg",num_req);
            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});
        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            viewError(xhr.status)
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
    var unity = $("#selectqnty-"+num_req).attr("value");

    var data = {'quantity' : {"number":quantity,"unity":unity}, 'quote' : quote};
    console.log(data);
    for(var k in data){
        if($("#"+k+"-"+num_req).hasClass("editable-empty")){
            if("k" == "quantity") data[k]={"number":undefined,"unity":'--'}
            else data[k]=undefined;
        }


    }
    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/suppaccept",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(data, textStatus, xhr)
        {
            console.log("Request accepted correctly by supplier");
            /*updateRequest(data);*/
            sendMessage(data.conversation._id, true, "rfq.acceptedRequestMsg",num_req);
            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});
        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            viewError(xhr.status)
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
           /*  updateRequest(data); */
            sendMessage(data.conversation._id, true, "rfq.rejectedRequestMsg",num_req);

            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});

        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            viewError(xhr.status)
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
           /* updateRequest(data);*/
            sendMessage(data.conversation._id, true, "rfq.gaveupRequestMsg",num_req);
            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});

        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);
            viewError(xhr.error);
        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });

}

function sendMessage(id_conv, automatic, txt, lnk) {

    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    var text = "";
    var auto = false;
    var link= "#";
    if(automatic) auto = automatic;
    if(txt) text = txt; else text = $("#rfq-input-msg").val();
    if(lnk) link = lnk;
    var data = {
        sender: sessionStorage.userId,
        type: sessionStorage.type,
        dateIn: new Date(),
        draft: false,
        automatic: auto,
        text: text,
        link:link
      //  attachments: ["http//:url"]
    };
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

            viewError(xhr.status)

        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });


}


function openRequest(id){
    $("#collapse-"+id).collapse("show");
}

function openNewRfq(supplier){


    var source = $("#rfq_new_rfq_template").html();
   /* Handlebars.registerPartial("request", $("#request-partial").html());*/

    var theTemplate = Handlebars.compile(source);

    // Pass our data to the template
    var userType =sessionStorage.type;
    //
    //console.log(data);
    var data = {};
    data.currentuser = userType;
    data.munits = ['--','unty', 'ltr', 'kg','g','mtr', 'fot','lbr'];

    var favorites = {};
    data.supplier = supplier;
    var theCompiledHtml = theTemplate(data);
    // Add the compiled html to the page
    $("#inbox-rfqs-container").html(theCompiledHtml);

    $('#expired-date').datepicker({
        dateFormat: 'dd.mm.yy',
        prevText: '<i class="icon-chevron-left"></i>',
        nextText: '<i class="icon-chevron-right"></i>',
        onSelect: function( selectedDate )
        {
          //  $('#finish').datepicker('option', 'minDate', selectedDate);
        }
    });

    $("body").localize();





}

function searchProducts(supId, cb){

        jQuery.ajax({
            url: _brokerMsUrl + "products?supplierId=" + supId,
            type: "GET",
            contentType: "application/json; charset=utf-8",
            success: function(dataResp, textStatus, xhr)
            {

                return dataResp;

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

                return;
            },
            beforeSend: function(xhr, settings)
            {
                xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
            }
        });


}

function viewError(error){

    switch(error)
    {

        case 404:
            $("#inbox-rfqs-container").html(Handlebars.compile(inbox_rfq_empty_template));
            jQuery.jGrowl(i18next.t("warning.emptyResult"), {theme:'bg-color-yellow', life: 5000});
            break;
        case 410:
            jQuery.jGrowl(i18next.t("rfq.rfqExpired"), {theme:'bg-color-red', life: 5000});
            break;
        case 422:
            jQuery.jGrowl(i18next.t("error.bad_request"), {theme:'bg-color-red', life: 5000});
            break;
        case 500:
            jQuery.jGrowl(i18next.t("error.internal_server_error"), {theme:'bg-color-red', life: 5000});
            break;

        default:
            jQuery.jGrowl(i18next.t("error.request_rejected"), {theme:'bg-color-red', life: 5000});
    }
    return;
}
