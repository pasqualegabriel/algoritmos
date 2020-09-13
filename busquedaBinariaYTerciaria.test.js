// Busqueda Binaria y Terciara

// Dado una lista ordenada y un elemento
// Devolver si el elemento esta en lista
const busquedaBinaria = (xs, e) => {
  if(xs.length <= 1) return xs[0] && xs[0] === e // O(1)
  const middle = Math.floor(xs.length/2) // O(1)
  const left = xs.slice(0, middle) // O(1)
  const right = xs.slice(middle, xs.length) // O(1)
  return e < xs[middle] // O(1)
    ? busquedaBinaria(left, e) 
    : busquedaBinaria(right, e)
}
/*
en python
def busqueda_binaria(xs, e):
    if len(xs) <= 1:
        return len(xs) == 1 and xs[0] == e # O(1)
    middle = math.floor(len(xs)/2) # O(1)
    left = xs[slice(0, middle)] # O(1)
    right = xs[slice(middle, len(xs))] # O(1)
    if e < xs[middle]: # O(1)
        return busqueda_binaria(left, e) 
    return busqueda_binaria(right, e)

a = 1, b = 2, f(n) = O(1)
log_b(a) = 0
n^log_2(1) = 1

f(n) = n^log_b(a) entonces estamos en el caso 2

T(n) = Theta(log(n) * n^log_b(a))

***** O(log(n)) *****
*/
test('busqueda binaria', () => {
  expect(busquedaBinaria([5], 5)).toBeTruthy()
  expect(busquedaBinaria([1,2,3,4,5,6,7,8], 6)).toBeTruthy()
  expect(busquedaBinaria([3,5,8,9,10,14,20,25], 25)).toBeTruthy()
  expect(busquedaBinaria([3,5,6,8,9,10,14,20,25], 6)).toBeTruthy()
  expect(busquedaBinaria([3,5,8,9,10,14,20,25], 3)).toBeTruthy()
  expect(busquedaBinaria([3,5,8,9,10,14,20,25], 7)).toBeFalsy()
  expect(busquedaBinaria([], 7)).toBeFalsy()
  expect(busquedaBinaria([1], 7)).toBeFalsy()
})

const busquedaTernaria = (xs, e) => {
  if(xs.length <= 2) return (xs[0] && xs[0] === e) || (xs[1] && xs[1] === e) // O(1)
  const unTercio = Math.floor(xs.length/3) // O(1)
  const dosTercios = Math.floor(xs.length*2/3) // O(1)
  const fisrtPart = xs.slice(0, unTercio) // O(1)
  const secondPart = xs.slice(unTercio, dosTercios) // O(1)
  const thirdPart = xs.slice(dosTercios, xs.length) // O(1)
  return e < xs[unTercio]  // O(1)
    ? busquedaTernaria(fisrtPart, e) 
    : e < xs[dosTercios]  // O(1)
      ? busquedaTernaria(secondPart, e)
      : busquedaTernaria(thirdPart, e)
}
/*
en python
def busqueda_ternaria(xs, e):
    if(len(xs) <= 2): # O(1)
        return (len(xs) == 1 and xs[0] == e) or (len(xs) == 2 and xs[1] == e) # O(1)
    unTercio = math.floor(len(xs)/3) # O(1)
    dosTercios = math.floor(len(xs)*2/3) # O(1)
    fisrtPart = xs[slice(0, unTercio)] # O(1)
    secondPart = xs[slice(unTercio, dosTercios)] # O(1)
    thirdPart = xs[slice(dosTercios, len(xs))] # O(1)
    if e < xs[unTercio]: # O(1)
        return busqueda_ternaria(fisrtPart, e)
    if e < xs[dosTercios]: # O(1)
        return busqueda_ternaria(secondPart, e)
    return busqueda_ternaria(thirdPart, e)

a = 1, b = 3, f(n) = O(1)
log_b(a) = 0
n^log_3(1) = 1

f(n) = n^log_b(a) entonces estamos en el caso 2

T(n) = Theta(log(n) * n^log_b(a))

***** O(log(n)) *****
*/
test('busqueda ternaria', () => {
  expect(busquedaTernaria([3,7], 7)).toBeTruthy()
  expect(busquedaTernaria([1,2,3,4,5,6,7,8], 6)).toBeTruthy()
  expect(busquedaTernaria([3,5,8,9,10,14,20,25], 25)).toBeTruthy()
  expect(busquedaTernaria([3,5,6,8,9,10,14,20,25], 6)).toBeTruthy()
  expect(busquedaTernaria([3,5,8,9,10,14,20,25], 3)).toBeTruthy()
  expect(busquedaTernaria([3,5,8,9,10,14,20,25], 7)).toBeFalsy()
  expect(busquedaTernaria([3,5], 7)).toBeFalsy()
  expect(busquedaTernaria([], 7)).toBeFalsy()
})
