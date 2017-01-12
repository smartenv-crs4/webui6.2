/**
 * Created by michela on 06/10/16.
 */
var _authMsUrl  = "http://seidue.crs4.it:3007/";
var _userMsUrl  = "http://seidue.crs4.it:3008/";
//var _localServiceUrl  = "http://localhost:3000/api/v1/";
var _localServiceUrl  = _brokerMsUrl;
var _serviceUrl =  "http://seidue.crs4.it:3009";
//var _serviceUrl =  "http://localhost:3000";

window.isRFQ = true;

_access_token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtb2RlIjoibXMiLCJpc3MiOiJub3QgdXNlZCBmbyBtcyIsImVtYWlsIjoibm90IHVzZWQgZm8gbXMiLCJ0eXBlIjoiYXV0aG1zIiwiZW5hYmxlZCI6dHJ1ZSwiZXhwIjoxNzg1NTc1MjQ3NTY4fQ.Du2bFjd0jB--geRhnNtbiHxcjQHr5AyzIFmTr3NFDcM";
var defaultImg = "assets/img/team/img32-md.jpg";
var defaultImgPr = "assets/img/port/no_image_available.png";

var data_r;

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


function getConversations(page)
{
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    
    var pageS = "";
    
    if(page)
    {
      pageS = "&page=" + page;
    }
    
     jQuery.ajax({
        url: _localServiceUrl + "conversations?by_uid="+ sessionStorage.userId + pageS,
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
            console.log(xhr);
            viewError(xhr)
        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });
}


function getConversationRequestsAndMessages()
{
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    var id_conv;
    if(hasParameter("convId"))
        id_conv = getParameter("convId");

    if(id_conv){
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

                    var source = $("#inbox_rfq_requests_messages").html();
                    Handlebars.registerPartial("request", $("#request-partial").html());
                    Handlebars.registerPartial("message", $("#rfq_new_message_template").html());
                    Handlebars.registerPartial("message-auto", $("#rfq_new_message_auto_template").html());
                    var theTemplate = Handlebars.compile(source);

                    // Pass our data to the template
                    var userType =sessionStorage.type;
                    data.currentUser = userType;
                    //console.log(data);
                    
                    for(var i in data.requests)
                    {
                      data.requests[i].product.imgUrl = [];
                      
                      if (data.requests[i].product.images.length > 0 && data.requests[i].product.images[0].imageId != undefined)
                      {
                          data.requests[i].product.imgUrl.push(_uploadMsUrl + data.requests[i].product.images[0].imageId + "?tag=t");

                          for(var j = 1; j < data.requests[i].product.images.length; j++)
                          {
                            data.requests[i].product.imgUrl.push(_uploadMsUrl + data.requests[i].product.images[j].imageId + "?tag=t");                          
                          }                        
                      }
                      else {
                          data.requests[i].product.imgUrl.push("assets/img/team/img1-md.jpg");
                      }     
                    }
                    
                    var theCompiledHtml = theTemplate(data);

                    // Add the compiled html to the page
                    $("#inbox-rfqs-container").html(theCompiledHtml);

                    if(sessionStorage.type =="customer")
                        $("#inbox-rfq-header-name").text(data.supplier.name);
                    else
                        $("#inbox-rfq-header-name").text(data.customer.name);

                    if(data.completed){
                        $("#rfq-status-header").text("Completed");
                        $("#rfq-status-header").addClass("label label-success");
                    }
                   else  if(data.expired){
                        $("#rfq-status-header").text("Expired");
                        $("#rfq-status-header").addClass("label label-danger");
                    }
                    else{
                        $("#rfq-status-header").text("Pending");
                        $("#rfq-status-header").addClass("label label-info");
                    }

                    $("#rfq-settings-header").addClass("hidden");

                    $("body").localize();
                    setEditableField(".editable-field");
                   // setEnableSelect();
                    addTooltipField();
                    $("body").localize();




                    var socket = io.connect(_serviceUrl,{reconnection:true});
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

                        var d = $('.cont-list-messages').first();
                        d.scrollTop(d.prop("scrollHeight"));


                    });

                    socket.on('request', function(rqs){

                        // Pass our data to the template
                        updateRequest(rqs);

                    });

                    socket.on('error', function(msg){
                        console.log(msg);
                    });

                }


                $("#rfq-input-msg").bind('keypress', function(e) {
                    if(e.keyCode==13){
                        $('#btn-chat').trigger('click');
                    }
                });

            },
            error: function(xhr, status)
            {

                viewError(xhr)
            },
            beforeSend: function(xhr, settings)
            {
                xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
            }
        });
    }


}

