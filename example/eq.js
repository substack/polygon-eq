var eq = require('../')
var A = [[6.25,6],[10,12],[10,4],[7.5,4],[10,0],[0,0],[5,8]]
var B = [[10,0],[7.5,4],[10,4],[10,12],[6.25,6],[5,8],[0,0],[10,0]]
var C = [[6.25,6],[10,12],[7.5,4],[10,4],[10,0],[0,0],[5,8]]
console.log(eq(A,B)) // true
console.log(eq(A,C)) // false