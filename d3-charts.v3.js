/**
d3-charts.v3.js
Author: Akshay Suresh
**/

// global options
var Global = {
	font: "Segoe UI",
	color: "steelblue",
	axisColor: "gray"
}

var Line = function(options) {
	// copy scope
	var _this = this;

	// mandatory
	this.data = options.data;
	this.x = options.x;
	this.y = options.y;

	// optional
	if(!("height" in options)) {
		options.height = 200;
	}
	if(!("width" in options)) {
		options.width = 200;
	}
	if(!("element" in options)) {
		options.element = "body";
	}
	if(!("title" in options)) {
		options.title = "Line chart";
	}
	if(!("font" in options)) {
		options.font = Global.font;
	}
	if(!("xMin" in options)) {
		options.xMin = d3.min(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xMax" in options)) {
		options.xMax = d3.max(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xLabel" in options)) {
		options.xLabel = options.x;
	}
	if(!("yMin" in options)) {
		options.yMin = d3.min(this.data, function(d) { return d[_this.y]; });
	}
	if(!("yMax" in options)) {
		options.yMax = d3.max(this.data, function(d) { return d[_this.y]; });
	}
	if(!("yLabel" in options)) {
		options.yLabel = options.y;
	}
	if(!("axisColor" in options)) {
		options.axisColor = Global.axisColor;
	}
	if(!("margin" in options)) {
		options.margin = {
			top: 30,
			bottom: 30,
			left: 50,
			right: 30
		};
	}
	if(!("color" in options)) {
		options.color = Global.color;
	}
	this.height = options.height;
	this.width = options.width;
	this.element = options.element;
	this.xMin = options.xMin;
	this.xMax = options.xMax;
	this.xLabel = options.xLabel;
	this.yMin = options.yMin;
	this.yMax = options.yMax;
	this.yLabel = options.yLabel;
	this.title = options.title;
	this.margin = options.margin;
	this.font = options.font;
	this.color = options.color;
	this.axisColor = options.axisColor;
	this.draw();
}

Line.prototype.draw = function() {
	this.initialize();
	this.createScales();
	this.addAxes();
	this.addLine();
};

Line.prototype.initialize = function() {
	// shorthand for margin
	var m = this.margin;

	// set up SVG
	d3.select(this.element).html("");

	// add title
	d3.select(this.element).append("center").text(this.title).style("font-weight", "bold").style("font-family", this.font);

	// svg
	var svg = d3.select(this.element).append('svg');
	svg.style("position", "relative");
	svg.attr("width", this.width);
	svg.attr("height", this.height);

	// append <g>
	this.plot = svg.append("g")
		.attr("transform", "translate(" + m.left + "," + m.top + ")");
}


Line.prototype.createScales = function() {
	// shorthand for margin
	var m = this.margin;

	// x and y extent
	var xExtent = [this.xMin,
				   this.xMax];
	var yExtent = [this.yMin,
				   this.yMax];

	// x and y scale
	this.xScale = d3.scale.linear()
        .range([0, this.width-m.right-m.left])
        .domain(xExtent);
    this.yScale = d3.scale.linear()
        .range([this.height-(m.top+m.bottom), 0])
        .domain(yExtent);
}

Line.prototype.addAxes = function() {
	// margin
	var m = this.margin;

	// x and y axis
	var xAxis = d3.svg.axis()
        .scale(this.xScale)
        .orient("bottom")
        .ticks(2);
    var yAxis = d3.svg.axis()
        .scale(this.yScale)
        .orient("left")
        .ticks(2);

    // x-axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (this.height-(m.top+m.bottom)) + ")")
        .call(xAxis);

    // x-label
    this.plot.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", (this.width - (m.left + m.right))/2)
    .attr("y", this.height - m.bottom)
    .attr("font-size", "0.75em")
    .text(this.xLabel);

    // y-axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "y axis")
        .call(yAxis);
	
	// y-label
    this.plot.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -1 * m.left/2)
    .attr("x", -1 * (this.height - (m.top + m.bottom))/2)
    .attr("font-size", "0.75em")
    .attr("transform", "rotate(-90)")
    .text(this.yLabel);

    // styling
    this.plot.selectAll(".domain").style("fill", "none");
    this.plot.selectAll(".domain").style("stroke", this.axisColor);
    this.plot.selectAll(".domain").style("stroke-width", "1px");
}

Line.prototype.addLine = function() {
	// copy scope
	var _this = this;

	var line = d3.svg.line()
        .x(function(d) {
            return _this.xScale(d[_this.x]);
        })
        .y(function(d) {
            return _this.yScale(d[_this.y]);
    	});

   	this.plot.append('path')
        .datum(this.data)
        .classed('line',true)
        .attr('d', line)
        .attr("fill", "none")
        .style("stroke", this.color);
}

/*
*** Scatter chart ***
*/


var Scatter = function(options) {
	// copy scope
	var _this = this;

	// mandatory
	this.data = options.data;
	this.x = options.x;
	this.y = options.y;

	// optional
	if(!("height" in options)) {
		options.height = 200;
	}
	if(!("width" in options)) {
		options.width = 200;
	}
	if(!("element" in options)) {
		options.element = "body";
	}
	if(!("title" in options)) {
		options.title = "Scatter chart";
	}
	if(!("font" in options)) {
		options.font = Global.font;
	}
	if(!("xMin" in options)) {
		options.xMin = d3.min(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xMax" in options)) {
		options.xMax = d3.max(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xLabel" in options)) {
		options.xLabel = options.x;
	}
	if(!("yMin" in options)) {
		options.yMin = d3.min(this.data, function(d) { return d[_this.y]; });
	}
	if(!("yMax" in options)) {
		options.yMax = d3.max(this.data, function(d) { return d[_this.y]; });
	}
	if(!("yLabel" in options)) {
		options.yLabel = options.y;
	}
	if(!("margin" in options)) {
		options.margin = {
			top: 30,
			bottom: 30,
			left: 50,
			right: 30
		};
	}
	if(!("color" in options)) {
		options.color = Global.color;
	}
	if(!("axisColor" in options)) {
		options.axisColor = Global.axisColor;
	}
	this.height = options.height;
	this.width = options.width;
	this.element = options.element;
	this.xMin = options.xMin;
	this.xMax = options.xMax;
	this.xLabel = options.xLabel;
	this.yMin = options.yMin;
	this.yMax = options.yMax;
	this.yLabel = options.yLabel;
	this.title = options.title;
	this.margin = options.margin;
	this.font = options.font;
	this.color = options.color;
	this.axisColor = options.axisColor;
	this.draw();
};

Scatter.prototype.draw = function() {
	this.initialize();
	this.createScales();
	this.addAxes();
	this.addPoints();
};

Scatter.prototype.initialize = function() {
	// shorthand for margin
	var m = this.margin;

	// set up SVG
	d3.select(this.element).html("");

	// add title
	d3.select(this.element).append("center").text(this.title).style("font-weight", "bold").style("font-family", this.font);

	// svg
	var svg = d3.select(this.element).append('svg');
	svg.style("position", "relative");
	svg.attr("width", this.width);
	svg.attr("height", this.height);

	// append <g>
	this.plot = svg.append("g")
		.attr("transform", "translate(" + m.left + "," + m.top + ")");
};


Scatter.prototype.createScales = function() {
	// shorthand for margin
	var m = this.margin;

	// x and y extent
	var xExtent = [this.xMin,
				   this.xMax];
	var yExtent = [this.yMin,
				   this.yMax];

	// x and y scale
	this.xScale = d3.scale.linear()
        .range([0, this.width-m.right-m.left])
        .domain(xExtent);
    this.yScale = d3.scale.linear()
        .range([this.height-(m.top+m.bottom), 0])
        .domain(yExtent);
};

Scatter.prototype.addAxes = function() {
	// shorthand for margin
	var m = this.margin;

	// x and y axis
	var xAxis = d3.svg.axis()
        .scale(this.xScale)
        .orient("bottom")
        .ticks(2);
    var yAxis = d3.svg.axis()
        .scale(this.yScale)
        .orient("left")
        .ticks(2);

    // x-axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (this.height-(m.top+m.bottom)) + ")")
        .call(xAxis);

    // x-label
    this.plot.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", (this.width - (m.left + m.right))/2)
    .attr("y", this.height - m.bottom)
    .attr("font-size", "0.75em")
    .text(this.xLabel);

    // y-axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "y axis")
        .call(yAxis);

    // y-label
    this.plot.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -1 * m.left/2)
    .attr("x", -1 * (this.height - (m.top + m.bottom))/2)
    .attr("font-size", "0.75em")
    .attr("transform", "rotate(-90)")
    .text(this.yLabel);

    // styling
    this.plot.selectAll(".domain").style("fill", "none");
    this.plot.selectAll(".domain").style("stroke", this.axisColor);
    this.plot.selectAll(".domain").style("stroke-width", "1px");
};

Scatter.prototype.addPoints = function() {
	// copy scope
	var _this = this;

	this.plot.selectAll(".dot_")
      .data(this.data)
    .enter().append("circle")
      .attr("class", "dot_")
      .attr("r", 3.5)
      .attr("fill", this.color)
      .attr("cx", function(d) { return _this.xScale(d[_this.x]);})
      .attr("cy", function(d) { return _this.yScale(d[_this.y]); });
};

var Histogram = function(options) {
	// copy scope
	var _this = this;

	// mandatory
	this.data = options.data;
	this.x = options.x;

	// optional
	if(!("height" in options)) {
		options.height = 200;
	}
	if(!("width" in options)) {
		options.width = 200;
	}
	if(!("element" in options)) {
		options.element = "body";
	}
	if(!("title" in options)) {
		options.title = "Histogram";
	}
	if(!("font" in options)) {
		options.font = Global.font;
	}
	if(!("xMin" in options)) {
		options.xMin = d3.min(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xMax" in options)) {
		options.xMax = d3.max(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xLabel" in options)) {
		options.xLabel = options.x;
	}

	// group by
	this.group_by =  d3.nest()
					   .key(function(v) { return v[_this.x]; })
					   .rollup(function(v) { return v.length; })
					   .entries(this.data);

	var total = d3.sum(this.group_by, function(v) {
						return v.values;
					});
	this.group_by.forEach(function(v){
		v.relative_values = v.values/total;
	});

	if(!("yLabel" in options)) {
		options.yLabel = "Count";
	}

	if(!("margin" in options)) {
		options.margin = {
			top: 30,
			bottom: 30,
			left: 50,
			right: 30
		};
	}

	if(!("color" in options)) {
		options.color = Global.color;
	}
	if(!("axisColor" in options)) {
		options.axisColor = Global.axisColor;
	}

	this.height = options.height;
	this.width = options.width;
	this.element = options.element;
	this.xMin = options.xMin;
	this.xMax = options.xMax;
	this.xLabel = options.xLabel;
	this.yMin = 0;
	this.yMax = total;
	this.yLabel = options.yLabel;
	this.title = options.title;
	this.margin = options.margin;
	this.font = options.font;
	this.color = options.color;
	this.axisColor = options.axisColor;
	this.draw();
};

Histogram.prototype.draw = function() {
	this.initialize();
	this.createScales();
	this.addAxes();
	this.addBar();
};


Histogram.prototype.initialize = function() {
	// shorthand for margin
	var m = this.margin;

	// set up SVG
	d3.select(this.element).html("");

	// add title
	d3.select(this.element).append("center").text(this.title).style("font-weight", "bold").style("font-family", this.font);

	// svg
	var svg = d3.select(this.element).append('svg');
	svg.style("position", "relative");
	svg.attr("width", this.width);
	svg.attr("height", this.height);

	// append <g>
	this.plot = svg.append("g")
		.attr("transform", "translate(" + m.left + "," + m.top + ")");
};

Histogram.prototype.createScales = function() {
	// shorthand for margin
	var m = this.margin;

	// x and y extent
	var xExtent = [this.xMin,
				   this.xMax];

	var yExtent = [this.yMin,
				   this.yMax];

	// x and y scale
	this.xScale = d3.scale.linear()
        .range([0, this.width-m.right-m.left])
        .domain(xExtent);
    this.yScale = d3.scale.linear()
        .range([this.height-(m.top+m.bottom), 0])
        .domain(yExtent);
}

Histogram.prototype.addAxes = function() {
	// shorthand for margin
	var m = this.margin;

	// x and y axis
	var xAxis = d3.svg.axis()
        .scale(this.xScale)
        .orient("bottom")
        .ticks(2);
    var yAxis = d3.svg.axis()
        .scale(this.yScale)
        .orient("left")
        .ticks(2);

    // x-axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (this.height-(m.top+m.bottom)) + ")")
        .call(xAxis);

    // x-label
    this.plot.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", (this.width - (m.left + m.right))/2)
    .attr("y", this.height - m.bottom)
    .attr("font-size", "0.75em")
    .text(this.xLabel);

    // y-axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "y axis")
        .call(yAxis);

	// y-label
    this.plot.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -1 * m.left/2)
    .attr("x", -1 * (this.height - (m.top + m.bottom))/2)
    .attr("font-size", "0.75em")
    .attr("transform", "rotate(-90)")
    .text(this.yLabel);

    // styling
    this.plot.selectAll(".domain").style("fill", "none");
    this.plot.selectAll(".domain").style("stroke", this.axisColor);
    this.plot.selectAll(".domain").style("stroke-width", "1px");
}

Histogram.prototype.addBar = function() {
	// copy scope
	var _this = this;

	// shorthand for margin
	var m = this.margin;

  	var histogram = d3.layout.histogram()
  					  .bins(this.xScale.ticks(10))
  					  (this.data);
  	var bar = this.plot.selectAll(".bar-hist_")
  	          .data(this.group_by)
  	          .enter().append("g")
  	          .attr("class", "bar-hist_")
  	          .attr("transform", function(d) { return "translate(" + _this.xScale(parseFloat(d.key)) + "," + _this.yScale(d.values) + ")"; });

  	bar.append("rect")
    .attr("width", 10)
    .attr("fill", this.color)
    .attr("height", function(d) { return _this.height - (m.top + m.bottom) - _this.yScale(d.values); })
};

// Bar chart
var Bar = function(options) {
	// copy scope
	var _this = this;

	// mandatory
	this.data = options.data;
	this.x = options.x;
	this.y = options.y;

	// optional
	if(!("height" in options)) {
		options.height = 200;
	}
	if(!("width" in options)) {
		options.width = 200;
	}
	if(!("element" in options)) {
		options.element = "body";
	}
	if(!("title" in options)) {
		options.title = "Bar chart";
	}
	if(!("font" in options)) {
		options.font = Global.font;
	}

	if(!("xLabel" in options)) {
		options.xLabel = this.x;
	}

	if(!("yMin" in options)) {
		options.yMin = d3.min(this.data, function(d) { return d[_this.y]; });
	}
	if(!("yMax" in options)) {
		options.yMax = d3.max(this.data, function(d) { return d[_this.y]; });
	}

	if(!("yLabel" in options)) {
		options.yLabel = this.y;
	}

	if(!("margin" in options)) {
		options.margin = {
			top: 30,
			bottom: 30,
			left: 50,
			right: 30
		};
	}
	if(!("color" in options)) {
		options.color = Global.color;
	}
	if(!("axisColor" in options)) {
		options.axisColor = Global.axisColor;
	}

	this.height = options.height;
	this.width = options.width;
	this.element = options.element;
	this.yMin = options.yMin;
	this.yMax = options.yMax;
	this.yLabel = options.yLabel;
	this.xDomain =  d3.map(this.data, function(d){ return(d[_this.x]); }).keys();
	this.xLabel = options.xLabel;
	this.title = options.title;
	this.margin = options.margin;
	this.font = options.font;
	this.color = options.color;
	this.axisColor = options.axisColor;
	this.draw();
}

Bar.prototype.draw = function() {
	this.initialize();
	this.createScales();
	this.addAxes();
	this.addBar();
}

Bar.prototype.initialize = function() {
	// shorthand for margin
	var m = this.margin;

	// set up SVG
	d3.select(this.element).html("");

	// add title
	d3.select(this.element).append("center").text(this.title).style("font-weight", "bold").style("font-family", this.font);

	// svg
	var svg = d3.select(this.element).append('svg');
	svg.style("position", "relative");
	svg.attr("width", this.width);
	svg.attr("height", this.height);

	// append <g>
	this.plot = svg.append("g")
		.attr("transform", "translate(" + m.left + "," + m.top + ")");
}

Bar.prototype.createScales = function() {
	// shorthand for margin
	var m = this.margin;

	// x and y extent
	var xExtent = this.x
	var yExtent = [this.yMin,
				   this.yMax];

	// x and y scale
	this.xScale = d3.scale.ordinal()
        .rangePoints([0, this.width-m.right-m.left])
        .domain(this.xDomain);
    this.yScale = d3.scale.linear()
        .range([this.height-(m.top+m.bottom), 0])
        .domain(yExtent);
}

Bar.prototype.addAxes = function() {
	// shorthand for margin
	var m = this.margin;

	// x and y axis
	var xAxis = d3.svg.axis()
        .scale(this.xScale)
        .orient("bottom")
        .ticks(2);
    var yAxis = d3.svg.axis()
        .scale(this.yScale)
        .orient("left")
        .ticks(2);

    // x-axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (this.height-(m.top+m.bottom)) + ")")
        .call(xAxis);

    // x-label
    this.plot.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "middle")
    .attr("x", (this.width - (m.left + m.right))/2)
    .attr("y", this.height - m.bottom)
    .attr("font-size", "0.75em")
    .text(this.xLabel);

    // y-axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "y axis")
        .call(yAxis);

	// y-label
    this.plot.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -1 * m.left/2)
    .attr("x", -1 * (this.height - (m.top + m.bottom))/2)
    .attr("font-size", "0.75em")
    .attr("transform", "rotate(-90)")
    .text(this.yLabel);

    // styling
    this.plot.selectAll(".domain").style("fill", "none");
    this.plot.selectAll(".domain").style("stroke", this.axisColor);
    this.plot.selectAll(".domain").style("stroke-width", "1px");
}

Bar.prototype.addBar = function() {
	// copy scope
	var _this = this;

	// shorthand for margin
	var m = this.margin;

  	var bar = this.plot.selectAll(".bar-chart_")
  	          .data(this.data)
  	          .enter().append("g")
  	          .attr("class", "bar-chart_")

  	bar.append("rect")
  	.attr("x", function(d) { return _this.xScale(d[_this.x]); })
    .attr("width", 10)
    .attr("fill", this.color)
    .attr("y", function(d) { return _this.yScale(d[_this.y]); })
    .attr("height", function(d) { return _this.height - (m.top + m.bottom) - _this.yScale(d[_this.y]); })
}