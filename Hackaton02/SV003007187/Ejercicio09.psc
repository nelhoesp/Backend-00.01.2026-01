 Ejercicio09

 Algoritmo AumentoSueldoSimple
    Definir salario, aumento, nuevo_salario Como Real
    
    Escribir "Ingrese salario actual: $"
    Leer salario
    
    Si salario > 2000 Entonces
        aumento = salario * 0.05  // 5% aumento
        Escribir "Aumento del 5%"
    Sino
        aumento = salario * 0.10  // 10% aumento
        Escribir "Aumento del 10%"
    Fin Si
    
    nuevo_salario = salario + aumento
    
    Escribir "Aumento: $", aumento
    Escribir "Nuevo salario: $", nuevo_salario
    
FinAlgoritmo