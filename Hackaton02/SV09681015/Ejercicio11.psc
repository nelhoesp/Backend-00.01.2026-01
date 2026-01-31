//1. Hacer un algoritmo en Pseint que lea tres números y diga cuál es el mayor.

Algoritmo MayorDeTres
    Definir num1, num2, num3, mayor Como Entero
    Escribir "Ingrese el primer número:"
    Leer num1
    Escribir "Ingrese el segundo número:"
    Leer num2
    Escribir "Ingrese el tercer número:"
    Leer num3
    
    mayor = num1
    Si num2 > mayor Entonces
        mayor = num2
    FinSi
    Si num3 > mayor Entonces
        mayor = num3
    FinSi
    
    Escribir "El número mayor es: ", mayor
FinAlgoritmo