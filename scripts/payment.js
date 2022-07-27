
showLoader();

let paynowButton= document.getElementById('paynowButton');





function dateDiff(str1,str2){
    let date1= new Date(str1);
    let date2= new Date(str2);
    let diffTime= Math.abs(date2-date1);
    let diffDays= Math.ceil(diffTime/(1000*60*60*24));
    return diffDays;
}



let URLString= window.location.href;
let url= new URL(URLString);


//setting form result

let setFormResult = () =>{let name= url.searchParams.get('name');
let numAdults= url.searchParams.get('numAdults');
let fromDate= url.searchParams.get('fromDate');
let toDate= url.searchParams.get('toDate');
let diffInDays= dateDiff(toDate,fromDate);
let date= new Date(fromDate);
fromDate= date.toDateString();


date= new Date(toDate);
toDate= date.toDateString();

let total= url.searchParams.get('total');



document.getElementById("name").innerText=name;
document.getElementById("numAdults").innerText=numAdults;
document.getElementById("fromDate").innerText=fromDate;
document.getElementById("toDate").innerText=toDate;
document.getElementById("inputBreakdown").innerText='Rs.1000 x '+numAdults+' Adults x '+diffInDays+' days ';
document.getElementById("total").innerText=total;

}
setFormResult();

let getHotelDetails=()=>{

    const data = null;
    let hotelID=localStorage.getItem("locationID");
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
    let hotelRanking= response.ranking;
    let hotelAddress= response.address;
    let hotelImageURL=response.photo.images.large.url;

    //getEleFromDOM
    let hotelNameEle=document.getElementById('hotelName');
    let hotelRankingEle=document.getElementById('hotelRanking');
    let hotelAddressEle=document.getElementById('hotelAddress');
    let hotelPhotoEle=document.getElementById('hotel-image');
    
    hotelNameEle.innerText=hotelName;
    hotelRankingEle.innerText=hotelRanking;
    hotelAddressEle.innerText=hotelAddress;
    hotelPhotoEle.setAttribute("src",hotelImageURL)
    
    hideLoader();
    
})