function setEditableField(field){

    $(field).editable("option","placement","right");

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
               var f = $(".editable-open:first").attr("id");
            var id_field = f.split("-")[1];
            var name_field = f.split("-")[0];
            console.log(f);
 /*          if(name_field== "quantity")
            if(!v){
                $("#selectqnty-"+id_field).val('--');
                $("#selectqnty-"+id_field).prop('disabled','disabled');
            }
            else{
                if (!$("#selectqnty-"+id_field).val() || $("#selectqnty-"+id_field).val() == '--')
                    $("#selectqnty-"+id_field).val('unty');
                $("#selectqnty-"+id_field).prop('disabled',false);
            }
*/

        if(v && (!$.isNumeric(v) || v < 0  )){
            jQuery.jGrowl(i18next.t("rfq.NaN"), {theme:'bg-color-red', life: 5000});
            return i18next.t("rfq.NaN");
        }else if(!isValidQuantity(v,f)){
            return i18next.t("rfq.NaVN");
        }

    });

}

function isValidQuantity(q, f){
    var min = $("#"+f).data("min");
    var max = $("#"+f).data("max");

    console.log(min);
    console.log(max);

    if(q>=min && q<=max) return true;
    else return false;
}

function onSaveEditableField(e, params){
    var id = (e.target.id);
    id = id.split("-")[1];

    $('#unsaved_'+ id).removeClass('hidden');
    $("#cancel-req-"+id).removeClass("hidden");
    $("#save-accept-req-"+id).removeClass("hidden");
    $("#req-buttons-"+id+" .default-button").addClass("hidden");
}

function addTooltipField(){

    $('.counter a:not([class])').each(function(){  $(this).tooltip({'title': $(this).text() }) });
    $('.editable').not('.editable-disabled').each(function(){ $(this).tooltip('hide')
        .attr('data-original-title', ' ')
        .tooltip('destroy')});
    $('.editable-disabled').each(function(){ $(this).tooltip('hide')
        .attr('data-original-title', $(this).text())
        .tooltip('show')});

}

function resetRequest(num_req, old_quantity){

    $('#unsaved_'+ num_req).addClass('hidden');
    $("#cancel-req-"+num_req).addClass("hidden");
    $("#save-accept-req-"+num_req).addClass("hidden");
   // $('#quote-'+num_req).editable("setValue",old_quote);
    $('#quantity-'+num_req).editable("setValue",old_quantity);
   // $('#selectqnty-'+num_req).val(i18next.t("rfq."+old_unity)); //TO_CHANGE
   // $('#selectqnty-'+num_req).attr("value",old_unity); //TO_CHANGE
   // if(old_unity == '--') $('#selectqnty-'+num_req).prop("disabled","disabled");

    $("#accept-"+num_req).removeClass("hidden");
    $("#reject-"+num_req).removeClass("hidden");

}


