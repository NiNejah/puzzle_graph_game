let cy = cytoscape({
    container: document.getElementById('cy'),// container to render in

    // elements: [
    //     {data: {id: 'a'}},
    //     {data: {id: 'b'}},
    //     {data: {id: 'ab', source: 'a', target: 'b'}}
    // ],

    layout: {
        name: 'grid',
        rows: 100
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
            'border-opacity': 0.5
        })
        .selector('edge')
        .css({
            'width': 3,
            'line-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
        }),
    pan: {x: 10, y: 10},

});

// let eles = cy.add([
//     {
//         group: 'nodes',
//         data: {id: 'c'},
//         position: {x: 700, y: 200}
//     },
//     {
//         group: 'edges',
//         data: {id: 'bc', source: 'b', target: 'c'}
//     },
//     {
//         group: 'edges',
//         data: {id: 'cb', source: 'c', target: 'b'}
//     }
// ]);

// test :
// let collection = cy.collection();
// cy.nodes().on('click', function(e){
//     let clickedNode = e.target;
//     console.log("clickedNode : ",clickedNode);
//     cy.remove(clickedNode);
//     // collection = collection.union(clickedNode);
//     // console.log("collection : ",collection);
// });

function addImag() {
    var slectedImgs = document.getElementsByClassName("selectedImg");
    let last_node_nb = cy.nodes().length;
    // to renduring juste the new elemants :
    let collection = cy.collection();
    for (let i = 0; i < slectedImgs.length; i++) {
        let e = last_node_nb + 1;
        console.log("e: ", '#' + e);
        let ele = cy.add({
            group: 'nodes',
            data: {id: e},
            position: {x: 300, y: 200}
        });
        cy.style()
            .selector('#' + String(e))
            .style({
                'background-image': 'url(' + slectedImgs[i].src + ')'
            })
            .update()
        ;
        collection = collection.union(ele);
        console.log ("ele : ",ele);
        last_node_nb++;
    }
    layoutRun(collection);
}


function layoutRun(eles) {
    let layout = eles.layout({
        name: 'random',
        animate: true,
    });
    layout.run();
}
//
// function alertMesage(src){
//
// }

