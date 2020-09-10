const sum = xs => {
  if(xs.length === 0) return 0
  if(xs.length === 1) return xs[0]
  const left = xs.slice(0, Math.floor(xs.length/2))
  const right = xs.slice(Math.floor(xs.length/2), xs.length)
  return sum(left) + sum(right) 
}

const leftMiddle = xs => {
  if(xs.length < 2) return true
  const left = xs.slice(0, Math.floor(xs.length/2))
  const right = xs.slice(Math.floor(xs.length/2), xs.length)
  return sum(left) > sum(right) && leftMiddle(left) && leftMiddle(right)
}

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
const potencia = (n,e) => {
  if(e == 0) return 1
  if(e < 0) return 1/potencia(n, -1*e)
  
  const part1 = potencia(n, Math.floor(e/2))

  return e % 2 === 0 ? part1 * part1 : part1 * part1 * n 
}

// n > 0
const potenciaMatriz2 = (a, n, i = 0) => {

  if(n === 1) return a

  return potencia(a, n) + potenciaMatriz2(a, n-1)
}

// A 1 + A 2 + . . . + A n
const potenciaMatriz = (a, n, i = 0) => {

  if(n === 1) return a

  return potencia(a, n) + potenciaMatriz(a, n-1)
}

module.exports = {
  creciente,
  potenciaMatriz,
  leftMiddle,
  sum
}