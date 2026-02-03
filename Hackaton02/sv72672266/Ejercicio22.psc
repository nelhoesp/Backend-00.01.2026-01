Proceso Ejercicio22
	Definir n Como Entero
	
	Escribir "Ingrese un número entero positivo:"
	Leer n
	
	Si n < 0 Entonces
		Escribir "El número debe ser positivo"
	Sino
		suma = 0
		
		Para i = 1 Hasta n Hacer
			suma = suma + i
		FinPara
		
		Escribir "La suma de los ", n, " primeros números es: ", suma
	FinSi
FinProceso
