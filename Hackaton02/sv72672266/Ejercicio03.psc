Proceso Ejercicio03
	Escribir "Escribe un número:"
	Leer num
	
	digitos = Longitud(num)
	ultimo_digito = SubCadena(num,digitos,digitos)
	
	Si ultimo_digito = "4" Entonces
		Escribir "El número termina en 4"
	SiNo
		Escribir "NO termina en 4"
	FinSi
FinProceso
