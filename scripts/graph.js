let cy = cytoscape({
    container: document.getElementById('cy'),// container to render in

    elements: [
        {data: {id: 'a'}},
        {data: {id: 'b'}},
        {data: {id: 'ab', source: 'a', target: 'b'}}
    ],

    layout: {
        name: 'grid',
        rows: 4
    },

    style: cytoscape.stylesheet()
        .selector('node')
        .css({
            'type': 'barrel',
            'background-color': '#ff7d7d',
            'label': 'data(id)'
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

let eles = cy.add([
    {
        group: 'nodes',
        data: {id: 'c'},
        position: {x: 700 , y: 200}
    },
    {
        group:'edges',
        data:{id:'bc',source: 'b',target: 'c'}
    },
    {
        group:'edges',
        data:{id:'cb',source: 'c',target: 'b'}
    }
]);

// test :
// let collection = cy.collection();
cy.nodes().on('click', function(e){
    let clickedNode = e.target;
    console.log("clickedNode : ",clickedNode);
    cy.remove(clickedNode);
    // collection = collection.union(clickedNode);
    // console.log("collection : ",collection);
});
