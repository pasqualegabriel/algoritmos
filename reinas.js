const reinas = n => {
  const table = createTable(n)
  return queens(table, n) && table
}

const createTable = n => Array.from({ length: n }, _ => Array.from({ length: n }, _ => 0))

const queens = (res, c, n=0, ii=0) => {
  if(c === n) return true
  for(let i=ii; i<c; i++) {
    for(let j=0; j<c; j++) {
      if(puedoPonerReinaEn(res, i, j, c)) {
        res[i][j] = 1
        if(queens(res, c, n+1, i+1)) {
          return true
        }
        res[i][j] = 0
      }
    }
  }
  return false
}

const sum = xs => xs.reduce((x, y) => x + y)

const puedoPonerReinaEn = (res, i, j, n) => !sum(res[i]) && !sum(res.map(xs => xs[j])) &&
  !upRight(res, i, j, n) && !upLeft(res, i, j, n) && !downRight(res, i, j, n) && !downLeft(res, i, j, n)

const upRight = (res, i, j, n) => i===-1 || j===n ? false : res[i][j] || upRight(res, i-1, j+1, n)
const upLeft = (res, i, j) => i===-1 || j===-1 ? false : res[i][j] || upLeft(res, i-1, j-1)
const downRight = (res, i, j, n) => i===n || j===n ? false : res[i][j] || downRight(res, i+1, j+1, n)
const downLeft = (res, i, j, n) => i===n || j===-1 ? false : res[i][j] || downLeft(res, i+1, j-1, n)

console.log(reinas(2))
