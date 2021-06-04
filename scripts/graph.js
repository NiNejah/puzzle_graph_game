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
        })
        .selector('.normal')
        .css({
            "color": "#ffffff"
        }),


    // style: fetch('cy-style.json').then(function(res){
    //     return res.json();
    // }),

    pan: {x: 10, y: 10},
    wheelSensitivity: 0.3,
    zoom: 1,
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
                position: {x: 300, y: 200}
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
        cy.center();
    }
    // let mye = cy.getElementById('1');
    // console.log("the elemeent :", mye._private.style["background-image"].strValue);
}

////// Link The Nodes \\\\\\

let collectionToBeLinked = cy.collection();

function changeTheClassName(e,from,to){
    e.removeClass(from)
    e.addClass(to)
}

function resetAllClassName(){
    cy.nodes().classes('to-be-linked').forEach((e) => {
        changeTheClassName(e,'to-be-linked','normal');
    });
}

let addLink = ((evt) => {
    let evtTarget = evt.target;
    console.log("the evnt :",evtTarget)
    if (evtTarget === cy){
        console.log("je suis dans 1");
        collectionToBeLinked = cy.collection();
        resetAllClassName();
    }
    else {
        let evntTagGroup =evtTarget[0]._private.group
        if (evntTagGroup === 'nodes'){
            console.log("je suis dans 2 ");
            collectionToBeLinked = collectionToBeLinked.union(evtTarget);
            let eId = evtTarget[0]._private.data.id;
            console.log("id", eId)
            // to change the class from normal to to be linked
            changeTheClassName(cy.$id(eId),'normal','to-be-linked');
            if (collectionToBeLinked.length == 2) {
                let from = collectionToBeLinked[0]._private.data.id;
                let to = collectionToBeLinked[1]._private.data.id;
                if (!alreadyLinked(from + to)) {
                    let edg = cy.add({
                        group: 'edges',
                        data: {id: from + to, source: from, target: to}
                    });
                }
                collectionToBeLinked = cy.collection();
            }
            if (collectionToBeLinked.length == 0) {
                resetAllClassName();
            }
        }
        else {
            evtTarget.remove()
            console.log("je suis dans 3");
            collectionToBeLinked = cy.collection();
            resetAllClassName();
        }
    }

});
cy.on('tap',addLink)


//# remove :
// cy.dblclick();
//
// cy.nodes().on('dblclick',(e) => {
//     console.log("je suis dans ondblclick !");
//     cy.remove(e.target);
// })

cy.on('click', 'edges', (e) => {

})

/////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Verification Functions  ////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function alertMessage(src) {
    alert(src + "\nalready in the workshop");
}

function alreadyIn(url) {
    let isItIn = false;
    // let mye ;
    cy.nodes().forEach((e) => {
        if (e._private.style["background-image"].strValue == url) {
            // console.log("alreadyIn : e = ", e._private.style["background-image"].strValue,"et url =", url);
            isItIn = true;
        }
    });
    // cy.zoom({
    //     level: 1.2,
    //     position: mye.position()
    // });
    return isItIn;
}

function alreadyLinked(edgId) {
    let isItIn = false;
    cy.edges().forEach((e) => {
        if (e[0]._private.data.id == edgId) {
            // console.log("edg alreadyLinked");
            isItIn = true;
        }
    });
    return isItIn;
}



