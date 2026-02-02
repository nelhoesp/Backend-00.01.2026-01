Ejercicio27

Algoritmo MediaUsandoWhile
    Definir numero, total, cantidad Como Real
    Definir media Como Real
    
    total = 0
    cantidad = 0
    
    Escribir "Ingrese números (negativo para salir):"
    Leer numero
    
    Mientras numero >= 0 Hacer
        total = total + numero
        cantidad = cantidad + 1
        Leer numero
    Fin Mientras
    
    Si cantidad > 0 Entonces
        media = total / cantidad
        Escribir "Media = ", media
    Sino
        Escribir "No hay números para calcular"
    Fin Si
    
FinAlgoritmo