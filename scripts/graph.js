let is_load = false;
let jsonFile = document.getElementById('jsonFile');
let cy ;

let to_load = (() => {
    fetch("save/" + jsonFile.files[0].name, {mode: 'cors'})
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);
            console.log("element", data.elements);
            cy.removeScratch();
            cy = cytoscape({
                container: document.getElementById('cy'),
                layout: data.layout,
                //TODO add the elements with cy.add
                elements: data.elements,
                style: data.style,
                pan: data.pan,
                zoom: data.zoom,
                minZoom: data.minZoom,
                maxZoom: data.maxZoom,
                render: data.render,

            });
            layoutRun(cy.nodes());
        });
});

jsonFile.onchange = (() => {
    console.log('jsonFile name :', jsonFile.files[0].name);
    is_load = true;
    to_load();
    displayCy();
    console.log("load cy ",cy.nodes())
    cy.on('tap', addLink)
});

// Init :

if (!is_load) {
    cy  = cytoscape({
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
                "text-outline-color": "#8ce8ff",
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

    // Listener :
    cy.on('tap', addLink);
    console.log("normal cy ",cy.nodes());

}

console.log("jeniral cy ",cy.nodes())
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
function addImag() {
    var slectedImgs = document.getElementsByClassName("selectedImg");

    if (slectedImgs.length > 0) {
        displayCy();     // TO Display the CY :
        is_load = false;
    }

    let last_node_nb = cy.nodes().length;

    // to renduring juste the new elemants :
    let collection = cy.collection();

    for (let i = 0; i < slectedImgs.length; i++) {
        console.log("src : ", slectedImgs[i]);
        let e = last_node_nb + 1;
        let imgUrl = 'url(' + slectedImgs[i].src + ')';
        console.log("URL:", imgUrl);

        if (alreadyIn(imgUrl)) {
            alertMessage(slectedImgs[i].src);

        } else {
            let ele = cy.add({
                group: 'nodes',
                data: {id: e},
                // position: {x: 300, y: 200}
            });

            ele.addClass("normal");
            cy.style()
                .selector('#' + String(e))
                .style({
                    'background-image': imgUrl
                })
                .update()
            ;
            collection = collection.union(ele);
            last_node_nb++;
        }
        layoutRun(collection);
    }
    setTimeout(function () {
        cy.reset();
    }, 1000);

    // let mye = cy.getElementById('1');
    // console.log("the elemeent :", mye._private.style["background-image"].strValue);
}


////// Link The Nodes \\\\\\
// console.log("the enstent CY :",cy);
let collectionToBeLinked = cy.collection();

function addLink(evt) {
    console.log("je suis dans add link");
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
                    // console.log("id", eId)
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
                    collectionToBeLinked = cy.collection();
                    resetAllClassName();
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
}





/////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Verification Functions  ////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function alertMessage(src) {
    alert(src + "\nalready in the workshop");
}

function alreadyIn(url) {
    let isItIn = false;
    cy.nodes().forEach((e) => {
        if (getBackgroundUrl(e) === url) {
            // console.log("alreadyIn : e = ", e._private.style["background-image"].strValue,"et url =", url);
            isItIn = true;
        }
    });
    return isItIn;
}

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
/////////////////////////////// Export Functions  ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function saveAsImg(isJpg) {
    let myImg = cy.jpg();
    if (!isJpg) myImg = cy.png()
    // console.log("myImg :", myImg);
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
}

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Display Functions  /////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function displayCy() {
    document.getElementById("load-graph").style.display = "none";
    document.getElementById("Workshop").style.position = "fixed";
    document.getElementById("new-graph").style.display = "block";
}



