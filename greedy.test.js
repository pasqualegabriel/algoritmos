// Precondicion: los cursos estan ordenados por hora de fin
// const ej2 = (cursos, aulas) => {
//   const res = Array.from({ length: 5 }, (_, i) => i+1)
// }

// test('ejercicio 2 practica greedy', () => {
//   expect(ej2(51)[1]).toBe(2)
// })

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

// const mochila = (xs, t) => {
//   if(!xs.length) return { res: [], valor: 0 }
//   const ys = xs.slice(1, xs.length)
//   const r1 = mochila(ys, t)
// }
