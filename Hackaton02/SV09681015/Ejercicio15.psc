//15. Hacer un algoritmo en Pseint que convierta centímetros a pulgadas y libras a kilogramos.
Algoritmo Conversiones
    Definir opcion Como Entero
    Definir valor, resultado Como Real
    
    Escribir "1. Centímetros a Pulgadas"
    Escribir "2. Libras a Kilogramos"
    Escribir "Seleccione una opción:"
    Leer opcion
    
    Segun opcion Hacer
        1:
            Escribir "Ingrese centímetros:"
            Leer valor
            resultado = valor / 2.54
            Escribir valor, " cm = ", resultado, " pulgadas"
        2:
            Escribir "Ingrese libras:"
            Leer valor
            resultado = valor * 0.453592
            Escribir valor, " lb = ", resultado, " kg"
        De Otro Modo:
            Escribir "Opción no válida"
    FinSegun
FinAlgoritmo
