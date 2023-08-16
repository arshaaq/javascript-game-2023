const bonbons = document.getElementsByClassName("bonbon");
const sounds = ["drums.mp3","piano.mp3","trumpet.mp3"]
const gameStages = [];
statusText = document.getElementById("status-text");

const highScore = 0;
const highScoreText = document.getElementById("highScore-text");
highScoreText.textContent=(`${highScore}`);



//pause function to stop the program for x milliseconds
function pause(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}

//the function that will be used to play the bonbon
function playBonbon(element){
    element.classList.add("red");
    const audio = new Audio(`sounds/${element.getAttribute("sound")}`);
    audio.play();
    setTimeout(() => {
        element.classList.remove("red");
    }, 1000);
    
}

function changeInnerText(textContainer, desiredText){
    textContainer.textContent = desiredText; 
}

function addGameStage(bonbons,gameStages){
    let bonbonPicked = (Math.floor(Math.random()*(bonbons.length-1-0+1))+0);

        //add current bonbon stage to the game array
        gameStages.push(bonbonPicked);
}

async function playThroughGameStages(gameStages,bonbons, statusText){

    

    changeInnerText(statusText,"pay attention!");

    for (let i = 0; i < gameStages.length; i++) {
        playBonbon(bonbons[gameStages[i]]);
        await pause(1000);
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

async function userTurn(bonbons) {
    userChoice = await waitForClick(bonbons).then(result=>{
        return result;
    });

    return userChoice;
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
async function playGame(bonbons, gameStages, statusText, highScore, highScoreText){
    console.log(highScore);
    
    //resets the game
    userLoss = false;
    gameStages = [];

    changeInnerText(statusText,"ready?");
    
    //while the user hasn't lost yet
    while(userLoss==false){
        //add a step!
        addGameStage(bonbons, gameStages);
                
        //changeInnerText(statusText,"pay attention!");

        
        //showcases the user the pattern they need to follow
    await playThroughGameStages(gameStages,bonbons, statusText);

       

        
        
        
        for(i=0; i<gameStages.length; i++){
           changeInnerText(statusText,"your turn!");

            userChoice = await (userTurn(bonbons)).then(result=>{
                return result;
            });
            
            //if the user gets the current step correct keep going
            if(userChoice == gameStages[i]){
                continue;
            //if they fail break out of the loop
            } else {
                changeInnerText(statusText,"you lose!");
                userLoss = true;
                await pause(1000);
                break;
            }    
        } 
        if(userLoss != true){
            changeInnerText(statusText,"good job!");
            await pause(1000);

            if(highScore <= gameStages.length){
                highScore = gameStages.length;
                changeInnerText(highScoreText,`${highScore}`);
            }
            
        } else{
            changeInnerText(statusText,"press the play button to try again!");
            await pause(1000);
        }


        

        
   } 
    
}





