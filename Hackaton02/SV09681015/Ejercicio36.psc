//36. Hacer un algoritmo en Pseint para calcular la serie de Fibonacci.
Algoritmo SerieFibonacci
    Definir n, i, fib1, fib2, siguiente Como Entero

    Escribir "¿Cuántos términos de Fibonacci desea ver?"
    Leer n

    fib1 = 0
    fib2 = 1

    Escribir "Serie de Fibonacci:"
    Escribir fib1

    Si n > 1 Entonces
        Escribir fib2
    FinSi

    Para i = 3 Hasta n Con Paso 1 Hacer
        siguiente = fib1 + fib2
        Escribir siguiente
        fib1 = fib2
        fib2 = siguiente
    FinPara
FinAlgoritmo
