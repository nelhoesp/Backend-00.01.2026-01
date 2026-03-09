// Problema 01

const btnGithub = document.getElementById("btn_github");
const inputValue = document.getElementById("usuario_github");
const infoUser = document.getElementById("info-user");

const getData = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};

btnGithub.addEventListener("click", async () => {
  const username = inputValue.value.trim();

  if (!username) {
    alert("Ingrese un nombre de usuario");
    return;
  }

  infoUser.innerHTML = '<p class="text-gray-400 text-sm">Cargando...</p>';

  const user = await getData(username);

  if (!user) {
    infoUser.innerHTML = `
            <div class="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-sm">
                No se encontró el perfil de "${username}"
            </div>`;
    return;
  }

  infoUser.innerHTML = "";

  const card = document.createElement("div");
  card.className = "w-full max-w-sm";

  card.innerHTML = `
      <div class="bg-blue-600 h-1 rounded-t-2xl"></div>
      <div class="bg-[#161b22] border border-[#30363d] border-t-0 rounded-b-2xl p-6 shadow-2xl">
        <div class="flex items-center gap-4 mb-5">
          <div class="relative flex-shrink-0">
            <img
              src="${user.avatar_url}"
              alt="${user.login}"
              class="w-16 h-16 rounded-full ring-2 ring-[#30363d]"
            />
          </div>

          <div class="min-w-0">
            <h2 class="text-white font-bold text-lg leading-tight truncate">
                ${user.name || user.login}
            </h2>
            <span class="font-mono text-blue-400 text-xs">@${user.login}</span>
            <div class="mt-1.5">
              <span class="inline-flex items-center bg-blue-900/30 text-blue-400 text-[10px] font-mono px-2 py-0.5 rounded-full border border-blue-800">
                ${user.bio || "Usuario de GitHub"}
              </span>
            </div>
          </div>
        </div>

        <p class="text-gray-400 text-sm leading-relaxed mb-5 border-l-2 border-[#30363d] pl-3">
            ${user.location || "Sin ubicación definida"}
        </p>

        <div class="grid grid-cols-3 gap-2">
          <div class="flex flex-col items-center bg-[#0d1117] border border-[#30363d] rounded-xl py-3 px-2">
            <span class="text-white font-bold text-xl font-mono">${user.public_repos}</span>
            <span class="text-gray-500 text-[10px] mt-0.5 font-mono uppercase">Repos</span>
          </div>
          <div class="flex flex-col items-center bg-[#0d1117] border border-[#30363d] rounded-xl py-3 px-2">
            <span class="text-white font-bold text-xl font-mono">${user.followers}</span>
            <span class="text-gray-500 text-[10px] mt-0.5 font-mono uppercase">Seguidores</span>
          </div>
          <div class="flex flex-col items-center bg-[#0d1117] border border-[#30363d] rounded-xl py-3 px-2">
            <span class="text-white font-bold text-xl font-mono">${user.following}</span>
            <span class="text-gray-500 text-[10px] mt-0.5 font-mono uppercase">Siguiendo</span>
          </div>
        </div>
      </div>`;

  infoUser.appendChild(card);
});

//problema02
const btnClima = document.getElementById("btn_clima");
const inputCiudad = document.getElementById("ciudad_clima");
const infoClima = document.getElementById("info-clima");

const getCoordinates = async (city) => {
  try {
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es&format=json`,
    );
    const data = await response.json();
    return data.results ? data.results[0] : null;
  } catch (error) {
    return null;
  }
};

const getWeatherData = async (lat, lon) => {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`,
    );
    return await response.json();
  } catch (error) {
    return null;
  }
};

