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

 