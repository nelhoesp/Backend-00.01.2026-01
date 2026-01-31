// 32. Se quiere saber cuál es la ciudad con la población de más personas, son tres provincias
//  y once ciudades, hacer un algoritmo en Pseint que nos permita saber eso. 
Algoritmo CiudadMayorPoblacion
    Definir i, poblacion, mayorPoblacion Como Entero
    Definir nombreCiudad, ciudadMayor Como Caracter

    mayorPoblacion = 0
    ciudadMayor = ""

    Para i = 1 Hasta 11 Con Paso 1 Hacer
        Escribir "Ingrese el nombre de la ciudad ", i, ":"
        Leer nombreCiudad
        Escribir "Ingrese la población de ", nombreCiudad, ":"
        Leer poblacion

        Si poblacion > mayorPoblacion Entonces
            mayorPoblacion = poblacion
            ciudadMayor = nombreCiudad
        FinSi
    FinPara

    Escribir "La ciudad con mayor población es: ", ciudadMayor
    Escribir "Con una población de: ", mayorPoblacion, " habitantes"
FinAlgoritmo
