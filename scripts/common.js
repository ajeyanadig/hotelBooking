// Header and Footer
let headerTemplate=` <img src="./assets/images/logo.png" alt="logo"> 
<button id="loginModalButton" onclick="logoutHandler()" type="button" class="btn btn-light" data-toggle="modal" data-target="#login-modal">Login</button>`;

let footerTemplate=` 
        
<button id="contactuslink" type="button" class="btn btn-info btn-sm" data-toggle="modal" data-target="#contact-modal">Contact Us</button>
<p id="TnC">© 2022 Room Search Pvt Ltd</p>
<div id="footerSocials">
<a href="https://facebook.com" target="_blank"><img src="./assets/images/facebook.png" alt="icon"></a>
<a href="https://instagram.com" target="_blank"><img src="./assets/images/instagram.png" alt="icon"></a>
<a href="https://twitter.com" target="_blank"><img src="./assets/images/twitter.png" alt="icon"></a>
</div>

`;

let header= document.getElementsByTagName('header')[0];
header.innerHTML=headerTemplate;
let footer= document.getElementsByTagName('footer')[0];
footer.innerHTML=footerTemplate;

//Login

let username= document.getElementById('username');
let password= document.getElementById('password');
let loginButton= document.getElementById('loginModalButton');
let loginStatus=false;



let loginHandler=()=>{
    if(loginStatus===false){
        localStorage.setItem("username",username.value);
        localStorage.setItem("password",password.value);
        loginButton.innerText="Logout";
        loginButton.setAttribute("data-target",'');
        loginButton.setAttribute("data-toggle",'');
        loginStatus=true;
        window.alert('Successfully loggin in');
        
    }

}
let logoutHandler=()=>{
    if(loginStatus===true){
        loginButton.innerText="Login";
        localStorage.clear();
        setTimeout(()=>{
            loginButton.setAttribute("data-target",'#login-modal');
            loginButton.setAttribute("data-toggle",'modal');
        },500)
        
    }
}
