Proceso Ejercicio39
	
    Definir n, i, signo Como Entero
    Definir aprox Como Real
	
    Escribir "Ingrese la cantidad de terminos:"
    Leer n
	
    aprox <- 0
    signo <- 1
	
    Para i <- 1 Hasta (2 * n - 1) Con Paso 2 Hacer
        aprox <- aprox + signo * (4.0 / i)
        signo <- signo * (-1)
    FinPara
	
    Escribir "La aproximacion de PI es: ", aprox
	
FinProceso



//Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi 
//con la serie de Gregory-Leibniz. La formula que se debe aplicar es:

//Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...

