Proceso Ejercicio_N20
///Hacer un algoritmo en Pseint que que lea 4 n�meros enteros positivos y verifique y 
///realice las siguientes operaciones:
///�Cu�ntos n�meros son Pares?
///�Cu�l es el mayor de todos?
///Si el tercero es par, calcular el cuadrado del segundo.		
///Si el primero es menor que el cuarto, calcular la media de los 4 n�meros.
///Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los valores 50 y 700. 
///Si cumple se cumple la segunda condici�n, calcular la suma de los 4 n�meros.
	
		Definir n1, n2, n3, n4 Como Entero
		Definir pares, mayor, suma Como Entero
		Definir media Como Real
		Escribir "Ingrese el primer numero:"
		Leer n1
		Escribir "Ingrese el segundo numero:"
		Leer n2
		Escribir "Ingrese el tercer numero:"
		Leer n3
		Escribir "Ingrese el cuarto numero:"
		Leer n4
		
		pares = 0
		
		Si n1 mod 2 = 0 Entonces
			pares =pares + 1
		FinSi
		Si n2 mod 2 = 0 Entonces
			pares=pares + 1
		FinSi
		Si n3 mod 2 = 0 Entonces
			pares=pares + 1
		FinSi
		Si n4 mod 2 = 0 Entonces
			pares=pares + 1
		FinSi
		
		Escribir "Cantidad de n�meros pares: ", pares
		mayor = n1
		
		Si n2 > mayor Entonces
			mayor = n2
		FinSi
		Si n3 > mayor Entonces
			mayor = n3
		FinSi
		Si n4 > mayor Entonces
			mayor = n4
		FinSi
		
		Escribir "El n�mero mayor es: ", mayor
		
		Si n3 mod 2 = 0 Entonces
			Escribir "El cuadrado del segundo numero es: ", n2 * n2
		FinSi
		Si n1 < n4 Entonces
			media = (n1 + n2 + n3 + n4) / 4
			Escribir "La media de los 4 numeros es: ", media
		FinSi

		Si n2 > n3 Entonces
			Si n3 >= 50 y n3 <= 700 Entonces
				suma = n1 + n2 + n3 + n4
				Escribir "La suma de los 4 numeros es: ", suma
			FinSi
		FinSi
	
FinProceso

