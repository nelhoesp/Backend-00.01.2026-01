//1. Hacer un algoritmo en Pseint que lea un número por el teclado y determinar si tiene tres dígitos.

Algoritmo TresDigitos
    Definir numero Como Entero
    Escribir "Ingrese un número:"
    Leer numero

    Si numero >= 100 Y numero <= 999 O numero <= -100 Y numero >= -999 Entonces
        Escribir "El número tiene tres dígitos"
    Sino
        Escribir "El número NO tiene tres dígitos"
    FinSi
FinAlgoritmo
