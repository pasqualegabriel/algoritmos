// Ej 1: 
// Dado un digrafo representado por medio de lista de adyacencias, ¿cuánto cuesta calcular el grado de salida
// de cada vértice? ¿Y el de entrada?
// salida O(n) y entrada O(n^2)

// Ej 2:
// Dado un árbol binario completo de 7 vértices, representarlo por medio de lista de adyacencias y por matriz
// de adyacencias. Considerar a los vértices numerados por niveles.
const lista = [
  [1,2,3,4,5,6],
  [0,2,3,4,5,6],
  [0,1,3,4,5,6],
  [0,1,2,4,5,6],
  [0,1,2,3,5,6],
  [0,1,2,3,4,6],
  [0,1,2,3,4,5],
]
const matriz = [
  [false,true,true,true,true,true,true],
  [true,false,true,true,true,true,true],
  [true,true,false,true,true,true,true],
  [true,true,true,false,true,true,true],
  [true,true,true,true,false,true,true],
  [true,true,true,true,true,false,true],
  [true,true,true,true,true,true,false]
]

// Ej 3:
// El cuadrado de un grafo dirigido G = (V, E) es el grafo G^2 = (V, E^2 ) donde (u, w) ∈ E^2 sii para algún
// v ∈ V, {(u, v), (v, w)} ∈ E. Es decir, G^2 contiene un eje entre u y w siempre y cuando existe un camino de
// exactamente dos ejes entre u y w en G. Describir algoritmos efecientes para obtener G^2 a partir de G para los
// casos en que este se encuentre representado por matriz de adyacencias o bien listas de adyacencias.
const grafoDirigidoCuadrado = grafo => {
  const res = generarGrafoVacio(grafo.length)
  for(let i; i<grafo.length; i++) {
    for(const j of grafo[i]) {
      res[i].concat(grafo[j])
    }
  }
  return res
}

// Ej 4:
// La mayor parte de los algoritmos sobre grafos requieren una complejidad de al menos V^2 (es decir, ΩV (^2))
// al usar matriz de adyacencias como representación. Mostrar que una excepción a esta regla es el problema de
// determinar si un digrafo contiene una fuente universal, es decir, un vértice que tenga un camino a todos los
// demás y de ninguno se pueda llegar a él.
const ej4 = grafo => {
  for(let i; i<grafo.length; i++) {
    if(grafo[i].length === grafo.length-1 && !estaEnAlgunaListaDelGrafo(i, grafo)) {
      return false
    }
  }
  return true
}
