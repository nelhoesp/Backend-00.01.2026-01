function showTab(index) {
    const tabs = document.querySelectorAll(".tab");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(t => t.classList.remove("active"));
    contents.forEach(c => c.classList.remove("active"));

    tabs[index].classList.add("active");
    contents[index].classList.add("active");
}
function limpiarTodo() {
    // Limpiar todos los inputs
    const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
    inputs.forEach(input => input.value = '');
    
    // Limpiar todos los divs de resultado
    const resultados = document.querySelectorAll('.resultado, [id^="r"]');
    resultados.forEach(resultado => {
        if (resultado.tagName === 'TABLE') {
            resultado.innerHTML = ''; // Para tablas
        } else {
            resultado.textContent = ''; // Para divs normales
        }
    });
    
    console.log('Campos limpiados');
}

//-- EJERCICIO 1 --//
function ej1() {
    let n;
    n = Number(document.getElementById("e1").value);

    if (n >= 100 && n <= 999) {
        document.getElementById("r1").textContent = "Tiene tres dígitos";
    } else {
        if (n <= -100 && n >= -999) {
            document.getElementById("r1").textContent = "Tiene tres dígitos";
        } else {
            document.getElementById("r1").textContent = "No tiene tres dígitos";
        }
    }
}

//-- EJERCICIO 2 --//
function ej2() {
    let n;
    n = Number(document.getElementById("e2").value);

    if (n < 0) {
        document.getElementById("r2").textContent = "Es negativo";
    } else {
        document.getElementById("r2").textContent = "No es negativo";
    }
}

//-- EJERCICIO 3 --//
function ej3() {
    let n;
    let ultimo;
    n = Number(document.getElementById("e3").value);

    if (n < 0) {
        n = n * -1;
    }
    ultimo = n % 10;
    if (ultimo == 4) {
        document.getElementById("r3").textContent = "Termina en 4";
    } else {
        document.getElementById("r3").textContent = "No termina en 4";
    }
}

//-- EJERCICIO 4 --//
function ej4() {
    let a = Number(e4a.value);
    let b = Number(e4b.value);
    let c = Number(e4c.value);
    let x;

    if (a > b) { x = a; a = b; b = x; }
    if (a > c) { x = a; a = c; c = x; }
    if (b > c) { x = b; b = c; c = x; }

    r4.textContent = "Ordenados: " + a + ", " + b + ", " + c;
}

//-- EJERCICIO 5 --//
function ej5() {
    const c = Number(e5.value);
    const precio = 80;
    let desc = 0;
    if (c > 30) desc = 0.40;
    else if (c > 20) desc = 0.20;
    else if (c > 10) desc = 0.10;
    const total = c * precio * (1 - desc);
    r5.textContent = `Total a pagar: $${total.toFixed(2)}`;
}
//-- EJERCICIO 6 --//
function ej6() {
    const h = Number(e6.value);
    let sueldo;

    if (h <= 40) sueldo = h * 20;
    else sueldo = 40 * 20 + (h - 40) * 25;

    r6.textContent = `Sueldo semanal: $${sueldo}`;
}
//-- EJERCICIO 7 --//
function ej7() {
    let m;
    let t;
    let d;
    let total;
    m = Number(e7m.value);
    t = e7t.value.toUpperCase();
    d = 0;
    if (t !== "A" && t !== "B" && t !== "C") {
        r7.textContent = "Error: el tipo debe ser A, B o C";
        return;
    }
    if (t === "A") {
        d = 0.10;
    }
    if (t === "B") {
        d = 0.15;
    }
    if (t === "C") {
        d = 0.20;
    }
    total = m - (m * d);
    r7.textContent = "Total: $" + total.toFixed(2);
}

