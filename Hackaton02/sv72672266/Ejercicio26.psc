Proceso Ejercicio26
	Definir dividendo, divisor Como Entero
	
	Escribir "Ingrese el dividendo:"
	Leer dividendo
	Escribir "Ingrese el divisor:"
	Leer divisor
	
	Si divisor <= 0 Entonces
		Escribir "El divisor debe ser mayor que cero"
	SiNo
		cociente = 0
		resto = dividendo
		
		Mientras resto >= divisor Hacer
			resto = resto - divisor
			cociente = cociente + 1
		FinMientras
		
		Escribir "Cociente obtenido: ", cociente
		Escribir "Resto obtenido: ", resto
	FinSi
FinProceso
