Proceso Ejercicio38
	
    Definir n, i, suma Como Entero
	
    Escribir "Ingrese un numero entero positivo:"
    Leer n
	
    suma <- 0
	
    Para i <- 1 Hasta n - 1 Hacer
        Si n MOD i = 0 Entonces
            suma <- suma + i
        FinSi
    FinPara
	
    Si suma = n Entonces
        Escribir "El numero ", n, " es un numero perfecto"
    Sino
        Escribir "El numero ", n, " NO es un numero perfecto"
		
    FinSi
	
	
	
FinProceso

//Hacer un algoritmo en Pseint que nos permita saber si un número es un número perfecto.

