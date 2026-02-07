/* ============================================================
   CONFIGURACIÓN DE IMÁGENES
   ============================================================ */
const IMG_PRINCIPAL = "./Images/Neuvillete Iocn.webp"; 
const IMG_EXITO = "./Images/Good Kaveh.webp"; 
const IMG_FALLO = "./Images/Exercise Wrong.webp"; 

/* --- FUNCIONES MOTOR DEL ASISTENTE --- */
async function botPregunta(titulo, placeholder = "Ingresa el valor...") {
    const { value: respuesta } = await Swal.fire({
        title: `Hola, ${titulo}`,
        imageUrl: IMG_PRINCIPAL,
        imageWidth: 90, imageHeight: 90,
        input: 'text',
        inputPlaceholder: placeholder,
        confirmButtonText: 'Enviar',
        showCancelButton: true,
        customClass: { popup: 'bot-popup animate__animated animate__fadeInDown', image: 'bot-img-custom' },
        confirmButtonColor: '#4f46e5'
    });
    return (respuesta && respuesta.trim() !== "") ? respuesta : null;
}

function botRespuesta(mensaje, esExito = true) {
    Swal.fire({
        title: esExito ? "¡Resultado listo!" : "Atención",
        html: mensaje,
        imageUrl: esExito ? IMG_EXITO : IMG_FALLO,
        imageWidth: 90, imageHeight: 90,
        confirmButtonText: 'Entendido',
        customClass: { popup: 'bot-popup animate__animated animate__zoomIn', image: 'bot-img-custom' },
        confirmButtonColor: esExito ? '#10b981' : '#ef4444'
    });
}

/**
 * Validador Universal: Detiene el proceso si el usuario ingresa letras donde van números.
 */
function validar(valor) {
    if (valor === null) return false;
    if (isNaN(valor) || valor.trim() === "") {
        botRespuesta(`El valor "<b>${valor}</b>" no es un número válido. Por favor, usa solo dígitos.`, false);
        return false;
    }
    return true;
}

/* ============================================================
   BLOQUE 1: CONDICIONALES (1 - 10)
   ============================================================ */

async function ej01() {
    let n = await botPregunta("ingresa un número para ver si tiene 3 dígitos:");
    if(!validar(n)) return;
    let num = Math.abs(Number(n));
    let esTres = (num > 99 && num < 1000);
    botRespuesta(`<b>Resultado:</b> ${esTres ? 'Tiene 3 dígitos' : 'No tiene 3 dígitos'}<br><br><b>Explicación:</b> El número que ingresaste fue el <b>${n}</b>. El sistema revisó si estaba entre 100 y 999.`, esTres);
}

async function ej02() {
    let n = await botPregunta("dime un número para ver si es negativo:");
    if(!validar(n)) return;
    let esNeg = Number(n) < 0;
    botRespuesta(`<b>Resultado:</b> ${esNeg ? 'Es Negativo' : 'Es Positivo o Cero'}<br><br><b>Explicación:</b> Tomamos tu número <b>${n}</b> y lo comparamos con el 0.`, esNeg);
}

async function ej03() {
    let n = await botPregunta("escribe un número para ver si termina en 4:");
    if(!n) return; // Aquí no validamos isNaN porque usamos endsWith
    let termina = n.endsWith('4');
    botRespuesta(`<b>Resultado:</b> ${termina ? 'Sí, termina en 4' : 'No termina en 4'}<br><br><b>Explicación:</b> Miramos el último dígito del número <b>${n}</b>. Al terminar en "${n.slice(-1)}", confirmamos el resultado.`, termina);
}

async function ej04() {
    let a = await botPregunta("primer número:"), b = await botPregunta("segundo número:"), c = await botPregunta("tercer número:");
    if(!validar(a) || !validar(b) || !validar(c)) return;
    let arr = [Number(a), Number(b), Number(c)].sort((x,y)=>x-y);
    botRespuesta(`<b>Resultado:</b> Ordenados: ${arr.join(' < ')}<br><br><b>Explicación:</b> Comparamos tus números (<b>${a}, ${b}, ${c}</b>) y los organizamos de menor a mayor.`);
}