btnClima.addEventListener("click", async () => {
  const city = inputCiudad.value.trim();
  if (!city) return;

  infoClima.innerHTML =
    '<p class="text-gray-400 text-sm">Obteniendo datos...</p>';

  const location = await getCoordinates(city);
  if (!location) {
    infoClima.innerHTML = `<div class="p-4 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-sm">Ubicación no encontrada</div>`;
    return;
  }

  const weather = await getWeatherData(location.latitude, location.longitude);
  if (!weather) return;

  infoClima.innerHTML = "";
  const card = document.createElement("div");
  card.className = "w-full max-w-sm";

  card.innerHTML = `
      <div class="bg-orange-500 h-1 rounded-t-2xl"></div>
      <div class="bg-[#161b22] border border-[#30363d] border-t-0 rounded-b-2xl p-6 shadow-2xl">
        <div class="flex flex-col gap-1 mb-5">
            <h2 class="text-white font-bold text-xl">${location.name}</h2>
            <span class="text-gray-500 text-xs uppercase tracking-widest">${location.country}</span>
        </div>

        <div class="flex items-center justify-between mb-6">
            <div class="text-5xl font-bold text-white font-mono">
                ${Math.round(weather.current.temperature_2m)}°C
            </div>
            <div class="text-right">
                <p class="text-orange-400 text-sm font-medium">Viento</p>
                <p class="text-white font-mono">${weather.current.wind_speed_10m} km/h</p>
            </div>
        </div>

        <div class="grid grid-cols-2 gap-4 border-t border-[#30363d] pt-5">
            <div>
                <p class="text-gray-500 text-[10px] uppercase font-bold mb-1">Humedad (Promedio)</p>
                <p class="text-white font-mono">${weather.hourly.relative_humidity_2m[0]}%</p>
            </div>
            <div>
                <p class="text-gray-500 text-[10px] uppercase font-bold mb-1">Zona Horaria</p>
                <p class="text-white text-xs truncate">${weather.timezone_abbreviation}</p>
            </div>
        </div>
      </div>`;

  infoClima.appendChild(card);
});

//ejercicio 03

const btnDolar = document.getElementById("btn_dolar");
const infoDolar = document.getElementById("info-dolar");

const getExchangeRate = async () => {
  try {
    const response = await fetch(
      "https://api.exchangerate-api.com/v4/latest/USD",
    );
    const data = await response.json();

    return {
      compra: data.rates.PEN - 0.015,
      venta: data.rates.PEN + 0.015,
      fecha: new Date().toLocaleDateString(),
    };
  } catch (error) {
    return null;
  }
};

btnDolar.addEventListener("click", async () => {
  infoDolar.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse">Sincronizando...</p>';

  const data = await getExchangeRate();

  if (!data) {
    infoDolar.innerHTML = `<div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">Error al obtener datos</div>`;
    return;
  }

  infoDolar.innerHTML = "";
  const card = document.createElement("div");
  card.className = "flex flex-col gap-3 animate-fade-in";

  card.innerHTML = `
      <div class="bg-green-500 h-1 rounded-full"></div>
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-2xl">
        <div class="text-center mb-3">
            <span class="text-gray-500 text-[9px] uppercase font-bold">Mercado Interbancario</span>
        </div>

        <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center bg-[#0d1117] border border-[#30363d] rounded-lg p-2.5">
                <span class="text-gray-400 text-[10px] uppercase font-bold">Compra</span>
                <span class="text-white font-bold text-base font-mono">S/ ${data.compra.toFixed(3)}</span>
            </div>
            <div class="flex justify-between items-center bg-[#0d1117] border border-[#30363d] rounded-lg p-2.5">
                <span class="text-gray-400 text-[10px] uppercase font-bold">Venta</span>
                <span class="text-white font-bold text-base font-mono">S/ ${data.venta.toFixed(3)}</span>
            </div>
        </div>
        
        <p class="text-[8px] text-gray-600 mt-3 text-center uppercase tracking-tighter">Ref: ExchangeRate-API</p>
      </div>`;

  infoDolar.appendChild(card);
});

//problema04

const btnPokemon = document.getElementById("btn_pokemon");
const infoPokemon = document.getElementById("info-pokemon");

let offset = 0;
const limit = 20;

