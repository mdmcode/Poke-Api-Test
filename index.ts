// Ahora que tenemos nuestro HTML y CSS, es hora de darle vida con JavaScript <3

// 1. Seleccionar los Elementos HTML que vamos a utilizar:
// - Imagen de los pokemon
// - Stats de cada uno
// Pista: revisa el método document.querySelector()

// Pokemon 1
let poke1ImgElement: HTMLImageElement | null =
  document.querySelector(".pokemon-1__img");
let poke1HpElement: HTMLElement | null =
  document.querySelector(".pokemon-1__hp");
let poke1NameElement: HTMLElement | null =
  document.querySelector(".pokemon-1__name");
let poke1AttackElement: HTMLElement | null =
  document.querySelector(".pokemon-1__attack");
let poke1DefenseElement: HTMLElement | null = document.querySelector(
  ".pokemon-1__defense"
);
let poke1TypeElement: HTMLElement | null =
  document.querySelector(".pokemon-1__type");

// Pokemon 2
let poke2ImgElement: HTMLImageElement | null =
  document.querySelector(".pokemon-2__img");
let poke2HpElement: HTMLElement | null =
  document.querySelector(".pokemon-2__hp");
let poke2NameElement: HTMLElement | null =
  document.querySelector(".pokemon-2__name");
let poke2AttackElement: HTMLElement | null =
  document.querySelector(".pokemon-2__attack");
let poke2DefenseElement: HTMLElement | null = document.querySelector(
  ".pokemon-2__defense"
);
let poke2TypeElement: HTMLElement | null =
  document.querySelector(".pokemon-2__type");

// 2 - Analizar la API de Pokemon :)
// - Haz un llamado a la URL https://pokeapi.co/api/v2/pokemon/ y analiza cómo devuelve su respuesta
// Al API retorna un pokemon https://pokeapi.co/api/v2/pokemon/{ID} si se provee un ID al final.
// Para enfrentar 2 pokemones aleatores, necesitamos hacer 2 llamados a la API con 2 n´¨úmeros aleatorios entre el 1 y el 900

// 3 - Crear una función que genere un número random entre 1 y 900.
// Puedes usar esta:
function getRandomNumber(numMin: number, numMax: number): number {
  return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
}

// 4 - Asignar un número random al ID de los que serán nuestros pokemons
// Declara 2 variables para cada pokemon y guarda los números que retorna la funci´øn en ellos

const poke1ID: number = getRandomNumber(1, 900);
const poke2ID: number = getRandomNumber(1, 900);

// 5 - Crear una función para traer (fetch) data de la API
// Dale una mirada a la función fetch -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Recuerda la URL de la API https://pokeapi.co/api/v2/pokemon/${pokeID}

