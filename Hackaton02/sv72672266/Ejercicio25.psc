Proceso Ejercicio25
	Definir n Como Entero
	
	Escribir "Ingrese un número entero positivo:"
	Leer n
	
	Si n < 0 Entonces
		Escribir "No existe factorial para números negativos"
	Sino
		factorial = 1
		
		Mientras n > 0 Hacer
			factorial = factorial * n
			n = n - 1
		FinMientras
		
		Escribir "El factorial es: ", factorial
	FinSi
FinProceso
