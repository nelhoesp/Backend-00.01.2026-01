// console.log("Inicio de la aplicacion");

// let isPrendido = false;

// console.log(typeof (isPrendido));

// let arrHobies = ["Tocar el bajo", "Aeromodelismo", "Gunpla"];

// for (let index = 0; index < arrHobies.length; index++) {
//     const element = arrHobies[index];
//     console.log(element)
// }

// for (let index = 0; index < 10; index++) {
//     console.log(index)
// }


// let arrFormas = [true, "string", 44.99, [33, 55, 66]];

// console.log(arrFormas[2])

// console.log(arrFormas[3][2])

// console.log(typeof (arrHobies));

// let objPersona = {
//     nombre: "Roberto",
//     apellido: "Pineda",
//     edad: 42,
//     hobbies: [
//         "Aeromodelismo",
//         "Gunpla"
//     ],
//     padre: {
//         nombre: "Rene",
//         apellido: "Pineda"
//     },
//     madre: {
//         nombre: "Miriam",
//         apellido: "Lopez"
//     }
// };

// console.log(objPersona.apellido)
// console.log(objPersona.hobbies[1])

// let edad = 52;

// let terceraEdad = edad >= 50 ? "Estas viejo" : "Disfruta tu juventud";

// console.log(edad >= 50 ? "Estas viejo" : "Disfruta tu juventud");

// let fecha = new Date();

// if (fecha.getDay() == 1) {
//     console.log("Lunes")
// }
// if (fecha.getDay() == 2) {
//     console.log("Martes")
// }

// switch (fecha.getDay()) {
//     case 1:
//         console.log("Lunes")
//         break;
//     case 2:
//         console.log("Martes");
//         break;
//     case 3:
//         console.log("miercoles");
//         break;
//     case 4:
//         console.log("Jueves de clases");
//         break;
//     default:
//         console.log("Cualquier otro dia")
//         break;
// }

// let semaforo = "amarillo";

// switch (semaforo) {
//     case "rojo":
//         console.log("Detente")
//         break;
//     case "amarillo":
//         console.log("Mira a todos lados ten cuidado");
//         break;
//     case "verde":
//         console.log("Pasa");
//         break;
//     default:
//         break;
// }


// let bandera = true;
// let inicio = 190;

// while (bandera) {
//     console.log(`Este es el numero actual: ${inicio}`);
//     inicio++;
//     if (inicio === 200) {
//         bandera = false;
//     }
// }

// inicio = 0
// bandera = true;

// do {
//     console.log(`Este es el numero actual: ${inicio}`);
//     inicio++;
//     if (inicio === 200) {
//         bandera = false;
//     }
// } while (bandera);



// document.getElementById("btnInicio").addEventListener("click", (e) => {
//     e.preventDefault();
//     console.log("Hizo click");

//     let edad = prompt("Escribe tu edad")
//     // alert(edad);
//     Swal.fire({
//         title: "Respuesta",
//         text: edad,
//         icon: "success"
//     });
// });


function ejercicio01() {

    console.log("Ejerciocio_N01 ");
    let titulo = "Hacer un algoritmo en Pseint que lea un número por el teclado y determinar si tiene tres digitos."
    let strNumero = prompt(titulo+"\n\n\n\nEscriba un numero para determinar si tiene 3 digitos :");

    let numero = Number.parseInt(strNumero);

    if (Number.isNaN(numero)) {
        Swal.fire({
            title: "Respuesta",
            text: "Debes digitar numeros no palabras",
            icon: "error"
        });
    } else {
        if (numero > 99 && numero < 1000) {
            Swal.fire({
                title: "Respuesta",
                text: "Si tiene 3 digitos",
                icon: "success"
            });
        }
        else {
            Swal.fire({
                title: "Respuesta",
                text: "No tiene 3 digitos",
                icon: "error"
            });
        }
    }
    console.log(typeof (numero))
    console.log(numero)

    console.log("Fin del ejercicio 01");
}

function ejercicio02(){
    console.log("Inicio del ejercicio 02");
    let titulo = "Hacer un algoritmo en Pseint que lea un número entero por el teclado y determinar si es negativo."
    let strNumero = prompt(titulo+"\n\n\n\nIngresa tu numero");

    let numero = Number.parseInt(strNumero);

    if (Number.isNaN(numero)) {
        Swal.fire({
            title: "Respuesta",
            text: "Debes digitar numeros no palabras",
            icon: "error"
        });
    } else {
        if (numero < 0 ) {
            Swal.fire({
                title: "Respuesta",
                text: "El numero es negativo",
                icon: "success"
            });
        }
        else {
            Swal.fire({
                title: "Respuesta",
                text: "El numero es positivo",
                icon: "success"
            });
        }
    }
    console.log(typeof (numero))
    console.log(numero)

    console.log("Fin del ejercicio 02")
}

