Algoritmo Ejercicio09
	// Determinar el aumento de un trabajador
	
	Definir sueldo, aumento, sueldo_final Como Real
	
	Escribir "Ingrese el sueldo actual:"
	Leer sueldo
	
	Si sueldo > 2000 Entonces
	aumento <- sueldo * 0.05
	sino aumento <- sueldo * 0.10
	FinSi
	sueldo_final <- sueldo + aumento
	
	
	//Si sueldo > 2000 Entonces
	// sueldo <- sueldo * 1.05
	//Sino
	//	sueldo <- sueldo * 1.10
	//FinSi
	
	
	
	Escribir "Aumento: $", aumento
	Escribir "Sueldo final: $", sueldo_final
	
FinAlgoritmo