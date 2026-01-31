Algoritmo Ejercicio15
	
	Definir opcion Como Entero
	Definir cm, pulg, kg, lb Como Real
	
	// Constante
	Lb <- 0.453592     // 1 lb = 0.453592 kg
	
	Repetir
		
		Escribir "====== MENU DE CONVERSIONES ======"
		Escribir "[1] Centímetros a Pulgadas"
		Escribir "[2] Pulgadas a Centímetros"
		Escribir "[3] Kilogramos a Libras"
		Escribir "[4] Libras a Kilogramos"
		Escribir "[5] Salir"
		Leer opcion
		
		Segun opcion Hacer
			
			1:
				Escribir "Ingrese los centímetros: "
				Leer cm
				pulg <- cm / 2.54
				Escribir "Equivale a ", pulg, " pulgadas."
				
			2:
				Escribir "Ingrese las pulgadas: "
				Leer pulg
				cm <- pulg * 2.54
				Escribir "Equivale a ", cm, " centímetros."
				
			3:
				Escribir "Ingrese los kilogramos: "
				Leer kg
				lb <- kg / Lb
				Escribir "Equivale a ", lb, " libras."
				
			4:
				Escribir "Ingrese las libras: "
				Leer lb
				kg <- lb * Lb
				Escribir "Equivale a ", kg, " kilogramos."
				
			5:
				Escribir "Gracias por usar el programa."
				
			De Otro Modo:
				Escribir "Opción inválida."
				
		FinSegun
		
	Hasta Que opcion = 5
	
FinAlgoritmo