function ejercicio03(){
    console.log("Inicio del ejercicio 03");
    let titulo = "Hacer un algoritmo en Pseint que lea un número y determinar si termina en 4."
    let strNumero = prompt(titulo+"\n\n\n\nIngresa tu numero");

    let numero = Number.parseInt(strNumero);

    if (Number.isNaN(numero)) {
        Swal.fire({
            title: "Respuesta",
            text: "Debes digitar numeros no palabras",
            icon: "error"
        });
    } else {
        if (numero % 10 === 4 ) {
            Swal.fire({
                title: "Respuesta",
                text: "SI termina en 4",
                icon: "success"
            });
        }
        else {
            Swal.fire({
                title: "Respuesta",
                text: "NO termina en 4",
                icon: "success"
            });
        }
    }
    console.log(typeof (numero))
    console.log(numero)

    console.log("Fin del ejercicio 03")
}

function ejercicio04(){
    console.log("Inicio del ejercicio 04");
    let titulo = "Hacer un algoritmo en Pseint que lea tres n�meros enteros y los muestre de menor a mayor."
    let n1 = Number.parseInt(prompt(titulo+"\n\n\n\nIngresa el primer numero "));
    let n2 = Number.parseInt(prompt(titulo+"\n\n\n\nIngresa el segundo numero "));
    let n3 = Number.parseInt(prompt(titulo+"\n\n\n\nIngresa el tercer numero "));
    let temp;
    let resultado;


    if (Number.isNaN(n1,n2,n3)) {
        Swal.fire({
            title: "Respuesta",
            text: "Debes digitar numeros no palabras",
            icon: "error"
        });
    } else {
        if (n1>n2 ) {
            temp=n1
            n1=n2
            n2=temp
            ;
        }
        if(n2 > n3){
            temp=n2
            n2=n3
            n3=temp
            ;
        }
        if(n1 > n2){
            temp=n1
            n1=n2
            n2=temp
            ;
        }
        resultado = [n1, n2, n3].join(", ");
        Swal.fire({
                title: "Respuesta",
                text: resultado,
                icon: "success"
            })
    }

    console.log("Fin del ejercicio 04")
}

function ejercicio05(){
    console.log("Inicio del ejercicio 05");
    let titulo = "Hacer un algoritmo en Pseint para una tienda de zapatos que tiene una promoci�n de descuento para vender al mayor\n\n	, esta depender� del n�mero de zapatos que se compren. Si son m�s de diez, se les dar� un 10% de descuento\n\n 	sobre el total de la compra; si el n�mero de zapatos es mayor de veinte pero menor de treinta, se le otorga un 20%\n\n	de descuento; y si son m�s treinta zapatos se otorgar� un 40% de descuento. El precio de cada zapato es de $80."
    let n = Number.parseInt(prompt(titulo+"\n\n\n\nIngresa la cantidad de zapatos "));

    let precioTotal= n * 80;
    let descuento;
    let totalFinal;
    let descTexto;


    if (Number.isNaN(n,precioTotal,descuento,totalFinal,descTexto)) {
        Swal.fire({
            title: "Respuesta",
            text: "Debes digitar numeros no palabras",
            icon: "error"
        });
    } else {
        if (n > 30 ) {
            descuento = precioTotal * 0.40
		    descTexto = "Descuento 40%"
            ;
        }
        else if(n > 20){
            descuento = precioTotal * 0.20
			descTexto = "Descuento 20%"
            ;
        }
        else if(n > 10){
            descuento = precioTotal * 0.10
			descTexto = "Descuento 10%"
            ;
        }else{
            descuento = 0
			descTexto = "Descuento 0%"
        }
        totalFinal = precioTotal - descuento;
        Swal.fire({
                title: "Se esta aplicando el "+descTexto,
                text: "Total a pagar: $"+totalFinal,
                icon: "success"
            })
    }

    console.log("Fin del ejercicio 05")
}

function ejercicio06(){
    console.log("Inicio del ejercicio 06");
    let titulo = "Hacer un algoritmo en Pseint para ayudar a un trabajador a saber cu�l ser� su sueldo semanal,\n\nse sabe que si trabaja 40 horas o menos, se le pagar� $20 por hora, pero si trabaja m�s de 40 horas\n\nentonces las horas extras se le pagar�n a $25 por hora."
    let n = Number.parseInt(prompt(titulo+"\n\n\n\nCuantas HORAS trabajo ? "));

    let sueldo;


    if (Number.isNaN(n,sueldo)) {
        Swal.fire({
            title: "Respuesta",
            text: "Debes digitar numeros no palabras",
            icon: "error"
        });
    } else {
        if (n > 40 ) {
            sueldo= 25
		    sueldo= sueldo * n
            ;
        }
        else {
            sueldo= 20
		    sueldo= sueldo * h
            ;
        }
        
        Swal.fire({
                title: "Tu sueldo es de $"+ sueldo,
                //text: "Total a pagar: $"+totalFinal,
                icon: "success"
            })
    }

    console.log("Fin del ejercicio 06")
}

