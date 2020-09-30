const sumar = (x, y) => x + y
const mul = (x, y) => x * y
const potencia = (n, e) => {
  if(e < 0) return 1 / potencia(n, -1 * e)
  if(e === 0) return 1
  const mitad = Math.floor(e/2)
  const resM = potencia(n, mitad)
  const res = resM * resM
  return e % 2 === 0 ? res : res * n
}
const evaluar = xs => xs.reduce((a, v, i) => v === '+' ? a + xs[i+1] : v === '*' ? a * xs[i+1] : v === '^' ? potencia(a, xs[i+1]) : a, xs[0])

test('ejercicio 4 practica 3', () => {
  expect(evaluar([4, '+', 2, '^', 2, '*', 3])).toBe(36*3)
})
