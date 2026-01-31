//5.Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoción de 
// descuento para vender al mayor, esta dependerá del número de zapatos que se compren. Si 
// son más de diez, se les dará un 10% de descuento sobre el total de la compra; si el 
// número de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20% de 
// descuento; y si son más treinta zapatos se otorgará un 40% de descuento. El precio 
// de cada zapato es de $80.  

Algoritmo TiendaZapatos
    Definir cantidadZapatos Como Entero
    Definir precioUnitario, totalSinDescuento, descuento, totalConDescuento Como Real

    precioUnitario = 80

    Escribir "Ingrese la cantidad de zapatos a comprar:"
    Leer cantidadZapatos

    totalSinDescuento = cantidadZapatos * precioUnitario

    Si cantidadZapatos > 30 Entonces
		descuento = totalSinDescuento * 0.40
	Sino 
		Si cantidadZapatos > 20 Entonces
			descuento = totalSinDescuento * 0.20
		Sino 
			Si cantidadZapatos > 10 Entonces
			descuento = totalSinDescuento * 0.10
			Sino
				descuento = 0
			FinSi
		FinSi
    FinSi

    totalConDescuento = totalSinDescuento - descuento

    Escribir "Total sin descuento: $", totalSinDescuento
    Escribir "Descuento: $", descuento
    Escribir "Total a pagar: $", totalConDescuento
FinAlgoritmo