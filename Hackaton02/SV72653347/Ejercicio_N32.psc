Proceso Ejercicio_N32
	///32. Se quiere saber cu�l es la ciudad con la poblaci�n de m�s personas, 
	///son tres provincias y once ciudades, hacer un algoritmo en Pseint que nos permita saber eso. 

		Definir i, poblacion, mayorPoblacion Como Entero
		Definir ciudad, provincia, ciudadMayor, provinciaMayor Como Cadena
		
		mayorPoblacion = 0
		
		Para i = 1 Hasta 11 Hacer
			Escribir "Ingrese la provincia de la ciudad ", i
			Leer provincia
			
			Escribir "Ingrese el nombre de la ciudad ", i
			Leer ciudad
			
			Escribir "Ingrese la poblaci�n de ", ciudad
			Leer poblacion
			
			Si poblacion > mayorPoblacion Entonces
				mayorPoblacion = poblacion
				ciudadMayor = ciudad
				provinciaMayor = provincia
			FinSi
		FinPara
		
		Escribir "La ciudad con mayor poblaci�n es: ", ciudadMayor
		Escribir "Provincia: ", provinciaMayor
		Escribir "Poblaci�n: ", mayorPoblacion
FinProceso
