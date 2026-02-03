Proceso Ejercicio33
	Repetir
		Repetir
			opcion_valida = Falso
			
			Escribir "El programa esta ejecutandose..."
			Escribir "Continuar con el programa? ([Y]/N)"
			Leer opcion_elegida
			opcion_elegida = Mayusculas(opcion_elegida)
			
			Si opcion_elegida = "Y" o opcion_elegida = "N" o opcion_elegida = "" Entonces
				opcion_valida = Verdadero
			SiNo
				Escribir "Eliga una opcion valida"
			FinSi
		Hasta Que opcion_valida
	Hasta Que opcion_elegida = "N"
	
	Escribir "Programa finalizado"
FinProceso
