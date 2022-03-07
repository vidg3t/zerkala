    
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
