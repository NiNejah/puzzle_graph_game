
// There is no need to this function ^^` 
function openChoice(evt , the_choice){
    var i , choices_content, choices ;

    choices_content = document.getElementsByClassName("choices-content");
    for (i = 0 ; i < choices_content.length;i++){
        choices_content[i].style.display = "none";
    }

    choices = document.getElementsByClassName("choices");
    for (i = 0 ; i < choices_content.length;i++){
        choices[i].className = choices[i].className.replace(" active","");
    }

    document.getElementById(the_choice).style.display = "block";
    evt.currentTarget.className += " active";
}


/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
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
