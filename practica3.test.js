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
