const sum = xs => xs.reduce((a, b) => a + b, 0)

// ejercicio 1
const leftMiddle = xs => {
  if(xs.length < 2) return true
  const left = xs.slice(0, Math.floor(xs.length/2))
  const right = xs.slice(Math.floor(xs.length/2), xs.length)
  return sum(left) > sum(right) && leftMiddle(left) && leftMiddle(right)
}

test('ejercicio 1', () => {
  expect(leftMiddle([8, 6, 7, 4, 5, 1, 3, 2])).toBeTruthy()
  expect(leftMiddle([8, 4, 7, 6, 5, 1, 3, 2])).toBeFalsy()
})

// ejercicio 2
const posicion = (xs, i = 0) => {
  if(xs.length === 0) return false
  if(xs.length === 1) return i+1 === xs[0]
  const intMiddle = Math.floor(xs.length/2)
  const part1 = xs.slice(0, intMiddle)
  const part2 = xs.slice(intMiddle, xs.length)
  return intMiddle + i + 1 >= part2[0] ? posicion(part2, intMiddle + i) : posicion(part1, i)
}

test('ejercice 2', () => {
  expect(posicion([-4, -1, 2, 4, 7])).toBeTruthy()
  expect(posicion([-5, -4, -1, 2, 5, 7])).toBeTruthy()
  expect(posicion([-4, -1, 2, 6, 7])).toBeFalsy()
})

// ejercicio 3
const potencia = (n, e) => {
  if(e < 0) return 1 / potencia(n, -1 * e)
  if(e === 0) return 1
  const mitad = Math.floor(e/2)
  const resM = potencia(n, mitad)
  const res = resM * resM
  return e % 2 === 0 ? res : res * n
}

test('ejercicio 3', () => {
  expect(potencia(2, -2)).toBe(0.25)
  expect(potencia(2, -1)).toBe(0.5)
  expect(potencia(2, 0)).toBe(1)
  expect(potencia(2, 1)).toBe(2)
  expect(potencia(2, 2)).toBe(4)
  expect(potencia(2, 3)).toBe(8)
  expect(potencia(2, 4)).toBe(16)
  expect(potencia(2, 5)).toBe(32)
  expect(potencia(2, 6)).toBe(64)
})

// ejercicio 5
const potenciaN = (a, n) => {
  if(n === 1) return a
  if(n === 2) return a + potencia(a, 2)
  const mitad = Math.floor(n/2)
  const part = potenciaN(a, mitad)
  return part + potencia(a, mitad) * part
}

test('ejercicio 5', () => {
  expect(potenciaN(2, 2)).toBe(6)
  expect(potenciaN(2, 4)).toBe(30)
  expect(potenciaN(2, 8)).toBe(510)
  expect(potenciaN(3, 4)).toBe(120)
})
