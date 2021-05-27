let file = document.getElementById("myfiles");
console.log("file : " , file);
let columns = document.querySelectorAll(".column");

file.onchange =(()=>{
    arrImg =[];
    for (const key in file.files){
        if(file.files.hasOwnProperty(key)){
            const element = file.files[key];
            if (element.type == "image/jpeg" || element.type == "image/png"){
                let parent_column = minParent(columns);
                let myimg = makeImag(element.webkitRelativePath);
                arrImg[key]= myimg ;
                parent_column.appendChild(myimg);
            }
        }
    }
});

// pour trouver le colonne qui contient le minumeme de image
function minParent(parentNode){
    let arry = [];
    parentNode.forEach((element,i) => {
        arry[i] = element.children.length;
    });
    let min = Math.min.apply(null,arry);
    for (let i = 0 ; i < parentNode.length ; i++){
        if (parentNode[i].children.length == min){
            return parentNode[i];
        }
    }
}

function makeImag(imgsrc){
    let img = document.createElement("img");
    img.setAttribute("src",imgsrc);
    img.className = "myImg";
    return img ;
}

// to select :
function on_select(){
    let imgs = document.querySelectorAll(".column img");
    console.log("imgs : " , imgs);
    if (imgs.length === 0) return false ;
    else {
        for (let i = 0 ; i < imgs.length;i++){
            imgs[i].onclick = () => {
                if (imgs[i].className === "selectedImg"){
                    imgs[i].className = "myImg";
                }else {
                    imgs[i].className = "selectedImg";
                }
            }
        }
    }
    return true ;
}

function selectAll(){
    let imgs = document.querySelectorAll(".column img");
    imgs.forEach(element => {
        element.className = "selectedImg";
    });
}
function deselectAll(){
    let imgs = document.querySelectorAll(".column img");
    imgs.forEach(element => {
        element.className = "myImg";
    });
}
function displayImgs(){
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext('2d');
    var slectedImgs = document.getElementsByClassName("selectedImg");
    let x = 0 ;
    let y = 0 ;
    let img ;
    if (slectedImgs.length === 0) return false ;
    for (let i= 0 ; i < slectedImgs.length ; i ++){
        img = slectedImgs[i];
        let myImg = new Image();
        myImg.src = img.attributes[0].value;
        ctx.drawImage(myImg, x, y ,50,50);
        x += 50;
        if ( x >= c.width ){
            x = 0 ;
            y +=50;
        }
    }
    return true ;
}




