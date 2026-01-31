//25. Hacer un algoritmo en Pseint para calcular el factorial de un número de una forma distinta.
Algoritmo FactorialAlternativo
    Definir numero, factorial Como Entero

    Escribir "Ingrese un número:"
    Leer numero

    factorial = 1

    Mientras numero > 1 Hacer
        factorial = factorial * numero
        numero = numero - 1
    FinMientras

    Escribir "El factorial es: ", factorial
FinAlgoritmo
