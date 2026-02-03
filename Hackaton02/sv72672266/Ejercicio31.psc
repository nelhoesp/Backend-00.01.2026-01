Proceso Ejercicio31
	Definir num Como Entero
	
	suma_pares = 0
	suma_impares = 0
	cont_pares = 0
	cont_impares = 0
	
	Para i = 1 Hasta 10 Hacer
		Escribir "Ingrese el número ", i, ":"
		Leer num
		
		Si num MOD 2 = 0 Entonces
			suma_pares = suma_pares + num
			cont_pares = cont_pares + 1
		Sino
			suma_impares = suma_impares + num
			cont_impares = cont_impares + 1
		FinSi
	FinPara
	
	Si cont_pares > 0 Entonces
		media_pares = suma_pares / cont_pares
		Escribir "Media de los números pares: ", media_pares
	Sino
		Escribir "No se ingresaron números pares"
	FinSi
	
	Si cont_impares > 0 Entonces
		media_impares = suma_impares / cont_impares
		Escribir "Media de los números impares: ", media_impares
	Sino
		Escribir "No se ingresaron números impares"
	FinSi
FinProceso
