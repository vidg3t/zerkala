const URL_FOR_REGIST="http://195.2.74.124:5000/newClient/"//http://195.2.74.124:5000/newClient/http://127.0.0.1:5000//newClient/
let regisrs=document.getElementsByClassName("ms_booking")
for (let i=0;i<regisrs.length;i++){
    regisrs[i].onclick=function(){
        document.getElementById("regist_form").classList.toggle("hidden")
    }
}
document.getElementById("sending").onclick=async function(){
    document.getElementById("wrongphone").classList.add("hidden")

    console.log("done")
    let name1=document.getElementsByClassName("register_input")[0].value
    let phone=document.getElementsByClassName("register_input")[1].value
    let usluga=document.getElementById("usluga").value
    let date=document.getElementById("date").value
    if (validation(phone,usluga,date)==true){
        url=URL_FOR_REGIST+name1+"&&"+phone+"&&"+usluga+"&&"+date;
        resp=await fetch(url);
        resp1=await fetch(URL_FOR_REGIST+"generate");
        resp_final=await resp1.json();
        console.log(resp_final["text"]);
        console.log(resp_final);
        resp_final=resp_final["text"];
        window.open("returns/"+resp_final+".html");}
    else{
        document.getElementById("wrongphone").classList.remove("hidden")
    }

}
function validation(phone,usluga,date){
    return(checks(usluga,date)*checkphone(phone))
}
