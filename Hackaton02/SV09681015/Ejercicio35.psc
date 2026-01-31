// 35. Hacer un algoritmo en Pseint que nos permita saber cuál es el número mayor y menor, se debe
//  ingresar sólo veinte números.
Algoritmo MayorMenorVeinte
    Definir i, numero, mayor, menor Como Entero

    Escribir "Ingrese el número 1:"
    Leer numero
    mayor = numero
    menor = numero

    Para i = 2 Hasta 20 Con Paso 1 Hacer
        Escribir "Ingrese el número ", i, ":"
        Leer numero

        Si numero > mayor Entonces
            mayor = numero
        FinSi

        Si numero < menor Entonces
            menor = numero
        FinSi
    FinPara

    Escribir "El número mayor es: ", mayor
    Escribir "El número menor es: ", menor
FinAlgoritmo
