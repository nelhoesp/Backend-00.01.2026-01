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
 * Validador Universal: Verifica si la entrada es un número válido.
 * Si no lo es, lanza una alerta y detiene el ejercicio.
 */
function validarEntrada(valor, tipo = "numero") {
    if (valor === null) return false;
    if (tipo === "numero" && (isNaN(valor) || valor.trim() === "")) {
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
    if(!validarEntrada(n)) return;
    let num = Math.abs(Number(n));
    let esTres = (num > 99 && num < 1000);
    botRespuesta(`<b>Resultado:</b> ${esTres ? 'Tiene 3 dígitos' : 'No tiene 3 dígitos'}<br><br><b>Explicación:</b> El número que ingresaste fue el <b>${n}</b>. El sistema revisó si estaba entre el 100 y el 999. Como ves, el <b>${n}</b> ${esTres ? 'sí' : 'no'} cumple con esa regla.`, esTres);
}

async function ej02() {
    let n = await botPregunta("dime un número para ver si es negativo:");
    if(!validarEntrada(n)) return;
    let esNeg = Number(n) < 0;
    botRespuesta(`<b>Resultado:</b> ${esNeg ? 'Es Negativo' : 'Es Positivo o Cero'}<br><br><b>Explicación:</b> Tomamos tu número <b>${n}</b> y lo comparamos con el 0. Como <b>${n}</b> es ${esNeg ? 'menor' : 'mayor o igual'} que cero, sabemos su polaridad.`, esNeg);
}

async function ej03() {
    let n = await botPregunta("escribe un número para ver si termina en 4:");
    if(!validarEntrada(n)) return;
    let termina = n.endsWith('4');
    botRespuesta(`<b>Resultado:</b> ${termina ? 'Sí, termina en 4' : 'No termina en 4'}<br><br><b>Explicación:</b> Miramos el último dígito del número <b>${n}</b> que nos diste. Al ver que termina en "${n.slice(-1)}", confirmamos que ${termina ? 'efectivamente es un 4' : 'no es un 4'}.`, termina);
}

async function ej04() {
    let a = await botPregunta("primer número:"), b = await botPregunta("segundo número:"), c = await botPregunta("tercer número:");
    if(!validarEntrada(a) || !validarEntrada(b) || !validarEntrada(c)) return;
    let arr = [Number(a), Number(b), Number(c)].sort((x,y)=>x-y);
    botRespuesta(`<b>Resultado:</b> Ordenados: ${arr.join(' < ')}<br><br><b>Explicación:</b> Comparamos tus números (<b>${a}, ${b}, ${c}</b>) y los organizamos de menor a mayor automáticamente.`);
}

async function ej05() {
    let q = await botPregunta("¿cuántos pares de zapatos vas a comprar? ($80 c/u)");
    if(!validarEntrada(q)) return;
    let n = Number(q), subtotal = n * 80;
    let d = n > 30 ? 0.4 : n > 20 ? 0.2 : n > 10 ? 0.1 : 0;
    let ahorro = subtotal * d;
    botRespuesta(`<b>Ticket:</b><br>- Pares: ${n}<br>- Subtotal: $${subtotal}<br>- Descuento: -$${ahorro}<br><b>Total: $${subtotal - ahorro}</b><br><br><b>Explicación:</b> Por comprar <b>${n}</b> pares, el sistema aplicó un ${d*100}% de descuento.`);
}

async function ej06() {
    let h = await botPregunta("¿cuántas horas trabajaste?");
    if(!validarEntrada(h)) return;
    let horas = Number(h), normales = Math.min(horas, 40), extras = Math.max(0, horas - 40);
    let pago = (normales * 20) + (extras * 25);
    botRespuesta(`<b>Pago Total: $${pago}</b><br><br><b>Explicación:</b> De tus <b>${h}</b> horas, 40 se pagaron normal ($20) y las <b>${extras}</b> sobrantes se pagaron como extras ($25).`);
}

async function ej07() {
    const { value: tipo } = await Swal.fire({
        title: 'Selecciona tu membresía:',
        input: 'select',
        inputOptions: { 'A': 'Tipo A (10%)', 'B': 'Tipo B (15%)', 'C': 'Tipo C (20%)', 'N': 'Ninguna (0%)' },
        confirmButtonText: 'Siguiente'
    });
    let monto = await botPregunta(`¿Cuál es el costo total?`);
    if(!validarEntrada(monto)) return;
    let total = Number(monto), porc = tipo === 'A' ? 0.1 : tipo === 'B' ? 0.15 : tipo === 'C' ? 0.2 : 0;
    let ahorro = total * porc;
    botRespuesta(`<b>Total: $${total - ahorro}</b><br><br><b>Explicación:</b> Con tu compra de <b>$${total}</b> y membresía <b>${tipo}</b>, te ahorraste $${ahorro.toFixed(2)}.`);
}

/* ============================================================
   BLOQUE 2: LÓGICA Y CONVERSIONES (11 - 20)
   ============================================================ */

async function ej11() {
    let a = await botPregunta("primer número:"), b = await botPregunta("segundo número:"), c = await botPregunta("tercer número:");
    if(!validarEntrada(a) || !validarEntrada(b) || !validarEntrada(c)) return;
    let mayor = Math.max(a, b, c);
    botRespuesta(`<b>El mayor es: ${mayor}</b><br><br><b>Explicación:</b> Comparamos el <b>${a}, ${b} y ${c}</b>. El que tiene el valor más alto es el <b>${mayor}</b>.`);
}

async function ej12() {
    let a = await botPregunta("primer número:"), b = await botPregunta("segundo número:");
    if(!validarEntrada(a) || !validarEntrada(b)) return;
    let mayor = Math.max(a, b);
    botRespuesta(`<b>El mayor es: ${mayor}</b><br><br><b>Explicación:</b> Entre el <b>${a}</b> y el <b>${b}</b>, el sistema detectó que el <b>${mayor}</b> es el más grande.`);
}

async function ej13() {
    let l = await botPregunta("ingresa una letra:");
    if(!l || l.length > 1 || !isNaN(l)) return botRespuesta("Por favor, ingresa solo UNA letra.", false);
    let r = /^[aeiouáéíóú]$/i.test(l);
    botRespuesta(`<b>¿Es vocal?</b> ${r ? 'Sí' : 'No'}<br><br><b>Explicación:</b> Analizamos la letra <b>"${l}"</b> y vimos que ${r ? 'sí' : 'no'} está en el grupo A-E-I-O-U.`);
}

async function ej14() {
    let n = await botPregunta("un número del 1 al 10:");
    if(!validarEntrada(n)) return;
    let r = [2, 3, 5, 7].includes(Number(n));
    botRespuesta(`<b>¿Es Primo?</b> ${r ? 'Sí' : 'No'}<br><br><b>Explicación:</b> El <b>${n}</b> ${r ? 'solo' : 'no'} se puede dividir por sí mismo y por 1 en este rango.`);
}

async function ej17() {
    let h = await botPregunta("Hora:"), m = await botPregunta("Minutos:"), s = await botPregunta("Segundos:");
    if(!validarEntrada(h) || !validarEntrada(m) || !validarEntrada(s)) return;
    let hh = Number(h), mm = Number(m), ss = Number(s);
    let hO = hh, mO = mm, sO = ss;
    ss++; if(ss==60){ss=0; mm++;} if(mm==60){mm=0; hh++;} if(hh==24) hh=0;
    botRespuesta(`<b>Nueva Hora:</b> ${hh}:${mm}:${ss}<br><br><b>Explicación:</b> Tenías las <b>${hO}:${mO}:${sO}</b>. Le sumamos un segundo y ajustamos el reloj.`);
}

async function ej20() {
    let n1 = await botPregunta("N1"), n2 = await botPregunta("N2"), n3 = await botPregunta("N3"), n4 = await botPregunta("N4");
    if(!validarEntrada(n1) || !validarEntrada(n2) || !validarEntrada(n3) || !validarEntrada(n4)) return;
    let lista = [Number(n1), Number(n2), Number(n3), Number(n4)];
    let pares = lista.filter(x => x % 2 === 0).length;
    botRespuesta(`<b>Pares:</b> ${pares} | <b>Mayor:</b> ${Math.max(...lista)}<br><br><b>Explicación:</b> De tus números (<b>${n1}, ${n2}, ${n3}, ${n4}</b>), contamos cuántos eran divisibles por 2.`);
}

/* ============================================================
   BLOQUE 3: BUCLES (21 - 30)
   ============================================================ */

async function ej22() {
    let r = await botPregunta("dime hasta qué número quieres sumar:");
    if(!validarEntrada(r)) return;
    let n = parseInt(r), suma = (n * (n + 1)) / 2;
    botRespuesta(`<b>Suma: ${suma}</b><br><br><b>Explicación:</b> Sumamos todo del 1 al <b>${n}</b> usando la fórmula rápida de Gauss.`);
}

async function ej23() {
    let r = await botPregunta("límite para sumar impares:");
    if(!validarEntrada(r)) return;
    let n = parseInt(r), s = 0;
    for(let i=1; i<=n; i+=2) s += i;
    botRespuesta(`<b>Suma: ${s}</b><br><br><b>Explicación:</b> Fuimos saltando de 2 en 2 desde el 1 hasta el <b>${n}</b> para ignorar los pares.`);
}

async function ej24() {
    let s = 0;
    for (let i = 2; i <= 1000; i += 2) s += i;
    botRespuesta(`<b>Suma total: ${s}</b><br><br><b>Explicación:</b> El robot recorrió del 2 al 1000 sumando solo los números "compañeros" (pares).`);
}

async function ej25() {
    let r = await botPregunta("número para factorial:");
    if(!validarEntrada(r)) return;
    let n = parseInt(r), f = 1, i = n;
    while(i > 0) { f *= i; i--; }
    botRespuesta(`<b>Factorial: ${f}</b><br><br><b>Explicación:</b> Multiplicamos tu número <b>${n}</b> por todos los anteriores hasta llegar al 1.`);
}

async function ej26() {
    let D = await botPregunta("Dividendo (Número grande):"), d = await botPregunta("Divisor (Entre cuánto):");
    if(!validarEntrada(D) || !validarEntrada(d)) return;
    let numD = parseInt(D), numd = parseInt(d);
    if(numd === 0) return botRespuesta("No se puede dividir entre cero.", false);
    let c = 0, resto = numD;
    while(resto >= numd) { resto -= numd; c++; }
    botRespuesta(`<b>Cociente: ${c}, Resto: ${resto}</b><br><br><b>Explicación:</b> Le restamos el <b>${d}</b> al <b>${D}</b> un total de <b>${c}</b> veces.`);
}

/* ============================================================
   BLOQUE 4: SUMA 1-100 (28-30)
   ============================================================ */

async function ej28() {
    let caja = 0, moneda = 1;
    do { caja += moneda; moneda++; } while (moneda <= 100);
    botRespuesta(`<b>Total: ${caja}</b><br><br><b>Explicación:</b> (Ciclo Repetir) El robot primero sumó la moneda y luego preguntó si ya había llegado a 100.`);
}

async function ej29() {
    let caja = 0, moneda = 1;
    while (moneda <= 100) { caja += moneda; moneda++; }
    botRespuesta(`<b>Total: ${caja}</b><br><br><b>Explicación:</b> (Ciclo Mientras) El robot primero revisó si la moneda era menor a 100 y luego la sumó.`);
}

async function ej30() {
    let caja = 0;
    for (let i = 1; i <= 100; i++) caja += i;
    botRespuesta(`<b>Total: ${caja}</b><br><br><b>Explicación:</b> (Ciclo Para) Este robot ya sabía que tenía que dar exactamente 100 pasos de suma.`);
}

/* ============================================================
   BLOQUE 5: AVANZADOS (36-40)
   ============================================================ */

async function ej36() {
    let n = await botPregunta("¿Cuántos números de Fibonacci quieres?");
    if(!validarEntrada(n)) return;
    let cant = Number(n), f=[0,1];
    for(let i=2; i<cant; i++) f.push(f[i-1] + f[i-2]);
    botRespuesta(`<b>Serie:</b> ${f.slice(0,cant).join(', ')}<br><br><b>Explicación:</b> Empezamos con 0 y 1. Cada número siguiente es la suma de los dos que ingresaste antes.`);
}

async function ej37() {
    let r1 = await botPregunta("Primer número:"), r2 = await botPregunta("Segundo número:");
    if(!validarEntrada(r1) || !validarEntrada(r2)) return;
    let a = Math.abs(parseInt(r1)), b = Math.abs(parseInt(r2)), n1 = a, n2 = b, pasos = "";
    while (b !== 0) {
        pasos += `• Dividimos ${a} entre ${b} y sobró <b>${a%b}</b>.<br>`;
        let t = b; b = a % b; a = t;
    }
    botRespuesta(`<b>MCD de ${n1} y ${n2} es: ${a}</b><br><br><b>Paso a paso:</b><br>${pasos}`);
}

async function ej38() {
    let n = await botPregunta("Número para verificar si es Perfecto:");
    if(!validarEntrada(n)) return;
    let num = Number(n), s=0, div=[];
    for(let i=1; i<num; i++) if(num%i==0){ s+=i; div.push(i); }
    let esP = (s===num);
    botRespuesta(`<b>${esP?'¡Es Perfecto!':'No es Perfecto'}</b><br><b>Divisores:</b> ${div.join('+')} = ${s}<br><br><b>Explicación:</b> Un número es perfecto si la suma de sus divisores da el mismo número (<b>${n}</b>).`);
}

async function ej40() {
    let pi=3, d=2, s=1;
    for(let i=0; i<1000; i++) {
        pi += s*(4/(d*(d+1)*(d+2)));
        d+=2; s*=-1;
    }
    botRespuesta(`<b>Pi ≈ ${pi.toFixed(6)}</b><br><br><b>Explicación:</b> Usamos el método de Nilakantha para acercarnos al valor de Pi mediante multiplicaciones.`);
}