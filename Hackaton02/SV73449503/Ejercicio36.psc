Proceso Ejercicio36
	
    Definir n, i Como Entero
    Definir a, b, c Como Entero
	
    Escribir "Ingrese la cantidad de terminos de la serie:"
    Leer n
	
    a <- 0
    b <- 1
	
    Escribir "Serie de Fibonacci:"
	
    Si n >= 1 Entonces
        Escribir a
    FinSi
	
    Si n >= 2 Entonces
        Escribir b
    FinSi
	
    Para i <- 3 Hasta n Hacer
        c <- a + b
        Escribir c
        a <- b
        b <- c
    FinPara
	
	
FinProceso


// Hacer un algoritmo en Pseint para calcular la serie de Fibonacci.

