// TODO: add x-labels

var Line = function(options) {
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
		options.font = "Segoe UI";
	}
	if(!("xMin" in options)) {
		options.xMin = d3.min(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xMax" in options)) {
		options.xMax = d3.max(this.data, function(d) { return d[_this.x]; });
	}
	if(!("yMin" in options)) {
		options.yMin = d3.min(this.data, function(d) { return d[_this.y]; });
	}
	if(!("yMax" in options)) {
		options.yMax = d3.max(this.data, function(d) { return d[_this.y]; });
	}
	if(!("margin" in options)) {
		options.margin = {
			top: 20,
			bottom: 20,
			left: 20,
			right: 20
		};
	}
	this.height = options.height;
	this.width = options.width;
	this.element = options.element;
	this.xMin = options.xMin;
	this.xMax = options.xMax;
	this.yMin = options.yMin;
	this.yMax = options.yMax;
	this.title = options.title;
	this.margin = options.margin;
	this.font = options.font;
	this.draw();
}

Line.prototype.draw = function() {
	// copy scope
	var _this = this;

	_this.initialize();
	_this.createScales();
	_this.addAxes();
	_this.addLine();
};

Line.prototype.initialize = function() {
	// copy scope
	var _this = this;
	var m = _this.margin;
	// set up SVG
	d3.select(_this.element).html("");

	// add title
	d3.select(_this.element).append("center").text(_this.title).style("font-weight", "bold").style("font-family", _this.font);

	// svg
	var svg = d3.select(_this.element).append('svg');
	svg.style("position", "relative");
	svg.attr("width", _this.width);
	svg.attr("height", _this.height);

	// append <g>
	_this.plot = svg.append("g")
		.attr("transform", "translate(" + _this.margin.left + "," + _this.margin.top + ")");
}


Line.prototype.createScales = function() {
	// margin
	var _this = this;
	var m = _this.margin;

	// x and y extent
	var xExtent = [_this.xMin,
				   _this.xMax];

	var yExtent = [_this.yMin,
				   _this.yMax];

	this.xScale = d3.scale.linear()
        .range([0, _this.width-m.right-m.left])
        .domain(xExtent);

    this.yScale = d3.scale.linear()
        .range([_this.height-(m.top+m.bottom), 0])
        .domain(yExtent);
}

Line.prototype.addAxes = function() {
	var _this = this;
	// margin
	var m = _this.margin;

	// x and y axis
	var xAxis = d3.svg.axis()
        .scale(_this.xScale)
        .orient("bottom")
        .ticks(2);
    var yAxis = d3.svg.axis()
        .scale(_this.yScale)
        .orient("left")
        .ticks(2);

    // add the axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (_this.height-(m.top+m.bottom)) + ")")
        .call(xAxis);
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "y axis")
        .call(yAxis);

    // styling
    _this.plot.selectAll(".domain").style("fill", "none");
    _this.plot.selectAll(".domain").style("stroke", "gray");
    _this.plot.selectAll(".domain").style("stroke-width", "1px");
}

Line.prototype.addLine = function() {
	// store scope in temporary variable
	var _this = this;

	var line = d3.svg.line()
        .x(function(d) {
            // ... so we can access it here
            return _this.xScale(d[_this.x]);
        })
        .y(function(d) {
            return _this.yScale(d[_this.y]);
    	});

   	_this.plot.append('path')
        // use data stored in `this`
        .datum(_this.data)
        .classed('line',true)
        .attr('d', line)
        .attr("fill", "none")
        .style("stroke", "black");
}

/*
*** Scatter chart ***
*/


var Scatter = function(options) {
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
		options.font = "Segoe UI";
	}
	if(!("xMin" in options)) {
		options.xMin = d3.min(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xMax" in options)) {
		options.xMax = d3.max(this.data, function(d) { return d[_this.x]; });
	}
	if(!("yMin" in options)) {
		options.yMin = d3.min(this.data, function(d) { return d[_this.y]; });
	}
	if(!("yMax" in options)) {
		options.yMax = d3.max(this.data, function(d) { return d[_this.y]; });
	}
	if(!("margin" in options)) {
		options.margin = {
			top: 20,
			bottom: 20,
			left: 20,
			right: 20
		};
	}
	this.height = options.height;
	this.width = options.width;
	this.element = options.element;
	this.xMin = options.xMin;
	this.xMax = options.xMax;
	this.yMin = options.yMin;
	this.yMax = options.yMax;
	this.title = options.title;
	this.margin = options.margin;
	this.font = options.font;
	this.draw();
};

Scatter.prototype.draw = function() {
	// copy scope
	var _this = this;

	_this.initialize();
	_this.createScales();
	_this.addAxes();
	_this.addPoints();
};

Scatter.prototype.initialize = function() {
	// copy scope
	var _this = this;
	var m = _this.margin;
	// set up SVG
	d3.select(_this.element).html("");

	// add title
	d3.select(_this.element).append("center").text(_this.title).style("font-weight", "bold").style("font-family", _this.font);

	// svg
	var svg = d3.select(_this.element).append('svg');
	svg.style("position", "relative");
	svg.attr("width", _this.width);
	svg.attr("height", _this.height);

	// append <g>
	_this.plot = svg.append("g")
		.attr("transform", "translate(" + _this.margin.left + "," + _this.margin.top + ")");
};


