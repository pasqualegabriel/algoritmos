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