//-- EJERCICIO 8 --//
function ej8() {
    const a = Number(e8a.value);
    const b = Number(e8b.value);
    const c = Number(e8c.value);

    if (
        a < 0 || a > 20 ||
        b < 0 || b > 20 ||
        c < 0 || c > 20
    ) {
        r8.textContent = "Las notas deben estar entre 0 y 20";
        return;
    }

    const p = (a + b + c) / 3;
    const pr = p.toFixed(1);

    r8.textContent = p >= 11
        ? `Aprobado con ${pr}`
        : `Desaprobado con ${pr}`;
}
//-- EJERCICIO 9 --//
function ej9() {
    let sueldo;
    let aumento;
    let nuevoSueldo;
    sueldo = Number(e9.value);
    if (sueldo > 2000) {
        aumento = sueldo * 0.05;
    } else {
        aumento = sueldo * 0.10;
    }
    nuevoSueldo = sueldo + aumento;
    r9.textContent = "Nuevo sueldo: $" + nuevoSueldo.toFixed(2);
}

//-- EJERCICIO 10 --//
function ej10() {
    let n;
    n = Number(e10.value);
    if (n % 2 == 0) {
        r10.textContent = n + " Es par";
    } else {
        r10.textContent = n + " Es impar";
    }
}

//-- EJERCICIO 11 --//
function ej11() {
    const a = Number(e11a.value);
    const b = Number(e11b.value);
    const c = Number(e11c.value);
    let mayor;
    if (a >= b && a >= c) {
        mayor = a;
    } else if (b >= a && b >= c) {
        mayor = b;
    } else {
        mayor = c;
    }
    r11.textContent = "El numero Mayor es : " + mayor;
}

//-- EJERCICIO 12 --//
function ej12() {
    const a = Number(e12a.value);
    const b = Number(e12b.value);

    if (a > b) {
        r12.textContent = "El numero Mayor es: " + a;
    } else {
        r12.textContent = "El numero Mayor es: " + b;
    }
}
//-- EJERCICIO 13 --//
function ej13() {
    const l = e13.value.toLowerCase();

    if (l === "a" || l === "e" || l === "i" || l === "o" || l === "u") {
        r13.textContent = l + " Es vocal";
    } else {
        r13.textContent = l + " No es vocal";
    }
}

//-- EJERCICIO 14 --//
function ej14() {
    const n = Number(e14.value);
    let d = 0;

    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            d++;
        }
    }

    if (d === 2) {
        r14.textContent = n + " Es primo";
    } else {
        r14.textContent = n + " No es primo";
    }
}
//-- EJERCICIO 15 --//
function ej15() {
    const cm = Number(e15c.value);
    const lb = Number(e15l.value);

    let pulgadas = cm / 2.54;
    let kilos = lb * 0.453;

    pulgadas = Math.round(pulgadas * 100) / 100;
    kilos = Math.round(kilos * 100) / 100;

    r15.textContent = pulgadas + " pulgadas | " + kilos + " kg";
}

//-- EJERCICIO 16 --//
function ej16() {
    const n = Number(e16.value);
    if (n === 1) {
        r16.textContent = "Lunes";
    } else if (n === 2) {
        r16.textContent = "Martes";
    } else if (n === 3) {
        r16.textContent = "Miércoles";
    } else if (n === 4) {
        r16.textContent = "Jueves";
    } else if (n === 5) {
        r16.textContent = "Viernes";
    } else if (n === 6) {
        r16.textContent = "Sábado";
    } else if (n === 7) {
        r16.textContent = "Domingo";
    } else {
        r16.textContent = "Número inválido";
    }
}

