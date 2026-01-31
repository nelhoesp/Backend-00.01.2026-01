Algoritmo Ejercicio07
	// Tienda de helados con descuento por membresía
	Definir membresia Como Cadena
	Definir descuento Como Entero
	
	Repetir
		
		Escribir "Ingrese la letra de su membresía (A, B o C): "
		Leer membresia
		
		membresia <- Minusculas(membresia)
		
		Si Longitud(membresia) <> 1 Entonces
			Escribir "Debe ingresar SOLO UNA letra."
		SiNo
			Segun membresia Hacer
				"a":
					descuento <- 10
				"b":
					descuento <- 15
				"c":
					descuento <- 20
				De Otro Modo:
					Escribir "Opción inválida. Intente nuevamente."
			FinSegun
		FinSi
		
	Hasta Que membresia = "a" O membresia = "b" O membresia = "c"
	
	
	Escribir "El descuento es de ", descuento, "%."
	
FinAlgoritmo
