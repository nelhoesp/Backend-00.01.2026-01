Ejercicio26

Algoritmo DivisionRestas
    Definir dividendo, divisor, cociente, resto Como Entero
    
    Escribir "Ingrese dividendo:"
    Leer dividendo
    Escribir "Ingrese divisor:"
    Leer divisor
    
    cociente = 0
    resto = dividendo
    
    Mientras resto >= divisor Hacer
        resto = resto - divisor
        cociente = cociente + 1
    Fin Mientras
    
    Escribir "Cociente: ", cociente
    Escribir "Resto: ", resto
    
FinAlgoritmo
