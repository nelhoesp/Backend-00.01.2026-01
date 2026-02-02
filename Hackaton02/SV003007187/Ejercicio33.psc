Ejercicio33

Algoritmo ContinuarSN_Validado
    Definir respuesta Como Caracter
    
    respuesta = "S"
    
    Mientras respuesta = "S" Hacer
        Escribir "=== PROGRAMA ACTIVO ==="
        
        // Tu código aquí
        Escribir "Realizando operaciones..."
        Escribir ""
        
        // Pedir respuesta válida
        Repetir
            Escribir "¿Continuar? (S/N):"
            Leer respuesta
            respuesta = Mayusculas(respuesta)
            
            Si respuesta <> "S" Y respuesta <> "N" Entonces
                Escribir "Error: Ingrese S o N"
            Fin Si
        Hasta Que respuesta = "S" O respuesta = "N"
        
    Fin Mientras
    
    Escribir "Programa finalizado."
    
FinAlgoritmo