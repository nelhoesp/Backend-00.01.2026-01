// 7. Hacer un algoritmo en Pseint para una tienda de helado que da un descuento por compra 
// a sus clientes con membresía dependiendo de su tipo, sólo existen tres tipos de membresía, 
// tipo A, tipo B y tipo C. Los descuentos son los siguientes:      Tipo A 10% de descuento    
// Tipo B 15% de descuento    Tipo C 20% de descuento  

Algoritmo TiendaHelados
    Definir tipoMembresia Como Caracter
    Definir montoCompra, descuento, totalPagar Como Real
    
    Escribir "Ingrese el monto de la compra:"
    Leer montoCompra
    Escribir "Ingrese el tipo de membresía (A, B o C):"
    Leer tipoMembresia
    
    Segun tipoMembresia Hacer
        "A", "a":
            descuento = montoCompra * 0.10
        "B", "b":
            descuento = montoCompra * 0.15
        "C", "c":
            descuento = montoCompra * 0.20
        De Otro Modo:
            descuento = 0
            Escribir "Tipo de membresía no válido"
    FinSegun
    
    totalPagar = montoCompra - descuento
    
    Escribir "Descuento aplicado: $", descuento
    Escribir "Total a pagar: $", totalPagar
FinAlgoritmo