// let cont=document.getElementById("searchWeather");
let cont2=document.getElementById("funsearch");
let cont3=document.getElementById("your");
function sear(){
     if(cont2.style.visibility=="hidden"){
          cont2.style.visibility="visible";
          cont3.style.visibility="hidden";
          oth.style.visibility="hidden";
     }
     else{
          cont2.style.visibility="hidden";
          cont3.style.visibility="hidden";
          oth.style.visibility="hidden";
     }
     
}

let oth=document.getElementById("other");
async function search(){
     let search_city_name=document.getElementById("inputsearch").value;
     cit_name=search_city_name;
     if(oth.style.visibility=="hidden"){
          oth.style.visibility="visible";
          cont3.style.visibility="hidden";
          
     }else{
          cont3.style.visibility="hidden";
     }
     response();
}
async function yur(){
     // await getLocation();
     // await getdata();
     // cont3.style.visibility="hidden";
     if(cont3.style.visibility=="hidden" ){
          cont3.style.visibility="visible"
          oth.style.visibility="hidden";
          cont2.style.visibility="hidden";
     }
     else{
          // cont3.style.visibility="hidden";
          oth.style.visibility="hidden";
          cont2.style.visibility="hidden";
     }
     await getLocation();
     await getdata();
}
let lat=0;
let lon=0;
// get the value of latitute and longitute
async function getLocation() {
     if (!navigator.geolocation) {
       console.log("Geolocation is not supported by your browser.");
       return;
     }
   
     try {
       const position = await new Promise((resolve, reject) => {
         navigator.geolocation.getCurrentPosition(resolve, reject);
       });
       lat=position.coords.latitude;
       lon=position.coords.longitude;
     //   console.log(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
     } catch (error) {
       console.error("Error getting location:", error.message);
     }
   }
   

// weather API KEY
let key='e4187f943122222f7c203bfa665d3982';

let city_name="";
let temprature=0;
async function getdata() {
     // let lat=28.4961;
     // let lon=77.536;
     let resplat=await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`);
     let data=await resplat.json();
     console.log(data);
     city_name=`${data?.name}`;
     console.log(city_name);
     let c=document.getElementById("cityname");
     let t=document.getElementById("citytemp");
     c.innerText=city_name;
     t.innerText=`${data?.main?.temp.toFixed(2)} °C`;
     let ws=document.getElementById("wsp");
     ws.innerHTML=`${data?.wind?.speed} m/s`;
     let hum=document.getElementById("hum");
     hum.innerText=`${data?.main?.humidity} %`;
     let cl=document.getElementById("cl");
     cl.innerText=`${data?.clouds?.all} %`;
}
let cit_name="";
let flagUrl="";
async function response(){
     let resp= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cit_name}&appid=${key}&units=metric`);
     let cit_data=await resp.json();
     let citname=document.getElementById("ciname");
     citname.innerHTML=cit_name;
     let temp=document.getElementById("citemp");
     let temp_other=`${cit_data?.main?.temp.toFixed(2)} °C`;
     temp.innerText=temp_other;
     document.getElementById("other_wind").innerText=`${cit_data?.wind?.speed} m/s`;
     document.getElementById("other_hum").innerText=`${cit_data?.main?.humidity} %`;
     document.getElementById("other_cl").innerText=`${cit_data?.clouds?.all} %`;
     let countrycode=cit_data.sys.country;
     flagUrl = `https://flagcdn.com/w320/${countrycode.toLowerCase()}.png`;
     document.getElementById("cflag").src=flagUrl;
}

