// 20. Hacer un algoritmo en Pseint que que lea 4 números enteros positivos y verifique y 
// realice las siguientes operaciones:
//     ¿Cuántos números son Pares?
//     ¿Cuál es el mayor de todos?
//     Si el tercero es par, calcular el cuadrado del segundo.
//     Si el primero es menor que el cuarto, calcular la media de los 4 números.
//     Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido 
//     entre los valores 50 y 700. Si cumple se cumple la segunda condición, calcular la 
//     suma de los 4 números.
Algoritmo OperacionesCuatroNumeros
    Definir num1, num2, num3, num4, contadorPares Como Entero
    Definir mayor, cuadrado, media, suma Como Real    
    contadorPares = 0    
    Escribir "Ingrese el primer número:"
    Leer num1
    Escribir "Ingrese el segundo número:"
    Leer num2
    Escribir "Ingrese el tercer número:"
    Leer num3
    Escribir "Ingrese el cuarto número:"
    Leer num4    
    // Contar números pares
    Si num1 MOD 2 = 0 Entonces
        contadorPares = contadorPares + 1
    FinSi
    Si num2 MOD 2 = 0 Entonces
        contadorPares = contadorPares + 1
    FinSi
    Si num3 MOD 2 = 0 Entonces
        contadorPares = contadorPares + 1
    FinSi
    Si num4 MOD 2 = 0 Entonces
        contadorPares = contadorPares + 1
    FinSi
    Escribir "Cantidad de números pares: ", contadorPares    
    // Mayor de todos
    mayor = num1
    Si num2 > mayor Entonces
        mayor = num2
    FinSi
    Si num3 > mayor Entonces
        mayor = num3
    FinSi
    Si num4 > mayor Entonces
        mayor = num4
    FinSi
    Escribir "El mayor de todos es: ", mayor    
    // Si el tercero es par, calcular cuadrado del segundo
    Si num3 MOD 2 = 0 Entonces
        cuadrado = num2 * num2
        Escribir "El cuadrado del segundo número es: ", cuadrado
    FinSi    
    // Si el primero es menor que el cuarto, calcular media
    Si num1 < num4 Entonces
        media = (num1 + num2 + num3 + num4) / 4
        Escribir "La media de los 4 números es: ", media
    FinSi    
    // Si el segundo es mayor que el tercero
    Si num2 > num3 Entonces
        Si num3 >= 50 Y num3 <= 700 Entonces
            suma = num1 + num2 + num3 + num4
            Escribir "La suma de los 4 números es: ", suma
        FinSi
    FinSi
FinAlgoritmo
