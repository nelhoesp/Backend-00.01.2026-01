Proceso Ejercicio09
	Escribir "Ingrese cuanto gana el trabajador"
	Leer genera
	
	Si genera < 2000 Entonces
		aumento = 0.1
	SiNo
		aumento = 0.05
	FinSi
	
	aumento_total = genera * aumento
	
	Escribir "El trabajador recibira un aumento de: $", aumento_total
FinProceso
