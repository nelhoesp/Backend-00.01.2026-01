Proceso Ejercicio11
	Escribir "Inserte numero 1"
	Leer num1
	
	Escribir "Inserte numero 2"
	Leer num2
	
	Escribir "Inserte numero 3"
	Leer num3
	
	num_mayor = 0
	
	Si num1 > num2 Entonces
		Si num1 > num3 Entonces
			num_mayor = num1
		SiNo
			num_mayor = num3
		FinSi
	SiNo
		Si num2 > num3 Entonces
			num_mayor = num2
		SiNo
			num_mayor = num3
		FinSi
	FinSi
	
	Escribir "El numero mayor es: ", num_mayor
FinProceso
