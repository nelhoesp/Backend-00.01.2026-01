Algoritmo Ejercicio08
	// Calcular el promedio de tres notas y determinar si aprueba
	
	Definir nota1, nota2, nota3 Como Entero
	Definir promedio Como Real
	
	Escribir "Ingrese la primera nota:"
	Leer nota1
	Escribir "Ingrese la segunda nota:"
	Leer nota2
	Escribir "Ingrese la tercera nota:"
	Leer nota3
	
	promedio <- (nota1 + nota2 + nota3) / 3
	promedio <- trunc (promedio*10)/10
	//promedio <- redon (promedio)
	Si promedio >= 10.5 Entonces
		Escribir "El promedio es ", promedio
		Escribir "El estudiante APROBO"
	Sino
		Escribir "El promedio es ", promedio
		Escribir "El estudiante DESAPROBO"
	FinSi
	
FinAlgoritmo