// 40. Hacer un algoritmo en Pseint que cumpla con la aproximación del número pi con la serie
//  de Nilakantha. La formula que se debe aplicar es:

//     Pi = = 3 + 4/(2*3*4) - 4/(4*5*6) + 4/(6*7*8) - 4/(8*9*10) + 4/(10*11*12) - 4/(12*13*14) ...

Algoritmo PiNilakantha
    Definir n, i Como Entero
    Definir valorPi, signo Como Real

    Escribir "Ingrese el número de términos:"
    Leer n

    valorPi = 3
    signo = 1

    Para i = 1 Hasta n Con Paso 1 Hacer
        valorPi = valorPi + signo * (4 / ((2 * i) * (2 * i + 1) * (2 * i + 2)))
        signo = signo * (-1)
    FinPara

    Escribir "Aproximación de Pi: ", valorPi
FinAlgoritmo