async function ej05() {
    let q = await botPregunta("¿cuántos pares de zapatos vas a comprar? ($80 c/u)");
    if(!validar(q)) return;
    let n = Number(q), subtotal = n * 80;
    let d = n > 30 ? 0.4 : n > 20 ? 0.2 : n > 10 ? 0.1 : 0;
    let ahorro = subtotal * d;
    botRespuesta(`<b>Ticket:</b><br>- Pares: ${n}<br>- Subtotal: $${subtotal}<br>- Descuento: -$${ahorro}<br><b>Total: $${subtotal - ahorro}</b><br><br><b>Explicación:</b> Por tus <b>${n}</b> pares, aplicamos el ${d*100}% de descuento.`);
}

async function ej06() {
    let h = await botPregunta("¿cuántas horas trabajaste?");
    if(!validar(h)) return;
    let horas = Number(h), normales = Math.min(horas, 40), extras = Math.max(0, horas - 40);
    let pago = (normales * 20) + (extras * 25);
    botRespuesta(`<b>Pago Total: $${pago}</b><br><br><b>Explicación:</b> De tus <b>${h}</b> horas, 40 son base ($20) y las <b>${extras}</b> sobrantes son extras ($25).`);
}

async function ej07() {
    const { value: tipo } = await Swal.fire({
        title: 'Selecciona tu membresía:',
        input: 'select',
        inputOptions: { 'A': 'Tipo A (10%)', 'B': 'Tipo B (15%)', 'C': 'Tipo C (20%)', 'N': 'Ninguna (0%)' },
        confirmButtonText: 'Siguiente'
    });
    let monto = await botPregunta(`¿Monto total de la compra?`);
    if(!validar(monto)) return;
    let total = Number(monto), porc = tipo === 'A' ? 0.1 : tipo === 'B' ? 0.15 : tipo === 'C' ? 0.2 : 0;
    botRespuesta(`<b>Total: $${total - (total*porc)}</b><br><br><b>Explicación:</b> Por tu compra de <b>$${total}</b> y membresía <b>${tipo}</b>, descontamos el ${porc*100}%.`);
}

async function ej08() {
    let n1 = await botPregunta("Nota 1:"), n2 = await botPregunta("Nota 2:"), n3 = await botPregunta("Nota 3:");
    if(!validar(n1) || !validar(n2) || !validar(n3)) return;
    let p = (Number(n1)+Number(n2)+Number(n3))/3;
    botRespuesta(`<b>Promedio: ${p.toFixed(2)}</b><br><br><b>Explicación:</b> Sumamos tus notas (<b>${n1}, ${n2}, ${n3}</b>) y dividimos entre 3.`);
}

async function ej09() {
    let s = await botPregunta("Sueldo actual:");
    if(!validar(s)) return;
    let sueldo = Number(s), aumento = sueldo > 2000 ? 0.05 : 0.10;
    botRespuesta(`<b>Nuevo Sueldo: $${(sueldo*(1+aumento)).toFixed(2)}</b><br><br><b>Explicación:</b> Al ganar <b>$${sueldo}</b>, te toca un aumento del ${aumento*100}%.`);
}

async function ej10() {
    let n = await botPregunta("Número para ver si es Par o Impar:");
    if(!validar(n)) return;
    let r = Number(n)%2==0;
    botRespuesta(`<b>Resultado:</b> Es ${r?'PAR':'IMPAR'}<br><br><b>Explicación:</b> El residuo de dividir <b>${n}</b> entre 2 es ${Number(n)%2}.`, r);
}

/* ============================================================
   BLOQUE 2: LÓGICA Y CONVERSIONES (11 - 20)
   ============================================================ */

async function ej11() {
    let a = await botPregunta("primer número:"), b = await botPregunta("segundo número:"), c = await botPregunta("tercer número:");
    if(!validar(a) || !validar(b) || !validar(c)) return;
    let mayor = Math.max(a, b, c);
    botRespuesta(`<b>El mayor es: ${mayor}</b><br><br><b>Explicación:</b> Comparamos el <b>${a}, ${b} y ${c}</b>; el más alto es el resultado.`);
}

