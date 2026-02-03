Proceso Ejercicio_N33
	/// Hacer un algoritmo en Pseint que permita al usuario continuar con el programa.
	Definir tipo Como Caracter
	

	Repetir
		Escribir "El programa est� en ejecuci�n..."
		Escribir "�Desea continuar? (S/N)"
		Leer tipo
		tipo<-Mayusculas(tipo)
	Hasta Que tipo = "N"
	
	Escribir "Programa finalizado."
FinProceso
