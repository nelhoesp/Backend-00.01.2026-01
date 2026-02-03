Proceso Ejercicio23
	Definir n Como Entero
	
	Escribir "Ingrese un número entero positivo:"
	Leer n
	
	Si n < 1 Entonces
		Escribir "El número debe ser mayor o igual a 1"
	Sino
		suma = 0
		
		Para i = 1 Hasta n Hacer
			Si i MOD 2 <> 0 Entonces
				suma = suma + i
			FinSi
		FinPara
		
		Escribir "La suma de los números impares menores o iguales a ", n, " es: ", suma
	FinSi
FinProceso
