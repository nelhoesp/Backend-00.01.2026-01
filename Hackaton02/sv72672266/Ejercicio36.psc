Proceso Ejercicio36
	Definir n Como Entero
	
	Escribir "Ingrese la cantidad de términos de la serie de Fibonacci:"
	Leer n
	
	a = 0
	b = 1
	
	Si n >= 1 Entonces
		Escribir a
	FinSi
	
	Si n >= 2 Entonces
		Escribir b
	FinSi
	
	Para i = 3 Hasta n Hacer
		c = a + b
		Escribir c
		a = b
		b = c
	FinPara
FinProceso
