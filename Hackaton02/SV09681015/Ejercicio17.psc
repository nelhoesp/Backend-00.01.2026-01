//17. Hacer un algoritmo en Pseint donde se ingrese una hora y nos calcule la hora dentro de un segundo.
Algoritmo HoraMasUnSegundo
    Definir horas, minutos, segundos Como Entero
    Definir valido Como Logico
    Definir h, m, s Como Cadena
	
    valido <- Falso
	
    // Validación de datos
    Mientras valido = Falso Hacer
        Escribir "Ingrese las horas (0 a 23):"
        Leer horas
        Escribir "Ingrese los minutos (0 a 59):"
        Leer minutos
        Escribir "Ingrese los segundos (0 a 59):"
        Leer segundos
		
        Si horas >= 0 Y horas < 24 Y minutos >= 0 Y minutos < 60 Y segundos >= 0 Y segundos < 60 Entonces
            valido <- Verdadero
        Sino
            Escribir "Hora invalida. Intente nuevamente."
        FinSi
    FinMientras
	
    // Sumar un segundo
    segundos <- segundos + 1
	
    Si segundos = 60 Entonces
        segundos <- 0
        minutos <- minutos + 1
    FinSi
	
    Si minutos = 60 Entonces
        minutos <- 0
        horas <- horas + 1
    FinSi
	
    Si horas = 24 Entonces
        horas <- 0
    FinSi
	
    // Formato xx:xx:xx
    Si horas < 10 Entonces
        h <- "0" + ConvertirATexto(horas)
    Sino
        h <- ConvertirATexto(horas)
    FinSi
	
    Si minutos < 10 Entonces
        m <- "0" + ConvertirATexto(minutos)
    Sino
        m <- ConvertirATexto(minutos)
    FinSi
	
    Si segundos < 10 Entonces
        s <- "0" + ConvertirATexto(segundos)
    Sino
        s <- ConvertirATexto(segundos)
    FinSi
	
    Escribir "La hora dentro de un segundo es: ", h, ":", m, ":", s
FinAlgoritmo

