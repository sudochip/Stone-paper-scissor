let resultBoard= JSON.parse(localStorage.getItem('score'))||{
            Win : 0,
            Lose: 0,
            Tie: 0
        };
let intervalId=null;
let compMove;
// function to return computer move
function computerMove(){
    let term=Math.random();
    if(term>=0 && term<=0.3){
        return 'Rock';
    }
    else if(term>0.3 && term<=0.6){
        return 'Paper';
    }
    else{
        return 'Scissor';
    }
}
// function to user move for auto option
function userMove(){
    let term=Math.random();
    if(term>=0 && term<=0.3){
        return 'Rock';
    }
    else if(term>0.3 && term<=0.6){
        return 'Paper';
    }
    else{
        return 'Scissor';
    }
}
// function for final out come
function result(userMove){
    compMove=computerMove();
    if(userMove===compMove){
        return 'Tie';
    }
    else if(userMove==='Rock'){
        if(compMove==='Paper'){
            return 'Lose';
        }
        if(compMove==='Scissor'){
            return 'Win';
        }
        
    }
    else if(userMove==='Paper'){
        if(compMove==='Rock'){
            return 'Win';
        }
        if(compMove==='Scissor'){
            return 'Lose';
        }
    }
    else if(userMove==='Scissor'){
        if(compMove==='Paper'){
            return 'Win';
        }
        if(compMove==='Rock'){
            return 'Lose';
        }
    }
}
// function for displying everything
function showScore(userMove){
    let value= result(userMove);
    resultBoard[value]++;
    document.querySelector('.result-summary').innerHTML=`${value}`;
    document.querySelector('.result-board').innerHTML=`Your <img class="result-img" src="assets/${userMove}-emoji.png"> and <img class="result-img" src="assets/${compMove}-emoji.png"> computer`;
    document.querySelector('.sir').innerHTML=`<span>Win:${resultBoard.Win}</span> <span>Lose:${resultBoard.Lose}</span> <span>Tie:${resultBoard.Tie}</span>`;
    localStorage.setItem('score',JSON.stringify(resultBoard));
}
// automatic button ke liye function
function autoPlay(){
    if(!intervalId){
        document.querySelector('.button-auto').innerHTML='Stop'
        intervalId=setInterval(()=>{
        showScore(userMove());
        },500);
    }  
    else{
        document.querySelector('.button-auto').innerHTML='Auto Play'
        clearInterval(intervalId);
        intervalId=null;
    }
}
// reset score function
function resetBoard(){

    localStorage.removeItem('score');
    resultBoard={
    Win : 0,
    Lose: 0,
    Tie: 0
    };
    document.querySelectorAll('.reset-phase').forEach(e1=>{
        e1.innerHTML='';
    });
    document.querySelector('.confirmation').innerHTML='Are you sure you want to Reset the score? <button class="confirmed">Yes</button><button class="not-confirmed">No</button>'
    document.querySelector('.confirmed').addEventListener('click',()=>{
    
        document.querySelector('.confirmation').innerHTML='';

    });
    document.querySelector('.not-confirmed').addEventListener('click',()=>{
        document.querySelector('.confirmation').innerHTML='';
    });
    document.querySelector('.sir').innerHTML=`<span>Win:${resultBoard.Win}</span> <span>Lose:${resultBoard.Lose}</span> <span>Tie:${resultBoard.Tie}</span>`;
    if(intervalId){
        document.querySelector('.button-auto').innerHTML='Auto Play'
        clearInterval(intervalId);
        intervalId=null;
    }
}
document.querySelector('.button-rock').addEventListener('click',()=>{
    showScore('Rock');
});
document.querySelector('.button-paper').addEventListener('click',()=>{
    showScore('Paper');
});
document.querySelector('.button-scissor').addEventListener('click',()=>{
    showScore('Scissor');
});
document.querySelector('.button-reset').addEventListener('click',()=>{
    resetBoard();
});

document.querySelector('.button-auto').addEventListener('click',()=>{
    autoPlay();
});
document.body.addEventListener('keydown',(event)=>{
    if(event.key==='a'||event.key==='A'){
        autoPlay();
    }
    if(event.key==='R'||event.key==='r'){
        showScore('Rock');
    }
    if(event.key==='P'||event.key==='p'){
        showScore('Paper');
    }
    if(event.key==='S'||event.key==='s'){
        showScore('Scissor');
    }
    if(event.key==='Backspace'){
    resetBoard();
    }
});
