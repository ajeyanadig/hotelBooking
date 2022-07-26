
//  let hotelName=[];
//  let hotelAddress=[];
//  let hotelImageURL=[];
//  let hotelRating=[];
let setRatings=(strRating,index)=>{
    let fullStars=Number(strRating.charAt(0));
    let halfStar= Number(strRating.charAt(2));
    let ratingsEle=document.getElementsByClassName('hotelRatings')[index];
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

 let hotelObjArray=[];
let windowURLString=window.location.href;
let url= new URL(windowURLString);
let cityName=url.searchParams.get("city");
console.log(cityName)

//API REQUEST
let getCityDetails=()=>{

   const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/search?query="+(cityName)+"&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US");
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

let myResult= getCityDetails();
myResult.then((result)=>{
    let lodgingsObj=result.filter((ele)=>{
        return ele.result_type=="lodging"
    })
    //i have array of objects which are of type lodging
    console.log(lodgingsObj);
    lodgingsObj.forEach((ele)=>{
        let hotelObj={
            hotelName:'',
            hotelImageURL:'',
            hotelRating:'',
            hotelID:'',
            hotelAddress:''
        }
        hotelObj.hotelName=ele.result_object.name;
        hotelObj.hotelRating=ele.result_object.rating;
        hotelObj.hotelImageURL=ele.result_object.photo.images.large.url;
        hotelObj.hotelID=ele.result_object.location_id;
        hotelObj.hotelAddress=ele.result_object.address;
        hotelObjArray.push(hotelObj);

    })
    console.log(hotelObjArray)
    makeCards(hotelObjArray); //Fn to make cards
})

//Fn to make cards


let makeCards=(hotelObjArray)=>{
    
    let listViewContainer=document.getElementById('list-view');
    
    // for(let i=0; i<hotelObjArray.length;i++){
    //     let cardTemplateLiteral=
    //     `<div class="cityCard">
    //         <img class="hotel-images" src=${hotelObjArray[i].hotelImageURL}>
    //         <div class="hotelDescription">
    //             <h3>${hotelObjArray[i].hotelName}i</h3>
                    // <div id="hotelRatings">
                                
                    // </div>
    //             New Delhi<br>
    //         </div>
    //     </div>`
    //     listViewContainer.innerHTML+=cardTemplateLiteral;
    // }
    hotelObjArray.forEach((hotelEle,index)=>{
        let cardTemplateLiteral=
        `<div class="cityCard" onClick="cityCardHandler(${hotelEle.hotelID})">
        <img class="hotel-images" src=${hotelEle.hotelImageURL}>
        <div class="hotelDescription">
        <h3>${hotelEle.hotelName}</h3>
        <div class="hotelRatings">
                
        </div>
        <div>${hotelEle.hotelAddress}</div
        </div>
        </div>`
        listViewContainer.innerHTML+=cardTemplateLiteral;
        setRatings(hotelEle.hotelRating,index);
    })
    
}
let cityCardHandler=(locationID)=>{
    window.location.href='./detail.html?id='+locationID;
    
}

