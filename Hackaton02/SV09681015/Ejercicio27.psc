//27. Hacer un algoritmo en Pseint para determinar la media de una lista indefinida de números 
//positivos, se debe acabar el programa al ingresar un número negativo.
Algoritmo MediaListaIndefinida
    Definir numero, contador Como Entero
    Definir suma, media Como Real

    suma = 0
    contador = 0

    Escribir "Ingrese números (número negativo para terminar):"
    Leer numero

    Mientras numero >= 0 Hacer
        suma = suma + numero
        contador = contador + 1
        Escribir "Ingrese otro número:"
        Leer numero
    FinMientras

    Si contador > 0 Entonces
        media = suma / contador
        Escribir "La media es: ", media
    Sino
        Escribir "No se ingresaron números positivos"
    FinSi
FinAlgoritmo
