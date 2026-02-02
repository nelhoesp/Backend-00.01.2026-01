Ejercicio32


Algoritmo EncontrarMaxPoblacion
    Definir nomCiudad, nomProvincia, mejorCiudad, mejorProvincia Como Caracter
    Definir poblacion, maxPoblacion Como Entero
    Definiz i, j Como Entero
    
    maxPoblacion = 0
    mejorCiudad = ""
    mejorProvincia = ""
    
    Para i = 1 Hasta 3 Hacer
        Escribir "Provincia #", i, " - Ingrese nombre:"
        Leer nomProvincia
        
        Para j = 1 Hasta 11 Hacer
            Escribir "Ciudad #", j, " nombre:"
            Leer nomCiudad
            Escribir "Población:"
            Leer poblacion
            
            Si poblacion > maxPoblacion Entonces
                maxPoblacion = poblacion
                mejorCiudad = nomCiudad
                mejorProvincia = nomProvincia
            Fin Si
        Fin Para
    Fin Para
    
    Escribir ""
    Escribir "MÁXIMA POBLACIÓN:"
    Escribir "Ciudad: ", mejorCiudad
    Escribir "Provincia: ", mejorProvincia
    Escribir "Habitantes: ", maxPoblacion
    
FinAlgoritmo
 