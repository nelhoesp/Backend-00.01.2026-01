Ejercicio19

Algoritmo CalcularPago
   
    Definir id, dias Como Entero
    Definir pago Como Real
    
    Escribir "ID empleado (1-4):"
    Leer id
    Escribir "Días (1-6):"
    Leer dias
    
    
    Si dias < 1 O dias > 6 Entonces
        Escribir "Días inválidos"
    Sino
        Segun id Hacer
            1: pago = 56 * dias
            2: pago = 64 * dias
            3: pago = 80 * dias
            4: pago = 48 * dias
            De Otro Modo: 
                Escribir "ID inválido"
                pago = 0
        Fin Segun
        
        Si pago > 0 Entonces
            Escribir "Total a pagar: $", pago
        Fin Si
    Fin Si
    
FinAlgoritmo