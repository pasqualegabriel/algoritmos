const { potencia, potenciaN } = require('./ejercicio5')

test('test 1', () => {
  expect(potencia(2, -2)).toBe(0.25)
  expect(potencia(2, -1)).toBe(0.5)
  expect(potencia(2, 0)).toBe(1)
  expect(potencia(2, 1)).toBe(2)
  expect(potencia(2, 2)).toBe(4)
  expect(potencia(2, 3)).toBe(8)
  expect(potencia(2, 4)).toBe(16)
  expect(potencia(2, 5)).toBe(32)
  expect(potencia(2, 6)).toBe(64)

  expect(potenciaN(2, 3)).toBe(14)
  expect(potenciaN(2, 4)).toBe(30)
  expect(potenciaN(2, 5)).toBe(62)
  expect(potenciaN(2, 6)).toBe(126)
})
