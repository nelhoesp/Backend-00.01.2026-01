Proceso Ejercicio38
	Definir n Como Entero
	
	Escribir "Ingrese un número entero positivo:"
	Leer n
	
	Si n <= 0 Entonces
		Escribir "El número debe ser positivo"
	Sino
		suma = 0
		
		Para i = 1 Hasta n - 1 Hacer
			Si n MOD i = 0 Entonces
				suma = suma + i
			FinSi
		FinPara
		
		Si suma = n Entonces
			Escribir n, " es un número perfecto"
		Sino
			Escribir n, " NO es un número perfecto"
		FinSi
	FinSi
FinProceso
