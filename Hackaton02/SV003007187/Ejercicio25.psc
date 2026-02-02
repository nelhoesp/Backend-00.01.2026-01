Ejercicio25

Algoritmo FactorialDescendente
    Definir n, factorial, i Como Entero
    
    Escribir "Número para factorial:"
    Leer n
    
    factorial = 1
    
    Para i = n Hasta 1 Con Paso -1 Hacer
        factorial = factorial * i
    Fin Para
    
    Escribir n, "! = ", factorial
    
FinAlgoritmo