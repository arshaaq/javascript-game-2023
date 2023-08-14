const bonbon1Container = document.getElementById("bonbon-1-container");
const bonbon2Container = document.getElementById("bonbon-2-container");
const bonbon3Container = document.getElementById("bonbon-3-container");

const bonbons = document.getElementsByClassName("bonbon");
const sounds = ["drums.mp3","piano.mp3","trumpet.mp3"]

for(i=0; i<bonbons.length;i++){
    console.log(bonbons[i]);

    bonbons[i].addEventListener("mouseover", (i)=>{
        event.target.classList.add("red");
        const audio = new Audio(`sounds/${event.target.getAttribute("sound")}`);
        audio.play();
    })

    bonbons[i].addEventListener("mouseout", ()=>{
        event.target.classList.remove("red");
    })

}





