//14. Hacer un algoritmo en Pseint que lea un entero positivo del 1 al diez y al 9 y determine si es un número primo.
Algoritmo NumeroPrimo
    Definir numero Como Entero
    Escribir "Ingrese un número del 1 al 10:"
    Leer numero
    
    Si numero = 2 O numero = 3 O numero = 5 O numero = 7 Entonces
        Escribir numero, " es un número primo"
    Sino 
		Si numero >= 1 Y numero <= 10 Entonces
			Escribir numero, " NO es un número primo"
		Sino
			Escribir "Número fuera del rango"
		FinSi
    FinSi
FinAlgoritmo