const getPokemonList = async (currentOffset) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`,
    );
    if (!response.ok) return null;
    const data = await response.json();
    return data.results;
  } catch (error) {
    return null;
  }
};

const renderPokemon = async () => {
  const originalText = btnPokemon.innerText;
  btnPokemon.innerText = "Cargando...";
  btnPokemon.disabled = true;

  const list = await getPokemonList(offset);

  if (list) {
    if (offset === 0) infoPokemon.innerHTML = "";

    list.forEach((pokemon) => {
      const id = pokemon.url.split("/").filter(Boolean).pop();
      const item = document.createElement("div");
      item.className =
        "bg-[#161b22] border border-[#30363d] rounded-lg p-3 flex items-center justify-between hover:border-red-500 transition-colors group animate-fade-in";

      item.innerHTML = `
                <div class="flex items-center gap-3">
                    <span class="text-gray-600 font-mono text-[10px]">#${id.padStart(3, "0")}</span>
                    <span class="text-white text-xs font-medium capitalize">${pokemon.name}</span>
                </div>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" 
                     alt="${pokemon.name}" class="w-8 h-8 group-hover:scale-125 transition-transform">
            `;
      infoPokemon.appendChild(item);
    });

    offset += limit;
    btnPokemon.innerText = "Cargar más";
  } else {
    btnPokemon.innerText = "Error";
  }

  btnPokemon.disabled = false;

  infoPokemon.scrollTop = infoPokemon.scrollHeight;
};

btnPokemon.addEventListener("click", renderPokemon);

//problema05

const btnPoderes = document.getElementById("btn_poderes");
const inputPokemon = document.getElementById("pokemon_name");
const infoPoderes = document.getElementById("info-poderes");

const getPokemonData = async (name) => {
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`,
    );
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};

btnPoderes.addEventListener("click", async () => {
  const name = inputPokemon.value.trim();
  if (!name) return;

  infoPoderes.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse italic">Consultando datos...</p>';

  const pokemon = await getPokemonData(name);

  if (!pokemon) {
    infoPoderes.innerHTML = `<div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">Pokémon no encontrado</div>`;
    return;
  }

  infoPoderes.innerHTML = "";
  const card = document.createElement("div");
  card.className = "flex flex-col gap-3 animate-fade-in";

  card.innerHTML = `
      <div class="bg-slate-500 h-1 rounded-full"></div>
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-2xl">
        
        <div class="flex flex-col items-center mb-4">
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" class="w-20 h-20 mb-1">
            <h2 class="text-white font-bold capitalize text-lg">${pokemon.name}</h2>
            <span class="text-gray-500 text-[10px] font-mono">ID: ${pokemon.id}</span>
        </div>

        <div class="flex flex-col gap-2">
            <span class="text-gray-400 text-[9px] uppercase font-bold tracking-widest border-b border-[#30363d] pb-1">Habilidades</span>
            <div class="flex flex-wrap gap-2 pt-1">
                ${pokemon.abilities
                  .map(
                    (a) => `
                    <div class="bg-[#0d1117] border border-[#30363d] rounded-md px-2 py-1 flex-1 text-center">
                        <p class="text-white text-[10px] capitalize font-medium">${a.ability.name.replace("-", " ")}</p>
                        ${a.is_hidden ? '<span class="text-[8px] text-blue-400 uppercase font-bold">Oculta</span>' : ""}
                    </div>
                `,
                  )
                  .join("")}
            </div>
        </div>

        <div class="grid grid-cols-2 gap-2 mt-4">
            <div class="bg-gray-900/50 p-2 rounded-lg text-center">
                <p class="text-gray-500 text-[8px] uppercase">Altura</p>
                <p class="text-white text-xs font-mono">${pokemon.height / 10}m</p>
            </div>
            <div class="bg-gray-900/50 p-2 rounded-lg text-center">
                <p class="text-gray-500 text-[8px] uppercase">Peso</p>
                <p class="text-white text-xs font-mono">${pokemon.weight / 10}kg</p>
            </div>
        </div>
      </div>`;

  infoPoderes.appendChild(card);
});

//problema06
const btnRick = document.getElementById("btn_rick");
const infoRick = document.getElementById("info-rick");

const getRickCharacters = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    if (!response.ok) return null;
    const data = await response.json();
    return data.results;
  } catch (error) {
    return null;
  }
};

