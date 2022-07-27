const pricePerDay=1000;
showLoader();
//FORM STUFF
function setMinDate(str1){
    
    let toDate = document.getElementById('toDate');
    let fromDate= new Date(str1);
    fromDate.setDate(fromDate.getDate()+1);
    let newToDate= fromDate.toISOString();
    newToDate=newToDate.substring(0,10);
    toDate.setAttribute("min",newToDate);
}
function dateDiff(str1,str2){
    let date1= new Date(str1);
    let date2= new Date(str2);
    let diffTime= Math.abs(date2-date1);
    let diffDays= Math.ceil(diffTime/(1000*60*60*24));
    return diffDays;
}

function getPrice(numAdults,str1,str2){
    //DATE PARSING
    if(str1!==''&&str2!==''&&numAdults!==''){
        let numDays= dateDiff(str1,str2);
        let price= pricePerDay*numAdults*numDays;
        document.getElementById('Total').value='Rs.'+price;
        

    }
}
//Rating DOM function
let setRatings=(strRating)=>{
    let fullStars=Number(strRating.charAt(0));
    let halfStar= Number(strRating.charAt(2));
    let ratingsEle=document.getElementById('hotelRatings');
    //ratingsEle.innerHTML = `<span>${hotelRating}</span>`
    for(let i=0;i<fullStars;i++){
        ratingsEle.innerHTML+=` <span class="fa fa-star checked"></span>`;
    }
    if(halfStar!==0){
        ratingsEle.innerHTML+=` <span class="fa fa-star-half-o checked"></span>`;
        fullStars++;
    }
    for(let i=0;i<(5-fullStars);i++){
        ratingsEle.innerHTML+=` <span class="fa fa-star"></span>`;
    }
}


let URLString= window.location.href;
let url= new URL(URLString);
let hotelID= url.searchParams.get('id');
console.log(hotelID);
localStorage.setItem("locationID",hotelID);

//GET HOTEL DETAILS
let getHotelDetails=()=>{

    const data = null;
 
     const xhr = new XMLHttpRequest();
     xhr.withCredentials = false;
     xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id="+hotelID+"&lang=en_US");
     xhr.setRequestHeader("X-RapidAPI-Key", "fcfb15011fmsh54c75d5e959575fp123b3ajsn7e3201689b4a");
     xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");
 
     xhr.send(data);
 
     return new Promise((res,rej)=>{
         xhr.addEventListener("readystatechange", function () {
             if (this.readyState === this.DONE&& this.status == 200) {
                 let result= JSON.parse(this.responseText).data[0];
                 console.log(result);
                 res(result);
             }
         });
     }) 
 }


let myHotelResult= getHotelDetails();
myHotelResult.then((response)=>{
    //store values
    let hotelName=response.name;
    let hotelRating= response.rating;
    let hotelAmenititesArray= response.amenities;
    let hotelDescription=response.description;
    let hotelImageURL=response.photo.images.large.url;

    //getEleFromDOM
    let hotelNameEle=document.getElementById('hotelName');
    let hotelDescriptionEle=document.getElementById('hotelDescription');
    let hotelAmenititesEle=document.getElementById('hotelAmenities');
    
    setRatings(hotelRating)
    for(let i=0;(i<10)&&(i<hotelAmenititesArray.length);i++){
        
        hotelAmenititesEle.innerHTML+="<li>"+hotelAmenititesArray[i].name+"</li>";
    }


    hideLoader();




    hotelNameEle.innerText=hotelName;
    hotelDescriptionEle.innerText=hotelDescription;
    let carouselInnerTemplate=`
    <div class="carousel-item active">
        <img  class="hotel-image" src=${hotelImageURL} >
    </div>
    `;
    let carouselContainer=document.getElementsByClassName('carousel-inner')[0];
    carouselContainer.innerHTML+=carouselInnerTemplate;
    
    
})


//PHOTOS API CALL
let getPhotos=()=>{

    const data = null;
 
     const xhr = new XMLHttpRequest();
     xhr.withCredentials = false;
     xhr.open("GET", "https://travel-advisor.p.rapidapi.com/photos/list?location_id="+hotelID+"&lang=en_US");
     xhr.setRequestHeader("X-RapidAPI-Key", "fcfb15011fmsh54c75d5e959575fp123b3ajsn7e3201689b4a");
     xhr.setRequestHeader("X-RapidAPI-Host", "travel-advisor.p.rapidapi.com");
     
     xhr.send(data);
 
     return new Promise((res,rej)=>{
         xhr.addEventListener("readystatechange", function () {
             if (this.readyState === this.DONE&& this.status == 200) {
                 let result= JSON.parse(this.responseText).data;
                 console.log(result);
                 res(result);
             }
         });
     }) 
 }

let myPhotosResult= getPhotos();
myPhotosResult.then((response)=>{
    // let carouselInnerTemplate=`
    // <div class="carousel-item active">
    //     <img  class="hotel-image" src=${response[0].images.large.url} >
    // </div>
    // `;
    
    // carouselContainer.innerHTML+=carouselInnerTemplate;
    let carouselContainer=document.getElementsByClassName('carousel-inner')[0];
    for(let i=0;i<response.length;i++){
        carouselInnerTemplate=`
                                <div class="carousel-item ">
                                    <img  class="hotel-image" src=${response[i].images.large.url} >
                                </div>
                                `;
        carouselContainer.innerHTML+=carouselInnerTemplate;                        
    }
    


})


