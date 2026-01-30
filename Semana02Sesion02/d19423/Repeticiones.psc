Proceso Repeticiones
	
	bandera = Verdadero
	
	dato =0 
	Mientras bandera Hacer
		dato = dato + 1;
		escribir dato
		si dato = 5 Entonces
			bandera = Falso
		FinSi
	Fin Mientras
	
	
	Repetir
		dato = dato - 1;
		escribir dato
		si dato = 0 Entonces
			bandera = Verdadero
		FinSi
	Hasta Que bandera
	
	para i desde 5 hasta 1 Hacer
		escribir i 
	FinPara
	
FinProceso
