
// There is no need to this function ^^`
function openChoice(evt , the_choice){
    var i , choices_content, choices ;
    choices_content = document.getElementsByClassName("choices-content");
    for (i = 0 ; i < choices_content.length;i++){
        choices_content[i].style.display = "none";
        // console.log("i = ",i,"e:",choices_content[i]);
    }

    choices = document.getElementsByClassName("choices");
    for (i = 0 ; i < choices.length;i++) {
        choices[i].className = choices[i].className.replace(" active", "");
        // console.log("n = ",i,"ch:",choices[i])
    }


    document.getElementById(the_choice).style.display = "block";
    evt.currentTarget.className += " active";
    // console.log("evt.currentTarget.className",evt.currentTarget);
}


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    let w = window.innerWidth;
    let dashboardWidth ;
    if (w > 600) dashboardWidth = "250px";
    else dashboardWidth = "100px";
    document.getElementById("mySidebar").style.width = dashboardWidth;
    document.getElementById("main").style.marginLeft = dashboardWidth;
    let board_tools = document.getElementById("btools");
    board_tools.style.display = "block";
}
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("cy").style.marginLeft = "0";
    let board_tools = document.getElementById("btools");
    board_tools.style.display = "none";
}

//SAVING :

function openSaveList(){
    // console.log("opening save list .. ");
    let l = document.getElementById("saveList");
    l.style.display ="block";
}

function closeSaveList(){
    // console.log("closing save list .. ");
    let l = document.getElementById("saveList");
    l.style.display ="none";
}
