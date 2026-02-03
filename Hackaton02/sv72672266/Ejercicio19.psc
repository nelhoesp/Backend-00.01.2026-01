Proceso Ejercicio19
	Escribir "Ingrese el identificador del empleado:"
	Escribir "1. Cajero"
	Escribir "2. Servidor"
	Escribir "3. Preparador de mezclas"
	Escribir "4. Mantenimiento"
	Leer id
	Escribir "Ingrese la cantidad de días trabajados del 1 al 6:"
	Leer dias
	
	id_valido = Verdadero
	
	Si dias < 1 O dias > 6 Entonces
		Escribir "Cantidad de días inválida"
	SiNo
		Segun id Hacer
			1:
				salario_diario = 56
			2:
				salario_diario = 64
			3:
				salario_diario = 80
			4:
				salario_diario = 48
			De Otro Modo:
				Escribir "ID de empleado inválido"
				id_valido = Falso
		FinSegun
		
		Si id_valido Entonces
			pago_total = salario_diario * dias
			
			Escribir "El pago total del empleado es: $", pago_total
		FinSi
	FinSi
FinProceso
