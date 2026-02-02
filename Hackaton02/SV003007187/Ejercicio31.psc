Ejercicio31

Algoritmo MediaParesImpares
    Definir num, sumaPares, sumaImpares Como Real
    Definir contPares, contImpares, i Como Entero
    
    sumaPares = 0
    sumaImpares = 0
    contPares = 0
    contImpares = 0
    
    Para i = 1 Hasta 10 Hacer
        Escribir "Ingrese número ", i, ":"
        Leer num
        
        Si num MOD 2 = 0 Entonces
            sumaPares = sumaPares + num
            contPares = contPares + 1
        Sino
            sumaImpares = sumaImpares + num
            contImpares = contImpares + 1
        Fin Si
    Fin Para
    
    Escribir ""
    Escribir "=== RESULTADOS ==="
    
    Si contPares > 0 Entonces
        Escribir "Media pares: ", sumaPares / contPares
    Sino
        Escribir "No hubo números pares"
    Fin Si
    
    Si contImpares > 0 Entonces
        Escribir "Media impares: ", sumaImpares / contImpares
    Sino
        Escribir "No hubo números impares"
    Fin Si
    
FinAlgoritmo