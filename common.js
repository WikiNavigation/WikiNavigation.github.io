var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var color = d3.scaleOrdinal(d3.schemeCategory20);

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(width / 2, height / 2));

d3.json("dataSet.json", function(error, graph) {
    if (error) throw error;

    var link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(graph.links)
        .enter().append("line")
        .attr("stroke-width", function(d) { return Math.sqrt(d.value); });


    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(graph.nodes)
        .enter().append("circle")
        .attr("r", 10)

    .attr("fill", function(d) { return color(d.group); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    var tip = svg.append("text")
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .attr("x", 0)
        .attr("y", 0)
        .attr("visibility", "hidden")
        .text("Tooltip")

    node.append("title")
        .text(function(d) { return d.id; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; })
            .attr("onclick", function(d) { return "details('" + d.id + "'," + d.node + ")" })
            .attr("onmouseover", function(d) { return "pull(" + d.x + "," + d.y + ",'" + d.id + "'," + d.node + ")" })
            .attr("onmouseout", "hide()");
    }


});

function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

function pull(x, y, name, group) {
    var tip = svg.select("text")
        .attr("x", x + 5)
        .attr("y", y)
        .attr("visibility", "show")
        .text(name)
        .append("tspan")
        .attr("x", x + 5)
        .attr("y", y + 25)
        .text("Node:" + group);


}

function hide() {
    var tip = svg.select("text")
        .attr("visibility", "hidden");
}

function details(name, group) {
    var form = document.getElementById("info");
    form.innerHTML = "<h2 class='info-header'>" + name + "</h2>";
    form.innerHTML += "<h3>Node:" + group + "</h3>";
}