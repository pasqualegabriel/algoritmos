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
  const all = (xs, ys) => xs.every((x, i) => x === ys[i]) && ys.every((x, i) => x === xs[i])
  expect(subsetSumSet([1,4,7,9], 3, 6).res).toBeFalsy()
  expect(subsetSumSet([3,4,9], 2, 8).res).toBeFalsy()
  expect(all(subsetSumSet([1,4,7,9], 3, 5).set, [1,4])).toBeTruthy()
  expect(all(subsetSumSet([1,4,7,9], 3, 8).set, [1,7])).toBeTruthy()
  expect(all(subsetSumSet([1,4,7,9], 3, 14).set, [1,4,9])).toBeTruthy()
  expect(all(subsetSumSet([1,4,7,9], 3, 13).set, [4,9])).toBeTruthy()
})
