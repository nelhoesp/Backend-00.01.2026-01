// 19. Hacer un algoritmo en Pseint para una heladería se tienen 4 tipos de empleados ordenados
//  de la siguiente forma con su número identificador y salario diario correspondiente:
//     Cajero (56$/día).
//     Servidor (64$/día).
//     Preparador de mezclas (80$/día).
//     Mantenimiento (48$/día).
//     El dueño de la tienda desea tener un programa donde sólo ingrese dos números enteros que 
//     representen al número identificador del empleado y la cantidad de días que trabajó en la 
//     semana (6 días máximos). Y el programa le mostrará por pantalla la cantidad de dinero que 
//     el dueño le debe pagar al empleado que ingresó
Algoritmo PagoEmpleadosHeladeria
    Definir identificador, diasTrabajados Como Entero
    Definir salarioDiario, totalPagar Como Real    
    Escribir "Ingrese el número identificador del empleado:"
    Escribir "1. Cajero"
    Escribir "2. Servidor"
    Escribir "3. Preparador de mezclas"
    Escribir "4. Mantenimiento"
    Leer identificador    
    Escribir "Ingrese la cantidad de días trabajados (máximo 6):"
    Leer diasTrabajados    
    Segun identificador Hacer
        1: salarioDiario = 56
        2: salarioDiario = 64
        3: salarioDiario = 80
        4: salarioDiario = 48
        De Otro Modo:
            salarioDiario = 0
            Escribir "Identificador no válido"
    FinSegun    
    Si diasTrabajados >= 1 Y diasTrabajados <= 6 Entonces
        totalPagar = salarioDiario * diasTrabajados
        Escribir "Total a pagar al empleado: $", totalPagar
    Sino
        Escribir "Cantidad de días no válida"
    FinSi
FinAlgoritmo
