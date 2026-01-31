Algoritmo Ejercicio01
	// 1. Hacer un algoritmo en Pseint que lea un n?mero por el teclado y determinar si tiene tres d?gitos.
	Definir numeroUsuario Como Real
	
	
	Escribir 'Escribe tu numero'
	Leer numeroUsuario
	Si numeroUsuario < 0 Entonces
		numeroUsuario <- - numeroUsuario 
	SiNo
		numeroUsuario <- numeroUsuario
	Fin Si
	
	
	
	Si numeroUsuario>99 Y numeroUsuario<1000 Entonces
		Escribir 'Si tiene 3 digitos'
	SiNo
		si numeroUsuario > -1000 y numeroUsuario <-99 Entonces
		Escribir 'Si tiene 3 digitos'
			SiNo
				Escribir 'NO tiene 3 digitos'
		FinSi
	FinSi
	
	
FinAlgoritmo
