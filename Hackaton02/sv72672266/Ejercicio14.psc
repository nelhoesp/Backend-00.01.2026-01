Proceso Ejercicio14
	Definir num_entero Como Entero
	Escribir "Escriba un entero del 1 al 10"
	Leer num
	
	es_primo = Falso
	
	Segun num Hacer
		1:
			es_primo = Verdadero
		2:
			es_primo = Verdadero
		3:
			es_primo = Verdadero
		5:
			es_primo = Verdadero
		7:
			es_primo = Verdadero
		De Otro Modo:
			es_primo = Falso
	FinSegun
	
	Si es_primo Entonces
		Escribir "Es primo"
	SiNo
		Escribir "No es primo"
	FinSi
FinProceso
