export default Ajax;

function Ajax(url , data , fnSucceed , fnFail , fnLoading) {
    // ajax post请求： 
    var ajax = ajaxObject(); 
    if(data === 'get') {
        ajax.open( "get" , url , true )
    } else {
        ajax.open( "post" , url , true );
    }
    ajax.setRequestHeader( "Content-Type" , "application/x-www-form-urlencoded" ); 
    ajax.withCredentials = true;
    //ajax.setRequestHeader( "Cookie" , "session_id=2|1:0|10:1537683224|10:session_id|48:ZDJmZjJlZjgtYmVmNy0xMWU4LTk3MGQtZTA5NDY3ZjZiMjk2|0e8540a7bd31272305ea4a13c6dd58beaa243c888fec4a46bc6b99069035d26a" ); 
    ajax.onreadystatechange = function () { 
    if( ajax.readyState == 4 ) { 
        if( ajax.status == 200 ) { 
            fnSucceed( JSON.parse(ajax.responseText) ); 
        } 
        else {
            if(fnFail) fnFail( "HTTP请求错误！错误码："+ajax.status ); 
        } 
    } 
    else { 
        //if(fnLoading) fnLoading(); 
    } 
    }; 
    ajax.send(JSON.stringify(data)); 
    if(fnLoading) fnLoading(); 
}
// ajax 对象 
function ajaxObject() { 
    var xmlHttp; 
    try { 
        // Firefox, Opera 8.0+, Safari 
        xmlHttp = new XMLHttpRequest(); 
    } 
    catch (e) { 
        // Internet Explorer 
        try { 
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); 
        } catch (e) { 
            try { 
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); 
            } catch (e) { 
            return false; 
            } 
        } 
    } 
    return xmlHttp; 
}