const subsetSum = (xs, n, m) => {
  if(m === 0) return true
  if(n === -1) return false
  return subsetSum(xs, n-1, m-xs[n]) || subsetSum(xs, n-1, m)
}

test('subsetSum', () => {
  expect(subsetSum([1,4,7,9], 3, 6)).toBeFalsy()
  expect(subsetSum([3,4,9], 2, 8)).toBeFalsy()
  expect(subsetSum([1,4,7,9], 3, 5)).toBeTruthy()
  expect(subsetSum([1,4,7,9], 3, 8)).toBeTruthy()
  expect(subsetSum([1,4,7,9], 3, 14)).toBeTruthy()
  expect(subsetSum([1,4,7,9], 3, 13)).toBeTruthy()
})

const subsetSum2 = (xs, m) => {
  if(m === 0) return true
  if(!xs.length) return false
  const newM = m - xs[xs.length-1]
  return subsetSum2(xs.slice(0, xs.length-1), newM) || subsetSum2(xs.slice(0, xs.length-1), m)
}

test('subsetSum2', () => {
  expect(subsetSum2([1,4,7,9], 6)).toBeFalsy()
  expect(subsetSum2([3,4,9], 8)).toBeFalsy()
  expect(subsetSum2([1,4,7,9], 5)).toBeTruthy()
  expect(subsetSum2([1,4,7,9], 8)).toBeTruthy()
  expect(subsetSum2([1,4,7,9], 14)).toBeTruthy()
  expect(subsetSum2([1,4,7,9], 13)).toBeTruthy()
})

const potencia = (n, e) => {
  if(e < 0) return 1 / potencia(n, -1 * e)
  if(e === 0) return 1
  const mitad = Math.floor(e/2)
  const resM = potencia(n, mitad)
  const res = resM * resM
  return e % 2 === 0 ? res : res * n
}

const evaluar = xs => xs.reduce((a, v, i) => v === '+' ? a + xs[i+1] : v === '*' ? a * xs[i+1] : v === '^' ? potencia(a, xs[i+1]) : a, xs[0])

const opretors = (xs, w, n) => {
  if(n === w && !xs.length) return true
  if(n === w || !xs.length) return false
  const e = xs[0]
  const ys = xs.slice(1)
  console.log(xs.length, n)
  return opretors(ys, w, n+e) || opretors(ys, w, n*e) || opretors(ys, w, potencia(n, e))
}

const ej4 = (xs, w) => opretors(xs.slice(1), w, xs[0])

test('ejercicio 4 practica 3', () => {
  expect(evaluar([4, '+', 2, '^', 2, '*', 3])).toBe(36*3)
  expect(ej4([4, 2, 2, 3], 36*3)).toBeTruthy()
  expect(ej4([4, 2, 2, 3], 11)).toBeTruthy()
  expect(ej4([4, 2, 2, 3], 7)).toBeFalsy()
})

const ej7 = (x, y, n) => {
  if(!n) return 0
  const p = n-1
  const r = ej7(x, y, n-1)
  return x[p] === y[p] 
    ? r + 1
    : r
}

test('ejercicio 7 practica 3', () => {
  // expect(ej7('abbac', 'abcbc', 5)).toBe(1)
})
