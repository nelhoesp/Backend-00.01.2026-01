//23. Hacer un algoritmo en Pseint para calcular la suma de los números impares menores o iguales a n.
Algoritmo SumaImpares
    Definir n, i, suma Como Entero

    Escribir "Ingrese el valor de n:"
    Leer n

    suma = 0

    Para i = 1 Hasta n Con Paso 2 Hacer
        suma = suma + i
    FinPara

    Escribir "La suma de los números impares menores o iguales a ", n, " es: ", suma
FinAlgoritmo