btnRick.addEventListener("click", async () => {
  infoRick.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse">Abriendo portal...</p>';

  const characters = await getRickCharacters();

  if (!characters) {
    infoRick.innerHTML = `<div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">Error en el portal</div>`;
    return;
  }

  infoRick.innerHTML = "";

  characters.forEach((char) => {
    const div = document.createElement("div");
    div.className =
      "bg-[#161b22] border border-[#30363d] rounded-xl p-3 flex flex-col items-center gap-2 hover:border-lime-500 transition-all group";

    const statusColor =
      char.status === "Alive"
        ? "bg-green-500"
        : char.status === "Dead"
          ? "bg-red-500"
          : "bg-gray-500";

    div.innerHTML = `
            <img src="${char.image}" alt="${char.name}" class="w-16 h-16 rounded-full border-2 border-[#30363d] group-hover:border-lime-500 transition-all">
            <div class="text-center">
                <h3 class="text-white text-xs font-bold truncate w-48">${char.name}</h3>
                <div class="flex items-center justify-center gap-1.5 mt-1">
                    <span class="w-1.5 h-1.5 rounded-full ${statusColor}"></span>
                    <span class="text-gray-400 text-[9px] uppercase tracking-tighter">${char.species} - ${char.status}</span>
                </div>
            </div>
        `;
    infoRick.appendChild(div);
  });
});

//problema07
const btnRickDetail = document.getElementById("btn_rick_detail");
const inputRick = document.getElementById("rick_name");
const infoRickDetail = document.getElementById("info-rick-detail");

const getRickData = async (query) => {
  try {
    const isId = !isNaN(query);
    const url = isId
      ? `https://rickandmortyapi.com/api/character/${query}`
      : `https://rickandmortyapi.com/api/character/?name=${query.toLowerCase()}`;

    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();

    return isId ? data : data.results[0];
  } catch (error) {
    return null;
  }
};

btnRickDetail.addEventListener("click", async () => {
  const query = inputRick.value.trim();
  if (!query) return;

  infoRickDetail.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse italic">Escaneando multiverso...</p>';

  const char = await getRickData(query);

  if (!char) {
    infoRickDetail.innerHTML = `<div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">Personaje no encontrado</div>`;
    return;
  }

  infoRickDetail.innerHTML = "";
  const card = document.createElement("div");
  card.className = "flex flex-col gap-3 animate-fade-in";

  card.innerHTML = `
      <div class="bg-lime-500 h-1 rounded-full"></div>
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-2xl">
        
        <div class="flex flex-col items-center mb-4">
            <img src="${char.image}" alt="${char.name}" class="w-20 h-20 rounded-lg border border-[#30363d] mb-2">
            <h2 class="text-white font-bold text-center text-md leading-tight">${char.name}</h2>
            <span class="text-lime-400 text-[9px] font-mono uppercase tracking-widest mt-1">${char.status} - ${char.species}</span>
        </div>

        <div class="flex flex-col gap-3">
            <div class="border-l-2 border-lime-600 pl-3">
                <p class="text-gray-500 text-[8px] uppercase font-bold">Última ubicación conocida:</p>
                <p class="text-white text-[10px]">${char.location.name}</p>
            </div>

            <div class="border-l-2 border-gray-600 pl-3">
                <p class="text-gray-500 text-[8px] uppercase font-bold">Origen:</p>
                <p class="text-white text-[10px]">${char.origin.name}</p>
            </div>
        </div>

        <div class="mt-4 pt-3 border-t border-[#30363d] flex justify-between items-center">
            <span class="text-gray-500 text-[8px] uppercase font-bold">Apariciones:</span>
            <span class="bg-lime-900/30 text-lime-400 px-2 py-0.5 rounded text-[10px] font-mono">
                ${char.episode.length} episodios
            </span>
        </div>
      </div>`;

  infoRickDetail.appendChild(card);
});

//problema08
const btnCocktail = document.getElementById("btn_cocktail");
const infoCocktail = document.getElementById("info-cocktail");

const getTopCocktails = async () => {
  try {
    const response = await fetch(
      "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=m",
    );
    if (!response.ok) return null;
    const data = await response.json();

    return data.drinks ? data.drinks.slice(0, 10) : null;
  } catch (error) {
    return null;
  }
};

btnCocktail.addEventListener("click", async () => {
  infoCocktail.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse">Preparando la barra...</p>';

  const drinks = await getTopCocktails();

  if (!drinks) {
    infoCocktail.innerHTML = `<div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">Error al cargar el menú</div>`;
    return;
  }

  infoCocktail.innerHTML = "";

  drinks.forEach((drink) => {
    const div = document.createElement("div");
    div.className =
      "bg-[#161b22] border border-[#30363d] rounded-xl p-3 flex items-center gap-3 hover:border-fuchsia-500 transition-all group";

    div.innerHTML = `
            <img src="${drink.strDrinkThumb}/preview" alt="${drink.strDrink}" class="w-12 h-12 rounded-lg border border-[#30363d] group-hover:scale-110 transition-transform">
            <div class="min-w-0">
                <h3 class="text-white text-[11px] font-bold truncate w-32 capitalize">${drink.strDrink}</h3>
                <p class="text-fuchsia-400 text-[9px] uppercase tracking-tighter">${drink.strCategory}</p>
                <span class="text-gray-500 text-[8px] italic">${drink.strAlcoholic}</span>
            </div>
        `;
    infoCocktail.appendChild(div);
  });
});

