Proceso Ejercicio18
	Escribir "Ingrese la cantidad de CDs a comprar:"
	Leer cantidad
	
	Si cantidad >= 1 Y cantidad <= 9 Entonces
		precio_unitario = 10
	SiNo
		Si cantidad >= 10 Y cantidad <= 99 Entonces
			precio_unitario = 8
		SiNo
			Si cantidad >= 100 Y cantidad <= 499 Entonces
				precio_unitario = 7
			SiNo
				Si cantidad >= 500 Entonces
					precio_unitario = 6
				FinSi
			FinSi
		FinSi
	FinSi
	
	Si cantidad < 1 Entonces
		Escribir "Valor invalido"
	SiNo
		total = cantidad * precio_unitario
		ganancia = total * 0.0825
		
		Escribir "Precio total para el cliente: $", total
		Escribir "Ganancia para el vendedor: $", ganancia
	FinSi
FinProceso
