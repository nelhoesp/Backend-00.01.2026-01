Algoritmo Ejercicio10
	//definir par o impar
	
	Definir numero Como Entero
	
	Escribir "Ingrese un numero:"
	Leer numero
	
	//falta corregir el cero 0
	Si numero < 0 Entonces
		numero <- - numero
	SiNo
		numero <- numero
	FinSi
	
	
	Si numero MOD 2 = 0 Entonces
		Escribir "El numero es PAR"
	Sino
		Escribir "El numero es IMPAR"
	FinSi
	
FinAlgoritmo