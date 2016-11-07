/**
 * Created by michela on 07/10/16.
 */
function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

function cacheCompile(templateid, data) {
    if (!window[templateid + "_template"]) {
        window[templateid + "_template"] = Handlebars.compile($('#' + templateid).html());
    }
    return window[templateid + "_template"](data);
}

function isSupplier() {
    if (userType() == "supplier" ) {
        return true;
    }
    else return false;
}

function userType() {
    if (window.sessionStorage && sessionStorage.type)
        return sessionStorage.type;
    else
        return "customer";
}

function userId() {

    if (window.sessionStorage.userId)
        return window.sessionStorage.userId;
    else return null;
}

function isLogged() {
    if (window.sessionStorage.token)
        return true;
    else
        return false;
}

function isSearchVisible() {
    "use strict";
    if (window.isHome)
        return false;
    if (window.isList)
        return false;
    return true;
}