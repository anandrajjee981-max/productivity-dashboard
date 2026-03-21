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