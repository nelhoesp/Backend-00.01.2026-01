Proceso Ejercicio15
	Escribir "Eliga opción de conversión"
	Escribir "--------------------------"
	Escribir "1. Centimetros a pulgadas"
	Escribir "2. Libras a kilogramos"
	
	Leer opcion_elegida
	
	Segun opcion_elegida Hacer
		1:
			Escribir "Ingrese los centimetros"
			Leer centimetros
			pulgadas = centimetros / 2.54
			Escribir "Valor en pulgadas: ", pulgadas
		2:
			Escribir "Ingrese las libras"
			Leer libras
			kilos = libras * 0.453592
			Escribir "Valor en kilogramos: ", kilos
		De Otro Modo:
			Escribir "Opción no válida"
	FinSegun
FinProceso
