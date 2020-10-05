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

const subsetSumTopDown = (xs, n, m, ys = {}) => {
  if(m === 0) return true
  if(n === -1) return false
  if(!ys[n-1]) ys[n-1] = {}
  if(!ys[n-1][m-xs[n]]) ys[n-1][m-xs[n]] = subsetSumTopDown(xs, n-1, m-xs[n], ys)
  else console.log('ENTRE LEFT')
  if(!ys[n-1][m]) ys[n-1][m] = subsetSumTopDown(xs, n-1, m, ys)
  else console.log('ENTRE RIGHT')
  return ys[n-1][m-xs[n]] || ys[n-1][m]
}

test('subsetSumTopDown', () => {
  expect(subsetSumTopDown([1,4,7,9], 3, 6)).toBeFalsy()
  expect(subsetSumTopDown([3,4,9], 2, 8)).toBeFalsy()
  expect(subsetSumTopDown([1,4,7,9], 3, 5)).toBeTruthy()
  expect(subsetSumTopDown([1,4,7,9], 3, 8)).toBeTruthy()
  expect(subsetSumTopDown([1,4,7,9], 3, 14)).toBeTruthy()
  expect(subsetSumTopDown([1,4,7,9], 3, 13)).toBeTruthy()
})

const subsetSumBottomUp = (xs, m) => {
  const ys = {}
  for(i=0;i<xs.length;i++) {
    for(j=0;j<=m;j++) {
      if(!ys[xs[i]]) ys[xs[i]] = {}
      if(j===0) ys[xs[i]][j] = true
      else if(i===0) ys[xs[i]][j] = xs[i] === j
      else ys[xs[i]][j] = Boolean(ys[xs[i-1]] && (ys[xs[i-1]][j] || ys[xs[i-1]][j-xs[i]]))
      if(ys[xs[i]][m]) return true
    }
  }
  return ys[xs[xs.length-1]][m]
}

test('subsetSumBottomUp', () => {
  expect(subsetSumBottomUp([1,4,7,9], 6)).toBeFalsy()
  expect(subsetSumBottomUp([3,4,9], 8)).toBeFalsy()
  expect(subsetSumBottomUp([1,4,7,9], 5)).toBeTruthy()
  expect(subsetSumBottomUp([1,4,7,9], 8)).toBeTruthy()
  expect(subsetSumBottomUp([1,4,7,9], 14)).toBeTruthy()
  expect(subsetSumBottomUp([1,4,7,9], 13)).toBeTruthy()
})

const subsetSumSet = (xs, n, m) => {
  if(m === 0) return { res: true, set: [] }
  if(n === -1) return { res: false, set: [] }
  const r1 = subsetSumSet(xs, n-1, m-xs[n])
  const r2 = subsetSumSet(xs, n-1, m)
  return {
    res: r1.res || r2.res,
    set: r1.res ? [...r1.set, xs[n]] : r2.set
  }
}

test('subsetSumSet', () => {
  const all = (xs, ys) => xs.every(x => ys.includes(x)) && xs.length === ys.length
  expect(subsetSumSet([1,4,7,9], 3, 6).res).toBeFalsy()
  expect(subsetSumSet([3,4,9], 2, 8).res).toBeFalsy()
  expect(all(subsetSumSet([1,4,7,9], 3, 5).set, [1,4])).toBeTruthy()
  expect(all(subsetSumSet([1,4,7,9], 3, 8).set, [1,7])).toBeTruthy()
  expect(all(subsetSumSet([1,4,7,9], 3, 14).set, [1,4,9])).toBeTruthy()
  expect(all(subsetSumSet([1,4,7,9], 3, 13).set, [4,9])).toBeTruthy()
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
  return opretors(ys, w, n+e) || opretors(ys, w, n*e) || opretors(ys, w, potencia(n, e))
}

const ej4 = (xs, w) => opretors(xs.slice(1), w, xs[0])

test('ejercicio 4 practica 3', () => {
  expect(evaluar([4, '+', 2, '^', 2, '*', 3])).toBe(36*3)
  expect(ej4([4, 2, 2, 3], 36*3)).toBeTruthy()
  expect(ej4([4, 2, 2, 3], 11)).toBeTruthy()
  expect(ej4([4, 2, 2, 3], 7)).toBeFalsy()
})

const ej6 = monto => [50, 20, 10, 5, 2, 1].reduce(
  (a, v) => {
    const cantV = Math.floor(a.monto / v)
    return { cant: a.cant + cantV, monto: a.monto - (cantV * v) }
  }, 
  { cant: 0, monto }
).cant

test('ejercicio 6 practica 3', () => {
  expect(ej6(50)).toBe(1)
  expect(ej6(53)).toBe(3)
  expect(ej6(39)).toBe(5)
  expect(ej6(143)).toBe(6)
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
