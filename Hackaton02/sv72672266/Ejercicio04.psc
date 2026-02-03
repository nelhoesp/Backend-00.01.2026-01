Proceso Ejercicio04
	Escribir "Inserte el primer número:"
	Leer num1
	
	Escribir "Inserte el segundo número:"
	Leer num2
	
	Escribir "Inserte el tercer número:"
	Leer num3
	
	pos1 = num1
	pos2 = num2
	pos3 = num3
	
	Si num1 > num2 Entonces
		pos2 = num1
		pos1 = num2
		Si num1 > num3 Entonces
			pos3 = num1
			pos2 = num3
			Si num2 > num3 Entonces
				pos1 = num3
				pos2 = num2
			FinSi
		FinSi
	SiNo
		Si num2 > num3 Entonces
			pos3 = num2
			pos2 = num3
			Si num1 > num3 Entonces
				pos1 = num3
				pos2 = num1
			FinSi
		FinSi
	FinSi
	
	Escribir pos1," ",pos2," ",pos3
FinProceso
