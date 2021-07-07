
//List :
function openList(listId){
    console.log("opening ",listId);
    document.getElementById(listId).style.display = "block";
}
function closeList(listId){
    console.log("closing ",listId);
    document.getElementById(listId).style.display = "none";
}

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
    let w = window.innerWidth;
    let dashboardWidth ;
    if (w > 600) dashboardWidth = "250px";
    else dashboardWidth = "100px";
    document.getElementById("mySidebar").style.width = dashboardWidth;
    document.getElementById("main").style.marginLeft = dashboardWidth;
    // let board_tools = document.getElementById("btools");
    board_tools.style.display = "block";
}
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
    document.getElementById("cy").style.marginLeft = "0";
    let board_tools = document.getElementById("btools");
    // board_tools.style.display = "none";
}
