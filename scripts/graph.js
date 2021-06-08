// Init :
let cy = cytoscape({
    container: document.getElementById('cy'),// container to render in

    elements: [
        {data: {id: 'a'}},
        {data: {id: 'b'}},
        {data: {id: 'c'}},
        {data: {id: 'ab', source: 'a', target: 'b'}}
    ],
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
function addImag() {
    var slectedImgs = document.getElementsByClassName("selectedImg");
    let last_node_nb = cy.nodes().length;
    // to renduring juste the new elemants :
    let collection = cy.collection();
    for (let i = 0; i < slectedImgs.length; i++) {
        //console.log("src : ", slectedImgs[i]);
        let e = last_node_nb + 1;
        let imgUrl = 'url(' + slectedImgs[i].src + ')';
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
    setTimeout( function(){
        cy.reset();
    }, 1000 );
    // let mye = cy.getElementById('1');
    // console.log("the elemeent :", mye._private.style["background-image"].strValue);
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
            switch (collectionToBeLinked.length ) {
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
        if ( getId(e[0]) === edgId) isLinked = true;
    });
    return isLinked;
}

function isNodes(e) { return e === 'nodes';}

function isEdges(e) {return e === 'edges';}


/////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// get Functions  /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getId(e) { return e._private.data.id;}

function getGroup(e) {return e._private.group;}

function getBackgroundUrl(e) { return e._private.style["background-image"].strValue}


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

function saveAsImg(){
    let myimg = cy.jpg();
    window.location.href =myimg;
}




