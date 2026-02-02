Algoritmo MayorDeDosNumeros
   
    Definir num1, num2 Como Real
    
    Escribir "COMPARADOR DE NÚMEROS"
 
    Escribir "Ingrese el primer número:"
    Leer num1
    Escribir "Ingrese el segundo número:"
    Leer num2
    
    Si num1 = num2 Entonces
        Escribir "Los números son iguales"
    Sino
        Si num1 > num2 Entonces
            Escribir num1, " es mayor que ", num2
        Sino
            Escribir num2, " es mayor que ", num1
        FinSi
    FinSi
FinAlgoritmo
