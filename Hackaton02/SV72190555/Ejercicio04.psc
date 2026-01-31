Algoritmo Ejercicio04
	// 4. Hacer un algoritmo en Pseint que lea tres números enteros y los muestre de menor a mayor.
	Escribir 'Escribe tu numero1'
	Leer numeroUsuario1
	Escribir 'Escribe tu numero2'
	Leer numeroUsuario2
	Escribir 'Escribe tu numero3'
	Leer numeroUsuario3
	a <- numeroUsuario1
	b <- numeroUsuario2
	c <- numeroUsuario3
	
	Si a <= b Y a <= c Entonces
        Si b <= c Entonces
            Escribir "Los numeros son ", a, ", ", b, ", ", c
        Sino
            Escribir "Los numeros son ", a, ", ", c, ", ", b
        FinSi
    Sino
        Si b <= a Y b <= c Entonces
            Si a <= c Entonces
                Escribir "Los numeros son ", b, ", ", a, ", ", c
            Sino
                Escribir "Los numeros son ", b, ", ", c, ", ", a
            FinSi
        Sino
            Si a <= b Entonces
                Escribir "Los numeros son ", c, ", ", a, ", ", b
            Sino
                Escribir "Los numeros son ", c, ", ", b, ", ", a
            FinSi
        FinSi
    FinSi
	
FinAlgoritmo
