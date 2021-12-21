# polygon-eq

compare if two polygons are equal. multipolygons and holes supported.

The comparison ignores whether or not there is a duplicate first and last node.

Rings with reversed orders (clockwise or counter-clockwise) are considered equal if their points are
equal. Holes and sub-polygons can appear in any order.

The data for polygons is pretty much geojson coordinates field for polygons types but more lenient.

# example

``` js
var eq = require('polygon-eq')
var A = [[6.25,6],[10,12],[10,4],[7.5,4],[10,0],[0,0],[5,8]]
var B = [[10,0],[7.5,4],[10,4],[10,12],[6.25,6],[5,8],[0,0],[10,0]]
var C = [[6.25,6],[10,12],[7.5,4],[10,4],[10,0],[0,0],[5,8]]
console.log(eq(A,B)) // true
console.log(eq(A,C)) // false
```

holes:

``` js
var eq = require('polygon-eq')
var A = [
  [[5,8],[6.25,6],[10,12],[15,-2],[7,-2],[8,0],[0,0],[5,8]],
  [[8.889,1.778],[10,4],[7.5,4],[8.889,1.778]]
]
var B = [
  [[6.25,6],[5,8],[0,0],[8,0],[7,-2],[15,-2],[10,12]],
  [[7.5,4],[8.889,1.778],[10,4],[7.5,4]]
]
var C = [
  [[6.25,6],[5,8],[0,0],[8,0],[7,-2],[15,-2],[10,12]],
  [[7.5,4],[8.889,1.778],[10,4.1]],
]
console.log(eq(A,B)) // true
console.log(eq(A,C)) // false
```

# api

``` js
var eq = require('polygon-eq')
```

## eq(A, B, epsilon=1e-8)

Return a boolean, whether or not polygons `A` and `B` are equal.

# install

npm install polygon-eq

# license

bsd
