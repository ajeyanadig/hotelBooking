//VIEW MORE BUTTON
let dummyCitiesArr=['Delhi','Kolkata','Agra','Hyderabad','Kolkata3'];

let searchBarContainer= document.getElementById('searchBarCardsContainer');
let searchBarEle= document.getElementById('searchBar');
let searchResultEle= document.getElementsByClassName('result');


let city= document.getElementsByClassName('imageContainer');
const cityCardHandler=(cityName)=>{
    window.location.href='./list.html?city='+cityName;
}

searchBarEle.addEventListener('keyup',(e)=>{
    while(searchResultEle.length>0){
        searchResultEle[0].parentNode.removeChild(searchResultEle[0]);
    }
    if(e.target.value.length>2){
        var myResult=getAutoComplete(e.target.value);
        myResult.then((result)=>{
            let cityArray=result.filter((ele)=>{
                return ele.result_type=="geos"
            })
            //i have array of objects which are of type lodging
            console.log(cityArray)
            makeCityCards(cityArray)
            
        })
    }


})
let getAutoComplete=(cityName)=>{

    const data = null;
    console.log(cityName)
     const xhr = new XMLHttpRequest();
     xhr.withCredentials = false;
     xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/auto-complete?query="+cityName+"&lang=en_US");
     xhr.setRequestHeader("X-RapidAPI-Key", "fcfb15011fmsh54c75d5e959575fp123b3ajsn7e3201689b4a");
     xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");
 
     xhr.send(data);
 
     return new Promise((res,rej)=>{
         xhr.addEventListener("readystatechange", function () {
             if (this.readyState === this.DONE&& this.status == 200) {
                 let result= JSON.parse(this.responseText).data;
                 res(result);
             }
         });
     }) 
 }
 
 //Call API
 



 let makeCityCards=(array)=>{
    for(let i=0;(i<array.length)&&(i<4);i++){
        let exactCityName=array[i].result_object.name;
        let cardTemplateLiteral=`
        <span class="searchBarCards result" onClick="cardClickHandler(this.innerText)">${exactCityName}</span>
        `
        let spanEle=document.createElement("span");
        spanEle.className="searchBarCards result";
        spanEle.addEventListener('click',()=>{cityCardHandler(exactCityName)});
        spanEle.innerText= exactCityName;
        searchBarContainer.appendChild(spanEle);

        //searchBarContainer.innerHTML+=cardTemplateLiteral;
    }

        

 }
 let cardClickHandler=(value)=>{
    console.log(value);
    let valueArr= value.split(' ');
    let valueName= valueArr[0];
    cityCardHandler(valueName);


 }




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