function updateRequest(rqs){
    var num_req = $("#rfq-panel-"+rqs._id).attr("data-value");
   // var quote  =  "";
    var quantity =  "";
   $("#rfq-panel-"+rqs._id+" .quote a").editable("setValue","");

    if(rqs.quantity){
        if(rqs.quantity) quantity = rqs.quantity;
        $("#rfq-panel-"+rqs._id+" .quantity a").editable("setValue",rqs.quantity);
    }

    $("#cancel-req-"+num_req).attr("onclick","resetRequest('"+num_req+"','"+quantity+"')");


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
        $("#quantity-"+num_req).editable('disable');
    }
    else if((rqs.status == 'pending'&& cuser == 'supplier' )||
        (rqs.status == 'acceptedByS'&& cuser == 'customer' )){
        //$("#req-buttons-"+num_req).removeClass("hidden");

        $("#req-buttons-"+num_req+" .default-button").removeClass("hidden");
        setEditableField("#quantity-"+num_req);


    }

    var classNames = $("#status-"+num_req).attr('class').split(/\s+/);
    var classcolor = "color-info";
        $.each(classNames, function (i, className) {
        if(className.split('-')[0] == "color") classcolor = className ;

    });

    if(rqs.status == 'pending' || rqs.status == 'acceptedByS'){
        iconPanelRqs =  "fa-exclamation-circle";
        $("#status-"+num_req).removeClass(classcolor).addClass("color-info");
    }
    else if(rqs.status == 'acceptedByC' ){
        iconPanelRqs =  "fa-check-circle";
        $("#status-"+num_req).removeClass(classcolor).addClass("color-success");
    }
    else {
        iconPanelRqs =  "fa-times-circle";
        $("#status-"+num_req).removeClass(classcolor).addClass("color-danger");
    }

    console.log(rqs.status);

    $("a[href='#collapse-"+num_req+"'] i").
    replaceWith("<i class='fa "+iconPanelRqs+" fa-lg pull-right'></i>");
   // setEnableSelect();

    addTooltipField();
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
             updateRequest(data);
            sendMessage(data.conversation._id, true, "rfq.confirmedRequestMsg",num_req, "accepted");
            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});
        },
        error: function(xhr, status)
        {
            //console.log(xhr.responseJSON.error);

            viewError(xhr)
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
    var quantity = $("#quantity-"+num_req).text();

    var data = {'quantity' :quantity};
    for(var k in data){
        if($("#"+k+"-"+num_req).hasClass("editable-empty")){
            if(k == "quantity") data[k]="";
            else data[k]="";
        }


    }


    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/custmodify",
        type: "POST",
        contentType: "application/json",
       // dataType: 'json',
        data: JSON.stringify(data),
        success: function(data, textStatus, xhr)
        {
            console.log("Request modify correctly by customer");

            updateRequest(data);

            sendMessage(data.conversation._id, true,"rfq.modifiedRequestMsg",num_req, "pending");
            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});
        },
        error: function(xhr, status)
        {

            viewError(xhr)
        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });



}

function acceptBySupplier(id_conv, id_req, num_req, old_quantity, name) {
    var url = _localServiceUrl + "conversations/"+ id_conv+"/requests/"+id_req+"/actions/suppaccept";
    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    var quantity = $("#quantity-"+num_req).text();


    var data = {'quantity' :quantity};
    for(var k in data){
        if($("#"+k+"-"+num_req).hasClass("editable-empty")){
            if(k == "quantity") data[k]="";
            else data[k]="";
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

            updateRequest(data);

            sendMessage(data.conversation._id, true, "rfq.acceptedRequestMsg",num_req, "accepted");
            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});
        },
        error: function(xhr, status)
        {

            viewError(xhr)
        },
        beforeSend: function(xhr, settings)
        {
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

            updateRequest(data);

            sendMessage(data.conversation._id, true, "rfq.rejectedRequestMsg",num_req, "rejected");

            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});

        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            viewError(xhr.responseJSON.statusCode)
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

            updateRequest(data);

            sendMessage(data.conversation._id, true, "rfq.gaveupRequestMsg",num_req, "rejected");
            jQuery.jGrowl(i18next.t("rfq.updateDone"), {theme:'bg-color-green', life: 5000});

        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);
            viewError(xhr.responseJSON.statusCode);
        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });

}

function sendMessage(id_conv, automatic, txt, lnk, status) {

    if(sessionStorage.userId == undefined)
    {
        window.location.replace("page_login_and_registration.html");
    }
    var text = "";
    var auto = false;
    var link= {"url":"#"};
    if(automatic) auto = automatic;
    if(txt) text = txt; else text = $("#rfq-input-msg").val();
    if(lnk) link.url = lnk;
    if(status)  link.info = status;
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
            var d = $('.cont-list-messages').first();
            d.scrollTop(d.prop("scrollHeight"));
            $('#rfq-input-msg').val("");

        },
        error: function(xhr, status)
        {
            console.log(xhr.responseJSON.error);

            viewError(xhr.responseJSON.statusCode)

        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });


}


