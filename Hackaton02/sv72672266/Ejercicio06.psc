Proceso Ejercicio06
	Escribir "Inserte horas trabajadas en la semana:"
	Leer horas_trabajadas
	
	horas_extras = 0
	
	Si horas_trabajadas <= 40 Entonces
		salario = horas_trabajadas*20
	SiNo
		horas_extras = horas_trabajadas - 40
		salario = horas_extras*25 + 40*20
	FinSi
	
	Escribir "Salario: $", salario
FinProceso
