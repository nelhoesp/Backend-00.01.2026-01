Proceso Ejercicio17
	Escribir "Ingrese la hora:"
	Leer hora
	Escribir "Ingrese los minutos:"
	Leer min
	Escribir "Ingrese los segundos:"
	Leer seg
	
	seg = seg + 1
	Si seg = 60 Entonces
		seg = 0
		min = min + 1
	FinSi
	
	Si min = 60 Entonces
		min = 0
		hora = hora + 1
	FinSi
	
	Si hora = 24 Entonces
		hora = 0
	FinSi
	
	Escribir "La hora despues de un segundo es: ", hora, ":", min, ":", seg
FinProceso