async function ej12() {
    let a = await botPregunta("primer número:"), b = await botPregunta("segundo número:");
    if(!validar(a) || !validar(b)) return;
    let mayor = Math.max(a, b);
    botRespuesta(`<b>El mayor es: ${mayor}</b><br><br><b>Explicación:</b> Entre el <b>${a}</b> y el <b>${b}</b>, el más grande es el <b>${mayor}</b>.`);
}

async function ej13() {
    let l = await botPregunta("ingresa una letra:");
    if(!l || !isNaN(l) || l.length > 1) return botRespuesta("Ingresa solo una letra, no números.", false);
    let r = /^[aeiouáéíóú]$/i.test(l);
    botRespuesta(`<b>¿Es vocal?</b> ${r ? 'Sí' : 'No'}<br><br><b>Explicación:</b> La letra <b>"${l}"</b> ${r?'está':'no está'} en el grupo A-E-I-O-U.`);
}

async function ej14() {
    let n = await botPregunta("un número del 1 al 10:");
    if(!validar(n)) return;
    let r = [2, 3, 5, 7].includes(Number(n));
    botRespuesta(`<b>¿Es Primo?</b> ${r ? 'Sí' : 'No'}<br><br><b>Explicación:</b> El <b>${n}</b> ${r?'solo':'no'} se puede dividir por sí mismo y por 1 en el rango 1-10.`);
}

async function ej15() {
    let cm = await botPregunta("Centímetros:"), lb = await botPregunta("Libras:");
    if(!validar(cm) || !validar(lb)) return;
    botRespuesta(`<b>Conversión:</b><br>- ${cm} cm = ${(cm/2.54).toFixed(2)} pulg<br>- ${lb} lb = ${(lb/2.204).toFixed(2)} kg<br><br><b>Explicación:</b> Transformamos tus datos usando factores estándar.`);
}

async function ej16() {
    let n = await botPregunta("número del día (1-7):");
    if(!validar(n)) return;
    let d = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    let num = parseInt(n);
    botRespuesta(`<b>Día:</b> ${d[num-1] || 'Inválido'}<br><br><b>Explicación:</b> El número <b>${n}</b> corresponde a ${d[num-1]}.`);
}

async function ej17() {
    let h = await botPregunta("Hora:"), m = await botPregunta("Minutos:"), s = await botPregunta("Segundos:");
    if(!validar(h) || !validar(m) || !validar(s)) return;
    let hh = Number(h), mm = Number(m), ss = Number(s);
    let hO = hh, mO = mm, sO = ss;
    ss++; if(ss==60){ss=0; mm++;} if(mm==60){mm=0; hh++;} if(hh==24) hh=0;
    botRespuesta(`<b>Nueva Hora:</b> ${hh}:${mm}:${ss}<br><br><b>Explicación:</b> Partimos de las <b>${hO}:${mO}:${sO}</b> y avanzamos un segundo.`);
}

async function ej18() {
    let n = await botPregunta("¿Cuántos CDs llevarás?");
    if(!validar(n)) return;
    let cant = Number(n), p = cant<=9?10:cant<=99?8:cant<=499?7:6;
    botRespuesta(`<b>Total: $${cant*p}</b><br><br><b>Explicación:</b> Por <b>${cant}</b> CDs, el precio es de $${p} cada uno.`);
}

async function ej19() {
    let id = await botPregunta("ID Empleado (1-4):"), dias = await botPregunta("Días trabajados:");
    if(!validar(id) || !validar(dias)) return;
    let tarifas = {1:56, 2:64, 3:80, 4:48};
    botRespuesta(`<b>Pago: $${tarifas[id]*dias}</b><br><br><b>Explicación:</b> El ID <b>${id}</b> cobra $${tarifas[id]} diarios. Multiplicamos por los <b>${dias}</b> días.`);
}