const getPokemon = async (pokeID: number) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeID}`);
  const data = await response.json();
  return data;
};

// 6 - Crear los pokemons. Haz varias pruebas a las API para examinar bien qué devuelve, esa data
// será necesaria para popular nuestros Elementos HTML
// Crea una función asíncrona que reciba los 2 ID de los pokemon
// Haz una llamada a la API por cada pokemon, guarda los datos que te devuelve en dos variables: pokemon1 y pokemon2
// - Toma los Elementos HTML que seleccionamos más arriba y utiliza su propiendad innerHTML para añadir la info que necesitamos de la API

const createPokemons = async (poke1ID: number, poke2ID: number) => {
  const pokemon1 = await getPokemon(poke1ID);

  // Verifica si los elementos no son de tipo null
  if (poke1ImgElement) {
    poke1ImgElement.src =
      pokemon1.sprites.other["official-artwork"]["front_default"];
  }
  if (poke1NameElement) {
    poke1NameElement.innerHTML += pokemon1.name;
  }
  if (poke1HpElement) {
    poke1HpElement.innerHTML += pokemon1.stats[0]["base_stat"];
  }
  if (poke1AttackElement) {
    poke1AttackElement.innerHTML += pokemon1.stats[1]["base_stat"];
  }
  if (poke1DefenseElement) {
    poke1DefenseElement.innerHTML += pokemon1.stats[2]["base_stat"];
  }
  if (poke1TypeElement) {
    poke1TypeElement.innerHTML += pokemon1.types[0].type.name;
  }

  const pokemon2 = await getPokemon(poke2ID);

  if (poke2ImgElement) {
    poke2ImgElement.src =
      pokemon2.sprites.other["official-artwork"]["front_default"];
  }
  if (poke2NameElement) {
    poke2NameElement.innerHTML += pokemon2.name;
  }
  if (poke2HpElement) {
    poke2HpElement.innerHTML += pokemon2.stats[0]["base_stat"];
  }
  if (poke2AttackElement) {
    poke2AttackElement.innerHTML += pokemon2.stats[1]["base_stat"];
  }
  if (poke2DefenseElement) {
    poke2DefenseElement.innerHTML += pokemon2.stats[2]["base_stat"];
  }
  if (poke2TypeElement) {
    poke2TypeElement.innerHTML += pokemon2.types[0].type.name;
  }

  console.log(pokemon1);
};

// BONUS 8 - Vamos a crear la función que permitirá que los pokemons interactúen y peleen

const fightPokemons = () => {
  // 1. Seleccionar los datos que ahora tenemos en el HTML y que trajimos desde la API: para ambos pokemon: HP, attack, defense y name.
  let poke1hp: number = 0;
  let poke1Attack: number = 0;
  let poke1Defense: number = 0;
  let poke1Name: string = "";

  let poke2hp: number = 0;
  let poke2Attack: number = 0;
  let poke2Defense: number = 0;
  let poke2Name: string = "";

  if (poke1HpElement) {
    poke1hp = parseInt(poke1HpElement.innerHTML);
  }
  if (poke1AttackElement) {
    poke1Attack = parseInt(poke1AttackElement.innerHTML);
  }
  if (poke1DefenseElement) {
    poke1Defense = parseInt(poke1DefenseElement.innerHTML);
  }
  if (poke1NameElement) {
    poke1Name = poke1NameElement.innerHTML;
  }

  if (poke2HpElement) {
    poke2hp = parseInt(poke2HpElement.innerHTML);
  }
  if (poke2AttackElement) {
    poke2Attack = parseInt(poke2AttackElement.innerHTML);
  }
  if (poke2DefenseElement) {
    poke2Defense = parseInt(poke2DefenseElement.innerHTML);
  }
  if (poke2NameElement) {
    poke2Name = poke2NameElement.innerHTML;
  }

  const modalText = document.querySelector(".modal__text");

  // 2. Crear una función que calcule el daño hecho a cada pokemon. Necesitamos el poder del atacante y la defensa y los HP del que defiende
  // - Calcular el daño restando el ataque de la defensa, con esto definimos si el pokemon sufrió daño.
  // - Calcular los nuevos HP: Si la defensa es menor a 0, significa que el ataque logró perforarla e hizo daño, en este caso vamos a restar el daño de los HP, si no, la HP debe quedar igual pues no hubo da˜ño
  // En esta función vamos a devolver la nueva HP del pokemon atacado y además el da˜ñó que sufrió. - Luego vamos a necesitar estos datos -
  const calcularDano = (
    ataque: number,
    defensa: number = 0,
    hp: number = 0
  ) => {
    const damage = defensa - ataque;
    const newHP = damage < 0 ? hp + damage : hp;

    return [newHP, damage];
  };

  // 3. Narrar la batalla ;). Para esto vamos a usar el elemento modal__text, aquí vamos a ir llenando su innerHTML.
  // Empecemos con el Pokemon 1.

  if (modalText) {
    modalText.innerHTML += `${poke1Name} ataca a ${poke2Name} con ${poke1Attack} puntos de ataque <br>`;
  }

  // Ahora calculemos el daño que le hizo a pokemon2 y cuánta vida le queda, usemos la función de calcular daño

  const [poke2newHP, poke2DmgRecibido] = calcularDano(
    poke1Attack,
    poke2Defense,
    poke2hp
  );

  // Vamos a narrar qué pasó en este ataque.Si el pokemon 1 tiene un ataque mayor a la denfesa del pokemon 2, debemos narrar que logra perforar su defensa
  // y describir cuánto daño recibió y cuáles son ahora sus puntos de vida
  // Si el ataque del pokemon 1 no es mayor que la denfesa del pokemon 2, significa que no logra perforarla y por lo tanto no hay daño.
  if (poke1Attack > poke2Defense && modalText) {
    modalText.innerHTML += ` ${poke1Name} logra perforar la defensa de ${poke2Name} y recibe ${Math.abs(
      poke2DmgRecibido
    )} puntos de daño <br> <br> Ahora el HP de ${poke2Name} es de ${poke2newHP} <br> <br>`;
  } else {
    if (modalText) {
      modalText.innerHTML += ` ${poke1Name}  no logra perforar la defensa de ${poke2Name} <br> <br>`;
    }
  }

  // Ahora el Pokemon2, mismo procedimiento.
  if (modalText) {
    modalText.innerHTML += `${poke2Name} ataca a ${poke1Name} con ${poke2Attack} puntos de ataque <br>`;
  }

  const [poke1newHP, poke1DmgRecibido] = calcularDano(
    poke2Attack,
    poke1Defense,
    poke1hp
  );

  if (poke2Attack > poke1Defense && modalText) {
    modalText.innerHTML += ` ${poke2Name} logra perforar la defensa de ${poke1Name} y recibe ${Math.abs(
      poke1DmgRecibido
    )} puntos de daño <br> <br> Ahora el HP de ${poke1Name} es de ${poke1newHP} <br> <br>`;
  } else {
    if (modalText) {
      modalText.innerHTML += ` ${poke2Name}  no logra perforar la defensa de ${poke1Name} <br> <br>`;
    }
  }

  // Definamos el ganador que sería el más daño haya hecho al otro pokemon.
  // Recordemos que los puntos de daño son negativos!!
  // - Si el daño recibido por pokemon 2 es menor al de pokemon 1, (es decir un mayor número negativo), significa que pokemon 1 hizo más daño, por lo tanto es el gandor!
  // - En caso de que sea menor el daño de pokemon 1, significa que pokemon 2 es el gandor
  // - El último caso posible es que ambos hayan recibido el mismo daño, en ese caso sería un empate.
  if (poke2DmgRecibido < poke1DmgRecibido) {
    if (modalText) {
      modalText.innerHTML += ` ${poke1Name} es el ganador!`;
    }
  } else if (poke1DmgRecibido < poke2DmgRecibido) {
    if (modalText) {
      modalText.innerHTML += ` ${poke2Name} es el ganador!`;
    }
  } else {
    if (modalText) {
      modalText.innerHTML += `Es un empate!`;
    }
  }
};

// 7 - Vamos a practicar eventos en JS, de esta manera vamos a poder controlar cuándo traer pokemons desde la interfaz
// Nuestra función fetch va a traer pokemons cada que el código es ejecutado, es decir cuando la página se recarga
// Vamos a añadir un botón que recargue la página en cada click, así podemos obtener nuevos pokemons random cada vez.
// - Seleccionar el elmento HTML del botón
// - Llamar a la función createPokemons solo cuando se dé click a ese botón (lee sobre eventListeners https://www.w3schools.com/js/js_htmldom_eventlistener.asp )

const catchButton: HTMLElement | null =
  document.querySelector(".button__catch");
const fightButton: HTMLElement | null =
  document.querySelector(".button__fight");
const modalButton: HTMLElement | null =
  document.querySelector(".button__modal");

createPokemons(poke1ID, poke2ID);

if (catchButton) {
  catchButton.addEventListener("click", () => {
    window.location.reload();
  });
}

if (fightButton) {
  fightButton.addEventListener("click", () => {
    const modalLayer: HTMLDivElement | null = document.querySelector(".layer");
    const modalContainer: HTMLDivElement | null =
      document.querySelector(".modal");
    if (modalLayer && modalContainer) {
      modalLayer.style.display = "block";
      modalContainer.style.display = "block";
    }

    fightPokemons();
  });
}

if (modalButton) {
  modalButton.addEventListener("click", () => {
    const modalLayer: HTMLDivElement | null = document.querySelector(".layer");
    const modalContainer: HTMLDivElement | null =
      document.querySelector(".modal");
    const modalText = document.querySelector(".modal__text");

    if (modalLayer && modalText && modalContainer) {
      modalLayer.style.display = "none";
      modalContainer.style.display = "none";
      modalText.innerHTML = "";
    }
  });
}
