Ejercicio34

Algoritmo TablasMultiplicarCompletas
    Definir numero_tabla, multiplicador Como Entero
    
    Escribir "=== TABLAS DE MULTIPLICAR (1 al 9) ==="
    Escribir ""
    
    
    Para numero_tabla = 1 Hasta 9 Hacer
        Escribir ""
        Escribir "── Tabla del ", numero_tabla, " ──"
        
        // Para cada multiplicador del 1 al 10
        Para multiplicador = 1 Hasta 10 Hacer
            Escribir numero_tabla, " × ", multiplicador, " = ", numero_tabla * multiplicador
        Fin Para
        
    Fin Para
    
    Escribir ""
    Escribir " FIN DE LAS TABLAS "
    
FinAlgoritmo