
class Telefono {
  constructor(serie, imei, marca, modelo, propietario) {
    this.serie = serie;
    this.imei = imei;
    this.marca = marca;
    this.modelo = modelo;
    this.propietario = propietario;
    this.diagnostico = null;
    this.autorizado = false;
    this.abono = 0;
    this.tecnico = null;
    this.repuestos = [];
    this.estado = "INGRESADO";
  }

  resumen() {
    return `${this.marca} ${this.modelo} . ${this.propietario}`;
  }
}

class Diagnostico {
  constructor(descripcion, costoEstimado) {
    this.descripcion = descripcion;
    this.costoEstimado = Number(costoEstimado);
    this.fecha = new Date().toLocaleDateString("es-PE");
  }
}

class Tecnico {
  constructor(nombre, skills = []) {
    this.nombre = nombre;
    this.skills = skills;
  }

  puedeAtender(marca) {
    return this.skills
      .map((item) => item.toLowerCase())
      .includes(marca.toLowerCase());
  }
}

class Repuesto {
  constructor(nombre, precio) {
    this.nombre = nombre;
    this.precio = Number(precio);
  }
}


const STORAGE_KEY = "sistemaReparacion_v1";

class SistemaReparacion {
  constructor() {
    this.bloqueados = {
      series: new Set(["12321321"]),
      imeis: new Set(["IMEI123123"]),
    };

    this.tecnicos = [
      new Tecnico("Carlos Perez", ["samsung", "huawei"]),
      new Tecnico("Marta Perez", ["huawei"]),
      new Tecnico("juan Perez", ["apple", "samsung"]),
    ];

    this.telefonos = this._cargarDesdeStorage();
  }


  _guardarEnStorage() {
    try {
      const data = Array.from(this.telefonos.values());
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn("No se pudo guardar en localStorage:", e);
    }
  }


  _cargarDesdeStorage() {
    const map = new Map();
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return map;

      const arr = JSON.parse(raw);
      arr.forEach((obj) => {
        const tel = new Telefono(
          obj.serie, obj.imei, obj.marca, obj.modelo, obj.propietario
        );
        tel.estado     = obj.estado;
        tel.autorizado = obj.autorizado;
        tel.abono      = obj.abono;

        if (obj.diagnostico) {
          const d = new Diagnostico(
            obj.diagnostico.descripcion,
            obj.diagnostico.costoEstimado
          );
          d.fecha = obj.diagnostico.fecha;
          tel.diagnostico = d;
        }

        if (obj.tecnico) {
          tel.tecnico = new Tecnico(obj.tecnico.nombre, obj.tecnico.skills);
        }

        if (Array.isArray(obj.repuestos)) {
          tel.repuestos = obj.repuestos.map((r) => new Repuesto(r.nombre, r.precio));
        }

        map.set(tel.serie, tel);
      });
    } catch (e) {
      console.warn("Error al cargar desde localStorage:", e);
    }
    return map;
  }

  
  limpiarStorage() {
    localStorage.removeItem(STORAGE_KEY);
  }



  registrarTelefono(serie, imei, marca, modelo, propietario) {
    const tel = new Telefono(serie, imei, marca, modelo, propietario);
    this.telefonos.set(serie, tel);
    this._guardarEnStorage(); 
    return tel;
  }

  diagnosticar(serie, descripcion, costoEstimado) {
    const tel = this._get(serie);
    if (!descripcion || !costoEstimado)
      throw new Error("Completar descripcion y costo estimado");
    tel.diagnostico = new Diagnostico(descripcion, costoEstimado);
    tel.estado = "DIAGNOSTICADO";
    this._guardarEnStorage(); 
    return tel.diagnostico;
  }

  autorizar(serie) {
    const tel = this._get(serie);
    if (!tel.diagnostico) throw new Error("Primero diagnostica");
    tel.autorizado = true;
    tel.abono = tel.diagnostico.costoEstimado * 0.5;
    tel.estado = "AUTORIZADO";
    this._guardarEnStorage(); 
    return { abono: tel.abono, costo: tel.diagnostico.costoEstimado };
  }

  asignarTecnico(serie, nombreTecnico) {
    const tel = this._get(serie);
    if (!tel.autorizado) throw new Error("El equipo no esta autorizado.");

    const tec = this.tecnicos.find((t) => t.nombre === nombreTecnico);
    if (!tec) throw new Error("El tecnico no existe");
    if (!tec.puedeAtender(tel.marca))
      throw new Error(`El Tecnico ${nombreTecnico} no puede atender ${tel.marca}`);

    tel.tecnico = tec;
    tel.estado = "EN REPARACION";
    this._guardarEnStorage(); 
    return tel;
  }

  agregarRepuesto(serie, nombre, precio) {
    const tel = this._get(serie);
    if (!nombre || !precio) throw new Error("Ingrese nombre y precio del repuesto");
    const rep = new Repuesto(nombre, precio);
    tel.repuestos.push(rep);
    this._guardarEnStorage(); 
    return rep;
  }

  verEstado(serie) {
    return this._get(serie);
  }

  _get(serie) {
    const tel = this.telefonos.get(serie);
    if (!tel) throw new Error(`Equipo con serie: ${serie} no existe.`);
    return tel;
  }
}



