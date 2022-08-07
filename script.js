const selectionButtons=document.querySelectorAll(".selections");
const finalColumn=document.querySelector('[data-ns-test="game-result"]');
let computerpts=document.querySelector('[data-ns-test="computer-points"]');
let userpts=document.querySelector('[data-ns-test="user-points"]');
const turns=document.querySelector('[data-ns-test="game-number"]');
let roundleft=document.querySelector('[data-ns-test="rounds-left"]');
let play=document.querySelector('[data-ns-test="play-game"]');
let gres=document.querySelector('[data-ns-test="game-result"]')
let rres=document.querySelector('[data-ns-test="round-result"]')
let cch =document.querySelector('[data-ns-test="computer-choose"]');

const SELECTIONS=[
    {
        name:'ROCK',
        beats:'SCISSORS',
    },
    {
        name:'PAPER',
        beats:'ROCK',
    },
    {
        name:'SCISSORS',
        beats:'PAPER',
    }
    ]

play.addEventListener('click',()=>{
    play.disabled=true;
    gres.innerText="";

    let turnnum=turns.value;
roundleft.innerText=turnnum;
for(item of selectionButtons){
    item.disabled=false;
}

})



selectionButtons.forEach(selectionButton=>{
    selectionButton.addEventListener('click',(e)=>{
        let turnnum=roundleft.innerText;
        turnnum--;
        roundleft.innerText=turnnum;
        if(turnnum>0){
        const selectionName=selectionButton.innerText;
        const selection=SELECTIONS.find(selection=>
        selection.name===selectionName)
        makeSelection(selection);
        }

        if(turnnum==0){
        play.disabled=false;
        for(item of selectionButtons){
                item.disabled=true;
            }
        if(computerpts.innerText>userpts.innerText)
        gres.innerText="LOSE";
        if(computerpts.innerText<userpts.innerText)
        gres.innerText="WON";
        if(computerpts.innerText===userpts.innerText)
        gres.innerText="TIE";
          
        }
        
    })
})


function makeSelection(sel){
const computerChoose=randomSelection();
cch.innerText=computerChoose.name;
// console.log(computerChoose);
Window.computerChoose=computerChoose.name;
const yourWinner=isWinner(sel,computerChoose);
const computerWinner=isWinner(computerChoose,sel);

if(yourWinner===true &&  computerWinner===false){
userpts.innerText=Number(userpts.innerText)+ Number(1);
rres.innerText="WON";

}
if(yourWinner===false &&  computerWinner===true){
    rres.innerText="LOSE"
    computerpts.innerText=Number(computerpts.innerText)+Number(1);
}

if(yourWinner===false &&  computerWinner===false){
    rres.innerText="TIE"
}
}

function isWinner(sel,oppoSel){
    return sel.beats===oppoSel.name
}

function randomSelection(){
    const randomIndex=Math.floor(Math.random()*3);
    return SELECTIONS[randomIndex];
}