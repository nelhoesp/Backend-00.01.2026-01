Proceso Ejercicio07
	Escribir "¿Que tipo de membresia tiene? (A,B,C)"
	Leer membresia
	
	Si membresia = "A" Entonces
		Escribir "Tienes 10% de descuento"
	SiNo
		Si membresia = "B" Entonces
			Escribir "Tienes 15% de descuento"
		SiNo
			Si membresia = "C" Entonces
				Escribir "Tienes 20% de decuento"
			SiNo
				Escribir "Tipo de membresía inválido"
			FinSi
		FinSi
	FinSi
FinProceso
