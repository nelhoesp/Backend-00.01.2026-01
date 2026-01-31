Algoritmo Ejercicio17
	
	Definir horaTexto Como Cadena
	Definir horas, minutos, segundos Como Entero
	
	Repetir
		
		Escribir "Ingrese la hora en formato HH:MM:SS"
		Leer horaTexto
		
		Si Longitud(horaTexto) = 8 Y Subcadena(horaTexto,3,3) = ":" Y Subcadena(horaTexto,6,6) = ":" Entonces
			
			horas <- ConvertirANumero(Subcadena(horaTexto,1,2))
			minutos <- ConvertirANumero(Subcadena(horaTexto,4,5))
			segundos <- ConvertirANumero(Subcadena(horaTexto,7,8))
			
			Si horas > 23 O minutos > 59 O segundos > 59 Entonces
				Escribir "La hora ingresada no es válida. Intente nuevamente."
			FinSi
			
		SiNo
			Escribir "Formato incorrecto. Intente nuevamente."
		FinSi
		
	Hasta Que Longitud(horaTexto) = 8 Y Subcadena(horaTexto,3,3) = ":" Y Subcadena(horaTexto,6,6) = ":" Y horas <= 23 Y minutos <= 59 Y segundos <= 59
	
	
	// Sumar un segundo
	segundos <- segundos + 1
	
	Si segundos = 60 Entonces
		segundos <- 00
		minutos <- minutos + 1
	FinSi
	
	Si minutos = 60 Entonces
		minutos <- 00
		horas <- horas + 1
	FinSi
	
	Si horas = 24 Entonces
		horas <- 00
	FinSi
	
	Escribir "La hora dentro de un segundo es: ", horas, ":", minutos, ":", segundos
	
FinAlgoritmo
