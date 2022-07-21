const pricePerDay=1000;

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