async function ej20() {
    let n1 = await botPregunta("N1"), n2 = await botPregunta("N2"), n3 = await botPregunta("N3"), n4 = await botPregunta("N4");
    if(!validar(n1) || !validar(n2) || !validar(n3) || !validar(n4)) return;
    let lista = [Number(n1), Number(n2), Number(n3), Number(n4)];
    let pares = lista.filter(x => x % 2 === 0).length;
    botRespuesta(`<b>Pares:</b> ${pares} | <b>Mayor:</b> ${Math.max(...lista)}<br><br><b>Explicación:</b> De tus números (<b>${n1}, ${n2}, ${n3}, ${n4}</b>), el mayor es ${Math.max(...lista)}.`);
}

/* ============================================================
   BLOQUE 3: BUCLES (21 - 30)
   ============================================================ */

async function ej21() {
    let n = await botPregunta("Número para Factorial:");
    if(!validar(n)) return;
    let num = parseInt(n), res=1;
    for(let i=1; i<=num; i++) res *= i;
    botRespuesta(`<b>Resultado: ${res}</b><br><br><b>Explicación:</b> Multiplicamos del 1 al <b>${n}</b> para hallar el factorial.`);
}

async function ej22() {
    let r = await botPregunta("dime hasta qué número quieres sumar:");
    if(!validar(r)) return;
    let n = parseInt(r), suma = (n * (n + 1)) / 2;
    botRespuesta(`<b>Suma Total: ${suma}</b><br><br><b>Explicación:</b> Sumamos todo desde el 1 hasta el <b>${n}</b> con la fórmula de Gauss.`);
}

async function ej23() {
    let r = await botPregunta("límite para sumar solo impares:");
    if(!validar(r)) return;
    let n = parseInt(r), s = 0;
    for(let i=1; i<=n; i+=2) s += i;
    botRespuesta(`<b>Suma: ${s}</b><br><br><b>Explicación:</b> Sumamos solo los números impares hasta llegar a tu límite <b>${n}</b>.`);
}

async function ej24() {
    let s = 0;
    for (let i = 2; i <= 1000; i += 2) s += i;
    botRespuesta(`<b>Suma: ${s}</b><br><br><b>Explicación:</b> El robot sumó de 2 en 2 hasta el 1000 recogiendo solo los pares.`);
}

async function ej25() {
    let r = await botPregunta("dime un número para factorial:");
    if(!validar(r)) return;
    let n = parseInt(r), f = 1, i = n;
    while(i > 0) { f *= i; i--; }
    botRespuesta(`<b>Factorial: ${f}</b><br><br><b>Explicación:</b> Multiplicamos tu número <b>${n}</b> por todos sus anteriores.`);
}

async function ej26() {
    let D = await botPregunta("Dividendo:"), d = await botPregunta("Divisor:");
    if(!validar(D) || !validar(d)) return;
    let numD = parseInt(D), numd = parseInt(d);
    if(numd === 0) return botRespuesta("No se puede dividir entre cero.", false);
    let c = 0, resto = numD;
    while(resto >= numd) { resto -= numd; c++; }
    botRespuesta(`<b>Cociente: ${c}, Resto: ${resto}</b><br><br><b>Explicación:</b> Restamos <b>${d}</b> al número <b>${D}</b> un total de <b>${c}</b> veces.`);
}

async function ej27() {
    let nums = [], s = 0;
    await Swal.fire("Promedio", "Ingresa números; uno negativo para terminar.", "info");
    while(true){
        let r = await botPregunta(`Dato ${nums.length + 1}:`);
        if(r === null || isNaN(r) || Number(r)<0) break;
        nums.push(Number(r)); s+=Number(r);
    }
    botRespuesta(`<b>Media: ${nums.length>0?(s/nums.length).toFixed(2):0}</b><br><b>Tus datos:</b> [${nums.join(', ')}]`);
}

async function ej28() {
    let s = 0, i = 1;
    do { s += i; i++; } while (i <= 100);
    botRespuesta(`<b>Resultado: ${s}</b><br><br><b>Explicación:</b> (Do-While) Primero sumamos y luego preguntamos si llegamos a 100.`);
}

async function ej29() {
    let s = 0, i = 1;
    while (i <= 100) { s += i; i++; }
    botRespuesta(`<b>Resultado: ${s}</b><br><br><b>Explicación:</b> (While) Preguntamos primero si falta para 100 y luego sumamos.`);
}

