const ej3 = monto => [20, 10, 5, 1].reduce(
  (a, v) => {
    const cantV = Math.floor(a.monto / v)
    return { ...a, [v]: cantV, monto: a.monto - (cantV * v) }
  }, 
  { monto }
)

test('ejercicio 3 practica greedy', () => {
  expect(ej3(51)[20]).toBe(2)
  expect(ej3(51)[10]).toBe(1)
  expect(ej3(51)[5]).toBe(0)
  expect(ej3(51)[1]).toBe(1)
  expect(ej3(18)[20]).toBe(0)
  expect(ej3(18)[10]).toBe(1)
  expect(ej3(18)[5]).toBe(1)
  expect(ej3(18)[1]).toBe(3)
})