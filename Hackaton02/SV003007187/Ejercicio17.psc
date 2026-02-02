 
Hacer un algoritmo en Pseint donde se ingrese una hora y nos calcule la hora dentro de un segundo.

 
Algoritmo HoraMasUnSegundo
    Definir hora, minutos, segundos Como Entero
	
	Escribir "Ingrese la hora (0-23):"
    Leer hora
    Escribir "Ingrese los minutos (0-59):"
    Leer minuto
    Escribir "Ingrese los segundos (0-59):"
    Leer segundo

	
	segundos<-segundos+1
	
	Si segundo = 60 Entonces
        segundo = 0
        minuto = minuto + 1
		
        Si minuto = 60 Entonces
            minuto = 0
            hora = hora + 1
			
            Si hora = 24 Entonces
                hora = 0
            FinSi
        FinSi
    FinSi
	
    Escribir "La hora un dentro de segundo después es: ", hora, ":", minutos, ":", segundos
FinAlgoritmo
	


