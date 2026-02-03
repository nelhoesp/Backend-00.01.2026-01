Proceso Ejercicio20
	pares = 0
	
	Escribir "Ingrese el primer número:"
	Leer n1
	Escribir "Ingrese el segundo número:"
	Leer n2
	Escribir "Ingrese el tercer número:"
	Leer n3
	Escribir "Ingrese el cuarto número:"
	Leer n4
	
	Si n1 MOD 2 = 0 Entonces
		pares = pares + 1
	FinSi
	Si n2 MOD 2 = 0 Entonces
		pares = pares + 1
	FinSi
	Si n3 MOD 2 = 0 Entonces
		pares = pares + 1
	FinSi
	Si n4 MOD 2 = 0 Entonces
		pares = pares + 1
	FinSi
	
	Escribir "Cantidad de pares: ", pares
	
	nmayor = n1
	Si n2 > nmayor Entonces
		nmayor = n2
	FinSi
	Si n3 > nmayor Entonces
		nmayor = n3
	FinSi
	Si n4 > nmayor Entonces
		nmayor = n4
	FinSi
	
	Escribir "El numero mayor es: ", nmayor
	
	Si n3 MOD 2 = 0 Entonces
		cuadrado = n2 * n2
		Escribir "El cuadrado del segundo número es: ", cuadrado
	FinSi
	
	Si n1 < n4 Entonces
		media = (n1 + n2 + n3 + n4) / 4
		Escribir "La media de los 4 números es: ", media
	FinSi
	
	Si n2 > n3 Y n3 >= 50 Y n3 <= 700 Entonces
		suma = n1 + n2 + n3 + n4
		Escribir "La suma de los 4 números es: ", suma
	FinSi
FinProceso
