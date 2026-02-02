Ejercicio18

Hacer un algoritmo en Pseint para una empresa se encarga de la venta y distribución de CD vírgenes. 
Los clientes pueden adquirir los artículos (supongamos un único producto de una única marca) por cantidad. Los precios son:

$10. Si se compran unidades separadas hasta 9.

$8. Si se compran entre 10 unidades hasta 99.

$7. Entre 100 y 499 unidades.

$6. Para mas de 500 unidades.

La ganancia para el vendedor es de 8,25 % de la venta. Realizar un algoritmo en Pseint que dado un número de CDs a vender calcule el precio
 total para el cliente y la ganancia para el vendedor.





	
    Definir cantidad Como Entero
    Definir preciounidad, preciototal, gananciavendedor Como Real
    Definir porcentajeGanancia Como Real
	
    porcentajeGanancia = 8.25
	
    Escribir "Venta de CDs"
    Escribir "Tabla de precios:"
    Escribir "(1-9)      $10.00 c/u"
    Escribir "(10-99)    $8.00 c/u"
    Escribir "(100-499)  $7.00 c/u"
    Escribir "(500+)     $6.00 c/u"
	
    Escribir "Ingrese la cantidad de CDs:"
    Leer cantidad
	
    Si cantidad >= 500 Entonces
        preciounidad = 6
    Sino Si cantidad >= 100 Entonces
			preciounidad = 7
		Sino Si cantidad >= 10 Entonces
				preciounidad = 8
			Sino
				preciounidad = 10
			FinSi
			
			preciototal = cantidad * preciounidad
			gananciavendedor = preciototal * (porcentajeGanancia / 100)
			
			Escribir "Precio por unidad: $", preciounidad
			Escribir "Precio total: $", preciototal
			Escribir "Ganancia del vendedor: $", gananciavendedor
		FinSi
	FinSi
	
FinProceso

