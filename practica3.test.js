// ejercicio 2
const coef1 = (n, m) => {
  if(n === m) return 1
  if(1 === m) return n
  return coef1(n-1, m-1) + coef1(n-1 ,m)
}

const coef2 = (n, m, xs = {}) => {
  if(n === m) return 1
  if(1 === m) return n
  if(xs[n] && xs[n][m]) {
    console.log('NO CALCULO')
    return xs[n][m]
  }
  if(!xs[n]) xs[n] = {}
  console.log('si calculo')
  xs[n][m] = coef2(n-1, m-1, xs) + coef2(n-1 ,m, xs)
  return xs[n][m]
}

const coef = (n, m, xs = {}) => {
  for(i=1; i<=n; i++) {
    for(j=1; j<=m; j++) {
      if(i===j) xs[i] = {...xs[i], [j]:1}
      if(1===j) xs[i] = {...xs[i], [j]:i}
      else if(i>j) xs[i] = {...xs[i], [j]: xs[i-1][j-1] + xs[i-1][j]}
    }
  }
  return xs[n][m]
}

test('ejercicio 2', () => {
  expect(coef(4,2)).toBe(6)
  expect(coef(6,2)).toBe(15)
})

// ejercicio 3
const ej3 = m => m[0] ? menor(m, m.length, m[0].length) : 0

const sinColumna = m => m.map(e => e.slice(1))

const sinFila = m => m.slice(1)

const menor1 = (m, i, j) => {
  if(i === 1) return m[0].reduce((a, v) => a + v, 0)
  if(j === 1) return m.reduce((a, v) => a + v[0], 0)
  const left  = menor1(sinColumna(m), i, j-1)
  const right = menor1(sinFila(m), i-1, j)
  return left < right ? m[0][0] + left : m[0][0] +  right
}

const menor = (m, i, j, c = {}) => {
  if(i === 1) return m[0].reduce((a, v) => a + v, 0) // O(n)
  if(j === 1) return m.reduce((a, v) => a + v[0], 0) // O(n)
  let left
  if(c[i] && c[i][j-1]) {
    left = c[i][j-1]
    console.log('NO CALCULO left')
  } else {
    c[i] = { ...c[i], [j-1]: menor(sinColumna(m), i, j-1, c) } // recursion
    left = c[i][j-1]
  }
  let right
  if(c[i-1] && c[i-1][j]) {
    right = c[i-1][j]
    console.log('NO CALCULO right')
  } else {
    c[i-1] = { ...c[i-1], [j]: menor(sinFila(m), i-1, j, c) } // recursion
    right = c[i-1][j]
  }
  c[i][j] = left < right ? m[0][0] + left : m[0][0] +  right
  return c[i][j]
}/*
a=1 b=2 f(n)=O(n)
log_b(a) = log_2(1) = 0

b > log_b(a)
f(n) = n^log_b(a) entonces estamos en el caso 3

O(log(n))
*/
const menorBottomUp = (m, c = {}) => {
  for(i=0; i<m.length; i++) {
    for(j=0; j<m[0].length; j++) {
      if(i === 0 && j === 0) c[0] = {0:m[0][0]}
      else if(i === 0) c[0] = {...c[0], [j]:c[0][j-1]+m[i][j]}
      else if(j === 0) c[i] = {...c[i], [j]:c[i-1][0]+m[i][j]}
      else c[i] = {...c[i], [j]: c[i-1][j] < c[i][j-1] ? c[i-1][j] + m[i][j] : c[i][j-1] + m[i][j] }
    }
  }
  return c[m.length-1][m[0].length-1]
}

