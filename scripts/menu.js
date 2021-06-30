
// There is no need to this function ^^`
// function openChoice(evt , the_choice){
//     var i , choices_content, choices ;
//     choices_content = document.getElementsByClassName("choices-content");
//     for (i = 0 ; i < choices_content.length;i++){
//         choices_content[i].style.display = "none";
//         console.log("i = ",i,"e:",choices_content[i]);
//     }
//
//     choices = document.getElementsByClassName("choices");
//     for (i = 0 ; i < choices.length;i++) {
//         choices[i].className = choices[i].className.replace(" active", "");
//         console.log("n = ",i,"ch:",choices[i])
//     }
//
//
//     document.getElementById(the_choice).style.display = "block";
//     evt.currentTarget.className += " active";
//     console.log("evt.currentTarget.className",evt.currentTarget);
// }



//SAVING :

function openSaveList(){
    console.log("opening save list .. ");
    let l = document.getElementById("saveList");
    l.style.display ="block";
}

function closeSaveList(){
    console.log("closing save list .. ");
    let l = document.getElementById("saveList");
    l.style.display ="none";
}

function openGameList(){
    console.log("opening Game list .. ");
    let l = document.getElementById("gameList");
    l.style.display ="block";
}

function closeGameList(){
    console.log("closing save list .. ");
    let l = document.getElementById("gameList");
    l.style.display ="none";
}

function openAboutList(){
    console.log("opening About list .. ");
    let l = document.getElementById("aboutList");
    l.style.display ="block";
}

function closeAboutList(){
    console.log("closing about list .. ");
    let l = document.getElementById("aboutList");
    l.style.display ="none";
}
