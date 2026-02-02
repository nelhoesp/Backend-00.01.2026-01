Ejercicio39 

Algoritmo PiGregoryLeibni
    Definir n, i Como Entero
    Definir pi, signo, termino Como Real
    
    Escribir "Número de términos:"
    Leer n
    
    pi = 0
    signo = 1
    
    Para i = 0 Hasta n-1 Hacer
        termino = 4 / (2*i + 1)
        pi = pi + (signo * termino)
        signo = signo * -1  // Alternar signo
    Fin Para
    
    Escribir "π ≈ ", pi
    
FinAlgoritmo