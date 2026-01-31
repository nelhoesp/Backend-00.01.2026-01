Algoritmo ejercicio11_2
	
	Dimension v[4]
	Definir i, j, temp Como Entero
	
	para i <- 1 Hasta 4 Hacer
		escribir "ingrese su nunero en orde: ", i
		Leer v[i]
	FinPara
	
	
	Para i <- 1 hasta 3
		Para j <- 1 Hasta 4 - i
			si v[j] > v[j +1] Entonces
				Escribir "Estoy aca: ", v[j], v[j+1]
				aux <- v[j]
				v[j] <- v[j+1]
				v[j+1] <- aux
			FinSi
		FinPara
	FinPara
	
	Para i <- 1 Hasta 4
		Escribir v[i]
	FinPara
	
	Escribir v[1], v[2], v[3], v[4]
	
	
FinAlgoritmo
