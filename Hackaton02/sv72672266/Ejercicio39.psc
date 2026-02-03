Proceso Ejericio39
	Definir n Como Entero
	
	Escribir "Hallando aproximacion de PI con la serie de Gregory-Leibniz"
	Escribir "-----------------------------------------------------------"
	Escribir "Ingrese la cantidad de términos:"
	Leer n
	
	res = 0
	denominador = 1
	signo = 1
	
	Para i = 1 Hasta n Hacer
		res = res + signo * (4 / denominador)
		denominador = denominador + 2
		signo = signo * (-1)
	FinPara
	
	Escribir "La aproximación de PI es: ", res
FinProceso
