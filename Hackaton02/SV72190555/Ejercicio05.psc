Algoritmo Ejercicio05
	// 5. Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoción 
	// de descuento para vender al mayor, esta dependerá del número de zapatos que se compren. 
	// Si son más de diez, se les dará un 10% de descuento sobre el total de la compra; 
	// si el número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de descuento; 
	// y si son más treinta zapatos se otorgará un 40% de descuento. El precio de cada zapato es de $80.
	
	Definir numeroUsuario, n Como Entero
	Definir precio, pago, f Como Real
	
	Escribir "Escribe numero de pares"
	Leer numeroUsuario
	n <- numeroUsuario
	
	f <- 1   // factor de pago
	precio <- 80
	
	Si n > 30 Entonces
		f <- 0.6
	Sino
		Si n > 20 Entonces
			f <- 0.8
		Sino
			Si n > 10 Entonces
				f <- 0.9
			Sino
				f <- 1
			FinSi
		FinSi
	FinSi
	
	pago <- precio * n * f
	
	Escribir "El pago es de $", pago
	
FinAlgoritmo