/**
 * Pesca un parametro dalla query string dell'URL
 * @param whichOne il parametro
 * @return il valore associato al parametro
 */
function getParameter(whichOne) {
    var pairs = location.search.substring(1).split('&');
    var r = "";
    var tp = new Array();
    for (var i = 0; i < pairs.length; i ++) {
        tp = pairs[i].split('=');
        if (whichOne == tp[0])
            r = unescape(tp[1].replace(/\+/g, " "));
    }
    return r;
}

function hasParameter(whichOne) {
    var pairs = location.search.substring(1).split('&');
    var r = "";
    var tp = new Array();
    for (var i = 0; i < pairs.length; i ++) {
        tp = pairs[i].split('=');
        if (whichOne == tp[0])
            r = unescape(tp[1].replace(/\+/g, " "));
    }
    if(r){
        return true;
    }  else{
        return false;
    }
}


function getParameterNames() {
    var ar = location.search.substring(1).split('&');
    for (var i = 0; i < ar.length; i++) {
        ar[i] = ar[i].substring(0, ar[i].indexOf('='));
    }
    return ar;
}

function openRequest(id){

    $(".acc-v1:eq(0)").scrollTo($("#collapse-"+id).parent());
    $("#collapse-"+id).collapse("show");


}




function openNewRfq(){
    if(hasParameter("supplierId") && hasParameter("supplierName")){

        var supplierInfos = getParameterNames();
        var idS, nameS;
        if(supplierInfos){
            idS = getParameter("supplierId");
            nameS = getParameter("supplierName");
        }

        var source = $("#rfq_new_rfq_template").html();
        /* Handlebars.registerPartial("request", $("#request-partial").html());*/

        var theTemplate = Handlebars.compile(source);

        // Pass our data to the template
        var userType =sessionStorage.type;
        //
        var data = {};
        data.currentuser = userType;

        data.idS = idS;
        data.nameS = nameS;

        jQuery.ajax({
            url: _localServiceUrl + "products?supplierId=" + idS,
            type: "GET",
            contentType: "application/json",
            dataType: 'json',
            success: function(resp, textStatus, xhr)
            {

                var source = $("#rfq_new_rfq_template").html();
                Handlebars.registerPartial("newrequest", $("#single_new_rfq_template").html());
                var theTemplate = Handlebars.compile(source);

                console.log("Products supplier found");

                data.products = resp.docs;
                data_r = data;
                data_r.totalrequests = 0;
                var theCompiledHtml = theTemplate(data);

                // Add the compiled html to the page
                $("#inbox-rfqs-container").html(theCompiledHtml);


                $('#expiredate').datepicker({
                    dateFormat: 'yy-mm-dd',
                    prevText: '<i class="icon-chevron-left"></i>',
                    nextText: '<i class="icon-chevron-right"></i>',
                    minDate: new Date(),
                    onSelect: function( selectedDate )
                    {
                        //  $('#finish').datepicker('option', 'minDate', selectedDate);
                    }
                });
                initFormNewRfq();


                $("body").localize();

            },
            error: function(xhr, status)
            {
                console.log(xhr.responseJSON.error);
                viewError(xhr.responseJSON.statusCode);
            },
            beforeSend: function(xhr, settings)
            {
                xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
            }
        });
    }
    else {
        console.log("No parameter");
        jQuery.jGrowl(i18next.t("error.noparameter"), {theme:'bg-color-red', life: 5000});

        redirectToPrevPage();
    }
}

function shorten(text, maxLength) {
    var ret = text;
    if (ret.length > maxLength) {
        ret = ret.substr(0,maxLength-3) + "...";
    }
    return ret;
}


function changeUnit(ele){
    console.log($("#sel-new-"+ele+" option:selected"));
    var ele_q ="#quantity-new-"+ele;
    var min = $("#sel-new-"+ele+" option:selected").data('min');
    console.log(min);
    var max = $("#sel-new-"+ele+" option:selected" ).data('max');
   // var unit = $("#quantity-new-"+ele).data('unit');
    var unit = $("#sel-new-"+ele+" option:selected" ).data('unit');
    $("#unity-new-"+ele).text(i18next.t("rfq."+unit));

    $(ele_q).val("");

    $(ele_q).data('rule-min',min);

    $(ele_q).data('rule-max',max);

    $("#note-max-"+ele).text(max);
    $("#note-min-"+ele).text(min);

    $('#form-new-rfq').valid();
}

