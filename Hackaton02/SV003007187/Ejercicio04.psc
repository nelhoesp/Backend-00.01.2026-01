 Ejercicio04
    Hacer un algoritmo en Pseint que lea tres números enteros y los muestre de menor a mayor.


	Algoritmo OrdenarNumeros
    Definir a, b, c Como Entero
    Definir temp Como Entero
    
    Escribir "Número 1:"
    Leer a
    Escribir "Número 2:"
    Leer b
    Escribir "Número 3:"
    Leer c
    
    
    Si a > b Entonces
        temp = a
        a = b
        b = temp
    FinSi
    
    Si a > c Entonces
        temp = a
        a = c
        c = temp
    FinSi
    
    
    Si b > c Entonces
        temp = b
        b = c
        c = temp
    FinSi
    
    Escribir "Ordenados: ", a, " < ", b, " < ", c
FinAlgoritmo 