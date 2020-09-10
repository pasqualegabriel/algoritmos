const potencia = (n, e) => {
  if(e < 0) return 1 / potencia(n, -1 * e)
  if(e === 0) return 1
  const mitad = Math.floor(e/2)
  const resM = potencia(n, mitad)
  const res = resM * resM
  return e % 2 === 0 ? res : res * n
}

// m = matriz o nro, e = end, i = init
const potenciaN = (m, e, i = 0) => {
  // if(e-i < 0) return -1 / potenciaN(m, -1 * e)
  if(e-i === 0) return potencia(m, e)
  if(e-i === 1) {
    const one = i === 0 ? 0 : potencia(m, i)
    return one + potencia(m, e)
  }
  const mitad = Math.floor((e-i)/2)+i
  return potenciaN(m, mitad, i) + potenciaN(m, e, mitad +1)
}

module.exports = {
  potencia,
  potenciaN
}
