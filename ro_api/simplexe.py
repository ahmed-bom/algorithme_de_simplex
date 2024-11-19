import numpy as np
from f_simplexe import *

def simplexe(A):

  X = A.copy()
  l, m = np.shape(A)
  tables =[X.tolist()]
  pivots=[]

  #wile positifs sur la dernière ligne
  while X[l-1, critere_maximalite(X)] > 0:
    # récupération de ligne et colonne pivot
    index_colonne_pivot = critere_maximalite(X)
    index_ligne_pivot = ratio(X, index_colonne_pivot)

    pivots.append([index_colonne_pivot.item(),index_ligne_pivot.item()])

    # transformation du tableau
    X = pivot(X, index_ligne_pivot, index_colonne_pivot)
    tables.append(X.tolist())
  
  return (tables,pivots)