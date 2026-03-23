function multipage(){  //for making multi pages wesite this is the function
    let elems = document.querySelectorAll(".elem");
let fullelems = document.querySelectorAll(".fullelem");

elems.forEach(function(elem, index){
    elem.addEventListener("click", function(){
        fullelems[index].style.display = "block";
       
    });
});
let btn = document.querySelectorAll(".btn")

btn.forEach(function(elem, index){
    elem.addEventListener("click", function(){
        fullelems[index].style.display = "none";
        
    });
});  
}
multipage();

 function todo(){  
     let input = document.querySelector("#input");
    
window.deleteTask = function(index) {//i add window so that user can see html update after deletion 
        arr.splice(index, 1);
        render();
    };
function render(){
    let sum = "";

    arr.forEach(function(val , idx){
        sum += `
        <div class="task">
            <h1>${val.task}   <span class="${val.imp ? "true" : "false"}">
    ${val.imp ? "Important" : ""}
</span>
             </h1>
           
            <button onclick="deleteTask(${idx})">Delete</button>
        </div>`;
    });

    let container = document.querySelector(".left");
    container.innerHTML = sum;
   localStorage.setItem("tasks", JSON.stringify(arr));

}

let arr = JSON.parse(localStorage.getItem("tasks")) || [];//“agar left side fail ho jaye / null ho → to empty array use kar lo”
render(); //  ye missing tha jbb page reload hoga too task purana wala show k liye , ye ui update k lye yha use hua
let form = document.querySelector(".todohide .container .right form");

form.addEventListener("submit", function(e){
    e.preventDefault();
      let mark = document.querySelector("#check").checked;
  // console.log(mark); // debug

    if(input.value.trim() === "") return;

    arr.push({
        task: input.value,
        imp: mark
    });

    
render();
    input.value = "";
    document.querySelector("#check").checked = false;
});



  }
    todo();

   function dailyplanner(){
       let hour = Array.from({ length: 18 }, function(unused, idx) {
  // yey function khali array return krta hain 
    return idx; 
});

let daysum = ""
hour.forEach(function(val , idx){
daysum += `
<div class="track">
    <p>${6 + val}:00 - ${7 + val}:00</p>
    <input id = " ${idx}" type="text" placeholder="....">
</div>
`
})
let container = document.querySelector(".dailyhide .list")
container.innerHTML = daysum 

let plan = JSON.parse(localStorage.getItem("task")) || {}
let text = document.querySelectorAll(".dailyhide .list input")
text.forEach(function(inp){
     let id = inp.id;

    if(plan[id]){//undefine value ignore karega and ui update
        inp.value = plan[id];
    }
    inp.addEventListener("input", function(e){
       let id = e.target.id;
        plan[id] = e.target.value;

        localStorage.setItem("task", JSON.stringify(plan));

    });
});
   }
   dailyplanner();
   function motivation(){
    const quoteEl = document.querySelector(".motihide .moti2 h1");
const authorEl = document.querySelector(".motihide .moti3 h1");

async function getQuote() {
  if (!quoteEl || !authorEl) return;

  try {
    quoteEl.innerText = "Loading...";
    authorEl.innerText = "";

    const res = await fetch("https://dummyjson.com/quotes/random");

    if (!res.ok) throw new Error("API Error");

    const data = await res.json();

    quoteEl.innerText = data.quote;
    authorEl.innerText = "- " + data.author;

  } catch (err) {
    console.error(err);
    quoteEl.innerText = "Failed to load quote 😔";
    authorEl.innerText = "";
  }
}

document.addEventListener("DOMContentLoaded", getQuote);
document.querySelector(".new-quote-btn")?.addEventListener("click", getQuote);
   }
motivation();
function pomodoro(){
   let pomotime = document.querySelector(".pomohide .pomotime");
let start = document.querySelector(".pomohide .pomobox .start");
let head = document.querySelector(".pomohide .head")
let pause = document.querySelector(".pomohide .pomobox .pause")
let restart = document.querySelector(".pomohide .pomobox .restart")
let iswork = true; 
let totalsec = 25 * 60; 
let timeset;

// Sirf screen par time dikhane ke liye
function updateUI() {
    let minute = Math.floor(totalsec / 60);
    let sec = totalsec % 60;
    pomotime.innerHTML = `${String(minute).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}
function pausetime(){
   clearInterval(timeset);
   timeset = null;//maine yey phele nhi rkha tha too yey pause click badd start click hee nhi hota tha
}
start.addEventListener("click", function () {
    if (timeset) return; 

    timeset = setInterval(function () {
        if (totalsec > 0) {
            totalsec--; 
            updateUI();
        } else {
            // Jab time 0 ho jaye tab switch karein
            clearInterval(timeset);
            timeset = null;

            if (iswork) {
                head.style.backgroundColor = "var(--blue)"
                head.innerHTML = "Work Done! Break starts."
                new Audio("victory.mp3").play();
                iswork = false;
                totalsec = 5 * 60; // 5 min break
            } else {
              head.style.backgroundColor= "#033408"
                head.innerHTML = "Break Over! Back to work.."
                iswork = true;
                totalsec = 25 * 60; // 25 min work
            }
            
            updateUI();
            // Agar break automatically start karni hai toh yahan start.click() trigger kar sakte hain
        }
    }, 1000); // 1000ms = 1 second (Testing ke liye 10ms thik hai, par final ke liye 1000 karein)
});
pause.addEventListener("click",pausetime)
restart.addEventListener("click",function(){
    totalsec = 25*60;
    head.style.backgroundColor= "#033408"
                head.innerHTML = "let's comeback"
}) 
}
pomodoro();

const apiKey = "bcf212a5a67ef0c626e4a8da415d0ccd";


const date = document.querySelector(".allelem .left1 .date");
const time = document.querySelector(".allelem .left1 .time");
const tempEl = document.querySelector(".allelem .right1 .temp");
const windEl = document.querySelector(".allelem .right1 .wind");
const cityEl = document.querySelector(".allelem .right1 .city"); // optional

let fallbackCity = "Ranchi";


// 🌦️ Weather by Coordinates
async function getWeatherByCoords(lat, lon) {
  try {
    tempEl.textContent = "Loading...";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    tempEl.textContent = data.main.temp + "°C";
    windEl.textContent = data.wind.speed + " m/s";

    if (cityEl) {
      cityEl.textContent = data.name;
    }

  } catch (err) {
    console.log("Error:", err);
  }
}


// 🌍 Get User Location
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        let lat = pos.coords.latitude;
        let lon = pos.coords.longitude;

        getWeatherByCoords(lat, lon);
      },
      (err) => {
        console.log("Location denied ❌ → fallback city");
        getWeatherByCity(fallbackCity);
      }
    );
  } else {
    alert("Geolocation not supported");
    getWeatherByCity(fallbackCity);
  }
}


// 🌆 Weather by City (Fallback)
async function getWeatherByCity(city) {
  try {
    tempEl.textContent = "Loading...";

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    if (data.cod == "404") {
      alert("City not found ❌");
      return;
    }

    tempEl.textContent = data.main.temp + "°C";
    windEl.textContent = data.wind.speed + " m/s";

    if (cityEl) {
      cityEl.textContent = data.name;
    }

  } catch (err) {
    console.log("Error:", err);
  }
}


// 🕒 Time Update
function updateTime() {
  const now = new Date();

  date.innerText = now.toDateString();

  time.innerText = now.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}


// 🚀 First Load
getUserLocation();
updateTime();


// 🔁 Intervals
setInterval(getUserLocation, 60000); // weather update (1 min)
setInterval(updateTime, 1000); // time update (1 sec)

