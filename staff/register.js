const URL_FOR_REGIST="http://195.2.74.124:5000/newClient/"

document.getElementById("register").onclick=function(){
    document.getElementById("regist_form").classList.toggle("hidden")
}
document.getElementById("sending").onclick=async function(){
    document.getElementById("wrongphone").classList.add("hidden")

    console.log("done")
    name1=document.getElementsByClassName("register_input")[0].value
    phone=document.getElementsByClassName("register_input")[1].value
    if (validation(phone)==true){
    url=URL_FOR_REGIST+name1+"&&"+phone
    resp=await fetch(url)
    resp1=await fetch(URL_FOR_REGIST+"generate")
    resp_final=await resp1.json()
    console.log(resp_final["text"])
    console.log(resp_final)
    resp_final=resp_final["text"]
    window.open("returns/"+resp_final+".html")}
    else{
        document.getElementById("wrongphone").classList.remove("hidden")
    }

}
function validation(phone){
    return(checkphone(phone))
    
}
