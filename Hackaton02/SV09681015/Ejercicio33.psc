33. Hacer un algoritmo en Pseint que permita al usuario continuar con el programa.
Algoritmo ContinuarPrograma
    Definir respuesta Como Caracter
    Definir continuar Como Logico

    continuar = Verdadero

    Mientras continuar = Verdadero Hacer
        Escribir "Ejecutando el programa..."
        Escribir "Operación realizada"

        Escribir "¿Desea continuar? (S/N):"
        Leer respuesta

        Si respuesta = "N" O respuesta = "n" Entonces
            continuar = Falso
        FinSi
    FinMientras

    Escribir "Programa finalizado"
FinAlgoritmo
