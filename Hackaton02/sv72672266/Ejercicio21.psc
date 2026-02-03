Proceso Ejercicio21
	Definir n Como Entero
	
	Escribir "Ingrese un número entero positivo:"
	Leer n
	
	Si n < 0 Entonces
		Escribir "No existe factorial para números negativos"
	Sino
		factorial = 1
		
		Si n <> 0 Entonces
			Para i = 1 Hasta n Hacer
				factorial = factorial * i
			FinPara
		FinSi
		
		Escribir "El factorial de ", n, " es: ", factorial
	FinSi
FinProceso