function ejercicio07() {
    console.log("Inicio del ejercicio 07");

    let titulo =
        "Hacer un algoritmo para una tienda de helados que da descuentos\n" +
        "según el tipo de membresía:\n\n" +
        "Tipo A → 10%\n" +
        "Tipo B → 15%\n" +
        "Tipo C → 20%";

    let mem = prompt(titulo + "\n\n¿Qué tipo de membresía tiene? (A, B o C)");

    if (!mem) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un tipo de membresía",
            icon: "error"
        });
        return;
    }

    let memMayuscula = mem.toUpperCase();
    let desc;

    switch (memMayuscula) {
        case "A":
            desc = "Tiene un descuento de 10%";
            break;
        case "B":
            desc = "Tiene un descuento de 15%";
            break;
        case "C":
            desc = "Tiene un descuento de 20%";
            break;
        default:
            desc = "No tiene descuento";
    }
   if (memMayuscula !== "A" && memMayuscula !== "B" && memMayuscula !== "C") {

        Swal.fire({
        title: "Error",
        text: "Debe elegir una de las opciones (A,B,C)",
        icon: "error"
    });
    return;
    }
    Swal.fire({
        title: "Resultado",
        text: desc,
        icon: "success"
    });

    console.log("Fin del ejercicio 07");
}

function ejercicio08() {
    console.log("Inicio del ejercicio 08");

    let titulo = "Hacer un algoritmo en Pseint para calcular el promedio de tres notas y determinar si el estudiante aprob o no.\n";

    let n1 = Number.parseInt(prompt(titulo+"\n\n\n\nIngresa el primer numero"));
    let n2 = Number.parseInt(prompt(titulo+"\n\n\n\nIngresa el segundo numero"));   
    let n3 = Number.parseInt(prompt(titulo+"\n\n\n\nIngresa el tercer numero"));
    let promedio;

     if (Number.isNaN(n1,n2,n3,promedio)) {
        Swal.fire({
            title: "Respuesta",
            text: "Debes digitar numeros no palabras",
            icon: "error"
        });
        return;
        }
        promedio=(n1+n2+n3)/3
        if(promedio>=12){
            resultdo="APROBADO"
        }else{
            resultdo="DESAPROBADO"
        }
        Swal.fire({
                title: resultdo,
                text: "Nota : "+promedio,
                icon: "success"
            });

    
    console.log("Fin del ejercicio 08");
}

function ejercicio09() {
    console.log("Inicio del ejercicio 09");

    let titulo =
        "Hacer un algoritmo para determinar el aumento de un trabajador:\n\n" +
        "Si gana más de $2000 → aumento 5%\n" +
        "Si gana $2000 o menos → aumento 10%";

    let sueldo = Number.parseInt(prompt(titulo + "\n\nIngrese su sueldo actual:"));
    let aumento ;
    let total;
    if (Number.isNaN(sueldo,aumento,total)) {
        Swal.fire({
            title: "Error",
            text: "Debes digitar números, no palabras",
            icon: "error"
        });
        return;
    }
        if (sueldo <= 2000) {
        aumento = sueldo * 0.10;
    } else {
        aumento = sueldo * 0.05;
    }

    total = sueldo + aumento;

    Swal.fire({
        title: "Aumento : S/" + aumento,
        text: "Sueldo total: S/" + total,
        icon: "success"
    });

    console.log("Fin del ejercicio 09");
}

function ejercicio10() {
    console.log("Inicio del ejercicio 10");

    let titulo =
        "Hacer un algoritmo en Pseint que diga si un n�mero es par o impar.";

    let n = Number.parseInt(prompt(titulo + "\n\nIngrese un numero:"));

    if (Number.isNaN(n)) {
        Swal.fire({
            title: "Error",
            text: "Debes digitar números, no palabras",
            icon: "error"
        });
        return;
    }
    let resultado
    if (n%2===0) {
        resultado = "ES UN NUMERO PAR";
    } else {
         resultado = "ES UN NUMERO IMPAR";
    }
    
    Swal.fire({
        title: "Resultado",
        text: resultado,
        icon: "success"
    });

    console.log("Fin del ejercicio 10");
}

