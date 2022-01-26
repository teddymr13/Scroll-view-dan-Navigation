/*Must be matched with config.php*/
var cookiepath = '/';
var cookiesecure = false;


function get_xmlhttp(){
    var xmlHttp;

    try{
        xmlHttp = new XMLHttpRequest();
    }
    catch(e){
        try{
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch(e){
            try{
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch(e){
                alert("Your browser does not support AJAX!");
                return false;
            }
        }
    }
    return xmlHttp;
}
function refresh_post(param1, param2, param3){
    if(param1 === undefined || param1 == ""){
        return false;
    }
    else {
        if(param2 === undefined || param2 == "") param2 = "";
        if(param3 === undefined || param3 == "") param3 = false;

        var xmlHttp = get_xmlhttp();
        if (xmlHttp != false) {
            xmlHttp.open("POST", param1, param3);
            xmlHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xmlHttp.send(param2);
            return xmlHttp.responseText;
        }
        else return false;
    }
}
function set_cookie(c_name,c_value,c_exdays,c_path,c_aman){
    var c_exdate = new Date();
    c_exdays = parseInt(c_exdays);
    c_exdate.setTime(c_exdate.getTime()+(c_exdays*24*60*60*1000));

    var c_str = encodeURIComponent(c_value);
    if(c_exdays > 1) c_str += "; expires=" + c_exdate.toUTCString();
    if(c_path!="") c_str += "; path=" + c_path;
    if(c_aman===true) c_str += "; secure";

    document.cookie = c_name + "=" + c_str;
}
function get_cookie(c_name){
    var c_value = document.cookie;
    var c_start = c_value.indexOf(" " + c_name + "=");
    if (c_start == -1){
        c_start = c_value.indexOf(c_name + "=");
    }
    if (c_start == -1){
        c_value = null;
    }
    else{
        c_start = c_value.indexOf("=", c_start) + 1;
        var c_end = c_value.indexOf(";", c_start);
        if (c_end == -1){
            c_end = c_value.length;
        }
        c_value = decodeURIComponent(c_value.substring(c_start,c_end));
    }
    return c_value;
}
function delete_cookie(cookie_name, cookie_path){
    var exdate = new Date();
    exdate.setTime(exdate.getTime()-(366*24*60*60*1000));
    document.cookie = cookie_name + "=; expires=" + exdate.toUTCString() + "; path=" + cookie_path;
}
function arahkan(tautan, new_tab){
    if(new_tab)window.open (tautan, '_blank');
    else window.location = tautan;
}
function backToOpener(param){
    if (window.opener && window.opener.open && !window.opener.closed) close(); else window.location = param;
}
function needSignInConfirm(elem){
    var str = elem.getAttribute("data-confirm-string");
    var url_iso_country = elem.getAttribute("data-iso-country");
    if(!validate_iso_country(url_iso_country)) url_iso_country = '';
    var goto = elem.getAttribute("data-href");
    if(!validate_url(goto)) goto = '';

    if(url_iso_country!=='' && url_iso_country!==undefined && url_iso_country!==null) {
        if (goto === '' || goto === undefined || goto === null) goto = encodeURIComponent(window.location.href);
        else goto = encodeURIComponent(goto);
        if (str === '' || str === undefined || str === null) window.location = url_iso_country + '/user/sign-in.php?ref=' + goto;
        else if (confirm(str)) window.location = url_iso_country + '/user/sign-in.php?ref=' + goto;
    }
}
function getSetHeightWidth100(param, a, b, is_set){
    if(param !== undefined && param !== 'undefined' && param != '') {
        if($(param).length > 0) {
            if(a === undefined || a === 'undefined' || a == '' || typeof a !== 'number') a = 16;
            else a = parseInt(a);

            if(b === undefined || b === 'undefined' || b == '' || typeof b !== 'number') b = 10;
            else b = parseInt(b);

            if(is_set === undefined || is_set === 'undefined' || is_set == '' || typeof is_set !== 'boolean') is_set = false;

            var $elem = $(param);
            var heightElemGlobal = 0;
            $elem.each(function(){
                if(heightElemGlobal == 0) {
                    var widthElem = $(this).width();
                    var heightElem = 0;

                    if (a != b) heightElem = Math.ceil((widthElem / a) * b);
                    else heightElem = Math.ceil(widthElem);

                    if (heightElem > 0) heightElemGlobal = heightElem;
                }
            });

            if (is_set) $elem.css("height", heightElemGlobal + "px");
            return heightElemGlobal;
        }
    }
}
function number_format(n, c, d, t){
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d == undefined ? "." : d;
    t = t == undefined ? "," : t;
    var s = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
function formatMoney(val, curr){
    var hasil = '';
    if(curr=='USD'){
        hasil = number_format(val, 2, '.', ',');
    }
    else{
        hasil = number_format(val, 2, ',', '.');
    }

    return hasil;
}
function isSizeMobile(){
    return $(window).width() < 769;
}
function isSizeBig(){
    return $(window).width() > 1600;
}
function cek_mobile(){
    var uagent = navigator.userAgent.toLowerCase();
    return (uagent.search("ipod") > -1 || uagent.search("ipad") > -1 || uagent.search("iphone") > -1 || uagent.search("android") > -1 || uagent.search("blackberry") > -1 || uagent.search("webos") > -1);
}
function validate_iso_country(param){
    var n = parseInt(param.length);
    if(n===2) return /[a-zA-Z]/g.test(param);
    else return false;
}
function validate_url(param){
    var reg_ex = new RegExp(
        "^" +
        // protocol identifier
        "(?:(?:https?|ftp)://)" +
        // user:pass authentication
        "(?:\\S+(?::\\S*)?@)?" +
        "(?:" +
        // IP address exclusion
        // private & local networks
        "(?!(?:10|127)(?:\\.\\d{1,3}){3})" +
        "(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})" +
        "(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})" +
        // IP address dotted notation octets
        // excludes loopback network 0.0.0.0
        // excludes reserved space >= 224.0.0.0
        // excludes network & broacast addresses
        // (first & last IP address of each class)
        "(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])" +
        "(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}" +
        "(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))" +
        "|" +
        // host name
        "(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)" +
        // domain name
        "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*" +
        // TLD identifier
        "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))" +
        // TLD may end with dot
        "\\.?" +
        ")" +
        // port number
        "(?::\\d{2,5})?" +
        // resource path
        "(?:[/?#]\\S*)?" +
        "$", "i");

    return reg_ex.test(param);
}

/* Input */
function keyHanyaAngka(e){
    // Allow: backspace, delete, tab, escape, enter and .
    if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        // Allow: Ctrl/cmd+A
        (e.keyCode == 65 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+C
        (e.keyCode == 67 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: Ctrl/cmd+X
        (e.keyCode == 88 && (e.ctrlKey === true || e.metaKey === true)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39)) {
        // let it happen, don't do anything
        return;
    }
    // Ensure that it is a number and stop the keypress
    if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
        e.preventDefault();
    }
}
function keyLimitTextarea(id_ta, panjang){
    if(document.getElementById(id_ta).value.length > parseInt(panjang)){
        document.getElementById(id_ta).value = document.getElementById(id_ta).value.substring(0, parseInt(panjang));
    }
}
function keyLimitTextareaNoNL(id_nya, panjang){
    if(document.getElementById(id_nya).value!=''){
        var sementara_aja = document.getElementById(id_nya).value;
        document.getElementById(id_nya).value = sementara_aja.replace(/[\n\r\t]/g, " ");
        keyLimitTextarea(id_nya, panjang);
    }
}

/* Dropdown */
var td_cat_aktif = 0;
var td_sub_aktif = 0;
var td_sub2_aktif = 0;
function getStrPage(tipeHlm, typeurl){
    if(typeurl) {
        switch (tipeHlm) {
            case 2 : return "marketplace";
            case 3 : return "store";
            case 4 : return "trade";
            case 5 : return "dining";
            case 6 : return "hotel";
            case 7 : return "newsfeed";
            case 8 : return "magazine";
            case 9 : return "beauty-wellness";
            case 10 : return "e-voucher";
            default: return "";
        }
    }
    else{
        switch(tipeHlm){
            case 2 : return 'Marketplace';
            case 3 : return 'Store';
            case 4 : return 'Trade';
            case 5 : return 'Dining';
            case 6 : return 'Hotel';
            case 7 : return "Newsfeed";
            case 8 : return "Bookshelf";
            case 9 : return 'Beauty & Wellness';
            case 10 : return "E Voucher";
            default: return '';
        }
    }
}
function initTopFilterSub(){
    if(document.getElementById("div_top_filter_sub") && (isSizeMobile() || cek_mobile()))
        document.getElementById("div_top_filter_sub").style.display = "none";
    if(document.getElementById("div_top_filter_sub2") && (isSizeMobile() || cek_mobile()))
        document.getElementById("div_top_filter_sub2").style.display = "none";
    if(document.getElementById("div_top_filter_sub3") && (isSizeMobile() || cek_mobile()))
        document.getElementById("div_top_filter_sub3").style.display = "none";
}
function refreshSub2lvlTopMenu(tipeHlm, idcatTF, additional_param, isoTF){
    tipeHlm = parseInt(tipeHlm);
    idcatTF = parseInt(idcatTF);
    if(additional_param!='') additional_param = "&idp=" + additional_param;
    document.getElementById("div_top_filter_sub").innerHTML = '';
    if(idcatTF >= 0 && isoTF!=''){
        var hasil = refresh_post("ajax/"+isoTF+"/"+getStrPage(tipeHlm, true)+"/ajax_refresh_top_menu_sub_2lvlcat.php", "idc=" + idcatTF + additional_param, false);
        document.getElementById("div_top_filter_sub").innerHTML = hasil;
        if(hasil!=''){
            if(isSizeMobile() || cek_mobile()){
                document.getElementById("div_top_filter_cat").style.display = "none";
                $("#div_top_filter_sub").show({ effect:'slide', direction:'right', duration:350 });
            }
            else{
                if(td_cat_aktif > 0) {
                    document.getElementById("top_filter_td_cat_" + td_cat_aktif).classList.remove('top_filter_td_next_menu_on');
                    document.getElementById("top_filter_td_cat_" + td_cat_aktif).classList.add('top_filter_td_next_menu');
                }
                if(idcatTF > 0){
                    document.getElementById("top_filter_td_cat_" + idcatTF).classList.remove('top_filter_td_next_menu');
                    document.getElementById("top_filter_td_cat_" + idcatTF).classList.add('top_filter_td_next_menu_on');
                }
            }
            if(document.getElementById('button_tr_back_to_2lvlcat')) document.getElementById('button_tr_back_to_2lvlcat').addEventListener('click', tfBackTo2lvlCat);
            td_cat_aktif = idcatTF;
        }
    }
}
function tfBackTo2lvlCat(){
    if(isSizeMobile() || cek_mobile()){
        document.getElementById("div_top_filter_sub").style.display = "none";
        $("#div_top_filter_cat").show({ effect:'slide', direction:'left', duration:350 });
    }
}

function refreshTopFilterSub(tipeHlm, idcatTF, isoTF){
    tipeHlm = parseInt(tipeHlm);
    idcatTF = parseInt(idcatTF);
    if(tipeHlm != '' && (tipeHlm == 2 || tipeHlm == 3 || tipeHlm == 4 || tipeHlm == 9) && idcatTF!='' && idcatTF > 0 && isoTF!=''){
        var str_url_page = getStrPage(tipeHlm, true);
        var hasil = refresh_post("ajax/"+isoTF+"/"+str_url_page+"/ajax_refresh_top_menu_product_sub_cat.php", "sub_level=1&idc=" + idcatTF, false);
        document.getElementById("div_top_filter_sub").innerHTML = hasil;
        if(hasil!=''){
            if(isSizeMobile() || cek_mobile()){
                document.getElementById("div_top_filter_cat").style.display = "none";
                document.getElementById("div_top_filter_sub2").style.display = "none";
                document.getElementById("div_top_filter_sub3").style.display = "none";
                $("#div_top_filter_sub").show({ effect:'slide', direction:'right', duration:350 });
            }
            else{
                if(td_cat_aktif > 0) {
                    document.getElementById("top_filter_td_cat_" + td_cat_aktif).classList.remove('top_filter_td_next_menu_on');
                    document.getElementById("top_filter_td_cat_" + td_cat_aktif).classList.add('top_filter_td_next_menu');
                }
                if(idcatTF > 0){
                    document.getElementById("top_filter_td_cat_" + idcatTF).classList.remove('top_filter_td_next_menu');
                    document.getElementById("top_filter_td_cat_" + idcatTF).classList.add('top_filter_td_next_menu_on');
                }
            }
            td_cat_aktif = idcatTF;

            if(document.getElementById('button_tr_back_to_cat')) document.getElementById('button_tr_back_to_cat').addEventListener('click', tfBackToCat);

            $("tr[name='button_tr_top_menu_sub']").off();
            $("tr[name='button_tr_top_menu_sub']").on('click', function () {
                refreshTopFilterSub2(parseInt($(this).attr("data-halaman")), parseInt($(this).attr("data-id-cat")), $(this).attr("data-iso-country"));
            });
        }
    }
    else document.getElementById("div_top_filter_sub").innerHTML = '';

    document.getElementById("div_top_filter_sub2").innerHTML = '';
    document.getElementById("div_top_filter_sub3").innerHTML = '';
}
function refreshTopFilterSub2(tipeHlm, idcatTF, isoTF){
    tipeHlm = parseInt(tipeHlm);
    idcatTF = parseInt(idcatTF);
    if(tipeHlm != '' && (tipeHlm == 2 || tipeHlm == 3 || tipeHlm == 4 || tipeHlm == 9) && idcatTF!='' && idcatTF > 0 && isoTF!=''){
        var str_url_page = getStrPage(tipeHlm, true);
        var hasil = refresh_post("ajax/"+isoTF+"/"+str_url_page+"/ajax_refresh_top_menu_product_sub_cat.php", "sub_level=2&idc=" + idcatTF, false);
        document.getElementById("div_top_filter_sub2").innerHTML = hasil;
        if(hasil!=''){
            if(isSizeMobile() || cek_mobile()){
                document.getElementById("div_top_filter_cat").style.display = "none";
                document.getElementById("div_top_filter_sub").style.display = "none";
                document.getElementById("div_top_filter_sub3").style.display = "none";
                $("#div_top_filter_sub2").show({ effect:'slide', direction:'right', duration:350 });
            }
            else{
                if(td_sub_aktif > 0) {
                    document.getElementById("top_filter_td_sub_" + td_sub_aktif).classList.remove('top_filter_td_next_menu_on');
                    document.getElementById("top_filter_td_sub_" + td_sub_aktif).classList.add('top_filter_td_next_menu');
                }
                if(idcatTF > 0){
                    document.getElementById("top_filter_td_sub_" + idcatTF).classList.remove('top_filter_td_next_menu');
                    document.getElementById("top_filter_td_sub_" + idcatTF).classList.add('top_filter_td_next_menu_on');
                }
            }
            td_sub_aktif = idcatTF;

            if(document.getElementById('button_tr_back_to_sub')) document.getElementById('button_tr_back_to_sub').addEventListener('click', tfBackToSub);

            $("tr[name='button_tr_top_menu_sub2']").off();
            $("tr[name='button_tr_top_menu_sub2']").on('click', function () {
                refreshTopFilterSub3(parseInt($(this).attr("data-halaman")), parseInt($(this).attr("data-id-cat")), $(this).attr("data-iso-country"));
            });
        }
    }
    else document.getElementById("div_top_filter_sub2").innerHTML = '';

    document.getElementById("div_top_filter_sub3").innerHTML = '';
}
function refreshTopFilterSub3(tipeHlm, idcatTF, isoTF){
    tipeHlm = parseInt(tipeHlm);
    idcatTF = parseInt(idcatTF);
    if(tipeHlm != '' && (tipeHlm == 2 || tipeHlm == 3 || tipeHlm == 4 || tipeHlm == 9) && idcatTF!='' && idcatTF > 0 && isoTF!=''){
        var str_url_page = getStrPage(tipeHlm, true);
        var hasil = refresh_post("ajax/"+isoTF+"/"+str_url_page+"/ajax_refresh_top_menu_product_sub_cat.php", "sub_level=3&idc=" + idcatTF, false);
        document.getElementById("div_top_filter_sub3").innerHTML = hasil;
        if(hasil!=''){
            if(isSizeMobile() || cek_mobile()){
                document.getElementById("div_top_filter_cat").style.display = "none";
                document.getElementById("div_top_filter_sub").style.display = "none";
                document.getElementById("div_top_filter_sub2").style.display = "none";
                $("#div_top_filter_sub3").show({ effect:'slide', direction:'right', duration:350 });
            }
            else{
                if(td_sub2_aktif > 0) {
                    document.getElementById("top_filter_td_sub2_" + td_sub2_aktif).classList.remove('top_filter_td_next_menu_on');
                    document.getElementById("top_filter_td_sub2_" + td_sub2_aktif).classList.add('top_filter_td_next_menu');
                }
                if(idcatTF > 0){
                    document.getElementById("top_filter_td_sub2_" + idcatTF).classList.remove('top_filter_td_next_menu');
                    document.getElementById("top_filter_td_sub2_" + idcatTF).classList.add('top_filter_td_next_menu_on');
                }
            }
            td_sub2_aktif = idcatTF;

            if(document.getElementById('button_tr_back_to_sub2')) document.getElementById('button_tr_back_to_sub2').addEventListener('click', tfBackToSub2);
        }
    }
    else document.getElementById("div_top_filter_sub3").innerHTML = '';
}
function tfBackToCat(){
    if(isSizeMobile() || cek_mobile()){
        document.getElementById("div_top_filter_sub").style.display = "none";
        document.getElementById("div_top_filter_sub2").style.display = "none";
        document.getElementById("div_top_filter_sub3").style.display = "none";
        $("#div_top_filter_cat").show({ effect:'slide', direction:'left', duration:350 });
    }
}
function tfBackToSub(){
    if(isSizeMobile() || cek_mobile()){
        document.getElementById("div_top_filter_cat").style.display = "none";
        document.getElementById("div_top_filter_sub2").style.display = "none";
        document.getElementById("div_top_filter_sub3").style.display = "none";
        $("#div_top_filter_sub").show({ effect:'slide', direction:'left', duration:350 });
    }
}
function tfBackToSub2(){
    if(isSizeMobile() || cek_mobile()){
        document.getElementById("div_top_filter_cat").style.display = "none";
        document.getElementById("div_top_filter_sub").style.display = "none";
        document.getElementById("div_top_filter_sub3").style.display = "none";
        $("#div_top_filter_sub2").show({ effect:'slide', direction:'left', duration:350 });
    }
}

var td_city_aktif = 0;
var td_loc_aktif = 0;
function initTopFilterLoc(){
    if(document.getElementById("div_top_filter_loc") && document.getElementById("div_top_filter_subloc") && (isSizeMobile() || cek_mobile())){
        document.getElementById("div_top_filter_loc").style.display = "none";
        document.getElementById("div_top_filter_subloc").style.display = "none";
    }
}
function refreshTopFilterLoc(tipeHlm, idcityTF, isoTF){
    tipeHlm = parseInt(tipeHlm);
    idcityTF = parseInt(idcityTF);
    if(tipeHlm != '' && (tipeHlm == 3 || tipeHlm == 5 || tipeHlm == 6 || tipeHlm == 9) && idcityTF!='' && idcityTF > 0 && isoTF!=''){
        var str_url_page = getStrPage(tipeHlm, true);
        var hasil = refresh_post("ajax/"+isoTF+"/"+str_url_page+"/ajax_refresh_top_menu_loc.php", "idc=" + idcityTF, false);
        document.getElementById("div_top_filter_loc").innerHTML = hasil;
        if(hasil!=''){
            if(isSizeMobile() || cek_mobile()){
                document.getElementById("div_top_filter_city").style.display = "none";
                document.getElementById("div_top_filter_subloc").style.display = "none";
                $("#div_top_filter_loc").show({ effect:'slide', direction:'right', duration:350 });
            }
            else{
                if(td_city_aktif > 0) {
                    document.getElementById("top_filter_td_city_" + td_city_aktif).classList.remove('top_filter_td_next_menu_on');
                    document.getElementById("top_filter_td_city_" + td_city_aktif).classList.add('top_filter_td_next_menu');
                }
                if(idcityTF > 0){
                    document.getElementById("top_filter_td_city_" + idcityTF).classList.remove('top_filter_td_next_menu');
                    document.getElementById("top_filter_td_city_" + idcityTF).classList.add('top_filter_td_next_menu_on');
                }
            }
            td_city_aktif = idcityTF;

            if(document.getElementById('button_tr_back_to_city')) document.getElementById('button_tr_back_to_city').addEventListener('click', tfBackToCity);

            $("tr[name='button_tr_top_menu_loc']").off();
            $("tr[name='button_tr_top_menu_loc']").on('click', function () {
                refreshTopFilterSubLoc(parseInt($(this).attr("data-halaman")), parseInt($(this).attr("data-id-loc")), parseInt($(this).attr("data-id-city")), $(this).attr("data-iso-country"));
            });
        }
    }
    else document.getElementById("div_top_filter_loc").innerHTML = '';

    document.getElementById("div_top_filter_subloc").innerHTML = '';
}

function refreshTopFilterSubLoc(tipeHlm, idlocTF, idcityTF, isoTF){
    tipeHlm = parseInt(tipeHlm);
    idlocTF = parseInt(idlocTF);
    idcityTF = parseInt(idcityTF);
    if(tipeHlm != '' && (tipeHlm == 3 || tipeHlm == 5 || tipeHlm == 6 || tipeHlm == 9) && idlocTF!='' && idlocTF > 0 && idcityTF!='' && idcityTF > 0 && isoTF!=''){
        var str_url_page = getStrPage(tipeHlm, true);
        var hasil = refresh_post("ajax/"+isoTF+"/"+str_url_page+"/ajax_refresh_top_menu_sub_loc.php", "idl=" + idlocTF + "&idc=" + idcityTF, false);
        document.getElementById("div_top_filter_subloc").innerHTML = hasil;
        if(hasil!=''){
            if(isSizeMobile() || cek_mobile()){
                document.getElementById("div_top_filter_city").style.display = "none";
                document.getElementById("div_top_filter_loc").style.display = "none";
                $("#div_top_filter_subloc").show({ effect:'slide', direction:'right', duration:350 });
            }
            else{
                if(td_loc_aktif > 0) {
                    document.getElementById("top_filter_td_loc_" + td_loc_aktif).classList.remove('top_filter_td_next_menu_on');
                    document.getElementById("top_filter_td_loc_" + td_loc_aktif).classList.add('top_filter_td_next_menu');
                }
                if(idlocTF > 0){
                    document.getElementById("top_filter_td_loc_" + idlocTF).classList.remove('top_filter_td_next_menu');
                    document.getElementById("top_filter_td_loc_" + idlocTF).classList.add('top_filter_td_next_menu_on');
                }
            }
            td_loc_aktif = idlocTF;

            if(document.getElementById('button_tr_back_to_loc')) document.getElementById('button_tr_back_to_loc').addEventListener('click', tfBackToLoc);
        }
    }
    else{
        document.getElementById("div_top_filter_subloc").innerHTML = '';
    }
}
function tfBackToCity(){
    if(isSizeMobile() || cek_mobile()){
        document.getElementById("div_top_filter_loc").style.display = "none";
        document.getElementById("div_top_filter_subloc").style.display = "none";
        $("#div_top_filter_city").show({ effect:'slide', direction:'left', duration:350 });
    }
}
function tfBackToLoc(){
    if(isSizeMobile() || cek_mobile()){
        document.getElementById("div_top_filter_city").style.display = "none";
        document.getElementById("div_top_filter_subloc").style.display = "none";
        $("#div_top_filter_loc").show({ effect:'slide', direction:'left', duration:350 });
    }
}

function setFillerFilterHeight(){
    if(document.getElementById("top_filter")){
        $(".filler_filter").css("height", Math.ceil($("#top_filter").height()) + "px");
    }
}

function resetTriggerFilter() {
    var $triger_filter = $('.trigger_filter');
    $triger_filter.addClass("a_filter");
    $triger_filter.removeClass("a_filter_active");
    $('#trigger_search').removeClass("color_1")
}
function openFilter(param){
    param = parseInt(param);
    if(param > 0) {
        var $container_top_filter = $('#container_top_filter');
        var $div_filter = $('#div_filter_' + param);
        if ($container_top_filter.is(':visible') && !($div_filter.hasClass("hide"))) {
            closeFilter();
        }
        else {
            resetTriggerFilter();
            var $triger_filter_active = $('#trigger_filter_' + param);
            $triger_filter_active.removeClass("a_filter");
            $triger_filter_active.addClass("a_filter_active");

            $('.div_top_filter').addClass("hide");
            $div_filter.removeClass("hide");

            $container_top_filter.css("background-color", "rgb(239,233,230)");
            $container_top_filter.slideDown("fast", function () {
                setFillerFilterHeight();
            });
        }
    }
}
function openSearch(){
    var $container_top_filter = $('#container_top_filter');
    var $div_filter = $('#div_filter_search');
    if($container_top_filter.is(':visible') && !($div_filter.hasClass("hide"))) {
        closeFilter();
    }
    else {
        resetTriggerFilter();
        $('#trigger_search').addClass("color_1");

        $('.div_top_filter').addClass("hide");
        $div_filter.removeClass("hide");

        $container_top_filter.css("background-color", "rgb(255,255,255)");
        $container_top_filter.slideDown("fast", function () {
            setFillerFilterHeight();
            document.getElementById('top_search_field').focus();
        });
    }
}
function closeFilter(){
    $('#container_top_filter').slideUp("fast", function(){
        resetTriggerFilter();
        setFillerFilterHeight();
    });
}
function getFilterString(strElem){
    var strResult = '';
    if(strElem!=''){
        var i;
        var flagExist = false;
        var elem = document.getElementsByName(strElem);

        for(i = 0; i < elem.length; i++) {
            if (elem[i].checked == true) {
                if(flagExist) strResult = strResult + ',';
                strResult = strResult + elem[i].value;
                flagExist = true;
            }
        }
    }
    return strResult;
}
function togleContentFilter(param){
    param = parseInt(param);
    if(param > 0){
        if(document.getElementById("div_content_filter_" + param)){
            $("#div_content_filter_" + param).slideToggle("fast");
        }
    }
}

/* List */
function createLoadMoreButton(total, count){
    if (document.getElementById("container_load_more")) {
        if (total > count) {
            document.getElementById("container_load_more").innerHTML = '<div id="load_more_button" class="load_more_button"><div><img src="assets/images/PreloaderLogo6.gif"/></div></div>';
        }
        else document.getElementById("container_load_more").innerHTML = '';
    }
}
function main_load_more(multiplier, idxPage, totalContent, ajaxTarget, ajaxParam, divTarget){
    if(document.getElementById("container_load_more")) {
        document.getElementById("container_load_more").innerHTML = '<div id="floatingBarsF"><div class="blockF" id="rotateF_01"></div><div class="blockF" id="rotateF_02"></div><div class="blockF" id="rotateF_03"></div><div class="blockF" id="rotateF_04"></div><div class="blockF" id="rotateF_05"></div><div class="blockF" id="rotateF_06"></div><div class="blockF" id="rotateF_07"></div><div class="blockF" id="rotateF_08"></div></div>';

        if (totalContent > (idxPage * multiplier)) {
            idxPage++;
            ajaxParam = ajaxParam + "hlm=" + idxPage + "&jmlhlimiter=" + multiplier;
            var hasil = refresh_post(ajaxTarget, ajaxParam, false);
            if (hasil) document.getElementById(divTarget).innerHTML = document.getElementById(divTarget).innerHTML + hasil;

            createLoadMoreButton(totalContent, (idxPage * multiplier));
        }
        else document.getElementById("container_load_more").innerHTML = '';
    }

    return idxPage;
}

function load_more_share_button() {
    var $more_share_icon = $('.more_share_icon');
    if($more_share_icon.length){
        $more_share_icon.off();
        $more_share_icon.on('click', function () {
            var more_share_url = $(this).attr('data-share-url');
            if(!validate_url(more_share_url)) more_share_url = '';
            if(more_share_url!=='' && more_share_url!==null && more_share_url!==undefined)
                window.open('http://api.addthis.com/oexchange/0.8/offer?url='+more_share_url+'&title='+encodeURIComponent($(this).attr('data-share-title'))+'&description='+encodeURIComponent($(this).attr('data-share-text'))+'&pubid=ra-5965c2491386d934', 'sharer', 'width=640,height=480,scrollbars=1,menubar=0,toolbar=0,status=0,location=0');
        });
    }
}

/* Footer */
function adjust_footer(){
    if(document.getElementById("div_footer")) {
        var tinggi_footer = $("#div_footer").height();
        $(".wrapper").css({
            marginBottom: '-' + tinggi_footer + 'px'
        });
        $(".isi").css({
            paddingBottom: tinggi_footer + 'px'
        });
    }
}

function scroll_to_view(elem){
    if(elem!=''){
        if($(elem).length > 0){
            var topFilterHeight = 0;
            if(document.getElementById("top_filter")) topFilterHeight = document.getElementById("top_filter").offsetHeight;
            var destTop = $(elem).offset().top;
            var hasil = destTop - topFilterHeight;
            hasil = parseInt(hasil);
            $("html, body").animate({
                scrollTop: hasil
            }, 500);
        }
    }
}

function showmenu(){
    if(!open_left_menu) {
        openNavMenu(function () {
            $(document).on("click", function (e) {
                if ($(e.target).attr("id") != 'button_back_to_top') {
                    hideLeftNavMenu();
                }
            });
        });
    }
}

function backToTop(){
    $("html, body").animate({
        scrollTop: 0
    }, 650);
}
function startPageLoadAnimation(){
    if(document.getElementById("div_loading_page")){
        $("#div_loading_page").fadeIn("fast");
    }
    if(document.getElementById("left_nav_menu")) $("#left_nav_menu").css("visibility", "hidden");
    if(document.getElementById("div_footer")) $("#div_footer").css("visibility", "hidden");
    $(".wrapper").css("visibility", "hidden");

    return true;
}
function stopPageLoadAnimation(){
    $(".wrapper").css("visibility", "visible");
    if(document.getElementById("div_footer")) $("#div_footer").css("visibility", "visible");
    if(document.getElementById("left_nav_menu")) $("#left_nav_menu").css("visibility", "visible");
    if(document.getElementById("div_loading_page")){
        $("#div_loading_page").fadeOut("fast");
    }
}
function open_detail_fullpage(elem_id) {
    var $detail_fullpage = $('#' + elem_id);
    $('.wrapper').css('display', 'none');
    $('#div_footer').css('display', 'none');
    $detail_fullpage.fadeIn('fast');
}
function close_detail_fullpage(){
    $('.wrapper').css('display', 'block');
    $('#div_footer').css('display', 'block');
    $('.detail_fullpage').fadeOut('fast');
}

function backname() {
   $('#button_back').scroll(function(){
        resetTriggerFilter();
        setFillerFilterHeight();
        if ('#button_back' >=300) {
            $('#button_back').fadeIn('fast');
            $('#button_back').removeClass("hide");
        } else {
            $('#button_back').addClass("hide");
            $('#button_back').fadeOut('slow');
        }
    }); 
}


jQuery(function($){
    var $top_filter, $filler_filter, pos_top_filter, skroll_top;
    var $top_header = $('#top_header');


    // codinggngng
    $(document).ready(function() {
        var page_num = 1;
        $(window).scroll(function() {
            if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
                load_more(page_num, false);
            }
        });
    });


    $(window).on("load", function() {
        adjust_footer();
        stopPageLoadAnimation();
        initTopFilterLoc();
        initTopFilterSub();

        if(isSizeMobile() || cek_mobile()) detectSwipe();

        if(document.getElementById("div_ovw") && document.getElementById("a_read_more_detail_page") && document.getElementById("a_show_less_detail_page")){
            document.getElementById("a_show_less_detail_page").style.display = "none";

            document.getElementById("a_read_more_detail_page").addEventListener("click", function () {
                document.getElementById("div_ovw").style.maxHeight = "9999px";
                document.getElementById("div_ovw_read_more_overlay").style.display = "none";
                document.getElementById("a_read_more_detail_page").style.display = "none";
                document.getElementById("a_show_less_detail_page").style.display = "block";
            });
            document.getElementById("a_show_less_detail_page").addEventListener("click", function () {
                document.getElementById("div_ovw").style.maxHeight = "80px";
                document.getElementById("div_ovw_read_more_overlay").style.display = "block";
                document.getElementById("a_read_more_detail_page").style.display = "block";
                document.getElementById("a_show_less_detail_page").style.display = "none";
            });
        }
    });
    $(window).on("resize", function() {
        adjust_footer();
        initTopFilterLoc();
        initTopFilterSub();
        if(document.getElementById("top_filter")){
            pos_top_filter = Math.ceil($top_header.height());
        }
    });

    if(document.getElementById("top_filter")) {
        $top_filter = $("#top_filter");
        $filler_filter = $(".filler_filter");
        pos_top_filter = $top_filter.position();
        pos_top_filter = Math.ceil(pos_top_filter.top);

        if(document.getElementById("slider-range") && document.getElementById("minPrice") && document.getElementById("maxPrice") && document.getElementById("filter_harga")){
            $( "#slider-range" ).slider({
                range: true,
                min: 0,
                max: 10000,
                values: [0, 10000],
                step: 50,
                slide: function( event, ui ) {
                    $( "#minPrice" ).html(formatMoney(ui.values[0], 0, '.', ','));
                    $( "#maxPrice" ).html(formatMoney(ui.values[1], 0, '.', ','));
                },
                stop: function( event, ui ) {
                    $( "#filter_harga" ).val(ui.values[0] + "-" + ui.values[1]);
                    filter_product_list();
                }
            });
        }
    }
    if(document.getElementById("container_top_filter")){
        $("html, body").click(function() {
            closeFilter();
        });
        $("#container_top_filter, .trigger_filter, #trigger_search").click(function(e) {
            e.stopPropagation();
            //return false;
        });
    }
    

    if (document.getElementById("button_back")) {
        var $button_back = $("#button_back");
        document.getElementById("button_back").addEventListener('click', backname);
    }
    if (document.getElementById("button_back_topup")) {
        var $button_back_topup = $("#button_back_topup");
        document.getElementById("button_back_topup").addEventListener('click', backToTop);
    }
     if (document.getElementById("button_back_to_top")) {
        var $button_back_to_top = $("#button_back_to_top");
        document.getElementById("button_back_to_top").addEventListener('click', showmenu);
    }

     $(window).on("scroll", function (e) {
        skroll_top = $(window).scrollTop();
        if(document.getElementById("top_filter")) {
            if (skroll_top >= pos_top_filter) {
                setFillerFilterHeight();
                $top_filter.css("position", "fixed");
                $filler_filter.removeClass("hide");
                
            }
            else {
                $top_filter.css("position", "relative");
                $filler_filter.addClass("hide");
            }
        }
        if(document.getElementById("button_back")) {
            if (skroll_top >= 500) $button_back.fadeIn('slow');
            if (skroll_top == 0) $button_back.fadeOut('fast');
        }
        if(document.getElementById("button_back_topup")) {
            if (skroll_top >= 500) $button_back_topup.fadeIn('slow');
            if (skroll_top == 0) $button_back_topup.fadeOut('fast');
        }
         if(document.getElementById("button_back_to_top")) {
            if (skroll_top >= 500) $button_back_to_top.fadeIn('slow');
            if (skroll_top == 0) $button_back_to_top.fadeOut('fast');
        }           
    });


    //Set Event Listener
    if(document.getElementById('form_resend_user_activation')) document.getElementById('form_resend_user_activation').addEventListener('submit', startPageLoadAnimation);

    load_more_share_button();

    if(document.getElementById('container_chat_widget')) document.getElementById('container_chat_widget').addEventListener('click', function(){ Tawk_API.toggle(); });
    if(document.getElementById('container_chat_widget_small')) document.getElementById('container_chat_widget_small').addEventListener('click', function(){ Tawk_API.toggle(); });
});