// Ahora que tenemos nuestro HTML y CSS, es hora de darle vida con JavaScript <3

// 1️⃣. Seleccionar los elementos HTML que vamos a utilizar:
// - Imagen de los pokemon
// - Stats de cada uno
// 🤓 Pista: revisa el método document.querySelector()

// Selectores para el Pokemon 1
let img_pokemon_1 = document.querySelector(".poke-img pokemon-1__img")
let hp_1 = document.querySelector(".pokemon-1__hp")
let name_1 = document.querySelector(".pokemon-1__name")
let attack_1 = document.querySelector(".pokemon-1__attack")
let defense_1 = document.querySelector(".pokemon-1__defense")
let type_1 = document.querySelector(".pokemon-1__type")

// Selectores para el Pokemon 2
let img_pokemon_2 = document.querySelector(".poke-img pokemon-2__img")
let hp_2 = document.querySelector(".pokemon-2__hp")
let name_2 = document.querySelector(".pokemon-2__name")
let attack_2 = document.querySelector(".pokemon-2__attack")
let defense_2 = document.querySelector(".pokemon-2__defense")
let type_2 = document.querySelector(".pokemon-2__type")

// 2️⃣. Miremos ahora la API de Pokemon :)
// - Haz un llamado a la URL https://pokeapi.co/api/v2/pokemon/ y analiza cómo devuelve su respuesta
// La API retorna un pokemon https://pokeapi.co/api/v2/pokemon/{ID} si se provee un ID al final.
// 🤓 Pista: Para enfrentar 2 pokemones aleatores, necesitamos hacer 2 llamados a la API con 2 n´¨úmeros aleatorios entre el 1 y el 900

// 3️⃣ - Crear una función que genere un número random entre 1 y 900.
// Puedes usar esta: 👩🏻‍💻
const getRandomNumber = (numMin, numMax) => {
  return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
};

// 4️⃣ - Asignar un número random al ID de los que serán nuestros pokemons
// Declara 2 variables para cada pokemon y guarda los números que retorna la funci´øn en ellos

// 🤓 Pista: algo como ... const poke1ID = getRandomNumber(1, 900);

const poke1ID = getRandomNumber(1, 900);
const poke2ID = getRandomNumber(2, 900);

// 5️⃣ - Crear una función para traer (fetch) data de la API
// Dale una mirada a la función fetch -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Recuerda la URL de la API https://pokeapi.co/api/v2/pokemon/${pokeID}

//Puedes usar esta: 👩🏻‍💻
const getPokemon = async (pokeID) => {
  const response = await fetch(` https://pokeapi.co/api/v2/pokemon/${pokeID}`);
  const data = await response.json();
  return data;
};

// 6️⃣ - Vamos a crear los pokemons en la función createPokemons.
// Primero Haz varias pruebas a las API para examinar bien qué devuelve, esa data
// será necesaria para popular nuestros elementos HTML
// 🤓 Pista: - Crea una función asíncrona que reciba los 2 ID de los pokemon, es decir los números que obtenemos de llamar la función random
//           - Haz una llamada a la API por cada pokemon, guarda los datos que te devuelve en dos variables: pokemon1 y pokemon2
//           - Toma los elementos HTML que seleccionamos más arriba y utiliza su propiendad innerHTML para añadir la info que necesitamos de la API
let pokemon1;
let pokemon2;

async function createPokemons() {
  // Creamos el primer pokemon con la API
  pokemon1 = getPokemon(poke1ID);
  // Agregamos los datos
  hp_1.innerHTML = pokemon1["hp"]
  name_1.innerHTML = pokemon1["name"]
  attack_1.innerHTML = pokemon1["attack"]
  defense_1.innerHTML = pokemon1["defense"]
  type_1.innerHTML = pokemon1["type"]

  // Repetimos para el segundo pokemon
  pokemon2 = getPokemon(poke2ID);
  hp_2.innerHTML = pokemon2["hp"]
  name_2.innerHTML = pokemon2["name"]
  attack_2.innerHTML = pokemon2["attack"]
  defense_2.innerHTML = pokemon2["defense"]
  type_2.innerHTML = pokemon2["type"]
}



// 🎁 Bonus! - Vamos a crear la función fightPokemons que permitirá que los pokemons interactúen y peleen