//problema09
const btnTienda = document.getElementById("btn_tienda");
const infoTienda = document.getElementById("info-tienda");

const getProducts = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products?limit=10");
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};

btnTienda.addEventListener("click", async () => {
  infoTienda.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse italic">Conectando con el almacén...</p>';

  const products = await getProducts();

  if (!products) {
    infoTienda.innerHTML = `<div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">Error al cargar productos</div>`;
    return;
  }

  infoTienda.innerHTML = "";

  products.forEach((product) => {
    const div = document.createElement("div");
    div.className =
      "bg-[#161b22] border border-[#30363d] rounded-xl p-3 flex flex-col gap-2 hover:border-indigo-500 transition-all group";

    div.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="w-10 h-10 bg-white rounded-md p-1 flex-shrink-0">
                    <img src="${product.image}" alt="${product.title}" class="w-full h-full object-contain">
                </div>
                <div class="min-w-0 flex-1">
                    <h3 class="text-white text-[10px] font-bold truncate">${product.title}</h3>
                    <p class="text-indigo-400 text-[11px] font-mono font-bold">$${product.price.toFixed(2)}</p>
                </div>
            </div>
            <div class="flex justify-between items-center mt-1">
                <span class="text-gray-500 text-[8px] uppercase tracking-tighter">${product.category}</span>
                <div class="flex items-center gap-1">
                    <span class="text-yellow-500 text-[9px]">★</span>
                    <span class="text-gray-400 text-[9px]">${product.rating.rate}</span>
                </div>
            </div>
        `;
    infoTienda.appendChild(div);
  });
});

//problema10

const btnPicsum = document.getElementById("btn_picsum");
const infoPicsum = document.getElementById("info-picsum");

const getPicsumPhotos = () => {
  const photos = [];
  for (let i = 0; i < 10; i++) {
    const randomId = Math.floor(Math.random() * 1000);
    photos.push({
      id: randomId,

      url: `https://picsum.photos/id/${randomId}/200/200`,
      download: `https://picsum.photos/id/${randomId}/1200/800`,
    });
  }
  return photos;
};

btnPicsum.addEventListener("click", () => {
  infoPicsum.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse">Revelando fotografías...</p>';

  setTimeout(() => {
    const photos = getPicsumPhotos();
    infoPicsum.innerHTML = "";

    photos.forEach((photo) => {
      const div = document.createElement("div");
      div.className =
        "bg-[#161b22] border border-[#30363d] rounded-xl p-2 flex flex-col gap-2 hover:border-violet-500 transition-all group";

      div.innerHTML = `
                <div class="relative overflow-hidden rounded-lg aspect-square bg-gray-800">
                    <img src="${photo.url}" alt="Random Image" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                         onerror="this.src='https://picsum.photos/200/200?random=${photo.id}'">
                </div>
                <div class="px-1 flex justify-between items-center">
                    <span class="text-gray-500 text-[8px] font-mono">ID: ${photo.id}</span>
                    <a href="${photo.download}" target="_blank" class="text-violet-400 text-[9px] font-bold hover:underline">HD</a>
                </div>
            `;
      infoPicsum.appendChild(div);
    });
  }, 500);
});

//ejercicio11
const btnCita = document.getElementById("btn_cita");
const infoCita = document.getElementById("info-cita");