function ejercicio11() {
    console.log("Inicio del ejercicio 11");

    let titulo =
        "Hacer un algoritmo en Pseint que lea tres n�meros y diga cu�l es el mayor.";

    let n1 = Number.parseInt(prompt(titulo + "\n\nIngrese el primer numero:"));
    let n2 = Number.parseInt(prompt(titulo + "\n\nIngrese el segundo numero:"));
    let n3 = Number.parseInt(prompt(titulo + "\n\nIngrese el tercer numero:"));
    let m;
    m=n1;
    if (Number.isNaN(n1,n2,n3,m)) {
        Swal.fire({
            title: "Error",
            text: "Debes digitar números, no palabras",
            icon: "error"
        })
        return;
        
    }
     if(n2>m){
		m=n2
	}
	if( n3 >m ){
        m=n3
    }
		
    Swal.fire({
        title: "Resultado",
        text: "El numero mayor es :"+m,
        icon: "success"
    });

    console.log("Fin del ejercicio 11");
}

function ejercicio12() {
    console.log("Inicio del ejercicio 12");

    let titulo =
        "Hacer un algoritmo en Pseint que lea dos n�meros y diga cu�l es el mayor.";

    let n1 = Number.parseInt(prompt(titulo + "\n\nIngrese el primer numero:"));
    let n2 = Number.parseInt(prompt(titulo + "\n\nIngrese el segundo numero:"));
    let m;
    m=n1;
    if (Number.isNaN(n1,n2,m)) {
        Swal.fire({
            title: "Error",
            text: "Debes digitar números, no palabras",
            icon: "error"
        })
        return;
    }
     if(n2>m){
		m=n2
	}
		
    Swal.fire({
        title: "El numero mayor es :",
        text: m,
        icon: "success"
    });

    console.log("Fin del ejercicio 12");
}

function ejercicio13() {
    console.log("Inicio del ejercicio 13");

    let titulo =
        "Hacer un algoritmo en Pseint que lea una letra y diga si es una vocal.	";

    let n1 = (prompt(titulo + "\n\nIngrese una letra"));
    n1=n1.toUpperCase();
    let m;
    if (!n1) {
        Swal.fire({
            title: "Error",
            text: "Debes digitar números, no palabras",
            icon: "error"
        })
        return;
    }
    switch (n1) {

            case "A":
            m="SI es una Vocal"
            break;
            case "E":
            m="SI es una Vocal"
            break;
            case "I":
            m="SI es una Vocal"
            break;
            case "O":
            m="SI es una Vocal"
            break;
            case "U":
            m="SI es una Vocal"
            break;
        default:
            m="NO es una Vocal"
            break;
    }
		
    Swal.fire({
        title: m,
        //text: m,
        icon: "success"
    });

    console.log("Fin del ejercicio 13");
}

function ejercicio14() {
    console.log("Inicio del ejercicio 14");

    let titulo =
        "Hacer un algoritmo en Pseint que lea un entero positivo del 1 al 10 y al 9 y determine si es un n�mero primo.";

    let n1 = Number.parseInt(prompt(titulo + "\n\nIngrese un numero positivo del 1 al 10"));


    if (Number.isNaN(n1)) {
        Swal.fire({
            title: "Error",
            text: "Debes digitar números, no palabras",
            icon: "error"
        });
        return;
    }
    if (Number.isNaN(n1) || n1 < 1 || n1 > 10) {
        Swal.fire({
            title: "Error",
            text: "Ingrese un número válido del 1 al 10",
            icon: "error"
        });
        return;
    }
    let cont = 0;
    for (let i = 1; i<=n1; i++) {
        if (n1 % i === 0) {
        cont++;
        }       
    }
    let mensaje;

		if (cont=== 2){
            mensaje= "El numero "+ n1 + " SI es primo"
        }else{
            mensaje= "El numero "+ n1 + " NO es primo"
        }

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 14");
}

function ejercicio15() {
    console.log("Inicio del ejercicio 15");

    let titulo =
        "Hacer un algoritmo en Pseint que convierta cent�metros a pulgadas y libras a kilogramos";
    let titulo2 =
        "Que tipo de conversion desea realizar?\n"+
        "cm a pulgadas  ==>  A\n"+
        "libras a kg  ==>  B ";
    let n1 = (prompt(titulo + "\n\n "+ titulo2 +"\n\n Ingrese el tipo de conversion"));
    let n2 = Number.parseInt(prompt(titulo + "\n\n "+ titulo2 +"\n\n Ingrese el numero o cantidad a convertir"));

    if ((!n1)) {
        Swal.fire({
            title: "Error",
            text: "Debes digitar números, no palabras",
            icon: "error"
        });
        return;
    }
    if (Number.isNaN(n2)) {
        Swal.fire({
            title: "Error",
            text: "Debes registrar numero, no palabras",
            icon: "error"
        });
        return;
    }


    n1 = n1.toUpperCase();
    let resultado;
    switch (n1) {
        case "A":
            n2=n2*2.54;
			resultado = "La conversion de cm a pulgadas es igual a : "+ n2
            break;
        case "B":
            n2=n2*2.205;
            resultado = "La conversion de cm a pulgadas es igual a : "+ n2
            break;            
    
        default:

            resultado= "Error Marque otra opcion de conversion entre  (A y B)"
            break;
    }   
    
    Swal.fire({
        title: "Resultado",
        text: resultado,
        icon: "success"
    });

    console.log("Fin del ejercicio 15");
}

