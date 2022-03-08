    
function validatePhoneNumber(input_str) {
    var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    
    return re.test(input_str);
    }
    
    
function checkphone(phone) {
    if (validatePhoneNumber(phone) == true) {
    document.getElementById("wrongphone").classList.add("hidden")
    return true
    } else {
    document.getElementById("wrongphone").classList.remove("hidden")
    return false
    }
    }
function checks(uslugi,date){
    let is_all_ok=true
    if (uslugi!="none"){
        document.getElementById("wrong_uslugi").classList.add("hidden");
    }
    else{
        document.getElementById("wrong_uslugi").classList.remove("hidden");
        is_all_ok=false;
    }
    if (date!=""){
        document.getElementById("wrong_date").classList.add("hidden");

    }
    else{
        document.getElementById("wrong_date").classList.remove("hidden");
        is_all_ok=false;

    }
    return(is_all_ok)
}