function fightPokemons() {
  // 1. Seleccionar los datos que ahora tenemos en el HTML y que trajimos desde la API: para ambos pokemon: HP, attack, defense y name.
  hp_1 = document.querySelector(".pokemon-1__hp")
  name_1 = document.querySelector(".pokemon-1__name")
  attack_1 = document.querySelector(".pokemon-1__attack")
  defense_1 = document.querySelector(".pokemon-1__defense")
  type_1 = document.querySelector(".pokemon-1__type")

  // Selectores para el Pokemon 2
  hp_2 = document.querySelector(".pokemon-2__hp")
  name_2 = document.querySelector(".pokemon-2__name")
  attack_2 = document.querySelector(".pokemon-2__attack")
  defense_2 = document.querySelector(".pokemon-2__defense")

  // 2. Crear una función que calcule el daño hecho a cada pokemon. Necesitamos el poder del atacante y la defensa y los HP del que defiende
  // - Calcular el daño restando el ataque de la defensa, con esto definimos si el pokemon sufrió daño.
  // - Calcular los nuevos HP: Si la defensa es menor a 0, significa que el ataque logró perforarla e hizo daño, en este caso vamos a restar el daño de los HP, si no, la HP debe quedar igual pues no hubo da˜ño
  // En esta función vamos a devolver la nueva HP del pokemon atacado y además el da˜ñó que sufrió. - Luego vamos a necesitar estos datos -
  function ataque_y_defensa(ataque, defensa, hp_defensa){
    dano = defensa - ataque
    if (defensa < 0) {
      hp_defensa -= dano;
    }

    return hp_defensa, dano;
  }

  // 3. Narrar la batalla ;). Para esto vamos a usar el elemento modal__text, aquí vamos a ir llenando su innerHTML.
  // Empecemos con el Pokemon 1.
  let narrar = document.querySelector('.modal__text');
  narrar.innerHTML = "Pokemon 1 ataca";
  
  // Ahora calculemos el daño que le hizo a pokemon2 y cuánta vida le queda, usemos la función de calcular daño
  ataque_y_defensa(attack_1, defense_2, hp_2);
  
  // Vamos a narrar qué pasó en este ataque.Si el pokemon 1 tiene un ataque mayor a la denfesa del pokemon 2, debemos narrar que logra perforar su defensa
  // y describir cuánto daño recibió y cuáles son ahora sus puntos de vida
  // Si el ataque del pokemon 1 no es mayor que la denfesa del pokemon 2, significa que no logra perforarla y por lo tanto no hay daño.
  if (attack_1 > defense_2) {
    narrar.innerHTML = "El pokemon 1 logra perforar la defensa del pokemon 2, recibio " + dano + " de dano";
  } else {
    narrar.innerHTML = "El pokemon 1 no logra perforar la defensa del pokemon 2, no hay dano"
  }

  // Ahora el Pokemon2, mismo procedimiento.
  narrar.innerHTML = "Pokemon 1 ataca";
  let hpd, dano = ataque_y_defensa(attack_2, defense_1, hp_1);

  if (attack_2 > defense_1) {
    narrar.innerHTML = "El pokemon 1 logra perforar la defensa del pokemon 2, recibio " + dano + " de dano";
  } else {
    narrar.innerHTML = "El pokemon 1 no logra perforar la defensa del pokemon 2, no hay dano"
  }

  // Definamos el ganador que sería el más daño haya hecho al otro pokemon.
  // Recordemos que los puntos de daño son negativos!!
  // - Si el daño recibido por pokemon 2 es menor al de pokemon 1, (es decir un mayor número negativo), significa que pokemon 1 hizo más daño, por lo tanto es el gandor!
  // - En caso de que sea menor el daño de pokemon 1, significa que pokemon 2 es el gandor
  // - El último caso posible es que ambos hayan recibido el mismo daño, en ese caso sería un empate.
}

// 7️⃣ - Vamos a practicar eventos en JS, de esta manera vamos a poder controlar cuándo traer pokemons desde la interfaz
// Nuestra función fetch va a traer pokemons cada que el código es ejecutado, es decir cuando la página se recarga
// Vamos a añadir un botón que recargue la página en cada click, así podemos obtener nuevos pokemons random cada vez.
// 🤓 Pista: - Seleccionar el elmento HTML del botón
//           - Llamar a la función createPokemons solo cuando se dé click a ese botón (lee sobre eventListeners https://www.w3schools.com/js/js_htmldom_eventlistener.asp )
// 🕵🏻‍♀️ En nuestra app tenemos 3 botones. El de Catch!, Fight! y el que OK! que aparece en el modal cuando pelean los pokemons
// Cada botón tendrá atado un eventListener que vamos a construir juntos ❤️

