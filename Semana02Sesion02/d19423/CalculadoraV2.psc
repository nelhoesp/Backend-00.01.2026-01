Proceso CalculadoraV2
	Escribir "Escribe el primer numero"
	Leer primerNumero
	Escribir "Escribe el segundo numero"
	Leer segundoNumero
	
	Escribir "Escribe la operacion que deseas ejecutar 1 para sumar, 2 para restar, 3 para multiplicar y 4 para dividir"
	Leer operacion
	
	resultado = 0
	Segun operacion Hacer
		1:
			resultado = primerNumero + segundoNumero
		2:
			resultado = primerNumero - segundoNumero
		3:
			resultado = primerNumero * segundoNumero
		De Otro Modo:
			resultado = primerNumero / segundoNumero
	Fin Segun
	
	Escribir "el resultado de la suma es: ",resultado
	
FinProceso
