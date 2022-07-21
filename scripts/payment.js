
let paynowButton= document.getElementById('paynowButton');
loginButton.addEventListener("click",buttonToggler)
function buttonToggler(){
    if(loginStatus===false)
        paynowButton.removeAttribute("disabled");
    else
        paynowButton.setAttribute("disabled",'');      
}


