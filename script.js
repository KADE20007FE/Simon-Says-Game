// getting all the elements from the DOM
const start = document.querySelector('.start');
const strict = document.getElementById('strict');
const power = document.querySelector('#on');
const display = document.querySelector('#turn')
const green = document.querySelector('.topleft');
const yellow = document.querySelector('.topright');
const red = document.querySelector('.bottomleft');
const blue = document.querySelector('.bottomright');

// game variables
let simonsequence = [];
let flash;
let turn;
let good;
let compTurn;
let intervalId;
let noise = true
let on = false;
let strictMode = false;
let win;
let playersequence = []; // Added declaration here

//power function
function powerfunc(){
  power.addEventListener('click', function (e)
  {
    if(power.checked==false){
        on=false;
        display.innerHTML="";
        return on;
    }
    else if( power.checked==true){
        on=true;
        display.innerHTML="_ _";
        clearColor();
        clearInterval(intervalId);
        return on;
    }
  })
}
powerfunc();

//start function
function startFunc(){
  start.addEventListener('click', function (e)
  {
    if(on || win){
        play();
    }
  })
}
startFunc();

// strict function
function strictModefunc(){
  strict.addEventListener('click', function (e){
    if(strict.checked==true){
        strictMode=true;
    }
    else if( strict.checked==false){
        strictMode=false;
    }
  })
}
strictModefunc();

// play function
function play(){
    win = false;
    simonsequence = [];
    playersequence = [];
    flash = 0;
    intervalId = 0;
    turn = 1;
    display.innerHTML = 1;
    good = true;
    simonSequenceGenerator();
    console.log(simonsequence)
    compTurn = true;
    intervalId = setInterval(gameTurn, 800);
}

function gameTurn(){
    on = false;
    if(flash == turn){
        compTurn = false;
        clearInterval(intervalId);
        clearColor();
        on = true;
    }
    if(compTurn){
        clearColor();
        simonSays();
    }
}

function simonSequenceGenerator(){
    const colors = ["green", "yellow", "red", "blue"];
    for(let i=0; i<20; i++){
        let random = Math.floor(Math.random()*4);
        simonsequence.push(colors[random]);
    }
}

function simonSays(){
    setTimeout(function(){
        if(simonsequence[flash]=="green"){
            flashLight("green")
        }
        else if(simonsequence[flash]=="yellow"){
            flashLight("yellow")
        }
        else if(simonsequence[flash]=="red"){
            flashLight("red")
        }
        else if(simonsequence[flash]=="blue"){
            flashLight("blue")
        }
        flash++;
    }, 500);
}

function flashLight(color){
    if(color=='green'){
        if(noise){
            let audio = document.getElementById("sound1");
            audio.play();
        }
        noise = true;
        green.style.backgroundColor = "lightgreen";
        setTimeout(function(){
            green.style.backgroundColor = "darkgreen";
        }, 300);
    }
    else if(color=='yellow'){
        if(noise){
            let audio = document.getElementById("sound2");
            audio.play();
        }
        noise = true;
        yellow.style.backgroundColor = "lightyellow";
        setTimeout(function(){
            yellow.style.backgroundColor = "gold";
        }, 300);
    }
    else if(color=="red"){
        if(noise){
            let audio = document.getElementById("sound3");
            audio.play();
        }
        noise = true;
        red.style.backgroundColor = "tomato";
        setTimeout(function(){
            red.style.backgroundColor = "darkred";
        }, 300);
    }
    else if(color=="blue"){
        if(noise){
            let audio = document.getElementById("sound4");
            audio.play();
        }
        noise = true;
        blue.style.backgroundColor = "lightskyblue";
        setTimeout(function(){
            blue.style.backgroundColor = "darkblue";
        }, 300);
    }
}

function clearColor(){
    green.style.backgroundColor = 'darkgreen';
    red.style.backgroundColor = 'darkred';
    yellow.style.backgroundColor = 'gold';
    blue.style.backgroundColor = 'darkblue';
}

function flashcolor(){
    green.style.backgroundColor = 'lightgreen';
    red.style.backgroundColor = 'tomato';
    yellow.style.backgroundColor = 'lightyellow';
    blue.style.backgroundColor = 'lightskyblue';
}

function user(){
    green.addEventListener('click', function(e){
        if(on){
            playersequence.push("green");
            check();
            flashLight("green");
            if(!win){
                setTimeout(()=>{
                    clearColor();
                },300)
            }
        }
    })   
    blue.addEventListener('click', function(e){
        if(on){
            playersequence.push("blue");
            check();
            flashLight("blue");
            if(!win){
                setTimeout(()=>{
                    clearColor();
                },300)
            }
        }
    })
    red.addEventListener('click', function(e){
        if(on){
            playersequence.push("red");
            check();
            flashLight("red");
            if(!win){
                setTimeout(()=>{
                    clearColor();
                },300)
            }
        }
    })
    yellow.addEventListener('click', function(e){
        if(on){
            playersequence.push("yellow");
            check();
            flashLight("yellow");
            if(!win){
                setTimeout(()=>{
                    clearColor();
                },300)
            }
        }
    })
}
user();

function check(){
    if(playersequence[playersequence.length-1]!==simonsequence[playersequence.length-1]){
        good = false;
    }
    if(playersequence.length==20 && good){
        wingame();
    }
    if(good==false){
        flashcolor();
        display.innerHTML="!!!";
        setTimeout(()=>{
            display.innerHTML=turn;
            clearColor();
            if(strictMode){
                play();
            }   
            else{
                compTurn = true;
                flash = 0;
                playersequence = [];
                good = true;
                intervalId = setInterval(gameTurn, 800);
            } 
        },800)
        noise = false;
    }
    if(turn == playersequence.length && good && !win){
        turn++;
        playersequence = [];
        compTurn = true;
        flash = 0;
        display.innerHTML = turn;
        intervalId = setInterval(gameTurn, 800);
    }
}

function wingame(){
    flashcolor();
    display.innerHTML="WIN";
    on = false;
    win = true;
    clearColor();
}