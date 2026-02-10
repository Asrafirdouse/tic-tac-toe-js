let boxes=document.querySelectorAll(".box1");
let reset=document.querySelector("#resetbtn");
let newbtn=document.querySelector("#newbtn");
let msg=document.querySelector("#msg");
let msgcont=document.querySelector(".msg-container");
let count=0;
let isAI = true; // toggle later if you want


let scoreO = 0;
let scoreX = 0;

let scoreOEl = document.querySelector("#scoreO");
let scoreXEl = document.querySelector("#scoreX");

let turn0=true;
let winpatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,4,8],
    [2,4,6],
    [0,3,6],
    [1,4,7],
    [2,5,8],
];
boxes.forEach((box) => {
   box.addEventListener("click",()=>{
        if(turn0){
             box.innerText="o";
           //  turn0=false;
             count++;
        }
        else{
           box.innerText="x" ;
           turn0=true;
           count++;
        }
        box.disabled=true;
        checkwinner();

        if (isAI && count < 9) {
            setTimeout(aiMove, 500);
        }
        }
    );
});

const aiMove = () => {
    let emptyBoxes = [];

    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length === 0) return;

    let randomIndex = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    boxes[randomIndex].innerText = "x";
    boxes[randomIndex].disabled = true;
    count++;
    checkwinner();
};


const resetb=()=>{
    count=0;
    turn0=true;
    enable();
    msgcont.classList.add("hide");
};
const enable=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};
const disableboxes=()=>{
    boxes.forEach(box=>box.disabled=true);
};
const draw=()=>{
     msg.innerText="DRAW!!";
     msg.classList.add("draw");
     msgcont.classList.remove("hide");
     disableboxes();
};
const showwinner= (winner)=>{ 
    msg.innerText=`yeay!! The winner is ${winner}`;
    msgcont.classList.remove("hide");
    msg.classList.add("winner");


    if (winner === "o") {
        scoreO++;
        scoreOEl.innerText = scoreO;
    } else {
        scoreX++;
        scoreXEl.innerText = scoreX;
    }


    disableboxes();
};
const checkwinner=()=>{
    for(let pattern of winpatterns){
        //console.log("button was clicked");
        let posval1=boxes[pattern[0]].innerText;
        let posval2=boxes[pattern[1]].innerText;
        let posval3=boxes[pattern[2]].innerText;

         if(posval1!="" && posval2!="" && posval3!="" ){
             if(posval1===posval2 && posval2===posval3){
                console.log("winner");
                showwinner(posval1);
                return;

             }
             
         }
         if(count === 9){
            draw();
         }
        
    }
};
newbtn.addEventListener("click",resetb);
reset.addEventListener("click",resetb);