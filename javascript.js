const bonbons = document.getElementsByClassName("bonbon");
const sounds = ["drums.mp3","piano.mp3","trumpet.mp3"]
const gameStages = [0,1,2];


//the function that will be used to play the bonbon
function playBonbon(element){
    element.classList.add("red");
    const audio = new Audio(`sounds/${element.getAttribute("sound")}`);
    audio.play();
}

function addGameStage(bonbons,gameStages){
    let bonbonPicked = (Math.floor(Math.random()*(bonbons.length-1-0+1))+0);

        //add current bonbon stage to the game array
        gameStages.push(bonbonPicked);

        //play the stage for the user
        playBonbon(bonbons[bonbonPicked]); 
}

function playThroughGameStages(gameStages,bonbons){
    for(i=0; i<gameStages.length; i++){
        console.log(gameStages[i]);
        setTimeout(() => {
            console.log("One second has passed!");
        }, 3000); // 1000 milliseconds = 1 second
        
        
    }
}


function waitForClick(bonbons) {
    return new Promise(resolve => {
        bonbons[0].addEventListener("click", () => {
            resolve(event.target.getAttribute("order"));
        });

        bonbons[1].addEventListener("click", () => {
            resolve(event.target.getAttribute("order"));
        });

        bonbons[2].addEventListener("click", () => {
            resolve(event.target.getAttribute("order"));
        });
    });

    
}

async function userTurn(gameStage,bonbons) {
   userChoice = await waitForClick(bonbons).then(result=>{
        return result;
    });

    if(gameStage == userChoice){
        console.log("you win!")
    } else {
        console.log(userChoice);
        console.log("you lose!");
    }

    console.log("end of function");
}


//adds clickable options for bonbons
for(i=0; i<bonbons.length;i++){
    console.log(bonbons[i]);

    bonbons[i].addEventListener("click", (event)=>{
        playBonbon(event.target);
    });

    bonbons[i].addEventListener("mouseout", ()=>{
        event.target.classList.remove("red");
    });

}

//play the game function
function playGame(bonbons, gameStages){

    //if the game stages aren't defined, start it off!
    if(gameStages.length == 0){
        
        addGameStage(bonbons, gameStages);

    //if the game stages exist, its time to play the game
    }else{

         for (let i = 0; i < gameStages.length; i++) {
            (function(index) {
                setTimeout(() => {
                    console.log(index);
                    playBonbon(bonbons[gameStages[index]]);
                    console.log("lol");
                }, 1000 * (index + 1));
            })(i);

            //userTurn(gameStages[i],bonbons);
        }

       
    }

    
}