function ejercicio16() {
    console.log("Inicio del ejercicio 16");

    let n = Number(prompt("Escriba un número del 1 al 7"));

    if (Number.isNaN(n)) {
        alert("Debe ingresar un número válido");
        return;
    }

    let mensaje;

    switch (n) {
        case 1:
            mensaje = "El día es Lunes";
            break;
        case 2:
            mensaje = "El día es Martes";
            break;
        case 3:
            mensaje = "El día es Miércoles";
            break;
        case 4:
            mensaje = "El día es Jueves";
            break;
        case 5:
            mensaje = "El día es Viernes";
            break;
        case 6:
            mensaje = "El día es Sábado";
            break;
        case 7:
            mensaje = "El día es Domingo";
            break;
        default:
            mensaje = "Fuera de rango";
    }

     Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 16");
}

function ejercicio17() {
    console.log("Inicio del ejercicio 17");

    let n = prompt("Escriba la hora para la conversión en segundos");

    if (!n) {
        Swal.fire({
            title: "Error",
            text: "No se permiten valores vacíos",
            icon: "error"
        });
        return;
    }

    let h = Number(n);

   
    if (Number.isNaN(h)) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un número válido",
            icon: "error"
        });
        return;
    }

    let segundos = h * 3600;

    let mensaje = `El valor en segundos es: ${segundos}`;

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 17");
}

function ejercicio18() {
    console.log("Inicio del ejercicio 18");

    let n = Number.parseInt(prompt("Escriba la cantidad de CDs que desea comprar"));

    if (!n) {
        Swal.fire({
            title: "Error",
            text: "No se permiten valores vacíos",
            icon: "error"
        });
        return;
    }

    let precioUnitario;

    if (n <= 9) {
        precioUnitario = 10;
    } else if (n <= 99) {
        precioUnitario = 8;
    } else if (n <= 499) {
        precioUnitario = 7;
    } else {
        precioUnitario = 6;
    }

    let total = n * precioUnitario;
    let ganancia = total * 0.0825;

    let mensaje =
        `Cantidad de CDs: ${n}\n` +
        `Precio unitario: S/${precioUnitario}\n` +
        `Total a pagar: S/${total}\n` +
        `Ganancia del vendedor: S/${ganancia.toFixed(2)}`;

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 18");
}

function ejercicio19() {
    console.log("Inicio del ejercicio 19");

    let n = Number.parseInt(prompt(
        "¿Qué tipo de empleado es?\n\n" +
        "1 = CAJERO\n" +
        "2 = SERVIDOR\n" +
        "3 = PREPARADOR DE MEZCLAS\n" +
        "4 = MANTENIMIENTO\n\n" +
        "Ingrese el número del empleado:")
    );

    if (Number.isNaN(n)) {
        Swal.fire({
            title: "Error",
            text: "El tipo de empleado debe ser numérico",
            icon: "error"
        });
        return;
    }

    let d = Number.parseInt(prompt("¿Cuántos días trabajó en la semana? (máximo 6)"));

    if (Number.isNaN(d)) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar la cantidad de días trabajados",
            icon: "error"
        });
        return;
    }

    if (Number.isNaN(d) || d < 1 || d > 6) {
        Swal.fire({
            title: "Error",
            text: "Los días deben estar entre 1 y 6",
            icon: "error"
        });
        return;
    }

    let subtotal;
    let mensaje;

    switch (n) {
        case 1:
            subtotal = 56 * d;
            mensaje = `El CAJERO tiene un sueldo de: S/${subtotal}`;
            break;

        case 2:
            subtotal = 64 * d;
            mensaje = `El SERVIDOR tiene un sueldo de: S/${subtotal}`;
            break;

        case 3:
            subtotal = 80 * d;
            mensaje = `El PREPARADOR DE MEZCLAS tiene un sueldo de: S/${subtotal}`;
            break;

        case 4:
            subtotal = 48 * d;
            mensaje = `El MANTENIMIENTO tiene un sueldo de: S/${subtotal}`;
            break;

        default:
            Swal.fire({
                title: "Error",
                text: "Debe elegir un número válido (1, 2, 3 o 4)",
                icon: "error"
            });
            return;
    }

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 19");
}

