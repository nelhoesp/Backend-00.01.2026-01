Proceso Ejercicio_N37
	///37. Hacer un algoritmo en Pseint para conseguir el M.C.D de un n�mero por medio del algoritmo de Euclides
	
	Definir n1,n2 Como Entero
	Definir  resultado como entero
	Escribir  "Escriba el dividendo"
	leer n1
	Escribir  "Escriba el divisor "
	leer n2
	Repetir
		resultado = n1 MOD n2
		n1 = n2
		n2 = resultado
	Hasta Que resultado = 0
	
	Escribir "El M.C.D es: ", n1
 FinProceso
