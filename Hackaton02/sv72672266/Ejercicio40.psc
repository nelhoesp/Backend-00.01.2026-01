Proceso Ejercicio40
	Definir n Como Entero
	
	Escribir "Hallando aproximacion de PI con la serie de Nilakantha"
	Escribir "------------------------------------------------------"
	Escribir "Ingrese la cantidad de términos:"
	Leer n
	
	res = 3
	a = 2
	signo = 1
	
	Para i = 1 Hasta n Hacer
		termino = 4 / (a * (a + 1) * (a + 2))
		res = res + signo * termino
		
		signo = signo * (-1)
		a = a + 2
	FinPara
	
	Escribir "La aproximación de PI es: ", res
FinProceso
