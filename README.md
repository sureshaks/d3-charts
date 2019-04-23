# d3-charts
A library for making simple d3 charts and graphs.

## Graph and chart support

The following graphs and charts are supported by d3-charts (_as of yet_):

- Line Graph

- Bar Graph

- Scatter Plot

- Histogram


## Example

```
var data = [{"x": 1, "y": 2},{"x": 2, "y": 6},{"x": 3, "y": 8}];

var options = {
	element: ".line", // where to add the chart
	data: data, // data

	x: "x", // name of x column
	xMin: 0, // minimum value of x
	xMax: 10, // maximum value of x

	y: "y", // name of y column
	yMin: 0, // minimum value of y
	yMax: 10, // maximum value of y
}


var line = new Line(options);
```
