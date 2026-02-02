 Ejercicio06 

  	Hacer un algoritmo en Pseint para ayudar a un trabajador a saber cuál será su sueldo semanal. 
  	se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora.
	pero si trabaja más de 40 horas entonces las horas extras se le pagarán a $25 por hora.



Algoritmo SueldoSemanal
	Definir HorasTrabajadas,horanormal, horaExtra,PagoTotal,cantidadHorasExtras,PagoHorasExtra,PagohoraNormal Como Real
	horanormal=20
	horaExtra=25
	
	Escribir " Tabulador de Sueldo "
	Escribir " Horas Trabajadas "
	Leer HorasTrabajadas
	
	
	
	Si HorasTrabajadas <= 40 Entonces
		PagoTotal <- HorasTrabajadas * ValorHoraNormal
	SiNo
		HorasExtras <- HorasTrabajadas - 40
		PagoTotal <- (40 * ValorHoraNormal) + (HorasExtras * ValorHoraExtra)
	
		Escribir "Su sueldo semanal es: ", PagoTotal "$"
		
		finsi	
	
	
	
FinAlgoritmo

