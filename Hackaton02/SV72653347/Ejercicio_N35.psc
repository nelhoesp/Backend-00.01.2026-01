Proceso Ejercicio_N35
	///Hacer un algoritmo en Pseint que nos permita saber cu�l es el n�mero mayor y menor,
	///se debe ingresar s�lo veinte n�meros.
	Definir  mayor, menor, num Como Entero
	
	Para i = 1 Hasta 20 Hacer
		Escribir "Ingrese el numero ", i
		Leer num
		Si i = 1 Entonces
			mayor = num
			menor = num
		SiNo
			Si num > mayor Entonces
				mayor = num
			FinSi
			
			Si num < menor Entonces
				menor = num
			FinSi
		FinSi
	FinPara
	
	Escribir "El numero mayor es: ", mayor
	Escribir "El numero menor es: ", menor

	
FinProceso
