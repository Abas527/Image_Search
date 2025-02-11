//const api="https://api.unsplash.com/search/photos?page=1&query=men&client_id=MsQf5ufKIHso4jUXNEYrDgzAz1BjE17qZTtPkTqpAZY"
var inputtext=document.getElementById("txt");
var downloadbutton=document.querySelector(".download");
var searchbutton=document.querySelector(".search");
var loadmorebtn=document.getElementById("loadmore");
let p=1;
var pagenumber=1;

const fetchingfunction=async(url)=>{
    var fetching=await fetch(url);
    var response=await fetching.json();
    return await response.results;  
   

}
async function searching(p){
    
    if(pagenumber>2){
        console.log(inputarray)
    }
    document.querySelector(".secondpage").style.height="auto";
    
    const api=`https://api.unsplash.com/search/photos?page=${p}&per_page=30&query=${inputtext.value}&client_id=MsQf5ufKIHso4jUXNEYrDgzAz1BjE17qZTtPkTqpAZY`;
   var imgurl=await fetchingfunction(api);
   console.log(imgurl);
if(p===1){
    document.querySelector("ul").innerHTML="";
}

if(imgurl.length===0){
    alert("sorry we don't find your content")
}

imgurl.forEach(element => {

    var litag=document.createElement("li");

litag.innerHTML=` <img onclick="showbox('${element.urls.regular}','${element.user.first_name}','${element.user.last_name}','${element.urls.full}')" src=${element.urls.regular} alt="img">
<div class="details">
  <div class="subdetail">
      <div class="profile">
          <div class="profilepic">
             <a target="_blank" href="${element.user.links.html}"><img onclick="showprofile('${element.user.links.portfolio}')"  src="${element.user.profile_image.large}" alt=""></a>
          </div>
          <a target="_blank" href="${element.user.links.html}">${element.user.first_name} ${element.user.last_name}</a>
        </div>
        <div class="aboutpic">
        <p>${element.alt_description}</p>
        </div>
        <div class="download" onclick="downloadimage('${element.urls.full}')">
          <i  class="fa-solid fa-download fa-2x"></i>

        </div>
  </div>
   
</div>`
    document.querySelector("ul").appendChild(litag);
    document.querySelector(".secondpage button").style.display="block"



});
}


function imageload(){
    p++;
    if(p>1){
        searching(p);

    }
  
}

const downloadimage=async(img_url)=>{
    var myurl=await fetch(img_url);
    var imgresult=await myurl.blob();
    downloadurl=URL.createObjectURL(imgresult);
    var atag=document.createElement("a");
    var mydate=new Date;
    atag.href=downloadurl;

    atag.download=inputtext.value;
    atag.click();
    console.log(downloadurl);

}

const submiting=(e)=>{
    if(e.target.value===""){
        return null;

    }
    if(e.key=="Enter"){
        newsearching();
    }

}

inputtext.addEventListener("keypress",submiting);

const showbox=(a,b,c,d)=>{
    document.querySelector(".moreoptions").innerHTML=`<div class="navbar">
    <div class="camera">
        <p><i class="fa-solid fa-camera fa-2x"></i></p>
        <span>${b} ${c}</span>

    </div>
    <div class="close">
        <p onclick='downloadimage("${d}")'><i class="fa-solid fa-download fa-2x"></i></p>
        <p onclick='closebox()'><i class="fa-solid fa-close fa-2x"></i></p>
    </div>
    
</div>
<div class="imgbar">
<p onclick='zoompic("${d}")'><i class="fa-solid fa-up-right-and-down-left-from-center fa-2x"></i></p>
    <img onkeyup="escape()" src="${a}" ondblclick='zoomin()' alt="">
</div>`

}
var piczoom=true;
function zoompic(item){
    if(piczoom){
        piczoom=false;
       document.querySelector(".main").style.display="none"
       document.querySelector(".bgimage").style.display="block"
       document.querySelector(".bgimage img").src=item;
              document.querySelector(".bgimage img").addEventListner("dblclick",()=>{

                     document.querySelector(".bgimage img").style.scale='1.7';
              
              })


    }
    else{
        piczoom=true;
        document.querySelector(".main").style.display="block"
        document.querySelector(".bgimage").style.display="none"
        window.scrollTo(0,p*4900)
    }

}

function closebox(){
    document.querySelector(".moreoptions").innerHTML="";
}
var zoom=true;
function zoomin(){
    if(zoom){
        zoom=false;
        document.querySelector(".imgbar img").style.scale="1.4"

    }
    else{
        document.querySelector(".imgbar img").style.scale="1"
        zoom=true;
    }
}


var randomvalue=parseInt(Math.random()*10);
console.log(randomvalue)
document.querySelector(".bgi img").src=imagearray[randomvalue].src;
document.querySelector(".informtext").innerHTML=`<h1 style="color: ${imagearray[randomvalue].color};" >The best free stock photos, royalty free </h1>
<h1 style="color: ${imagearray[randomvalue].color};">images & videos shared by creators.</h1>`

var upwardbtn=document.querySelector(".scrollbutton");
window.addEventListener("scroll",(e)=>{
this.scrollY>20 ?upwardbtn.style.display="grid":upwardbtn.style.display="none";
})

upwardbtn.addEventListener("click",()=>{
    window.scrollTo(0,0)
})

const newsearching=()=>{
    pagenumber++;
    if(pagenumber===2){
        pagenumber=1;
        document.querySelector("ul").innerHTML="";
        searching();
    }
    document.querySelector(".mybutton").display="none";
}

const showprofile=async(profile)=>{

    var profilefetch=await fetch(profile);
    var profileresult=await profilefetch.blob()
    console.log(profileresult)

}




