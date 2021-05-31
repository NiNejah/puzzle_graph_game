let cy = cytoscape({
    container: document.getElementById('cy'),// container to render in

    // elements: [
    //     {data: {id: 'a'}},
    //     {data: {id: 'b'}},
    //     {data: {id: 'ab', source: 'a', target: 'b'}}
    // ],

    layout: {
        name: 'grid',
        rows: 4
    },

    style: cytoscape.stylesheet()
        .selector('node')
        .css({
            'height': 80,
            'width': 80,
            'background-fit': 'cover',
            'lable':'data(id)',
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
let nb_img = 0 ;
function addImag() {
    var slectedImgs = document.getElementsByClassName("selectedImg");
    let css_vars;
    const getVar = (variable) => (css_vars ? css_vars.getVar(variable) : null)
    for (let i = nb_img; i < nb_img+slectedImgs.length; i++) {
        // console.log("src e : ", slectedImgs[i].src);
        let e = i + 1;
        cy.add({
            group: 'nodes',
            data: {id: e},
            position: {x: 200, y: 200}
        });
        cy.style()
            .selector('#'+toString(e))
            .style({
                'background-image': 'url('+slectedImgs[i].src+')'
            })
            .update()
        ;
        console.log("les nodes : " ,cy.data.id);
    }
}
