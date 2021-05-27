
let cy = cytoscape({
    container: document.getElementById('cy') ,// container to render in
    elements: [
        {data: {id: 'a' }},
        {data: {id: 'b' }},
        {data:{id:'ab', source:'a',target:'b'}}
    ],

    layout: {
        name: 'grid',
        rows: 4
    },

    style: cytoscape.stylesheet()
        .selector('node')
        .css({
            'background-color':'#ff7d7d',
            'label':'data(id)'
        })
        .selector('edge')
        .css({
            'width': 3 ,
            'line-color':'#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
        })

});
