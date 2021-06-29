
// Init :
let cy = cytoscape({
    container: document.getElementById('cy'),// container to render in

    // elements: [
    //     {data: {id: 'a'}},
    //     {data: {id: 'b'}},
    //     {data: {id: 'c'}},
    //     {data: {id: 'ab', source: 'a', target: 'b'}}
    // ],
    layout: {
        name: 'grid',
        rows: 1
    },

    style: cytoscape.stylesheet()
        .selector('node')
        .css({
            'height': 80,
            'width': 80,
            'background-fit': 'cover',
            'label': 'data(id)',
            'shape': 'round-rectangle', //'barrel',
            'border-color': '#8ce8ff',
            'border-width': 3,
            'border-opacity': 0.5,
            // "color": "#fff",
            "text-outline-color": "#888",
            "text-outline-width": 3
        })
        .selector('edge')
        .css({
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
        })
        .selector('.to-be-linked')
        .css({
            "color": "red"
            // 'border-color': '#ff0000',
        })
        .selector('.normal')
        .css({
            "color": "#ffffff"
        }),


    // style: fetch('cy-style.json').then(function(res){
    //     return res.json();
    // }),

    // pan: {x: 10, y: 10},
    wheelSensitivity: 0.3,
    zoom: 10,
    minZoom: 0.05,
    maxZoom: 5,

});
cy.nodes().classes('normal')

function layoutRun(eles) {
    let layout = eles.layout({
        name: 'random',
        animate: true,
    });
    layout.run();
}


/////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Set Functions  /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//# Insert :

////// Add Images In The Canvas \\\\\\
function addImgGame(url,eId){
    let ele = cy.add({
        group: 'nodes',
        data: {id: eId},
        // position: {x: 300, y: 200}
    });
    ele.addClass("normal");
    cy.style()
        .selector('#' + String(eId))
        .style({
            'background-image': url
        })
        .update()
}
function open43(){
    let game_4_3 =[
        "4*3/1.png",
        "4*3/2.png",
        "4*3/3.png",
        "4*3/4.png",
        "4*3/5.png",
        "4*3/6.png",
        "4*3/7.png",
        "4*3/8.png",
        "4*3/9.png",
        "4*3/10.png",
        "4*3/11.png",
        "4*3/12.png"
    ]
    for (let i = 0 ; i<game_4_3.length;i++){
        let url = 'url(./jigs/'+game_4_3[i]+')' ;
        addImgGame(url,i+1);
    }
        setTimeout(function () {
        cy.reset();
    }, 1000);
}


////// Link The Nodes \\\\\\
let collectionToBeLinked = cy.collection();

let addLink = ((evt) => {
    let evtTarget = evt.target;
    if (evtTarget === cy) {
        console.log("click en vide ");
        collectionToBeLinked = cy.collection();
        resetAllClassName();
    } else {
        let evntTagGroup = getGroup(evtTarget[0]);
        if (isNodes(evntTagGroup)) {
            console.log("click sur node !");
            collectionToBeLinked = collectionToBeLinked.union(evtTarget);
            switch (collectionToBeLinked.length) {
                case 1 :
                    let eId = getId(evtTarget[0]);
                    console.log("id", eId)
                    // to change the class from normal to to be linked
                    changeTheClassName(cy.$id(eId), 'normal', 'to-be-linked');
                    break;
                case 2:
                    let from = getId(collectionToBeLinked[0]);
                    let to = getId(collectionToBeLinked[1]);
                    if (!alreadyLinked(from + to)) {
                        let edg = cy.add({
                            group: 'edges',
                            data: {id: from + to, source: from, target: to}
                        });
                    } else {
                        console.log("already Linked !");
                    }
                    collectionToBeLinked = cy.collection();
                    resetAllClassName();
                    break;
                default:
                    break;
            }
            // EDG :
        } else {
            evtTarget.remove();
            console.log("je suis dans 3");
            collectionToBeLinked = cy.collection();
            resetAllClassName();
        }
    }
});


// Listener :
cy.on('tap', addLink)


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Verification Functions  ////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function alreadyLinked(edgId) {
    let isLinked = false;
    cy.edges().forEach((e) => {
        if (getId(e[0]) === edgId) isLinked = true;
    });
    return isLinked;
}

function isNodes(e) {
    return e === 'nodes';
}

function isEdges(e) {
    return e === 'edges';
}


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// get Functions  /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getId(e) {
    return e._private.data.id;
}

function getGroup(e) {
    return e._private.group;
}

function getBackgroundUrl(e) {
    return e._private.style["background-image"].strValue
}


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// set Functions  /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function changeTheClassName(e, from, to) {
    e.removeClass(from)
    e.addClass(to)
}

function resetAllClassName() {
    cy.nodes().classes('to-be-linked').forEach((e) => {
        changeTheClassName(e, 'to-be-linked', 'normal');
    });
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Export Functions  /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function saveAsImg(isJpg) {
    let myImg = cy.jpg();
    if (!isJpg) myImg = cy.png()
    console.log("myImg :", myImg);
    var a = document.createElement("a"); //Create <a>
    a.href = myImg; //Image Base64 Goes here
    a.download = document.getElementById("FileName").value;
    a.click();
    // window.location.href = myimg;
}

function saveAsJson() {
    let toBeSaved = cy.json();
    // console.log("touut :",toBeSaved);
    let mydata = JSON.stringify(toBeSaved, null, 2);
    // console.log(mydata);
    saveTextAsFile(mydata)
}

function saveTextAsFile(data) {
    var textToWrite = data
    var textFileAsBlob = new Blob([textToWrite], {type: 'text/plain'});
    var fileNameToSaveAs = document.getElementById("FileName").value;
    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs +'.json';
    downloadLink.innerHTML = "Download File";
    downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    downloadLink.click();

    //
    // if (window.webkitURL != null) {
    //     // Chrome allows the link to be clicked
    //     // without actually adding it to the DOM.
    //     downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    // } else {
    //     // Firefox requires the link to be added to the DOM
    //     // before it can be clicked.
    //     downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    //     downloadLink.onclick = destroyClickedElement;
    //     downloadLink.style.display = "none";
    //     document.body.appendChild(downloadLink);
    // }
}




