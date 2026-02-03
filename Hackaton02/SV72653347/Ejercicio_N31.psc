Proceso Ejercicio_N31
	///31. Hacer un algoritmo en Pseint parar calcular la media de los n�meros pares e impares,
	/// s�lo se ingresar� diez n�meros.
		Definir num, sumaPares, sumaImpares, contPares, contImpares Como Entero
		Definir mediaPares, mediaImpares Como Real
		
		//sumaPares = 0
		//sumaImpares = 0
		//contPares = 0
		//contImpares = 0
		
		Para i = 1 Hasta 10 Hacer
			Escribir "Ingrese el numero ", i
			Leer num
			
			Si num MOD 2 = 0 Entonces
				sumaPares = sumaPares + num
				contPares = contPares + 1
			SiNo
				sumaImpares = sumaImpares + num
				contImpares = contImpares + 1
			FinSi
		FinPara
		
		Si contPares > 0 Entonces
			mediaPares = sumaPares / contPares
			Escribir "La media de los n�meros pares es: ", mediaPares
		SiNo
			Escribir "No se ingresaron n�meros pares"
		FinSi
		
		Si contImpares > 0 Entonces
			mediaImpares = sumaImpares / contImpares
			Escribir "La media de los n�meros impares es: ", mediaImpares
		SiNo
			Escribir "No se ingresaron n�meros impares"
		FinSi
FinProceso

	