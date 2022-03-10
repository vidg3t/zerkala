const URL_FOR_REGIST="http://195.2.74.124:5000/newClient/"//http://195.2.74.124:5000/newClient/http://127.0.0.1:5000//newClient/
let regisrs=document.getElementsByClassName("ms_booking")
for (let i=0;i<regisrs.length;i++){
    // regisrs[i].classList.remove("ms_booking")
    // regisrs[i].classList.add("ms_booking")
    regisrs[i].onclick=function(){
        document.getElementById("regist_form").classList.toggle("hidden")
    }
}
document.getElementById("sending").onclick=async function(){
    document.getElementById("wrongphone").classList.add("hidden")

    console.log("done")
    let name1=document.getElementsByClassName("register_input")[0].value
    let phone=document.getElementsByClassName("bigsem")[0].value
    let usluga=document.getElementById("usluga").value
    let date=document.getElementById("date").value
    let comment=document.getElementById("comment").value
    if (validation(phone,usluga,date,name1)==true){
        url=URL_FOR_REGIST+name1+"&&"+phone+"&&"+usluga+"&&"+date+"&&"+comment;
        resp=await fetch(url);
        resp1=await fetch(URL_FOR_REGIST+"generate");
        resp_final=await resp1.json();
        console.log(resp_final["text"]);
        console.log(resp_final);
        resp_final=resp_final["text"];
        window.open("returns/"+resp_final+".html");}
}
function validation(phone,usluga,date,name){
    return(checks(usluga,date,name)*checkphone(phone))
}
document.getElementsByClassName("bigsem")[0].oninput=function(){
    elem=document.getElementsByClassName("bigsem")[0].value;
    if (elem[0]!="(" &&elem[0]!=undefined){
        elem="("+elem;
    }
    if (elem[4]!=")" &&elem[4]!=undefined){
        elem=elem.substring(0,4)+")"+elem[4];
    }
    if(elem[8]!="-"&&elem[8]!=undefined){
        elem=elem.substring(0,8)+"-"+elem[8];
    }
    if(elem[11]!="-"&&elem[11]!=undefined){
        elem=elem.substring(0,11)+"-"+elem[11];
    }
    if(elem.length>14){
        elem=elem.substring(0,14)
    }
    document.getElementsByClassName("bigsem")[0].value=elem;
}