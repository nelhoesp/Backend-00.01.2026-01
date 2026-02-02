Ejercicio20

Algoritmo OperacionesCompactas
    Definir a, b, c, d Como Entero
    
  
    Escribir "Número 1:"
    Leer a
    Escribir "Número 2:"
    Leer b
    Escribir "Número 3:"
    Leer c
    Escribir "Número 4:"
    Leer d
    
    // 1. Pares
    Escribir "Pares: ", (a MOD 2 = 0) + (b MOD 2 = 0) + (c MOD 2 = 0) + (d MOD 2 = 0)
    
    // 2. Mayor
    Si a >= b Y a >= c Y a >= d Entonces
        Escribir "Mayor: ", a
    Sino
        Si b >= c Y b >= d Entonces
            Escribir "Mayor: ", b
        Sino
            Si c >= d Entonces
                Escribir "Mayor: ", c
            Sino
                Escribir "Mayor: ", d
            Fin Si
        Fin Si
    Fin Si
    
    // 3. Cuadrado si tercero par
    Si c MOD 2 = 0 Entonces
        Escribir "Cuadrado 2do: ", b * b
    Fin Si
    
    // 4. Media si primero < cuarto
    Si a < d Entonces
        Escribir "Media: ", (a + b + c + d) / 4
    Fin Si
    
    // 5. Suma si condiciones cumplidas
    Si b > c Y c >= 50 Y c <= 700 Entonces
        Escribir "Suma total: ", a + b + c + d
    Fin Si
    
FinAlgoritmo