import numpy as np

def critere_maximalite(A):
  # recuperer la derniere ligne
  derniere_ligne = A[A.shape[0] - 1]
  # retourne l'index de la valeur max de la derniere ligne
  return np.argmax(derniere_ligne)

def ratio(A, q):
  # recupere les dimensions de la matrice
  l, m = np.shape(A)
  # X = colon des ratio
  X = []
  # Calcul le ratio minimum
  for i in range(0, l-1):
    b = A[i][q]
    element = A[i][m-1]
    if b != 0 and element / b > 0:
      X.insert(i, element / b)
    else:
      X.insert(i, 100000000)
  return np.argmin(X)


def pivot(A, p, q):
  # copie de la matrice dans une autre variable
  N = A.copy()
  # recupere les dimensions de la matrice
  l, m = np.shape(N)
  # pivotement a base de calculs vectoriels
  for k in np.arange(l):
    if k == p:
    #   [i,:] == tote la line 
      N[k, :] = A[k, :]/A[k, q]
    else:
    #   (Colon_pivot/pivot) == x
    #   Lk = Lk -  x* L_pivot  
      N[k, :] = A[k, :] - A[k, q]/A[p, q]*A[p, :]

  return N