function initFormNewRfq(){
    // Validation
    $("#form-new-rfq").validate({
        // Rules for form validation
        rules:
        {
            expiredate:
            {
                required: true
            },
            quantity:{
                digits:true,
             //   max: function(){ $('.row-request')  }
            }
        },
        // Messages for form validation
        messages:
        {
            expiredate:
            {
                required: i18next.t("error.missing_date")
            },
            quote:
            {
                digits: i18next.t("error.invalid_number")
            },
            quantity:{
                digits: i18next.t("error.invalid_number")
            }
        },

        // Ajax form submition
        submitHandler: function(form)
        {
            saveConversation();
        },
        // Do not change code below
        errorPlacement: function(error, element)
        {

            error.insertAfter(element.parent());
            $("body").localize();
        }
    });


}


function saveConversation(){
    var mydate = $("#expiredate").val();
    var subj = $("#request-subject").val();
    var conversation = {
        "customer": sessionStorage.userId,
        "supplier": $("#supplierinfo").attr("data-prop"),
        "dateIn": new Date(),
        "dateValidity": new Date(mydate),
        "completed": false
    };

    if(subj)  conversation.subject = subj;

    jQuery.ajax({
        url: _localServiceUrl + "conversations",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(conversation),
        dataType: 'json',
        success: function(resp, textStatus, xhr)
        {

            var requests =[];
            $(".row-request").each(function(i){
                var select =  $(this).find(".product-list-rfq:eq(0)").val();
                var rqnty =$(this).find(".newqnty:eq(0)").val();
                var runity = $(this).find(".new-qnty-unity:eq(0)").val();

                var request = {
                    "product":select,
                    "status":"pending"
                };

                if(rqnty) request.quantity =rqnty;
                requests.push(request);

            });

            async.map(requests,function(r, cb){
                createRequest(resp._id, r, cb);
            }, function(err, results) {
                // results is now an array of stats for each file
                console.log("Fine creazione conv");
                jQuery.jGrowl(i18next.t("rfq.newrfqcreated"), {theme:'bg-color-green', life: 5000});
                window.location.href="page_rfq_inbox.html";

            });

        },
        error: function(xhr, status)
        {
          //  console.log(xhr.responseJSON.error);
            viewError(xhr);
        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });

}


function addRowRequest(){

    var source = $("#single_new_rfq_template").html();
    var theTemplate = Handlebars.compile(source);
    data_r.totalrequests = data_r.totalrequests +1;
    var theCompiledHtml = theTemplate(data_r);

    // Add the compiled html to the page

    $("#requests-container").append(theCompiledHtml);

    $("body").localize();

}


function deleteRowRequest(id_row){
    if($(".row-request").length > 1)
        $("#"+id_row).remove();
    else
        jQuery.jGrowl(i18next.t("rfq.noDeleteRfq"), {theme:'bg-color-red', life: 5000});

}

function createRequest(id_conv, request, cb){
    jQuery.ajax({
        url: _localServiceUrl + "conversations/"+id_conv+"/requests",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(request),
        dataType: 'json',
        success: function(resp, textStatus, xhr)
        {
        if(cb) cb(null, "Request created");


        },
        error: function(xhr, status)
        {
            if(cb) cb(null, "Request not created");
            console.log(xhr.responseJSON.error);
            viewError(xhr);
        },
        beforeSend: function(xhr, settings)
        {
            xhr.setRequestHeader('Authorization','Bearer ' + sessionStorage.token);
        }
    });


}

function viewError(error){
console.log(error);

    var err;
    if(error.responseJSON) err = error.responseJSON.statusCode;
    else err = error.status;
    switch(err)
    {
        case 401:
            window.location.replace("page_login_and_registration.html");
        case 404:
            $("#inbox-rfqs-container").html(Handlebars.compile($("#inbox_rfq_empty_template").html()));
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