const sistema = new SistemaReparacion();
let currentStep = 0;
let currentSerie = null;
let tecnicoSelected = null;

const STEPS = [
  { label: `<span class="text-black">inicio</span>`,       icon: `<i class="bi bi-house-fill text-dark"></i>` },
  { label: `<span class="text-black">registrar</span>`,    icon: `<i class="bi bi-table text-dark"></i>` },
  { label: `<span class="text-black">diagnostico</span>`,  icon: `<i class="bi bi-clipboard2-pulse text-dark"></i>` },
  { label: `<span class="text-black">autorizacion</span>`, icon: `<i class="bi bi-bounding-box text-dark"></i>` },
  { label: `<span class="text-black">tecnico</span>`,      icon: `<i class="bi bi-hammer text-dark"></i>` },
  { label: `<span class="text-black">repuestos</span>`,    icon: `<i class="bi bi-gear-wide-connected text-dark"></i>` },
  { label: `<span class="text-black">estado final</span>`, icon: `<i class="bi bi-inbox-fill text-dark"></i>` },
];



function renderStepper() {
  const container = document.getElementById("stepper");
  container.innerHTML = "";

  STEPS.forEach((s, i) => {
    const done       = i < currentStep;
    const active     = i === currentStep;
    const accessible = i <= currentStep || (currentSerie && i <= 6);

    if (i > 0) {
      const line = document.createElement("div");
      line.className = `w-0.5 h-4 ml-[13px] ${done ? "bg-emerald-500" : "bg-zinc-800"}`;
      container.appendChild(line);
    }

    const row = document.createElement("div");
    row.className = `flex items-center gap-3 ${accessible ? "cursor-pointer" : "cursor-default"} group py-0.5`;
    if (accessible) row.onclick = () => goStep(i);

    row.innerHTML = `
      <div class="step-dot ${done ? "done" : active ? "active" : "idle"} w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-300">
        ${done ? "✓" : i}
      </div>
      <p class="text-xs transition-colors ${active ? "text-white font-bold" : done ? "text-emerald-400 group-hover:text-emerald-300" : accessible ? "text-zinc-500 group-hover:text-zinc-300" : "text-zinc-700"}">
        ${s.icon} ${s.label}
      </p>
    `;
    container.appendChild(row);
  });
}

function updateTelPanel() {
  const panel = document.getElementById("telActivo");
  if (!currentSerie) { panel.classList.add("hidden"); return; }

  const tel = sistema.telefonos.get(currentSerie);
  if (!tel) return;

  panel.classList.remove("hidden");
  document.getElementById("telActivoNombre").textContent = `${tel.marca} ${tel.modelo}`;
  document.getElementById("telActivoSerie").textContent  = `Serie: ${tel.serie}`;

  const el  = document.getElementById("telActivoEstado");
  const cls = {
    INGRESADO:       "badge-ingresado",
    DIAGNOSTICADO:   "badge-diagnosticado",
    AUTORIZADO:      "badge-autorizado",
    "EN REPARACION": "badge-reparacion",
  };
  el.className   = `${cls[tel.estado] || ""}`;
  el.textContent = tel.estado;
}