test('ejercicio 3', () => {
  expect(menorBottomUp([
    [2,1,7]
  ])).toBe(10)
  expect(menorBottomUp([
    [2],[1],[7]
  ])).toBe(10)

  expect(menorBottomUp([
    [2]
  ])).toBe(2)

  expect(menorBottomUp([
    [2,1],
    [2,2]
  ])).toBe(5)

  expect(menorBottomUp([
    [2,1,7],
    [2,5,4],
    [1,5,4]
  ])).toBe(14)

  expect(menorBottomUp([
    [2,8,3,4],
    [5,3,4,5],
    [1,2,2,1],
    [3,4,6,5]
  ])).toBe(18)

  expect(menorBottomUp([
    [2,1,9,4],
    [8,8,9,5],
    [1,2,9,1],
    [1,1,1,5]
  ])).toBe(19)

  expect(menorBottomUp([
    [2,4],
    [3,2],
    [3,9],
    [1,9]
  ])).toBe(18)

  expect(menorBottomUp([
    [2,9,1,3],
    [3,2,2,1]
  ])).toBe(10)
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

// solo bool
// const opretors = (xs, w, n) => {
//   if(n === w && !xs.length) return true
//   if(n === w || !xs.length) return false
//   const e = xs[0]
//   const ys = xs.slice(1)
//   return opretors(ys, w, n+e) || opretors(ys, w, n*e) || opretors(ys, w, potencia(n, e))
// }

const opretors = (xs, w, n) => {
  if(n === w && !xs.length) return { c: true, res: [] }
  if(n === w || !xs.length) return { c: false, res: [] }
  const e = xs[0]
  const ys = xs.slice(1)
  const o1 = opretors(ys, w, n+e)
  const o2 = opretors(ys, w, n*e)
  const o3 = opretors(ys, w, potencia(n, e))
  return o1.c 
    ? { c: o1.c, res: ['+', ...o1.res] } 
    : o2.c 
      ? { c: o2.c, res: ['*', ...o2.res] } 
      : { c: o3.c, res: ['^', ...o3.res] }
}

// Precondicion: la lista tiene al menos un elemento
const ej4 = (xs, w) => opretors(xs.slice(1), w, xs[0])

// ej4 bottom up
// voy calculando cada nro agregando el resultado de ir +, * y ^ con su respectiva lista de operaciones
// w = 34
// 4| [4]  
// 2| [6,8,16]
// 2| [8,12,36,10,16,...,32,...]
// 2| [10,16,...,34,...]

const ej4BottomUp = (xs, w) => {
  let set = [{ value: xs[0], res: [] }]
  for(let i of xs.slice(1, xs.length)) {
    const newSet = []
    for(let j of set) {
      newSet.push({ value: j.value+i, res: [...j.res, '+'] })
      newSet.push({ value: j.value*i, res: [...j.res, '*'] })
      newSet.push({ value: potencia(j.value,i), res: [...j.res, '^'] })
    }
    set = newSet
  }
  return set.find(e => e.value === w) || { res: [] }
}

test('ejercicio 4 practica 3', () => {
  const all = (xs, ys) => xs.every((x, i) => x === ys[i]) && ys.every((x, i) => x === xs[i])
  expect(evaluar([4, '+', 2, '^', 2, '*', 3])).toBe(36*3)
  expect(ej4([4, 2, 2, 3], 36*3).c).toBeTruthy()
  expect(all(ej4([4, 2, 2, 3], 36*3).res, ['+', '^', '*'])).toBeTruthy()
  expect(ej4([4, 2, 2, 3], 11).c).toBeTruthy()
  expect(all(ej4([4, 2, 2, 3], 11).res, ['+', '+', '+'])).toBeTruthy()
  expect(ej4([4, 2, 2, 3], 7).c).toBeFalsy()
  expect(all(ej4([4, 2, 3], 11).res, ['*', '+'])).toBeTruthy()
  expect(ej4([4, 3, -2], 10).c).toBeTruthy()
  expect(all(ej4([4, 3, -2], 10).res, ['*', '+'])).toBeTruthy()

  expect(ej4BottomUp([4, 2, 2, 3], 36*3).value).toBeTruthy()
  expect(all(ej4BottomUp([4, 2, 2, 3], 36*3).res, ['+', '^', '*'])).toBeTruthy()
  expect(ej4BottomUp([4, 2, 2, 3], 11).value).toBeTruthy()
  expect(all(ej4BottomUp([4, 2, 2, 3], 11).res, ['+', '+', '+'])).toBeTruthy()
  expect(ej4BottomUp([4, 2, 2, 3], 7).value).toBeFalsy()
  expect(all(ej4BottomUp([4, 2, 3], 11).res, ['*', '+'])).toBeTruthy()
  expect(ej4BottomUp([4, 3, -2], 10).value).toBeTruthy()
  expect(all(ej4BottomUp([4, 3, -2], 10).res, ['*', '+'])).toBeTruthy()
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

// const ej7 = (x, y, n) => {
//   if(x === y && !n) return { status: true, cant: 0 }
//   if(!n) return { status: false, cant: 0 }
//   const p = n-1
//   const r1 = ej7(x, y, n-1) // no cambia, +1
//   const r2 = ej7(x, y, n-1) // cambiar, -1
//   const r3 = ej7(x, y, n-1) // borrar, -2
//   const r4 = ej7(x, y, n-1) // agregar, -3
//   return Math.max([r1, r2, r3, r4]) 
// }

// test('ejercicio 7 practica 3', () => {
//   expect(ej7('abbac', 'abcbc', 5)).toBe(1)
// })