const getQuote = async () => {
  try {
    const response = await fetch("https://api.quotable.io/random");
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
};

btnCita.addEventListener("click", async () => {
  infoCita.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse">Buscando sabiduría...</p>';

  const data = await getQuote();

  if (!data) {
    infoCita.innerHTML = `
            <div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">
                La sabiduría tardará un poco más en llegar (Error)
            </div>`;
    return;
  }

  infoCita.innerHTML = "";
  const card = document.createElement("div");
  card.className = "flex flex-col gap-3 animate-fade-in";

  card.innerHTML = `
      <div class="bg-emerald-500 h-1 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl p-4 shadow-2xl relative">
        <span class="absolute top-2 left-2 text-emerald-800 text-4xl opacity-20 font-serif">"</span>
        
        <p class="text-white text-xs italic leading-relaxed text-center px-2 mb-4 relative z-10">
            ${data.content}
        </p>

        <div class="text-center pt-3 border-t border-[#30363d]">
            <p class="text-emerald-400 text-[10px] font-bold uppercase tracking-widest">${data.author}</p>
            <div class="flex flex-wrap justify-center gap-1 mt-2">
                ${data.tags
                  .map(
                    (tag) => `
                    <span class="text-[7px] bg-gray-800 text-gray-500 px-1.5 py-0.5 rounded border border-gray-700">
                        ${tag}
                    </span>
                `,
                  )
                  .join("")}
            </div>
        </div>
      </div>`;

  infoCita.appendChild(card);
});

//ejercicio12
const btnMovies = document.getElementById("btn_movies");
const infoMovies = document.getElementById("info-movies");

const getOmdbMovies = async () => {
  try {
    const response = await fetch(
      "https://www.omdbapi.com/?s=2025&apikey=fc1fef96",
    );
    if (!response.ok) throw new Error("Error en la petición");
    const data = await response.json();
    return data.Response === "True" ? data.Search.slice(0, 6) : null;
  } catch (error) {
    return null;
  }
};

btnMovies.addEventListener("click", async () => {
  infoMovies.innerHTML =
    '<p class="text-gray-400 text-[10px] text-center animate-pulse italic">Cargando cartelera...</p>';

  const movies = await getOmdbMovies();

  if (!movies) {
    infoMovies.innerHTML = `<div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">Sin resultados</div>`;
    return;
  }

  infoMovies.innerHTML = "";
  infoMovies.className =
    "max-h-96 overflow-y-auto pr-1 grid grid-cols-2 gap-3 custom-scroll";

  const fragment = document.createDocumentFragment();

  movies.forEach((movie) => {
    const div = document.createElement("div");

    div.className =
      "bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden hover:border-rose-500 transition-all group flex flex-col";

    const posterPath =
      movie.Poster && movie.Poster !== "N/A"
        ? movie.Poster
        : "https://via.placeholder.com/300x450?text=Sin+Imagen";

    div.innerHTML = `
            <div class="relative aspect-[2/3] overflow-hidden">
                <img src="${posterPath}" alt="${movie.Title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2">
                     <p class="text-white text-[9px] font-bold truncate">${movie.Title}</p>
                     <p class="text-rose-400 text-[8px] font-mono">${movie.Year}</p>
                </div>
            </div>
            <div class="p-1.5 text-center bg-[#0d1117]">
                <span class="text-[7px] text-gray-500 uppercase tracking-widest font-bold">${movie.Type}</span>
            </div>`;

    fragment.appendChild(div);
  });

  infoMovies.appendChild(fragment);
});


//ejercicio13
const btnMovieDetail = document.getElementById("btn_movie_detail");
const inputMovie = document.getElementById("movie_query");
const infoMovieDetail = document.getElementById("info-movie-detail");

const getFullMovieData = async (title) => {
    try {
        
        const response = await fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&plot=full&apikey=fc1fef96`);
        if (!response.ok) return null;
        const data = await response.json();
        return data.Response === "True" ? data : null;
    } catch (error) {
        return null;
    }
};

btnMovieDetail.addEventListener("click", async () => {
    const query = inputMovie.value.trim();
    if (!query) return;

    infoMovieDetail.innerHTML = '<p class="text-gray-400 text-[10px] text-center animate-pulse italic">Consultando archivos de Hollywood...</p>';

    const movie = await getFullMovieData(query);

    if (!movie) {
        infoMovieDetail.innerHTML = `<div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">Película no encontrada</div>`;
        return;
    }

    infoMovieDetail.innerHTML = "";
    const card = document.createElement('div');
    card.className = "flex flex-col gap-3 animate-fade-in";

    card.innerHTML = `
      <div class="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden shadow-2xl">
        <div class="relative w-full aspect-[2/3]">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Sin+Poster'}" 
                 class="w-full h-full object-cover">
            <div class="absolute top-2 right-2 bg-black/70 backdrop-blur-sm px-2 py-1 rounded border border-yellow-500/50">
                <p class="text-yellow-500 text-[10px] font-bold">⭐ ${movie.imdbRating}</p>
            </div>
        </div>

        <div class="p-4 flex flex-col gap-3">
            <div>
                <h2 class="text-white font-bold text-sm leading-tight uppercase">${movie.Title}</h2>
                <div class="flex gap-2 mt-1">
                    <span class="text-gray-500 text-[9px]">${movie.Year}</span>
                    <span class="text-gray-500 text-[9px] border-l border-gray-700 pl-2">${movie.Runtime}</span>
                </div>
            </div>

            <div class="flex flex-wrap gap-1">
                ${movie.Genre.split(',').map(g => `<span class="bg-rose-900/30 text-rose-400 text-[8px] px-2 py-0.5 rounded-full border border-rose-800/40">${g.trim()}</span>`).join('')}
            </div>

            <div class="space-y-2 pt-2 border-t border-[#30363d]">
                <p class="text-gray-300 text-[10px] leading-relaxed line-clamp-4 italic">"${movie.Plot}"</p>
                
                <div class="flex flex-col gap-1">
                    <p class="text-gray-500 text-[8px] uppercase font-bold tracking-tighter">Director:</p>
                    <p class="text-white text-[10px]">${movie.Director}</p>
                </div>

                <div class="flex flex-col gap-1">
                    <p class="text-gray-500 text-[8px] uppercase font-bold tracking-tighter">Reparto:</p>
                    <p class="text-white text-[10px]">${movie.Actors}</p>
                </div>
            </div>
        </div>
      </div>`;

    infoMovieDetail.appendChild(card);
});



