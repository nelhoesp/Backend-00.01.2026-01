//38. Hacer un algoritmo en Pseint que nos permita saber si un número es un número perfecto.
Algoritmo NumeroPerfecto
    Definir numero, i, sumaDivisores Como Entero

    Escribir "Ingrese un número:"
    Leer numero

    sumaDivisores = 0

    Para i = 1 Hasta numero - 1 Con Paso 1 Hacer
        Si numero MOD i = 0 Entonces
            sumaDivisores = sumaDivisores + i
        FinSi
    FinPara

    Si sumaDivisores = numero Entonces
        Escribir numero, " es un número perfecto"
    Sino
        Escribir numero, " NO es un número perfecto"
    FinSi
FinAlgoritmo
