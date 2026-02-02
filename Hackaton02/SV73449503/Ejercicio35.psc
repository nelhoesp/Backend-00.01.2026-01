Proceso Ejercicio35
	
    Definir num, i Como Entero
    Definir mayor, menor Como Entero
	
    Escribir "Ingrese el numero 1:"
    Leer num
    mayor <- num
    menor <- num
	
    Para i <- 2 Hasta 20 Hacer
        Escribir "Ingrese el numero ", i, ":"
        Leer num
		
        Si num > mayor Entonces
            mayor <- num
        FinSi
		
        Si num < menor Entonces
            menor <- num
        FinSi
    FinPara
	
    Escribir "El numero mayor es: ", mayor
    Escribir "El numero menor es: ", menor
	
	
FinProceso

//Hacer un algoritmo en Pseint que nos permita saber cuál es el número mayor y menor, 
//se debe ingresar sólo veinte números.

