const ej6BottomUp = (coins, monto) => {
  const res = { 0:{}, 1:{}, 2:{}, 3:{} }
  for(i=0; i<coins.length; i++) {
    for(j=0; j<=monto; j++) {
      if(!i) res[i][j] = j < coins[i] ? 0 : Math.floor(j / coins[i])
      else if(coins[i] > j) res[i][j] = res[i-1][j]
      else res[i][j] = Math.min(res[i-1][j], 1 + res[i][j-coins[i]])
    }
  }
  return res[coins.length-1][monto]
}

ej6BottomUp([1,5,6,9], 11)