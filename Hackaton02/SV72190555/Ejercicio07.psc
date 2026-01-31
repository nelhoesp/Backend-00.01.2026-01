Algoritmo Ejercicio07
	// Tienda de helados con descuento por membresía
	Definir membresia Como Cadena
	Definir descuento Como Entero
	Escribir 'Escriba si la membresia es A, B o C'
	Leer membresia
	
	
	Según membresia Hacer
		"A", "a":
			descuento <- 10
		"B","b":
			descuento <- 15
		"C","c":
			descuento <- 20
		De Otro Modo:
			descuento <- 0
	FinSegún
	Escribir 'El descuento es de ', descuento, '%.'
FinAlgoritmo
