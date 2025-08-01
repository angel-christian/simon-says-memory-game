let gameSeq = [] ;
let userSeq = [] ;

let gameStarted = false ;
let level = 0 ;

let pc = document.querySelector('.pc');
let mobile = document.querySelector('.mobile');
let body = document.querySelector('body');

let btns = ["red","green","yellow","blue"] ;

document.addEventListener("keydown", function () {
    if ( gameStarted == false ){
        console.log("Game Started");
        gameStarted = true ;

        nextLevel();
    }
})

let startButton = document.querySelector('button');
startButton.addEventListener("click", function () {
    if ( gameStarted == false ){
        console.log("Game Started");
        gameStarted = true ;

        nextLevel();
    }
})

function btnFlash(btn) {
    btn.classList.add("flash") ;
    setTimeout(function () {
        btn.classList.remove("flash");
    } , 250 ) ;
}

function nextLevel() {
    userSeq = [] ;
    level++ ;
    pc.innerText = `Level ${level}` ;
    mobile.innerText = `Level ${level}` ;

    let randomIndex = Math.floor( Math.random() * 4 ) ;
    let randomColor = btns[randomIndex] ;
    let randomButton = document.querySelector(`.${randomColor}`) ;

    gameSeq.push(randomColor);

    btnFlash(randomButton) ;
}



    let allBtns = document.querySelectorAll('.btn') ;
    
    for ( btn of allBtns ) {  
        btn.addEventListener("click",btnPress) ;
    }
    
    function btnPress () {

        if (!gameStarted) return;
        
        let btn = this ;
        btnFlash(btn) ;
        
        
        let userBtn = btn.getAttribute('id');
        userSeq.push(userBtn);
        checkButn(userSeq.length-1) ;
    }


let score = [0] ;
function checkButn (indx) {
    if ( gameSeq[indx] == userSeq[indx] ){
        if ( gameSeq.length == userSeq.length ){
            correctSound(this);
            setTimeout(nextLevel,1000);
        }
    }else {
        if ( level-1 > score[0] ){
            score[0] = level-1 ;
        }
        wrongSound(this);
        pc.innerHTML = `<u>GAME OVER!</u> Your Score was <u>${level-1}</u><br>Highest Score was <u>${score[0]}</u><br>Press Any Key To Start` ;
        mobile.innerHTML = `<u>GAME OVER!</u> Your Score was <u>${level-1}</u><br>Highest Score was <u>${score[0]}</u><br>Press Start Button To Play Again` ;
        reset() ;
    }
}

function correctSound(btn) {
    const audio = new Audio(`correct.mp3`) ;
    audio.play() ;
}

function wrongSound(btn) {
    const audio = new Audio(`wrong.mp3`) ;
    audio.play() ;
}

function reset() {
    body.classList.add("gameOver") ;
    setTimeout(function () {
        body.classList.remove("gameOver");
    } , 100 ) ;

    level = 0 ;
    gameSeq = [] ;
    console.log("Game Ended")
    gameStarted = false ;
}
