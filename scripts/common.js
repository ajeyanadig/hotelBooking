// Header and Footer
let headerTemplate=` <img src="./assets/images/logo.png" alt="logo" onClick="window.location.href='./'" style='cursor:pointer;'> 
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
        console.log('Login handler called')
        localStorage.setItem("innerLoginStatus",true);
        localStorage.setItem("username",username.value);
        localStorage.setItem("password",password.value)
        
        loginButton.innerText="Logout";
        loginButton.setAttribute("data-target",'');
        loginButton.setAttribute("data-toggle",'');
        loginStatus=true;
        setPayNowButton(loginStatus);
        window.alert('Successfully logged in');
        
       
        
    }

}
let logoutHandler=()=>{
    if(loginStatus===true){
        loginButton.innerText="Login";
        localStorage.setItem("innerLoginStatus",false);
        console.log('Logout handler called')
        loginStatus=false;
        setPayNowButton(loginStatus);
        setTimeout(()=>{
            loginButton.setAttribute("data-target",'#login-modal');
            loginButton.setAttribute("data-toggle",'modal');
        },500)
        
    }
}

let showLoader=()=>{
    let mainDivEle= document.getElementById("main-div");
    let loaderEle= document.getElementById("loaderPic");
    mainDivEle.style.visibility='hidden';
    loaderEle.style.display='block';
}
let hideLoader=()=>{
    let mainDivEle= document.getElementById("main-div");
    let loaderEle= document.getElementById("loaderPic");
    mainDivEle.style.visibility='visible';
    loaderEle.style.display='none';
}

let setPayNowButton=(myStatus)=>{
    
    if(document.getElementById('paynowButton')!==null){
        console.log('setter called')
        let paynowButton=document.getElementById('paynowButton');
        if(myStatus==true){
            console.log('status is true')
            paynowButton.removeAttribute("disabled");
        }
        else{
            console.log('status is false')
            paynowButton.setAttribute("disabled",''); 
        }
    }
}
let loginStatusChecker=()=>{
    
    let innerLoginStatus=localStorage.getItem("innerLoginStatus")
    
    if(innerLoginStatus==='true'){
        loginButton.innerText="Logout";
        
        loginButton.setAttribute("data-target",'');
        loginButton.setAttribute("data-toggle",'');
        loginStatus=true;
        setPayNowButton(loginStatus);
        
        
    }
    else{
        loginButton.innerText="Login";
        loginStatus=false;
        setPayNowButton(loginStatus);
    }
}
loginStatusChecker();

