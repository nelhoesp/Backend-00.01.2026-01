// Hacer un algoritmo en Pseint para ayudar a un trabajador a saber cuál será su sueldo semanal, 
// se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, pero si trabaja más de 40 horas 
// entonces las horas extras se le pagarán a $25 por hora.  

Algoritmo SueldoSemanal
    Definir horasTrabajadas Como Entero
    Definir sueldoTotal Como Real
    
    Escribir "Ingrese las horas trabajadas en la semana:"
    Leer horasTrabajadas
    
    Si horasTrabajadas <= 40 Entonces
        sueldoTotal = horasTrabajadas * 20
    Sino
        sueldoTotal = (40 * 20) + ((horasTrabajadas - 40) * 25)
    FinSi
    
	Escribir "El sueldo semanal es: $", sueldoTotal
FinAlgoritmo