Proceso Ejercicio40
	
    Definir n, i, signo Como Entero
    Definir pi_aprox Como Real
	
    Escribir "Ingrese la cantidad de terminos:"
    Leer n
	
    pi_aprox <- 3
    signo <- 1
	
    Para i <- 2 Hasta (2 * n) Con Paso 2 Hacer
        pi_aprox <- pi_aprox + signo * (4.0 / (i * (i + 1) * (i + 2)))
        signo <- signo * (-1)
    FinPara
	
    Escribir "La aproximacion de PI es: ", pi_aprox
	
FinProceso


//Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie de Nilakantha. 
//La formula que se debe aplicar es:

//Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...