Scatter.prototype.createScales = function() {
	// margin
	var _this = this;
	var m = _this.margin;

	// x and y extent
	var xExtent = [_this.xMin,
				   _this.xMax];

	var yExtent = [_this.yMin,
				   _this.yMax];

	this.xScale = d3.scale.linear()
        .range([0, _this.width-m.right-m.left])
        .domain(xExtent);

    this.yScale = d3.scale.linear()
        .range([_this.height-(m.top+m.bottom), 0])
        .domain(yExtent);
};

Scatter.prototype.addAxes = function() {
	var _this = this;
	// margin
	var m = _this.margin;

	// x and y axis
	var xAxis = d3.svg.axis()
        .scale(_this.xScale)
        .orient("bottom")
        .ticks(2);
    var yAxis = d3.svg.axis()
        .scale(_this.yScale)
        .orient("left")
        .ticks(2);

    // add the axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (_this.height-(m.top+m.bottom)) + ")")
        .call(xAxis);
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "y axis")
        .call(yAxis);

    // styling
    _this.plot.selectAll(".domain").style("fill", "none");
    _this.plot.selectAll(".domain").style("stroke", "gray");
    _this.plot.selectAll(".domain").style("stroke-width", "1px");
};

Scatter.prototype.addPoints = function() {
	// store scope in temporary variable
	var _this = this;
	_this.plot.selectAll(".dot")
      .data(this.data)
    .enter().append("circle")
      .attr("class", "dot")
      .attr("r", 3.5)
      .attr("cx", function(d) { return _this.xScale(d[_this.x]);})
      .attr("cy", function(d) { return _this.yScale(d[_this.y]); });
};

var Histogram = function(options) {
	// mandatory
	this.data = options.data;
	this.x = options.x;

	var _this = this;

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
		options.font = "Segoe UI";
	}
	if(!("xMin" in options)) {
		options.xMin = d3.min(this.data, function(d) { return d[_this.x]; });
	}
	if(!("xMax" in options)) {
		options.xMax = d3.max(this.data, function(d) { return d[_this.x]; });
	}

	// group by
	this.group_by =  d3.nest()
					   .key(function(v) { return v[_this.x]; })
					   .rollup(function(v) { return v.length; })
					   .entries(_this.data);

	var total = d3.sum(this.group_by, function(v) {
						return v.values;
					});
	this.group_by.forEach(function(v){
		v.relative_values = v.values/total;
	});

	this.yMin = 0;
	this.yMax = total;

	if(!("margin" in options)) {
		options.margin = {
			top: 20,
			bottom: 20,
			left: 20,
			right: 20
		};
	}
	this.height = options.height;
	this.width = options.width;
	this.element = options.element;
	this.xMin = options.xMin;
	this.xMax = options.xMax;
	this.title = options.title;
	this.margin = options.margin;
	this.font = options.font;
	this.draw();
};

Histogram.prototype.draw = function() {
	// copy scope
	var _this = this;

	_this.initialize();
	_this.createScales();
	_this.addAxes();
	_this.addBar();
};


Histogram.prototype.initialize = function() {
	console.log("initialize...");

	// copy scope
	var _this = this;
	var m = _this.margin;
	// set up SVG
	d3.select(_this.element).html("");

	// add title
	d3.select(_this.element).append("center").text(_this.title).style("font-weight", "bold").style("font-family", _this.font);

	// svg
	var svg = d3.select(_this.element).append('svg');
	svg.style("position", "relative");
	svg.attr("width", _this.width);
	svg.attr("height", _this.height);

	// append <g>
	_this.plot = svg.append("g")
		.attr("transform", "translate(" + _this.margin.left + "," + _this.margin.top + ")");
};

Histogram.prototype.createScales = function() {
	// copy scope
	var _this = this;

	// margin
	var m = _this.margin;

	// x and y extent
	var xExtent = [_this.xMin,
				   _this.xMax];

	var yExtent = [_this.yMin,
				   _this.yMax];

	this.xScale = d3.scale.linear()
        .range([0, _this.width-m.right-m.left])
        .domain(xExtent);

    this.yScale = d3.scale.linear()
        .range([_this.height-(m.top+m.bottom), 0])
        .domain(yExtent);
}

Histogram.prototype.addAxes = function() {
	var _this = this;
	// margin
	var m = _this.margin;

	// x and y axis
	var xAxis = d3.svg.axis()
        .scale(_this.xScale)
        .orient("bottom")
        .ticks(2);
    var yAxis = d3.svg.axis()
        .scale(_this.yScale)
        .orient("left")
        .ticks(2);

    // add the axis
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + (_this.height-(m.top+m.bottom)) + ")")
        .call(xAxis);
    this.plot.append("g")
    	.style("font-size", "0.5em")
        .attr("class", "y axis")
        .call(yAxis);

    // styling
    _this.plot.selectAll(".domain").style("fill", "none");
    _this.plot.selectAll(".domain").style("stroke", "gray");
    _this.plot.selectAll(".domain").style("stroke-width", "1px");
}

Histogram.prototype.addBar = function() {
	console.log("adding bar...");
	console.log(this.group_by);
	// copy scope
	var _this = this;
	// set the parameters for the histogram
  	var histogram = d3.layout.histogram()
  					  .bins(_this.xScale.ticks(10))
  					  (_this.data);


  	var bar = _this.plot.selectAll(".bar")
  	          .data(_this.group_by)
  	          .enter().append("g")
  	          .attr("class", "bar")
  	          .attr("transform", function(d) { return "translate(" + _this.xScale(parseFloat(d.key)) + "," + _this.yScale(d.values) + ")"; });

  	bar.append("rect")
    .attr("width", 10)
    .attr("height", function(d) { return _this.height - (_this.margin.top + _this.margin.bottom) - _this.yScale(d.values); })
}