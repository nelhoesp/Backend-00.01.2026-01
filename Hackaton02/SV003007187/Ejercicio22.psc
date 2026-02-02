Ejercicio22

Algoritmo SumaImparesSencillo
    Definir n, i, suma Como Entero
    
    Escribir "Ingrese N:"
    Leer n
    
    suma = 0
    
    Para i = 1 Hasta n Hacer
        Si i MOD 2 = 1 Entonces
            suma = suma + i
        Fin Si
    Fin Para
    
    Escribir "Suma impares = ", suma
    
FinAlgoritmo