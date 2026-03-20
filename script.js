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
 
    let input = document.querySelector("#input");
  
function render(){
    let sum = "";

    arr.forEach(function(val){
        sum += `
        <div class="task">
            <h1>${val.task}   <span class="${val.imp ? "true" : "false"}">
    ${val.imp ? "Important" : ""}
</span>
             </h1>
           
            <button>mark as complete</button>
        </div>`;
    });

    let container = document.querySelector(".left");
    container.innerHTML = sum;
}

let arr = [];

let form = document.querySelector(".todohide .container .right form");

form.addEventListener("submit", function(e){
    e.preventDefault();
      let mark = document.querySelector("#check").checked;
   console.log(mark); // debug

    if(input.value.trim() === "") return;

    arr.push({
        task: input.value,
        imp: mark
    });

    
render();
    input.value = "";
    document.querySelector("#check").checked = false;
});


