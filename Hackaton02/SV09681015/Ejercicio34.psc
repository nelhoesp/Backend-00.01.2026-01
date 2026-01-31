//34. Hacer un algoritmo en Pseint que imprima la tabla de multiplicar de los números del uno al nueve.
Algoritmo TablasMultiplicar
    Definir i, j, resultado Como Entero

    Para i = 1 Hasta 9 Con Paso 1 Hacer
        Escribir "Tabla del ", i, ":"
        Para j = 1 Hasta 10 Con Paso 1 Hacer
            resultado = i * j
            Escribir i, " x ", j, " = ", resultado
        FinPara
        Escribir ""
    FinPara
FinAlgoritmo
