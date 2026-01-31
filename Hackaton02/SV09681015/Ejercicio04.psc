//4. Hacer un algoritmo en Pseint que lea tres números enteros y los muestre de menor a mayor.

Algoritmo OrdenarTresNumeros_Simple
    Definir a, b, c Como Entero

    Escribir "Ingrese el primer número:"
    Leer a
    Escribir "Ingrese el segundo número:"
    Leer b
    Escribir "Ingrese el tercer número:"
    Leer c

    Si a <= b Y b <= c Entonces
        Escribir "Orden: ", a, ", ", b, ", ", c
    Sino
        Si a <= c Y c <= b Entonces
            Escribir "Orden: ", a, ", ", c, ", ", b
        Sino
            Si b <= a Y a <= c Entonces
                Escribir "Orden: ", b, ", ", a, ", ", c
            Sino
                Si b <= c Y c <= a Entonces
                    Escribir "Orden: ", b, ", ", c, ", ", a
                Sino
                    Si c <= a Y a <= b Entonces
                        Escribir "Orden: ", c, ", ", a, ", ", b
                    Sino
                        Escribir "Orden: ", c, ", ", b, ", ", a
                    FinSi
                FinSi
            FinSi
        FinSi
    FinSi
FinAlgoritmo
