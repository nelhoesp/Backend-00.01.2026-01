Proceso Ejercicio35
	Definir num, nmayor, nmenor Como Entero
	
	Para i = 1 Hasta 20 Hacer
		Escribir "Ingrese el número ", i, ":"
		Leer num
		
		Si i = 1 Entonces
			nmayor = num
			nmenor = num
		Sino
			Si num > nmayor Entonces
				nmayor = num
			FinSi
			
			Si num < nmenor Entonces
				nmenor = num
			FinSi
		FinSi
	FinPara
	
	Escribir "El número mayor es: ", nmayor
	Escribir "El número menor es: ", nmenor
FinProceso
