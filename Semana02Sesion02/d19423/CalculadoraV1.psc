Proceso CalculadoraV1
	
	Escribir "Escribe el primer numero"
	Leer primerNumero
	Escribir "Escribe el segundo numero"
	Leer segundoNumero
	
	Escribir "Escribe la operacion que deseas ejecutar 1 para sumar, 2 para restar, 3 para multiplicar y 4 para dividir"
	Leer operacion
	
	resultado = 0
	si operacion = 1 Entonces
		resultado = primerNumero + segundoNumero
	SiNo
		si operacion = 2 Entonces
			resultado = primerNumero - segundoNumero
		SiNo
			si operacion = 3 Entonces
				resultado = primerNumero * segundoNumero
			SiNo
				si operacion = 4 Entonces
					resultado = primerNumero / segundoNumero
				FinSi
			FinSi
		FinSi
	FinSi
	
	
	Escribir "el resultado de la suma es: ",resultado
	
FinProceso
