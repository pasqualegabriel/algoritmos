const { min } = require('lodash')

// function s6_rec(v, M)
//   t = typemax(Int64)

//   if v < 1
//       return 0
//   else
//       for m in M
//           if m <= v
//               c = s6_rec(v-m, M)
//               t = min(t, c+1)        
//           end
//       end
//       return t
//   end
// end

const s6_rec = (v, M) => {
  let t = 999999
  if(v < 1) return 0
  M.forEach(m => {
    if(m <= v) {
      const c = s6_rec(v-m, M)
      t = min([t, c+1]) 
    }
  })
  return t
}

test('solucion del parcial', () => {
  expect(s6_rec(11, [9, 6, 5, 1])).toBe(2)
  expect(s6_rec(13, [9, 6, 5, 1])).toBe(3)
})

const monedas = (coins, monto) => {
  if(monto <= 0) return monto
  return 1 + min(coins.map(c => monedas(coins, monto - c)).filter(v => v >= 0))
}

test('monedas', () => {
  expect(monedas([9, 6, 5, 1], 11)).toBe(2)
  expect(monedas([9, 6, 5, 1], 13)).toBe(3)
})
