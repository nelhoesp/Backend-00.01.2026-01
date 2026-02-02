 Ejercicio03
    Hacer un algoritmo en Pseint que lea un número y determinar si termina en 4.    	

	
	Algoritmo numeroTerminaEnCuatro
    Definir numero Como Entero
    Definir ultimoDigito Como Entero
    
    Escribir "Ingrese un número entero:"
    Leer numero
    
    ultimoDigito = numero MOD 10
    
    Si ultimoDigito = 4 Entonces
        Escribir "El número ", numero, " SÍ termina en 4."
    Sino
        Escribir "El número ", numero, " NO termina en 4."
    FinSi
FinAlgoritmo