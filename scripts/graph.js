let nbColons =null ;
let nbRows = null ;

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
            'background-color': '#ffffff',
            // 'label': 'data(id)',
            'shape': 'round-rectangle', //'barrel',
            // 'border-color': '#8ce8ff',
            // 'border-width': 3,
            // 'border-opacity': 0.5,
            "color": "#ffffff",
            "text-outline-color": "#888",
            "text-outline-width": 2
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
function addImgGame(url, eId) {
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

function open43() {
    let game_4_3 = [
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
    closeGameList();
    for (let i = 0; i < game_4_3.length; i++) {
        let url = 'url(./jigs/' + game_4_3[i] + ')';
        addImgGame(url, i + 1);
    }
    layoutRun(cy.nodes())
    nbColons = 4 ;
    nbRows = 3 ;
}


////// Link The Nodes \\\\\\
let collectionToBeLinked = cy.collection();

let addLink = ((evt) => {
    let evtTarget = evt.target;
    if (evtTarget === cy) {
        // console.log("click en vide ");
        collectionToBeLinked = cy.collection();
        resetAllClassName();
    } else {
        let evntTagGroup = getGroup(evtTarget[0]);
        if (isNodes(evntTagGroup)) {
            // console.log("click sur node !");
            collectionToBeLinked = collectionToBeLinked.union(evtTarget);
            // console.log("en 0","collectionToBeLinked , length",collectionToBeLinked,collectionToBeLinked.length);
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
                    if (!isConnected(from, to)) {
                        let edg = cy.add({
                            group: 'edges',
                            data: {id: from + '_' + to, source: from, target: to}
                        });
                    } else {
                        window.alert("already Linked !");
                        console.log("already Linked !");
                    }
                    collectionToBeLinked = cy.collection();
                    // console.log("en2","collectionToBeLinked , length",collectionToBeLinked,collectionToBeLinked.length);
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
    if (gameOver(nbColons,nbRows)) {
        alert("you winnnnnnnn !");
    };
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
/////////////////////////////// Export Functions  //////////////////////////////
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
    downloadLink.download = fileNameToSaveAs + '.json';
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


//***************************************************************************************\\
//*********************************** Puzzle Function ***********************************\\
//***************************************************************************************\\

function hasGoodLink(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow || nbRow < 2) console.log("invalid id arg in hasGoodLink function !");
    let myE = cy.$('#' + String(id));
    let elesConnectedTo = myE.connectedEdges();
    let nbLinks = elesConnectedTo.length;
    if (isCorner(id, nbColon, nbRow)) return cornersTests(id, nbColon, nbRow, nbLinks);
    if (isBorder(id, nbColon, nbRow)) return borderTest(id, nbColon, nbRow, nbLinks);
    if (isInternalCells(id, nbColon, nbRow)) return internalTest(id, nbColon, nbRow, nbLinks);
}

function gameOver(nbColon, nbRow) {
    console.log("nbR ",nbRow,"nbC ",nbColon);
    if (nbColon === null || nbRow === null) return false ;
    console.log("je suis dans game is over ");

    let gameOver = true;
    cy.nodes().forEach((e) => {
        if (!hasGoodLink(parseInt(getId(e[0])), nbColon, nbRow)) gameOver = false;
    });
    if (gameOver) console.log("c'est fini il est Ganger !!!!!!!!!!!!!!!!! ");
    return gameOver ;
}


//*********************************** PUZZLE.js ***********************************\\

// Verification type Abstract
// Important (id) is integer !


function isCorner(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow) console.log("invalid id arg in isCorner function !");
    return id === 1 || id === nbColon || id === ( nbColon * (nbRow - 1)) + 1 || id === (nbRow * nbColon);
}

function isLeftBorder(id, nbColon) {
    if (id < 1) console.log("invalid id arg in isLeftBorder function !");
    return id % nbColon === 1;
}

function isRightBorder(id, nbColon) {
    if (id < 1) console.log("invalid id arg in isRightBorder function !");
    return id % nbColon === 0;
}

function isTobBorder(id, nbColon) {
    if (id < 1) console.log("invalid id arg in isTobBorder function !");
    return id > 1 && id < nbColon;
}

function isBottomBorder(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow) console.log("invalid id arg in isBottomBorder function !");
    return id > ((nbColon * (nbRow - 1)) + 1) && id < nbRow * nbColon;
}

function isBorder(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow) console.log("invalid id arg in isBorder function !");
        // console.log("border left: ",isLeftBorder(id, nbColon))
        // console.log("border right : ",isRightBorder(id, nbColon))
        // console.log("border top: ",isTobBorder(id, nbColon))
        // console.log("border bottom : ",isBottomBorder(id, nbColon, nbRow))
    return (
        isLeftBorder(id, nbColon) ||
        isRightBorder(id, nbColon) ||
        isTobBorder(id, nbColon) ||
        isBottomBorder(id, nbColon, nbRow));
}

function isInternalCells(id, nbColon, nbRow) {
    if (id < 1 || id > nbColon * nbRow) console.log("invalid id arg in isInternalCells function !");
    return !(isBorder(id, nbColon, nbRow) || isCorner(id, nbColon, nbRow));
}

// id is a String :
function isConnected(id1, id2) {
    return (
        alreadyLinked(id1 + '_' + id2) ||
        alreadyLinked(id2 + '_' + id1));
}


/// TESTS :

function cornersTests(id, nbColon, nbRow, nbLinks) {
    console.log("je suis dans cornersTests le -ID- = (",id,")")
    // test if the element has not enough, or to many links :
    if (nbLinks !== 2) return false;
    switch (id) {
        case 1:
            console.log("c'est conecter ? ", isConnected(id, 2) && isConnected(id, (nbColon + 1)) )
            return isConnected(id, 2) && isConnected(id, (nbColon + 1));
        case nbColon:
            console.log("c'est conecter ? ",isConnected(id, (id - 1)) && isConnected(id, (id + nbColon)))
            return isConnected(id, (id - 1)) && isConnected(id, (id + nbColon));
        case (nbColon * (nbRow - 1)) + 1:
            console.log("c'est conecter ? ", isConnected(id, (id - nbColon)) && isConnected(id, (id + 1)))
            return isConnected(id, (id - nbColon)) && isConnected(id, (id + 1));
        case nbRow * nbColon:
            console.log("c'est conecter ? ",isConnected(id, (id - nbColon)) && isConnected(id, (id - 1)))
            return isConnected(id, (id - nbColon)) && isConnected(id, (id - 1));
        default:
            console.log("switch finished with default in cornerTests fun ");
            break;
    }
    return false;

}

function borderTest(id, nbColon, nbRow, nbLinks) {
    console.log("je suis dans borderTest le -ID- = (",id,")")
    if (nbLinks !== 3) return false;
    if (isTobBorder(id, nbColon)) {
        console.log("top border :",
            isConnected(id, (id - 1)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id + nbColon))
        );
        return (
            isConnected(id, (id - 1)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id + nbColon))
        );
    }
    if (isRightBorder(id, nbColon)) {
        console.log("right border :",
            isConnected(id, (id - nbColon)) &&
            isConnected(id, (id + nbColon)) &&
            isConnected(id, (id - 1)));
        return (
            isConnected(id, (id - nbColon)) &&
            isConnected(id, (id + nbColon)) &&
            isConnected(id, (id - 1))
        );
    }
    if (isBottomBorder(id, nbColon, nbRow)) {
        console.log("bottom border :",
            isConnected(id, (id - 1)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id - nbColon)));
        return (
            isConnected(id, (id - 1)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id - nbColon))
        );
    }
    if (isLeftBorder(id, nbColon)) {
        console.log("left border :",
            isConnected(id, (id - nbColon)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id + nbColon)));
        return (
            isConnected(id, (id - nbColon)) &&
            isConnected(id, (id + 1)) &&
            isConnected(id, (id + nbColon))
        );
    }
}

function internalTest(id, nbColon, nbRow, nbLinks) {
    console.log("je suis dans internalTest le -ID- = (",id,")")

    if (nbLinks !== 4) return false;
    console.log("est : ",
        isConnected(id, (id - nbColon)) &&
        isConnected(id, (id + 1)) &&
        isConnected(id, (id + nbColon)) &&
        isConnected(id, (id - 1))
        );
    return (
        isConnected(id, (id - nbColon)) &&
        isConnected(id, (id + 1)) &&
        isConnected(id, (id + nbColon)) &&
        isConnected(id, (id - 1))
    );
}
