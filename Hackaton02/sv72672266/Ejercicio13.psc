Proceso Ejercicio13
	Dimensionar vocales[5]
	Escribir "Inserte una letra"
	Leer letra
	
	letra = Minusculas(letra)
	es_vocal = Falso
	
	vocales[1]<-"a"
	vocales[2]<-"e"
	vocales[3]<-"i"
	vocales[4]<-"o"
	vocales[5]<-"u"
	
	Para i<-1 Hasta 5 Con Paso 1 Hacer
		Si letra = vocales[i] Entonces
			es_vocal = Verdadero
		FinSi
	FinPara
	
	Si es_vocal Entonces
		Escribir "Sí es vocal"
	SiNo
		Escribir "No es vocal"
	FinSi
FinProceso
