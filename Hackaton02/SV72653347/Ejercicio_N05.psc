Proceso Ejercicio_N05
	///Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoci�n de descuento para vender al mayor
	///, esta depender� del n�mero de zapatos que se compren. Si son m�s de diez, se les dar� un 10% de descuento 
	///sobre el total de la compra; si el n�mero de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% 
	///de descuento; y si son m�s treinta zapatos se otorgar� un 40% de descuento. El precio de cada zapato es de $80.
			
	Definir n Como Entero
	Definir precioTotal, descuento, totalFinal Como Real
	Definir descTexto Como Caracter
	
	Escribir "Escriba la cantidad de zapatos:"
	Leer n
	
	precioTotal = n * 80
	
	Si n > 30 Entonces
		descuento = precioTotal * 0.40
		descTexto = "Descuento 40%"
	SiNo
		Si n > 20 Entonces
			descuento = precioTotal * 0.20
			descTexto = "Descuento 20%"
		SiNo
			Si n > 10 Entonces
				descuento = precioTotal * 0.10
				descTexto = "Descuento 10%"
			SiNo
				descuento = 0
				descTexto = "Descuento 0%"
			FinSi
		FinSi
	FinSi
	
	totalFinal = precioTotal - descuento
	
	Escribir "Se est� aplicando el ", descTexto
	Escribir "Total a pagar: $", totalFinal
FinProceso