function ejercicio20() {
    console.log("Inicio del ejercicio 20");
    let titulo= "Hacer un algoritmo en Pseint que que lea 4 n�meros enteros positivos y verifique y "+
    "realice las siguientes operaciones:"+
    "�Cu�ntos n�meros son Pares?"+
    "�Cu�l es el mayor de todos?"+
    "Si el tercero es par, calcular el cuadrado del segundo.		"+
    "Si el primero es menor que el cuarto, calcular la media de los 4 n�meros."+
    "Si el segundo es mayor que el tercero, verificar si el tercero esta comprendido entre los valores 50 y 700. "+
    "Si cumple se cumple la segunda condici�n, calcular la suma de los 4 n�meros."

    let n1 = Number.parseInt(prompt(titulo +"\n\nIngrese el primer número:"));
    let n2 = Number.parseInt(prompt(titulo +"Ingrese el segundo número:"));
    let n3 = Number.parseInt(prompt(titulo +"Ingrese el tercer número:"));
    let n4 = Number.parseInt(prompt(titulo +"Ingrese el cuarto número:"));

    if (
        Number.isNaN(n1,n2,n3,n4)) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar solo números válidos",
            icon: "error"
        });
        return;
    }

    let pares = 0;

    if (n1 % 2 === 0) pares++;
    if (n2 % 2 === 0) pares++;
    if (n3 % 2 === 0) pares++;
    if (n4 % 2 === 0) pares++;

    let mayor = n1;

    if (n2 > mayor) mayor = n2;
    if (n3 > mayor) mayor = n3;
    if (n4 > mayor) mayor = n4;

    let mensaje = "";
    mensaje += "Cantidad de números pares: " + pares + "\n";
    mensaje += "El número mayor es: " + mayor + "\n";

    if (n3 % 2 === 0) {
        mensaje += "El cuadrado del segundo número es: " + (n2 * n2) + "\n";
    }

    if (n1 < n4) {
        let media = (n1 + n2 + n3 + n4) / 4;
        mensaje += "La media de los 4 números es: " + media + "\n";
    }

    if (n2 > n3 && n3 >= 50 && n3 <= 700) {
        let suma = n1 + n2 + n3 + n4;
        mensaje += "La suma de los 4 números es: " + suma + "\n";
    }

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 20");
}

function ejercicio21() {
    console.log("Inicio del ejercicio 21");

    let num = Number.parseInt(prompt("Ingrese un número:"));

    if (Number.isNaN(num)) {
        Swal.fire({
            title: "Error",
            text: "No se permiten valores vacíos",
            icon: "error"
        });
        return;
    }


    if (num < 0) {
        Swal.fire({
            title: "Error",
            text: "No se puede calcular el factorial de un número negativo",
            icon: "error"
        });
        return;
    }

    let factorial = 1;

    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }

    let mensaje = `El factorial de ${num} es: ${factorial}`;

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 21");
}

function ejercicio22() {
    console.log("Inicio del ejercicio 22");

    let n = Number.parseInt(prompt("Ingrese la cantidad de números a sumar:"));

    if (Number.isNaN(n)) {
        Swal.fire({
            title: "Error",
            text: "No se permiten valores vacíos",
            icon: "error"
        });
        return;
    }

    let suma = 0;

    for (let i = 1; i <= n; i++) {
        suma += i;
    }

    let mensaje = `La suma de los primeros ${n} números es: ${suma}`;

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 22");
}

function ejercicio23() {
    console.log("Inicio del ejercicio 23");

    let n = Number.parseInt(prompt("Ingrese un número entero positivo:"));

    if (Number.isNaN(n)) {
        Swal.fire({
            title: "Error",
            text: "No se permiten valores vacíos",
            icon: "error"
        });
        return;
    }

    let suma = 0;

    for (let i = 1; i <= n; i++) {
        if (i % 2 !== 0) {
            suma += i;
        }
    }

    let mensaje = `La suma de los números impares menores o iguales a ${n} es: ${suma}`;

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 23");
}

function ejercicio24() {
    console.log("Inicio del ejercicio 24");

    let suma = 0;

    for (let i = 2; i <= 1000; i += 2) {
        suma += i;
    }

    let mensaje = `La suma de los números pares hasta 1000 es: ${suma}`;

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 24");
}

function ejercicio25() {
    console.log("Inicio del ejercicio 25");

    let num = Number.parseInt(prompt("Ingrese un número:"));

    if (Number.isNaN(num)) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un número válido",
            icon: "error"
        });
        return;
    }

    if (num < 0) {
        Swal.fire({
            title: "Error",
            text: "No se puede calcular el factorial de un número negativo",
            icon: "error"
        });
        return;
    }

    let factorial = 1;
    let temp = num; 

    while (temp > 1) {
        factorial *= temp;
        temp--;
    }

    let mensaje = `El factorial de ${num} es: ${factorial}`;

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 25");
}

