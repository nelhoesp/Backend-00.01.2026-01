console.log("Inicio de la aplicacion");

let isPrendido = false;

console.log(typeof (isPrendido));

let arrHobies = ["Tocar el bajo", "Aeromodelismo", "Gunpla"];

for (let index = 0; index < arrHobies.length; index++) {
    const element = arrHobies[index];
    console.log(element)
}

for (let index = 0; index < 10; index++) {
    console.log(index)
}


let arrFormas = [true, "string", 44.99, [33, 55, 66]];

console.log(arrFormas[2])

console.log(arrFormas[3][2])

console.log(typeof (arrHobies));

let objPersona = {
    nombre: "Roberto",
    apellido: "Pineda",
    edad: 42,
    hobbies: [
        "Aeromodelismo",
        "Gunpla"
    ],
    padre: {
        nombre: "Rene",
        apellido: "Pineda"
    },
    madre: {
        nombre: "Miriam",
        apellido: "Lopez"
    }
};

console.log(objPersona.apellido)
console.log(objPersona.hobbies[1])

let edad = 52;

let terceraEdad = edad >= 50 ? "Estas viejo" : "Disfruta tu juventud";

console.log(edad >= 50 ? "Estas viejo" : "Disfruta tu juventud");

let fecha = new Date();

if (fecha.getDay() == 1) {
    console.log("Lunes")
}
if (fecha.getDay() == 2) {
    console.log("Martes")
}

switch (fecha.getDay()) {
    case 1:
        console.log("Lunes")
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("miercoles");
        break;
    case 4:
        console.log("Jueves de clases");
        break;
    default:
        console.log("Cualquier otro dia")
        break;
}

let semaforo = "amarillo";

switch (semaforo) {
    case "rojo":
        console.log("Detente")
        break;
    case "amarillo":
        console.log("Mira a todos lados ten cuidado");
        break;
    case "verde":
        console.log("Pasa");
        break;
    default:
        break;
}


let bandera = true;
let inicio = 190;

while (bandera) {
    console.log(`Este es el numero actual: ${inicio}`);
    inicio++;
    if (inicio === 200) {
        bandera = false;
    }
}

inicio = 0
bandera = true;

do {
    console.log(`Este es el numero actual: ${inicio}`);
    inicio++;
    if (inicio === 200) {
        bandera = false;
    }
} while (bandera);



document.getElementById("btnInicio").addEventListener("click", (e) => {
    e.preventDefault();
    console.log("Hizo click");

    let edad = prompt("Escribe tu edad")
    // alert(edad);
    Swal.fire({
        title: "Respuesta",
        text: edad,
        icon: "success"
    });
});



function ejercicio01() {

    console.log("Ejerciocio_N01 ");
    let strNumero = prompt("Ingresa tu numero");

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

let strNumero = prompt("Ingresa tu numero");

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