//3. Hacer un algoritmo en Pseint que lea un número y determinar si termina en 4.  
Algoritmo TerminaEnCuatro
    Definir num Como Entero
    Definir valido Como Logico
    
    valido <- Falso
    
    // Validación de entrada
    Mientras valido = Falso Hacer
        Escribir "Ingrese un numero entero:"
        Leer num
        
        // En PSeInt, si se puede leer como entero, se asume válido
        valido <- Verdadero
    FinMientras
    
    // Verificar si termina en 4
    Si Abs(num) MOD 10 = 4 Entonces
        Escribir "El numero termina en 4"
    Sino
        Escribir "El numero NO termina en 4"
    FinSi
FinAlgoritmo
