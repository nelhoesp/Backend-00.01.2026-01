Proceso Ejercicio08
	Escribir "Calculadora de Nota (Nota mínima aprobatoria: 11)"
	Escribir "Ingrese nota 1"
	Leer nota1
	
	Escribir "Ingrese nota 2"
	Leer nota2
	
	Escribir "Ingrese nota 3"
	Leer nota3
	
	promedio = (nota1 + nota2 + nota3) / 3
	
	Escribir "Nota promedio: ", promedio
	
	Si promedio < 11 Entonces
		Escribir "El estudiante NO aprobó"
	SiNo
		Escribir "El estudiante SÍ aprobó"
	FinSi
FinProceso
