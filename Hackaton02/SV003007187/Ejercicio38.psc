Ejercicio38

Algoritmo NumeroPerfecto
    Definir n, i, suma Como Entero
    
    Escribir "Ingrese un número:"
    Leer n
    
    suma = 0
    
    
    Para i = 1 Hasta n-1 Hacer
        Si n MOD i = 0 Entonces
            suma = suma + i
        Fin Si
    Fin Para
    
    
    Si suma = n Entonces
        Escribir n, " es un número perfecto"
    Sino
        Escribir n, " NO es un número perfecto"
    Fin Si
    
FinAlgoritmo

