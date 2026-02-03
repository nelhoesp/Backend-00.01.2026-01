Proceso Ejercicio32
	Definir poblacion Como Entero
	Definir ciudad Como Cadena
	
	mayor_poblacion = 0
	cont_ciudades = 0
	
	Para i = 1 Hasta 3 Hacer
		Escribir "Provincia ", i
		seguir_bucle = Verdadero
		
		Si cont_ciudades < 11 Entonces
			Mientras seguir_bucle Hacer
				Escribir "Ingrese nombre de la ciudad ", cont_ciudades + 1, ":"
				Leer ciudad
				Escribir "Ingrese población de ", ciudad, ":"
				Leer poblacion
				
				cont_ciudades = cont_ciudades + 1
				
				Si poblacion > mayor_poblacion Entonces
					mayor_poblacion = poblacion
					ciudad_mayor = ciudad
					provincia_mayor = "Provincia " + ConvertirATexto(i)
				FinSi
				
				Repetir
					opcion_valida = Falso
					
					Escribir "Cambiar de provincia? (Y/[N])"
					Leer opcion_elegida
					opcion_elegida = Mayusculas(opcion_elegida)
					
					Si opcion_elegida = "Y" o opcion_elegida = "N" o opcion_elegida = "" Entonces
						opcion_valida = Verdadero
					FinSi
				Hasta Que opcion_valida
				
				Si cont_ciudades = 11 o opcion_elegida = "Y" Entonces
					seguir_bucle = Falso
				FinSi
			Fin Mientras
		FinSi
	FinPara
	
	Escribir "La ciudad con mayor población es: ", ciudad_mayor
	Escribir "Pertenece a la provincia: ", provincia_mayor
	Escribir "Y tiene una población de: ", mayor_poblacion
FinProceso
