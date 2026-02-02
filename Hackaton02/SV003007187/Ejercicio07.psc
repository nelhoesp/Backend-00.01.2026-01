 Ejercicio07


	Algoritmo HeladosSimple
   
  
    Definir tipo Como Caracter
    Definir compra, total Como Real
    
    Escribir "Monto compra:"
    Leer compra
    
    Escribir "Tipo membresía (A,B,C):"
    Leer tipo
    
    Si tipo = "A" O tipo = "a" Entonces
        total = compra * 0.90
    Sino
        Si tipo = "B" O tipo = "b" Entonces
            total = compra * 0.85
        Sino
            Si tipo = "C" O tipo = "c" Entonces
                total = compra * 0.80
            Sino
                total = compra
            Fin Si
        Fin Si
    Fin Si
    
    Escribir "Total: $", total
FinAlgoritmo 