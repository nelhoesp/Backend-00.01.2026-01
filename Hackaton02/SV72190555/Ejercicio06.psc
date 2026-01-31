Algoritmo Ejercicio06
	// Cálculo de sueldo semanal
	Definir numeroUsuario, H, n Como Entero
	Definir precio1, precio2, pago Como Real
	
	Escribir "Escribe numero de horas trabajadas"
	Leer numeroUsuario
	H <- numeroUsuario
	
	
	precio1 <- 20
	precio2 <- 25
	n <- 40
	
	Si H > n  Entonces
		pago <- n * precio1 + (H - n) * precio2
	SiNo
		pago <- H * precio1
	Fin Si
	

	Escribir "El pago es de $", pago
	
FinAlgoritmo
