//21. Hacer un algoritmo en Pseint que permita calcular el factorial de un número.
Algoritmo Factorial
    Definir numero, i, factorial Como Entero

    Escribir "Ingrese un número:"
    Leer numero

    factorial = 1
    Para i = 1 Hasta numero Con Paso 1 Hacer
        factorial = factorial * i
    FinPara

    Escribir "El factorial de ", numero, " es: ", factorial
    
FinAlgoritmo
