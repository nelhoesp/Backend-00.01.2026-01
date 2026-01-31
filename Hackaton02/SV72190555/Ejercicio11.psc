Algoritmo Ejercicio11
	// Leer tres números y decir cuál es el mayor
	
	Definir a, b, c, mayor Como Entero
	
	Escribir "Escribe tu numero 1"
	Leer a
	Escribir "Escribe tu numero 2"
	Leer b
	Escribir "Escribe tu numero 3"
	Leer c
	
	Si a >= b Y a >= c Entonces
		mayor <- a
	Sino
		Si b >= a Y b >= c Entonces
			mayor <- b
		Sino
			mayor <- c
		FinSi
	FinSi
	
	Escribir "El numero mayor es ", mayor
	
FinAlgoritmo
