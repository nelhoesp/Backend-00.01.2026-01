Ejercicio40

Algoritmo PiNilakantha
    Definir n, i Como Entero
    Definir pi, signo, termino, denominador Como Real
    
    Escribir "Número de términos (excluyendo el 3 inicial):"
    Leer n
    
    pi = 3
    signo = 1
    
    Para i = 0 Hasta n-1 Hacer
        denominador = (2*i+2) * (2*i+3) * (2*i+4)
        termino = 4 / denominador
        pi = pi + (signo * termino)
        signo = signo * -1  // Alternar signo
    Fin Para
    
    Escribir "π ≈ ", pi
    
FinAlgoritmo