async function ej30() {
    let s = 0;
    for (let i = 1; i <= 100; i++) s += i;
    botRespuesta(`<b>Resultado: ${s}</b><br><br><b>Explicación:</b> (For) El robot ya estaba programado para dar exactamente 100 pasos.`);
}

/* ============================================================
   BLOQUE 4: AVANZADOS (31 - 40)
   ============================================================ */

async function ej32() {
    let max=0, pG=0;
    for(let i=1;i<=3;i++){
        let n = Math.floor(Math.random()*500000) + 10000;
        if(n>max){ max=n; pG=i; }
    }
    botRespuesta(`<b>Provincia ${pG} es la mayor</b> con ${max.toLocaleString()} hab.<br><br><b>Explicación:</b> Comparamos censos simulados y la Provincia ${pG} fue la ganadora.`);
}

async function ej34() {
    const { value: t } = await Swal.fire({
        title: '¿Qué tabla quieres ver?',
        input: 'select', 
        inputOptions: { '1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9' },
        confirmButtonText: 'Ver'
    });
    if(!t) return;
    let n = parseInt(t), res = "";
    for(let i=1;i<=10;i++) res += `${n} x ${i} = <b>${n*i}</b><br>`;
    botRespuesta(`<b>Tabla del ${n}:</b><br>${res}`);
}

async function ej35() {
    let nums = []; for(let i=0;i<20;i++) nums.push(Math.floor(Math.random()*100) + 1);
    botRespuesta(`<b>Lista:</b> ${nums.join(', ')}<br><br><b>Mayor:</b> ${Math.max(...nums)} | <b>Menor:</b> ${Math.min(...nums)}`);
}

async function ej36() {
    let n = await botPregunta("¿Cuántos de Fibonacci quieres?");
    if(!validar(n)) return;
    let cant = parseInt(n), f=[0,1];
    for(let i=2; i<cant; i++) f.push(f[i-1] + f[i-2]);
    botRespuesta(`<b>Serie:</b> ${f.slice(0,cant).join(', ')}<br><br><b>Explicación:</b> Sumamos los dos anteriores para sacar el siguiente de tu lista de <b>${n}</b>.`);
}

async function ej37() {
    let r1 = await botPregunta("Primer número (A):"), r2 = await botPregunta("Segundo número (B):");
    if(!validar(r1) || !validar(r2)) return;
    let a = Math.abs(parseInt(r1)), b = Math.abs(parseInt(r2)), n1 = a, n2 = b, pasos = "";
    while (b !== 0) {
        pasos += `• Dividimos ${a} entre ${b} y sobró <b>${a%b}</b>.<br>`;
        let t = b; b = a % b; a = t;
    }
    botRespuesta(`<b>MCD de ${n1} y ${n2} es: ${a}</b><br><br><b>Proceso:</b><br>${pasos}`);
}

async function ej38() {
    let n = await botPregunta("¿Es Perfecto?");
    if(!validar(n)) return;
    let num = parseInt(n), s=0, div=[];
    for(let i=1; i<num; i++) if(num%i==0){ s+=i; div.push(i); }
    let esP = (s===num);
    botRespuesta(`<b>${esP?'¡Es Perfecto!':'No es Perfecto'}</b><br><b>Suma divisores:</b> ${div.join('+')} = ${s}<br><br><b>Explicación:</b> El total de sus partes da <b>${n}</b>.`);
}

async function ej39() {
    let pi=0, d=1, s=1;
    for(let i=0; i<10000; i++) { pi += s*(4/d); d+=2; s*=-1; }
    botRespuesta(`<b>Pi ≈ ${pi.toFixed(6)}</b><br><br><b>Explicación:</b> Sumamos miles de fracciones para acercarnos a Pi.`);
}

async function ej40() {
    let pi=3, d=2, s=1;
    for(let i=0; i<1000; i++) { pi += s*(4/(d*(d+1)*(d+2))); d+=2; s*=-1; }
    botRespuesta(`<b>Pi ≈ ${pi.toFixed(6)}</b><br><br><b>Explicación:</b> Usamos el método de Nilakantha para ser más precisos.`);
}