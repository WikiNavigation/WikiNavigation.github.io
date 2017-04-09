var color = d3.scaleQuantize()
    .range(["#865882", "#7D6B90", "#747D9E", "#6B90AC", "#61A2B9", "#58B5C7", "#4FC7D5", "#46DAE3", "#3CECF1", "#33FFFF"]);

var size = document.getElementById("svgContainer").offsetWidth * 0.6;

var pack = d3.pack()
    .size([size, size])
    .padding(10);

var svg = d3.select("#svgContainer").append("svg")
    .attr("width", size)
    .attr("height", size);

d3.csv("dataSet.csv", type, function(error, data) {
    var planets = data;
    //exoplanets = data.filter(function(d) { return d.distance !== 0; });

    color.domain(d3.extent(data, function(d) { return d.radius; }));

    var root = d3.hierarchy({ children: planets })
        .sum(function(d) { return d.radius * d.radius; })
        .sort(function(a, b) {
            return !a.children - !b.children ||
                isNaN(a.data.distance) - isNaN(b.data.distance) ||
                a.data.distance - b.data.distance;
        });
    // var root = d3.hierarchy({ children: [{ children: planets }].concat(exoplanets) })
    // .sum(function(d) { return d.radius * d.radius; })
    // .sort(function(a, b) {
    //     return !a.children - !b.children ||
    //         isNaN(a.data.distance) - isNaN(b.data.distance) ||
    //         a.data.distance - b.data.distance;
    // });

    pack(root);

    var total = 0;

    var circles = svg.selectAll("circle")
        .data(root.descendants().slice(1))
        .enter().append("g")
        .attr("id", function(d) { return d.data.name })
        .attr("onmouseover", function(d) { return "pop('" + d.data.name + "'," + d.data.radius + "," + d.data.distance + ")"; })
        .append("circle")
        .attr("class", "ele")
        .attr("r", function(d) { return d.r; })
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; })
        .classed("group", function(d) { return d.children; })
        .filter(function(d) { return d.data; })
        .style("fill", function(d) { return color(d.data.radius); });
    var text = svg.selectAll("text")
        .data(root.descendants().slice(1))
        .enter().append("text")
        .attr("x", function(d) { return d.x; })
        .attr("y", function(d) { return d.y; })
        .attr("fill", "White")
        .attr("class", "Display")
        .attr("word-wrap", " break-word")
        .attr("font-size", function(d) { return d.r / 5 })
        .attr("text-anchor", "middle")
        .text(function(d) {
            return d.data.name;
        });
});

function type(d) {
    d.radius = +d.radius;
    d.distance = d.distance ? +d.distance : NaN;
    return d;
}

function add(d) {
    total += d.radius;
}

function pop(d, r, x) {
    document.getElementById("infoField").innerHTML = "<h2>" + d + "</h2>";
    document.getElementById("infoField").innerHTML += "<p>Total :" + x + "</p>";
    document.getElementById("infoField").innerHTML += "<p>Percent : " + (48 / 100) * r + "%</p>";
    document.getElementById("infoField").innerHTML += "<h3>Rating</h3>";

    // var dats = ['Oceans', 'river', 'pond', 'Mike', 'Rogain'];
    // // for (x = 0; x < 5; x++) {
    // //     dats[x] = Math.floor((Math.random() * 60) + 20);
    // // }
    // d3.select("#infoField")
    //     .selectAll("div")
    //     .data(dats)
    //     .enter().append("div")
    //     .style("margin-left", "5px")
    //     .style("border-bottom", "1px solid white")
    //     .style("center", "right")
    //     .style("color", "white")
    //     .style("background", "steelblue")
    //     .style("width", "95%")
    //     .text(function(d) { return d; });






}