function ejercicio26() {
    console.log("Inicio del ejercicio 26");

    let dividendo = Number.parseInt(prompt("Ingrese el dividendo:"));
    let divisor = Number.parseInt(prompt("Ingrese el divisor:"));

    if (Number.isNaN(dividendo,divisor)) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar solo números válidos",
            icon: "error"
        });
        return;
    }

    if (divisor === 0) {
        Swal.fire({
            title: "Error",
            text: "No se puede dividir entre cero",
            icon: "error"
        });
        return;
    }

    let cociente = 0;
    let resto = dividendo;
    while (resto >= divisor) {
        resto -= divisor;
        cociente++;
    }

    let mensaje =
        `Dividendo: ${dividendo}\n` +
        `Divisor: ${divisor}\n` +
        `Cociente: ${cociente}\n` +
        `Resto: ${resto}`;

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 26");
}

function ejercicio27() {
    console.log("Inicio del ejercicio 27");

    let suma = 0;
    let contador = 0;

    let num = Number(prompt("Ingrese un número positivo (negativo para terminar):"));

    if (Number.isNaN(num)) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar solo números",
            icon: "error"
        });
        return;
    }

    while (num >= 0) {
        suma += num;
        contador++;

        num = Number(prompt("Ingrese otro número (negativo para terminar):"));

        if (Number.isNaN(num)) {
            Swal.fire({
                title: "Error",
                text: "Debe ingresar solo números",
                icon: "error"
            });
            return;
        }
    }

    let mensaje;

    if (contador > 0) {
        let media = suma / contador;
        mensaje = "La media es: " + media;
    } else {
        mensaje = "No se ingresaron números positivos.";
    }

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 27");
}

function ejercicio28() {
    console.log("Inicio del ejercicio 28");

    let i = 1;
    let suma = 0;

    do {
        suma += i;
        i++;
    } while (i <= 100);

    Swal.fire({
        title: "Resultado",
        text: "La suma de los primeros 100 números es: " + suma,
        icon: "success"
    });

    console.log("Fin del ejercicio 28");
}

function ejercicio29() {
    console.log("Inicio del ejercicio 29");

    let i = 1;
    let suma = 0;

    while (i <= 100) {
        suma += i;
        i++;
    }

    Swal.fire({
        title: "Resultado",
        text: "La suma de los primeros 100 números es: " + suma,
        icon: "success"
    });

    console.log("Fin del ejercicio 29");
}

function ejercicio30() {
    console.log("Inicio del ejercicio 30");

    let suma = 0;

    for (let i = 1; i <= 100; i++) {
        suma += i;
    }

    Swal.fire({
        title: "Resultado",
        text: "La suma de los primeros 100 números es: " + suma,
        icon: "success"
    });

    console.log("Fin del ejercicio 30");
}

function ejercicio31() {
    console.log("Inicio del ejercicio 31");

    let sumaPares = 0;
    let sumaImpares = 0;
    let contPares = 0;
    let contImpares = 0;

    for (let i = 1; i <= 10; i++) {
        let num = Number.parseInt(prompt("Ingrese el número " + i + ":"));

        if (Number.isNaN(num)) {
            Swal.fire({
                title: "Error",
                text: "Debe ingresar solo números",
                icon: "error"
            });
            return;
        }

        if (num % 2 === 0) {
            sumaPares += num;
            contPares++;
        } else {
            sumaImpares += num;
            contImpares++;
        }
    }

    let mensaje = "";

    if (contPares > 0) {
        let mediaPares = sumaPares / contPares;
        mensaje += "Media de números pares: " + mediaPares + "\n";
    } else {
        mensaje += "No se ingresaron números pares\n";
    }

    if (contImpares > 0) {
        let mediaImpares = sumaImpares / contImpares;
        mensaje += "Media de números impares: " + mediaImpares;
    } else {
        mensaje += "No se ingresaron números impares";
    }

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 31");
}

function ejercicio32() {
    console.log("Inicio del ejercicio 32");

    let mayorPoblacion = 0;
    let ciudadMayor = "";
    let provinciaMayor = "";

    for (let i = 1; i <= 11; i++) {
        let provincia = prompt("Ingrese la provincia de la ciudad " + i + ":");
        let ciudad = prompt("Ingrese el nombre de la ciudad " + i + ":");
        let poblacion = Number.parseInt(prompt("Ingrese la población de " + ciudad + ":"));

        if (!provincia || !ciudad || Number.isNaN(poblacion) || poblacion < 0) {
            Swal.fire({
                title: "Error",
                text: "Datos inválidos. Intente nuevamente.",
                icon: "error"
            });
            return;
        }

        if (poblacion > mayorPoblacion) {
            mayorPoblacion = poblacion;
            ciudadMayor = ciudad;
            provinciaMayor = provincia;
        }
    }

    Swal.fire({
        title: "Resultado",
        text:
            "Ciudad con mayor población: " + ciudadMayor + "\n" +
            "Provincia: " + provinciaMayor + "\n" +
            "Población: " + mayorPoblacion,
        icon: "success"
    });

    console.log("Fin del ejercicio 32");
}

