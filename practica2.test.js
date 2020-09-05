const { creciente } = require('./practica2')

test('test', () => {
  expect(creciente([-4, -1, 2, 4, 7])).toBeTruthy();
  expect(creciente([-5, -4, -1, 2, 5, 7])).toBeTruthy();
  expect(creciente([-4, -1, 2, 6, 7])).toBeFalsy();
});