//ejercicio15

const btnApod = document.getElementById("btn_apod");
const infoApod = document.getElementById("info-apod");

const getApodData = async () => {
    const API_KEY = "UDfexkwn0qIhH1pFGvaUOFoNlZwLvlF9tpjQIWFO";
    const API_URL = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`;
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Llave excedida o error de red");
        return await response.json();
    } catch (error) {
        return null;
    }
};

btnApod.addEventListener("click", async () => {
    infoApod.innerHTML = '<p class="text-gray-400 text-[10px] text-center animate-pulse italic">Recibiendo transmisión satelital...</p>';

    const data = await getApodData();

    if (!data) {
        infoApod.innerHTML = `
            <div class="p-2 bg-red-900/20 border border-red-800 rounded-lg text-red-300 text-[10px] text-center">
                Error: Revisa tu cuota de API o conexión.
            </div>`;
        return;
    }

    infoApod.innerHTML = "";
    const container = document.createElement('div');
    container.className = "flex flex-col gap-3 animate-fade-in";

    const mediaHtml = data.media_type === "image" 
        ? `<img src="${data.url}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">`
        : `<iframe src="${data.url}" class="w-full aspect-video" frameborder="0" allowfullscreen></iframe>`;

    container.innerHTML = `
        <div class="bg-[#161b22] border border-[#30363d] rounded-xl overflow-hidden group shadow-2xl">
            <div class="relative overflow-hidden">
                ${mediaHtml}
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black p-2">
                    <p class="text-[9px] text-indigo-400 font-mono font-bold">${data.date}</p>
                </div>
            </div>
            
            <div class="p-4">
                <h2 class="text-white font-bold text-xs uppercase mb-2 leading-tight">${data.title}</h2>
                <div class="max-h-32 overflow-y-auto pr-1 custom-scroll">
                    <p class="text-gray-400 text-[10px] leading-relaxed text-justify">
                        ${data.explanation}
                    </p>
                </div>
                
                <div class="mt-4 pt-3 border-t border-[#30363d] flex justify-between items-center">
                    <span class="text-gray-500 text-[8px] font-bold italic">© ${data.copyright || 'NASA'}</span>
                    <a href="${data.hdurl || data.url}" target="_blank" 
                       class="text-indigo-400 text-[9px] font-bold hover:underline">VER HD</a>
                </div>
            </div>
        </div>`;

    infoApod.appendChild(container);
});