 Ejercicio05 

 Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoción de descuento para vender al mayor
 esta dependerá del número de zapatos que se compren. Si son más de diez, se les dará un 10% de descuento sobre el total de la compra; 
 si el número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de descuento; 
 y si son más treinta zapatos se otorgará un 40% de descuento. El precio de cada zapato es de $80.

 

Algoritmo SaberDescuentoZapatos
	Definir cantidadDeZapatos,precioUnidad,descuento,subtotal,total Como Real  

	precioUnidad=80
	
	
	Escribir "Zapateria de Zapatos"
	Escribir "Tenemos 20%.30%,40% de descuento"
	
	Escribir "Ingrese cantidadDeZapatos"
	Leer cantidadDeZapatos
	total<-cantidadDeZapatos*precioUnidad
	
	Escribir "El valor de la compra es: " total 
	Si cantidadDeZapatos >= 10 Y cantidadDeZapatos < 20 Entonces 
		Escribir "se ganado un descuento de  10%"
		descuento<-total*0.10
		subtotal<-total-descuento 
		Escribir "subtotal a pagar: " subtotal "$"
	Fin Si
	
	Si cantidadDeZapatos >= 20 Y cantidadDeZapatos < 30 Entonces 
		Escribir "se ganado un descuento de  20%"
		descuento<-total*0.20
		subtotal<-total-descuento 
		Escribir "subtotal a pagar: " subtotal "$"
	Fin Si
	
	Si cantidadDeZapatos >= 30 Entonces 
		Escribir "se ganado un descuento de  40%"
		descuento<-total*0.40
		subtotal<-total-descuento 
		Escribir "subtotal a pagar: " subtotal "$"
	Fin Si
	
	si cantidadDeZapatos <= 0
		Escribir "Numero ingresado no es valido"
	FinSi
	
FinProceso
