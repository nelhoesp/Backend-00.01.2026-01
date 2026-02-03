Proceso Ejercicio05
	Escribir "Inserte la cantidad de zapatos comprados:"
	Leer zapatos
	
	precio_unit = 80
	descuento = 0
	
	Si (zapatos > 10) Y (zapatos <= 20) Entonces
		descuento = 0.1
	SiNo
		Si (zapatos > 20) Y (zapatos <= 30) Entonces
			descuento = 0.2
		SiNo
			Si zapatos > 30 Entonces
				descuento = 0.4
			FinSi
		FinSi
	FinSi
	
	precio_total = zapatos*precio_unit*(1-descuento)
	
	Escribir "El precio total es: $", precio_total
FinProceso
