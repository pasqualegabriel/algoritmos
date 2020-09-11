const potencia = (n, e) => {
  if(e < 0) return 1 / potencia(n, -1 * e)
  if(e === 0) return 1
  const mitad = Math.floor(e/2)
  const resM = potencia(n, mitad)
  const res = resM * resM
  return e % 2 === 0 ? res : res * n
}

const potenciaN = (a, n) => {
  if(n === 1) return a
  if(n === 2) return a + potencia(a, 2)
  const mitad = Math.floor(n/2)
  const part = potenciaN(a, mitad)
  return part + potencia(a, mitad) * part
}

module.exports = {
  potencia,
  potenciaN
}
