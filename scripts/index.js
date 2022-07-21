//VIEW MORE BUTTON

let viewMoreStatus=false;

let viewMoreHandler=(e)=>{
    let cityCards2= document.getElementsByClassName('citycards')[1];
    let button=document.getElementById("viewMoreButton");
    cityCards2.classList.toggle('hidden');
    if(viewMoreStatus===false){
        button.innerText="View Less";
        viewMoreStatus=true;
    }
    else{
        button.innerText="View More";
        viewMoreStatus=false;
    }
     
}