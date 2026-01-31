//39. Hacer un algoritmo en Pseint que cumpla con la aproximaci�n del n�mero pi con la serie
// de Gregory-Leibniz. La formula que se debe aplicar es:

//    Pi = (4/1) - (4/3) + (4/5) - (4/7) + (4/9) - (4/11) + (4/13) - (4/15) ...
Algoritmo AproximacionPi_GregoryLeibniz
    Definir n, i Como Entero
    Definir piAprox, signo Como Real
    Definir denominador Como Entero

    Escribir "Ingrese la cantidad de términos:"
    Leer n

    piAprox = 0
    signo = 1
    denominador = 1

    Para i = 1 Hasta n Hacer
        piAprox = piAprox + signo * (4 / denominador)
        signo = signo * (-1)
        denominador = denominador + 2
    FinPara

    Escribir "Aproximación de PI: ", piAprox
FinAlgoritmo