//-- EJERCICIO 17 --//
function ej17() {
    let hh = Number(h.value);
    let mm = Number(m.value);
    let ss = Number(s.value);

    // Validar que los valores sean números válidos
    if (isNaN(hh) || isNaN(mm) || isNaN(ss)) {
        r17.textContent = "Error: Ingrese valores numéricos válidos";
        return;
    }

    if (hh < 0 || hh > 23) {
        r17.textContent = "Error: Las horas deben estar entre 0 y 23";
        return;
    }
    if (mm < 0 || mm > 59) {
        r17.textContent = "Error: Los minutos deben estar entre 0 y 59";
        return;
    }
    if (ss < 0 || ss > 59) {
        r17.textContent = "Error: Los segundos deben estar entre 0 y 59";
        return;
    }

    ss = ss + 1;
    if (ss === 60) {
        ss = 0;
        mm = mm + 1;
    }
    if (mm === 60) {
        mm = 0;
        hh = hh + 1;
    }
    if (hh === 24) {
        hh = 0;
    }

    if (hh < 10) {
        hh = "0" + hh;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    if (ss < 10) {
        ss = "0" + ss;
    }

    r17.textContent = hh + ":" + mm + ":" + ss;
}

//-- EJERCICIO 18 --//
function ej18() {
    const c = e18.value;
    let p = 10;
    if (c >= 10 && c <= 99) p = 8;
    else if (c >= 100 && c <= 499) p = 7;
    else if (c >= 500) p = 6;

    const total = c * p;
    const gan = (total * 0.0825).toFixed(2);
    r18.textContent = `Total: $${total} | Ganancia: $${gan}`;
}
//-- EJERCICIO 19 --//
function ej19() {
    const tipo = Number(e19t.value);
    const dias = Number(e19d.value);
    let salario = 0;
    let pago = 0;

    if (tipo === 1) {
        salario = 56;
    } else if (tipo === 2) {
        salario = 64;
    } else if (tipo === 3) {
        salario = 80;
    } else if (tipo === 4) {
        salario = 48;
    } else {
        r19.textContent = "Tipo de empleado inválido";
        return;
    }
    if (dias < 0 || dias > 6) {
        r19.textContent = "Cantidad de días inválida";
        return;
    }
    pago = salario * dias;
    r19.textContent = "Pago: $" + pago;
}

//-- EJERCICIO 20 --//
function ej20() {
    const a = +a20.value, b = +b20.value, c = +c20.value, d = +d20.value;
    let pares = [a, b, c, d].filter(x => x % 2 == 0).length;
    let mayor = Math.max(a, b, c, d);
    let res = `Pares: ${pares}, Mayor: ${mayor}`;

    if (c % 2 == 0) res += `, Cuadrado 2°: ${b * b}`;
    if (a < d) res += `, Media: ${(a + b + c + d) / 4}`;
    if (b > c && c >= 50 && c <= 700) res += `, Suma: ${a + b + c + d}`;

    r20.textContent = res;
}
//-- EJERCICIO 21 --//
function ej21() {
    let n = Number(e21.value);
    let f = 1;
    let i;
    for (i = 1; i <= n; i = i + 1) {
        f = f * i;
    }
    r21.textContent = "Factorial (" + n + "): " + f;
}

//-- EJERCICIO 22 --//
function ej22() {
    let n = Number(e22.value);
    let s = 0;
    let i = 1;
    while (i <= n) {
        s = s + i;
        i = i + 1;
    }
    r22.textContent = "Suma (" + n + "): " + s;
}

//-- EJERCICIO 23 --//
function ej23() {
    let n = Number(e23.value);
    let s = 0;
    let i = 1;
    while (i <= n) {
        if (i % 2 !== 0) {
            s = s + i;
        }
        i = i + 1;
    }
    r23.textContent = "Suma impares: " + s;
}

//-- EJERCICIO 24 --//
function ej24() {
    let s = 0;
    let i = 1;
    while (i <= 1000) {
        if (i % 2 === 0) {
            s = s + i;
        }
        i = i + 1;
    }
    r24.textContent = "Suma pares: " + s;
}
//-- EJERCICIO 25 --//
function ej25() {
    let n = Number(e25.value);
    let f = 1;
    while (n > 0) {
        f = f * n;
        n = n - 1;
    }
    r25.textContent = "Factorial: " + f;
}
//-- EJERCICIO 26 --//
function ej26() {
    let a = Number(e26a.value);
    let b = Number(e26b.value);
    let c = 0;
    while (a >= b) {
        a = a - b;
        c = c + 1;
    }
    r26.textContent = "Cociente: " + c + " | Resto: " + a;
}
//-- EJERCICIO 27 --//
let suma27 = 0, cont27 = 0;
function ej27() {
    const n = +e27.value;
    if (n < 0) {
        r27.textContent = "Media: " + (suma27 / cont27).toFixed(2);
        suma27 = 0; cont27 = 0;
    } else {
        suma27 += n; cont27++;
        r27.textContent = "Ingresados: " + cont27;
    }
}
//-- EJERCICIO 28 --//
function ej28() {
    let i = 1;
    let s = 0;
    do {
        s = s + i;
        i = i + 1;
    } while (i <= 100);
    r28.textContent = "Suma: " + s;
}
//-- EJERCICIO 29 --//
function ej29() {
    let i = 1;
    let s = 0;
    while (i <= 100) {
        s = s + i;
        i = i + 1;
    }
    r29.textContent = "Suma: " + s;
}

//-- EJERCICIO 30 --//
function ej30() {
    let s = 0;
    for (let i = 1; i <= 100; i = i + 1) {
        s = s + i;
    }
    r30.textContent = "Suma: " + s;
}

//-- EJERCICIO 31 --//
let arr31 = [];
function gen31() {
    arr31 = [];
    let i = 0;
    let texto = "";
    let n;
    while (i < 10) {
        n = Math.random() * 100;
        n = n - (n % 1);
        n = n + 1;
        arr31[i] = n;
        if (i === 0) {
            texto = n;
        } else {
            texto = texto + ", " + n;
        }
        i = i + 1;
    }
    nums31.textContent = "Números: " + texto;
    r31.textContent = "";
}

function ej31() {
    if (arr31.length !== 10) {
        r31.textContent = "Primero genere los 10 números";
        return;
    }
    let sp = 0, si = 0, cp = 0, ci = 0;
    for (let n of arr31) {
        if (n % 2 === 0) {
            sp += n;
            cp++;
        } else {
            si += n;
            ci++;
        }
    }
    r31.textContent =
        `Media pares: ${(sp / cp || 0).toFixed(2)} | ` +
        `Media impares: ${(si / ci || 0).toFixed(2)}`;
}

//-- EJERCICIO 32 --//
const datos = [
    { prov: "Piura", ciudad: "Catacaos", poblacion: 40000 },
    { prov: "Piura", ciudad: "Tambogrande", poblacion: 25000 },
    { prov: "Piura", ciudad: "La Union", poblacion: 19000 },
    { prov: "Piura", ciudad: "La Arena", poblacion: 25000 },

    { prov: "Lambayeque", ciudad: "Lambayeque (Capital)", poblacion: 60870 },
    { prov: "Lambayeque", ciudad: "Motupe", poblacion: 16738 },
    { prov: "Lambayeque", ciudad: "Olmos", poblacion: 15205 },
    { prov: "Lambayeque", ciudad: "San José", poblacion: 10686 },
    { prov: "Lambayeque", ciudad: "Túcume", poblacion: 9764 },
    { prov: "Lambayeque", ciudad: "Íllimo", poblacion: 5175 },
    { prov: "Lambayeque", ciudad: "Pacora", poblacion: 3940 },
    { prov: "Lambayeque", ciudad: "Salas", poblacion: 3112 },

    { prov: "Arequipa", ciudad: "Cerro Colorado", poblacion: 229142 },
    { prov: "Arequipa", ciudad: "Arequipa (Cercado)", poblacion: 54400 },
    { prov: "Arequipa", ciudad: "Cayma", poblacion: 103140 },
    { prov: "Arequipa", ciudad: "Paucarpata", poblacion: 125255 },
    { prov: "Arequipa", ciudad: "Alto Selva Alegre", poblacion: 88537 },
    { prov: "Arequipa", ciudad: "José Luis Bustamante y Rivero", poblacion: 76270 },
    { prov: "Arequipa", ciudad: "Miraflores", poblacion: 52114 },
    { prov: "Arequipa", ciudad: "Mariano Melgar", poblacion: 59918 },
    { prov: "Arequipa", ciudad: "Socabaya", poblacion: 60553 },

    { prov: "Tacna", ciudad: "Tacna", poblacion: 100000 },
    { prov: "Tacna", ciudad: "Alto del Alianza", poblacion: 35000 },
    { prov: "Tacna", ciudad: "Ciudad Nueva", poblacion: 32000 },
    { prov: "Tacna", ciudad: "Pocollay", poblacion: 20000 },
    { prov: "Tacna", ciudad: "Gregorio Albarracin", poblacion: 130000 },

    { prov: "Nasca", ciudad: "Nasca", poblacion: 82000 },
    { prov: "Nasca", ciudad: "Vista Alegre", poblacion: 49000 },
    { prov: "Nasca", ciudad: "Marcona", poblacion: 20000 },

    { prov: "Lima", ciudad: "San Juan de Lurigancho", poblacion: 1282635 },
    { prov: "Lima", ciudad: "San Martín de Porres", poblacion: 802774 },
    { prov: "Lima", ciudad: "Ate", poblacion: 743517 },
    { prov: "Lima", ciudad: "Comas", poblacion: 600307 },
    { prov: "Lima", ciudad: "Villa María del Triunfo", poblacion: 462141 },
    { prov: "Lima", ciudad: "Carabayllo", poblacion: 458341 },
    { prov: "Lima", ciudad: "Villa El Salvador", poblacion: 442292 },
    { prov: "Lima", ciudad: "Santiago de Surco", poblacion: 437028 },
    { prov: "Lima", ciudad: "Puente Piedra", poblacion: 435888 },
    { prov: "Lima", ciudad: "San Juan de Miraflores", poblacion: 433565 }
];

// Array para almacenar las ciudades agregadas a la tabla
let ciudadesSeleccionadas = [];

window.onload = function () {
    let selProv = document.getElementById("provincia");

    for (let i = 0; i < datos.length; i++) {
        let existe = false;

        for (let j = 0; j < selProv.options.length; j++) {
            if (selProv.options[j].value === datos[i].prov) {
                existe = true;
            }
        }

        if (!existe) {
            let option = document.createElement("option");
            option.value = datos[i].prov;
            option.textContent = datos[i].prov;
            selProv.appendChild(option);
        }
    }
};

function cargarCiudades() {
    let prov = document.getElementById("provincia").value;
    let selCiudad = document.getElementById("ciudad");
    let pob = document.getElementById("poblacion");

    selCiudad.innerHTML = "<option value=''>Seleccione ciudad</option>";
    pob.value = "";

    for (let i = 0; i < datos.length; i++) {
        if (datos[i].prov === prov) {
            let option = document.createElement("option");
            option.value = datos[i].ciudad;
            option.textContent = datos[i].ciudad;
            selCiudad.appendChild(option);
        }
    }
}

function mostrarPoblacion() {
    let ciudad = document.getElementById("ciudad").value;
    let pob = document.getElementById("poblacion");

    for (let i = 0; i < datos.length; i++) {
        if (datos[i].ciudad === ciudad) {
            pob.value = datos[i].poblacion;
        }
    }
}

// Agregar ciudad a la tabla
function agregarCiudad() {
    let prov = document.getElementById("provincia").value;
    let ciudad = document.getElementById("ciudad").value;
    let pob = document.getElementById("poblacion").value;

    // Validar que se hayan seleccionado todos los campos
    if (!prov || !ciudad || !pob) {
        alert("Por favor, seleccione provincia, ciudad y verifique que tenga población");
        return;
    }

    // Validar que no se agreguen más de 11 ciudades
    if (ciudadesSeleccionadas.length >= 11) {
        alert("Ya se han agregado 11 ciudades");
        return;
    }

    // Verificar que la ciudad no esté duplicada
    let existe = ciudadesSeleccionadas.find(c =>
        c.ciudad === ciudad && c.prov === prov
    );

    if (existe) {
        alert("Esta ciudad ya fue agregada");
        return;
    }

    // Agregar ciudad al array
    ciudadesSeleccionadas.push({
        prov: prov,
        ciudad: ciudad,
        poblacion: parseInt(pob)
    });

    // Agregar fila a la tabla
    let tabla = document.getElementById("tablaCiudades");
    let fila = tabla.insertRow();
    fila.insertCell(0).textContent = prov;
    fila.insertCell(1).textContent = ciudad;
    fila.insertCell(2).textContent = pob;

    // Deshabilitar botón Agregar si ya hay 11 ciudades
    if (ciudadesSeleccionadas.length >= 11) {
        document.getElementById("btnAgregar").disabled = true;
    }

    // Limpiar selección
    document.getElementById("provincia").value = "";
    document.getElementById("ciudad").innerHTML = "<option value=''>Seleccione ciudad</option>";
    document.getElementById("poblacion").value = "";
}

// Calcular sobre las ciudades de la tabla
function ej32() {
    // Validar que haya al menos una ciudad en la tabla
    if (ciudadesSeleccionadas.length === 0) {
        document.getElementById("r32").textContent = "No hay ciudades agregadas";
        return;
    }

    let maxP = 0;
    let maxC = "";
    let maxProv = "";
    let maxIndex = -1;

    // Buscar en las ciudades seleccionadas
    for (let i = 0; i < ciudadesSeleccionadas.length; i++) {
        if (ciudadesSeleccionadas[i].poblacion > maxP) {
            maxP = ciudadesSeleccionadas[i].poblacion;
            maxC = ciudadesSeleccionadas[i].ciudad;
            maxProv = ciudadesSeleccionadas[i].prov;
            maxIndex = i;
        }
    }

    // Quitar resaltado previo
    let tabla = document.getElementById("tablaCiudades");
    for (let i = 1; i < tabla.rows.length; i++) {
        tabla.rows[i].style.backgroundColor = "";
        tabla.rows[i].style.fontWeight = "";
    }

    // Resaltar la fila ganadora (índice + 1 porque la fila 0 es el encabezado)
    if (maxIndex >= 0) {
        tabla.rows[maxIndex + 1].style.backgroundColor = "#90EE90"; // Verde claro
        tabla.rows[maxIndex + 1].style.fontWeight = "bold";
    }

    document.getElementById("r32").textContent =
        "Ciudad con mayor población: " +
        maxC + " (" + maxProv + ") - " +
        maxP + " habitantes";
}

//-- EJERCICIO 33 --//
const r33 = document.getElementById("r33");
function cont33() {
    r33.textContent = "Ha elegido continuar";
}
function cancel33() {
    r33.textContent = "Ha elegido cancelar";
}

//-- EJERCICIO 34 --//
function ej34() {
    let t = "";

    // encabezado: crea una sola fila con 9 columnas
    t = t + "<tr>";
    for (let i = 1; i <= 9; i++) {
        t = t + "<th>Tabla del " + i + "</th>";
    }
    t = t + "</tr>";

    // filas de multiplicación
    for (let j = 1; j <= 9; j++) {
        t = t + "<tr>";

        for (let i = 1; i <= 9; i++) {
            t = t + "<td>" + i + " x " + j + " = " + (i * j) + "</td>";
        }

        t = t + "</tr>";
    }

    r34.innerHTML = t;
}

//-- EJERCICIO 35 --//
const nums35El = document.getElementById("nums35");
const r35 = document.getElementById("r35");
let nums35 = [];
function gen35() {
    nums35 = [];
    for (let i = 0; i < 20; i++) {
        nums35.push(Math.floor(Math.random() * 200) + 1);
    }
    nums35El.textContent = `Números: ${nums35.join(", ")}`;
    r35.textContent = "";
}

//-- EJERCICIO 35 --//
function ej35() {
    if (nums35.length !== 20) {
        r35.textContent = "Primero genere los 20 números";
        return;
    }
    r35.textContent =
        `Numero Mayor: ${Math.max(...nums35)} | Numero Menor: ${Math.min(...nums35)}`;
}

//-- EJERCICIO 36 --//
function ej36() {
    let n = Number(e36.value);
    let a = 0;
    let b = 1;
    let i = 0;
    let r = "";
    let temp;
    while (i < n) {
        r = r + a + " ";
        temp = a + b;
        a = b;
        b = temp;
        i = i + 1;
    }
    r36.textContent = "Serie Fibonacci de (" + n + "): " + r;
}

//-- EJERCICIO 37 --//
function ej37() {
    let a = Number(e37a.value);
    let b = Number(e37b.value);
    let paso = 1;
    let texto = "";

    texto = texto + "Números ingresados:\n";
    texto = texto + "A = " + a + " | B = " + b + "\n\n";
    texto = texto + "Pasos:\n";
    while (b != 0) {
        let cociente = Math.floor(a / b);
        let resto = a % b;
        texto = texto + "Paso " + paso + ": ";
        texto = texto + a + " ÷ " + b + " = " + cociente;
        texto = texto + " con resto " + resto + "\n";
        a = b;
        b = resto;
        paso = paso + 1;
    }
    texto = texto + "\nEl M.C.D. es: " + a;
    r37.textContent = texto;
}
//-- EJERCICIO 38 --//
function ej38() {
    let n;
    let suma;
    let i;

    n = Number(e38.value);
    suma = 0;
    i = 1;
    while (i < n) {
        if (n % i == 0) {
            suma = suma + i;
        }
        i = i + 1;
    }
    if (suma == n) {
        r38.textContent = "Perfecto";
    } else {
        r38.textContent = "No perfecto";
    }
}

//-- EJERCICIO 39 --//
function ej39() {
    let n = Number(e39.value);
    let pi = 0;
    let texto = "Términos calculados:\n\n";

    for (let i = 0; i < n; i++) {
        let signo = (i % 2 === 0 ? 1 : -1);
        let denominador = 2 * i + 1;
        let termino = 4 * signo / denominador;
        pi += termino;
        if (i < 10) {
            texto += `Término ${i + 1}: ${signo > 0 ? '+' : ''} 4/${denominador} = ${termino.toFixed(6)}\n`;
        }
    }
    if (n > 10) texto += `...\n`;
    texto += `\nAproximación de π con ${n} términos:\n`;
    texto += `π ≈ ${pi}\n`;
    texto += `Valor real de π: ${Math.PI}\n`;
    texto += `Error: ${Math.abs(Math.PI - pi).toFixed(10)}`;

    r39.textContent = texto; // Usar textContent, NO innerHTML
}
//-- EJERCICIO 40 --//
function ej40() {
    let n = Number(e40.value);
    let pi = 3;
    let signo = 1;
    let texto = "Términos calculados:\n\n";
    texto += "Término 0: 3\n";

    for (let i = 2, termino = 1; i <= 2 * n; i += 2, termino++) {
        let denominador = i * (i + 1) * (i + 2);
        let valor = signo * (4 / denominador);
        pi += valor;
        // Mostrar los primeros 10 términos
        if (termino <= 10) {
            texto += `Término ${termino}: ${signo > 0 ? '+' : '-'} 4/(${i}×${i + 1}×${i + 2}) = ${valor.toFixed(8)}\n`;
        }
        signo *= -1;
    }
    if (n > 10) texto += `...\n`;
    texto += `\nAproximación de π con ${n} términos:\n`;
    texto += `π ≈ ${pi}\n`;
    texto += `Valor real de π: ${Math.PI}\n`;
    texto += `Error: ${Math.abs(Math.PI - pi).toFixed(10)}`;

    r40.textContent = texto;
}
