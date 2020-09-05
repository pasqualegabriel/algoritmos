const creciente2 = (xs, i = 0) => {
  if(xs.length === 0) return false
  if(xs.length === 1) return i+1 === xs[0]
  const intMiddle = Math.floor(xs.length/2)
  const part1 = creciente2(xs.slice(0, intMiddle), i)
  const part2 = creciente2(xs.slice(intMiddle, xs.length), intMiddle + i)
  return part1 || part2
}
// [-4, -1, 2, 4, 7]
const creciente = (xs, i = 0) => {
  if(xs.length === 0) return false
  if(xs.length === 1) return i+1 === xs[0]
  const intMiddle = Math.floor(xs.length/2)
  const part1 = xs.slice(0, intMiddle)
  const part2 = xs.slice(intMiddle, xs.length)
  return intMiddle + i + 1 >= part2[0] ? creciente(part2, intMiddle + i) : creciente(part1, i)
}/*
A = 1
B = 2
f(n) = O(1)
----- f(n) = O(1)

O(1) <= n^1-e  FALSO


----- f(n) = Theta(1)

c1 < 1 < c2 

----- f(n) = Omega(1)

c <= n FALSO

*/

module.exports = {
  creciente
}