function v(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

function infoCard(tel) {
  return `
    <div class="tel-icon">📱</div>
    <div>
      <p style="font-weight:800;font-size:.9rem;color:var(--text);margin:0;">${tel.marca} ${tel.modelo}</p>
      <p style="font-size:.78rem;color:var(--text2);margin:2px 0 0;">${tel.propietario}</p>
      <code class="mono" style="font-size:.72rem;color:var(--brand);">${tel.serie}</code>
    </div>
  `;
}



function goStep(n) {
  currentStep = n;
  renderStepper();
  updateTelPanel();

  const tpl     = document.getElementById(`tpl-${n}`);
  const content = document.getElementById("stepContent");
  content.innerHTML = "";
  if (!tpl) return;
  content.appendChild(tpl.content.cloneNode(true));

  if (n === 2) populateStep2();
  if (n === 3) populateStep3();
  if (n === 4) populateStep4();
  if (n === 5) populateStep5();
  if (n === 6) populateStep6();
}



function step1Action() {
  try {
    const tel = sistema.registrarTelefono(
      v("s1_serie"), v("s1_imei"), v("s1_marca"), v("s1_modelo"), v("s1_prop")
    );
    currentSerie = tel.serie;
    goStep(2);
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}

function step2Action() {
  if (!currentSerie) return;
  try {
    sistema.diagnosticar(currentSerie, v("s2_desc"), v("s2_costo"));
    goStep(3);
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}

function step3Action() {
  const chk = document.getElementById("s3_check");
  if (!chk || !chk.checked) { alert("El cliente debe autorizar primero."); return; }
  try {
    sistema.autorizar(currentSerie);
    goStep(4);
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}

function step4Action() {
  if (!tecnicoSelected) { alert("Selecciona un tecnico."); return; }
  try {
    sistema.asignarTecnico(currentSerie, tecnicoSelected);
    goStep(5);
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}

function step5AddRepuesto() {
  if (!currentSerie) return;
  try {
    sistema.agregarRepuesto(currentSerie, v("s5_nombre"), v("s5_precio"));
    renderRepuestos();
  } catch (e) {
    console.error(e);
    alert(e.message);
  }
}



function populateStep2() {
  const el = document.getElementById("s2_telInfo");
  el.innerHTML = currentSerie
    ? infoCard(sistema.telefonos.get(currentSerie))
    : `<p class="text-xs text-red-400">Primero registra un telefono en el paso 1</p>`;
}

function populateStep3() {
  if (!currentSerie) return;
  const tel = sistema.telefonos.get(currentSerie);
  document.getElementById("s3_telInfo").innerHTML = infoCard(tel);
  if (tel.diagnostico) {
    document.getElementById("s3_costoTotal").textContent = `s/ ${tel.diagnostico.costoEstimado}`;
    document.getElementById("s3_abono").textContent      = `s/ ${tel.diagnostico.costoEstimado * 0.5}`;
  }
}

function populateStep4() {
  if (!currentSerie) return;
  const tel = sistema.telefonos.get(currentSerie);
  document.getElementById("s4_telInfo").innerHTML = infoCard(tel);

  const lista = document.getElementById("s4_tecnicos");
  lista.innerHTML = "";
  tecnicoSelected = null;

  sistema.tecnicos.forEach((tec) => {
    const puede = tec.puedeAtender(tel.marca);
    const div   = document.createElement("div");
    div.className = `tec-card ${puede ? "" : "disabled"}`;
    div.innerHTML = `
      <div>
        <p style="font-weight:700;font-size:.875rem;color:var(--text);margin:0;">${tec.nombre}</p>
        <p style="font-size:.72rem;color:var(--text3);margin-top:3px;">Skills: ${tec.skills.join(", ")}</p>
      </div>
      ${puede
        ? `<span style="font-size:.72rem;background:var(--success-lt);color:var(--success);border:1px solid #a7f3d0;padding:3px 10px;border-radius:99px;font-weight:700;">✓ ${tel.marca}</span>`
        : `<span style="font-size:.72rem;background:#fef2f2;color:#dc2626;border:1px solid #fecaca;padding:3px 10px;border-radius:99px;font-weight:700;">Sin skill</span>`
      }
    `;
    if (puede) {
      div.onclick = () => {
        document.querySelectorAll("#s4_tecnicos > div").forEach((d) =>
          d.classList.remove("selected")
        );
        div.classList.add("selected");
        tecnicoSelected = tec.nombre;
      };
    }
    lista.appendChild(div);
  });
}

function populateStep5() {
  if (!currentSerie) return;
  const tel = sistema.telefonos.get(currentSerie);
  const el  = document.getElementById("s5_telInfo");
  if (el) el.innerHTML = infoCard(tel);
  renderRepuestos();
}

function renderRepuestos() {
  const tel = sistema.telefonos.get(currentSerie);
  if (!tel) return;

  const lista   = document.getElementById("s5_lista");
  const totalEl = document.getElementById("s5_total");
  const totalNum= document.getElementById("s5_totalNum");
  if (!lista) return;

  lista.innerHTML = tel.repuestos
    .map((r, i) => `
      <div class="repuesto-row">
        <span style="color:var(--text2);">${i + 1}. ${r.nombre}</span>
        <span style="color:#ea580c;font-weight:700;">S/ ${r.precio}</span>
      </div>
    `).join("");

  const total = tel.repuestos.reduce((s, r) => s + r.precio, 0);
  if (totalEl) totalEl.classList.toggle("hidden", tel.repuestos.length === 0);
  if (totalNum) totalNum.textContent = `s/ ${total}`;
}

function populateStep6() {
  const el = document.getElementById("s6_contenido");
  if (!currentSerie) {
    el.innerHTML = `<p class="text-red-400 text-sm">No hay equipo en flujo. Vuelve al Paso 1.</p>`;
    return;
  }

  const tel   = sistema.verEstado(currentSerie);
  const total = tel.repuestos.reduce((s, r) => s + r.precio, 0);

  const esCls = {
    INGRESADO:      "badge-ingresado",
    DIAGNOSTICADO:  "badge-diagnosticado",
    AUTORIZADO:     "badge-autorizado",
    "EN REPARACION":"badge-reparacion",
  };

  const estaciones = [
    { paso: "Paso 1 · Ingreso",      hecho: true,             detalle: `Serie: ${tel.serie} | IMEI: ${tel.imei}` },
    { paso: "Paso 2 · Diagnóstico",  hecho: !!tel.diagnostico, detalle: tel.diagnostico ? `"${tel.diagnostico.descripcion}" — S/${tel.diagnostico.costoEstimado}` : "Pendiente" },
    { paso: "Paso 3 · Autorización", hecho: tel.autorizado,    detalle: tel.autorizado ? `Firmada · Abono: S/${tel.abono}` : "Pendiente" },
    { paso: "Paso 4 · Técnico",      hecho: !!tel.tecnico,     detalle: tel.tecnico ? `${tel.tecnico.nombre} (${tel.tecnico.skills.join(", ")})` : "Sin asignar" },
    { paso: "Paso 5 · Repuestos",    hecho: tel.repuestos.length > 0, detalle: tel.repuestos.length > 0 ? `${tel.repuestos.length} pieza(s) — Total S/${total}` : "Sin repuestos" },
  ];

  el.innerHTML = `
    <div class="card-panel mb-4">
      <div class="flex items-start justify-between">
        <div>
          <p style="font-size:1.1rem;font-weight:800;color:var(--text);margin:0;">${tel.marca} ${tel.modelo}</p>
          <p style="font-size:.78rem;color:var(--text2);margin:4px 0 0;">${tel.propietario} · <span class="mono">${tel.serie}</span></p>
        </div>
        <span style="font-size:.72rem;font-weight:700;padding:4px 12px;border-radius:99px;" class="${esCls[tel.estado] || "badge-ingresado"}">${tel.estado}</span>
      </div>
    </div>

    <p style="font-size:.68rem;color:var(--text3);text-transform:uppercase;letter-spacing:.08em;font-weight:800;margin-bottom:10px;">Recorrido del equipo</p>
    <div class="flex flex-col gap-2 mb-5">
      ${estaciones.map((e) => `
        <div class="estacion-row ${e.hecho ? "done" : ""}">
          <span style="font-size:1.1rem;">${e.hecho ? "✅" : "⏳"}</span>
          <div>
            <p style="font-weight:700;font-size:.875rem;color:var(--text);margin:0;">${e.paso}</p>
            <p style="font-size:.75rem;color:var(--text2);margin:2px 0 0;">${e.detalle}</p>
          </div>
        </div>
      `).join("")}
    </div>

    <div class="grid grid-cols-3 gap-3">
      <div class="stat-card">
        <p style="font-size:.68rem;color:var(--text3);margin:0 0 4px;font-weight:600;text-transform:uppercase;">Costo estimado</p>
        <p style="font-size:1.1rem;font-weight:800;color:var(--text);margin:0;">S/ ${tel.diagnostico?.costoEstimado || 0}</p>
      </div>
      <div class="stat-card" style="background:var(--purple-lt);border-color:#ddd6fe;">
        <p style="font-size:.68rem;color:var(--purple);margin:0 0 4px;font-weight:600;text-transform:uppercase;">Abono pagado</p>
        <p style="font-size:1.1rem;font-weight:800;color:var(--purple);margin:0;">S/ ${tel.abono}</p>
      </div>
      <div class="stat-card" style="background:#fff7ed;border-color:#fed7aa;">
        <p style="font-size:.68rem;color:#ea580c;margin:0 0 4px;font-weight:600;text-transform:uppercase;">Total repuestos</p>
        <p style="font-size:1.1rem;font-weight:800;color:#ea580c;margin:0;">S/ ${total}</p>
      </div>
    </div>
  `;
}



function resetAll() {
  currentSerie    = null;
  tecnicoSelected = null;
  sistema.telefonos.clear();
  sistema.limpiarStorage(); 
  goStep(0);
}

goStep(0);