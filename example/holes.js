var eq = require('../')
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
