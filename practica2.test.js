const { creciente, potenciaMatriz, leftMiddle, sum } = require('./practica2')

test('test', () => {
  expect(creciente([-4, -1, 2, 4, 7])).toBeTruthy();
  expect(creciente([-5, -4, -1, 2, 5, 7])).toBeTruthy();
  expect(creciente([-4, -1, 2, 6, 7])).toBeFalsy();

  expect(potenciaMatriz(2,3)).toBe(14)
  expect(potenciaMatriz(2,4)).toBe(30)
  expect(potenciaMatriz(2,5)).toBe(62)



  expect(sum([8, 4, 7, 6, 5])).toBe(30)
  expect(sum([1,2,3,4,5,6,7])).toBe(28)
  expect(sum([5])).toBe(5)
  expect(sum([5, 6])).toBe(11)
  expect(sum([5, 6, 2])).toBe(13)
  expect(sum([5, 6, 2, 5])).toBe(18)
  expect(sum([])).toBe(0)

  expect(leftMiddle([8, 6, 7, 4, 5, 1, 3, 2])).toBeTruthy()
  expect(leftMiddle([8, 4, 7, 6, 5, 1, 3, 2])).toBeFalsy()
});