function ejercicio33() {
    console.log("Inicio del ejercicio 33");

    let tipo;

    do {
        Swal.fire({
            title: "Programa en ejecución",
            text: "El programa está en ejecución...",
            icon: "info"
        });

        tipo = prompt("¿Desea continuar? (S/N)");

        if (!tipo) {
            Swal.fire({
                title: "Error",
                text: "Debe ingresar S o N",
                icon: "error"
            });
            continue;
        }

        tipo = tipo.toUpperCase();

        if (tipo !== "S" && tipo !== "N") {
            Swal.fire({
                title: "Error",
                text: "Opción inválida. Ingrese S o N",
                icon: "error"
            });
        }

    } while (tipo !== "N");

    Swal.fire({
        title: "Programa finalizado",
        text: "El programa ha terminado correctamente.",
        icon: "success"
    });

    console.log("Fin del ejercicio 33");
}

function ejercicio34() {
    console.log("Inicio del ejercicio 34");

    let mensaje = "";

    for (let i = 0; i <= 9; i++) {
        mensaje += "9 x " + i + " = " + (i * 9) + "\n";
    }

    Swal.fire({
        title: "Tabla del 9",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 34");
}

function ejercicio35() {
    console.log("Inicio del ejercicio 35");

    let mayor, menor;

    for (let i = 1; i <= 20; i++) {
        let num = Number.parseInt(prompt("Ingrese el número " + i + ":"));

        if (Number.isNaN(num)) {
            Swal.fire({
                title: "Error",
                text: "Debe ingresar solo números",
                icon: "error"
            });
            return;
        }

        if (i === 1) {
            mayor = num;
            menor = num;
        } else {
            if (num > mayor) {
                mayor = num;
            }
            if (num < menor) {
                menor = num;
            }
        }
    }

    Swal.fire({
        title: "Resultado",
        text:
            "Número mayor: " + mayor + "\n" +
            "Número menor: " + menor,
        icon: "success"
    });

    console.log("Fin del ejercicio 35");
}

function ejercicio36() {
    console.log("Inicio del ejercicio 36");

    let a = 0;
    let b = 1;
    let c;
    let mensaje = "";

    for (let i = 1; i <= 10; i++) {
        mensaje += a + "\n";
        c = a + b;
        a = b;
        b = c;
    }

    Swal.fire({
        title: "Serie de Fibonacci",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 36");
}

function ejercicio37() {
    console.log("Inicio del ejercicio 37");

    let n1 = Number.parseInt(prompt("Escriba el dividendo:"));
    let n2 = Number.parseInt(prompt("Escriba el divisor:"));

    if (Number.isNaN(n1,n2)) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar números válidos y el divisor no puede ser cero",
            icon: "error"
        });
        return;
    }

    let resultado;

    do {
        resultado = n1 % n2;
        n1 = n2;
        n2 = resultado;
    } while (resultado !== 0);

    Swal.fire({
        title: "Resultado",
        text: "El M.C.D es: " + n1,
        icon: "success"
    });

    console.log("Fin del ejercicio 37");
}

function ejercicio38() {
    console.log("Inicio del ejercicio 38");

    let num = Number(prompt("Ingrese un número:"));

    if (Number.isNaN(num) || num <= 0) {
        Swal.fire({
            title: "Error",
            text: "Debe ingresar un número entero positivo",
            icon: "error"
        });
        return;
    }

    let suma = 0;

    for (let i = 1; i <= num - 1; i++) {
        if (num % i === 0) {
            suma += i;
        }
    }

    let mensaje;
    if (suma === num) {
        mensaje = num + " es un número perfecto.";
    } else {
        mensaje = num + " no es un número perfecto.";
    }

    Swal.fire({
        title: "Resultado",
        text: mensaje,
        icon: "success"
    });

    console.log("Fin del ejercicio 38");
}

function ejercicio39() {
    console.log("Inicio del ejercicio 39");

    let pi = 0;
    let signo = 1;

    for (let i = 1; i <= 19; i += 2) {
        pi += signo * (4 / i);
        signo *= -1;
    }

    Swal.fire({
        title: "Resultado",
        text: "Aproximación de PI: " + pi,
        icon: "success"
    });

    console.log("Fin del ejercicio 39");
}

function ejercicio40() {
    console.log("Inicio del ejercicio 40");

    let pii = 3;
    let signo = 1;

    for (let i = 2; i <= 20; i += 2) {
        pii += signo * (4 / (i * (i + 1) * (i + 2)));
        signo *= -1; 
    }

    Swal.fire({
        title: "Resultado",
        text: "Aproximación de PI: " + pii,
        icon: "success"
    });

    console.log("Fin del ejercicio 40");
}







