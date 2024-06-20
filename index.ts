// Ahora que tenemos nuestro HTML y CSS, es hora de darle vida con JavaScript <3

// 1. Seleccionar los elementos HTML que vamos a utilizar:
// - Imagen de los pokemon
// - Stats de cada uno
// Pista: revisa el método document.querySelector()

class Pokemon {
    id: number;
    name: string;
    hp: number;
    attack: number;
    defense: number;
    type: string;
    imgElement: HTMLImageElement | null;
    nameElement: HTMLElement | null;
    hpElement: HTMLElement | null;
    attackElement: HTMLElement | null;
    defenseElement: HTMLElement | null;
    typeElement: HTMLElement | null;

    constructor(id: number, n: number) {
        this.id = id;
        this.name = "";
        this.hp = 0;
        this.attack = 0;
        this.defense = 0;
        this.type = "";

        this.imgElement = document.querySelector(`.pokemon-${n}__img`);
        this.nameElement = document.querySelector(`.pokemon-${n}__name`);
        this.hpElement = document.querySelector(`.pokemon-${n}__hp`);
        this.attackElement = document.querySelector(`.pokemon-${n}__attack`);
        this.defenseElement = document.querySelector(`.pokemon-${n}__defense`);
        this.typeElement = document.querySelector(`.pokemon-${n}__type`);
    }

    async fetchPokemon() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${this.id}`);
        const data = await response.json();
        this.name = data.name;
        this.hp = data.stats[0].base_stat;
        this.attack = data.stats[1].base_stat;
        this.defense = data.stats[2].base_stat;
        this.type = data.types[0].type.name;
        this.imgElement!.src = data.sprites.other["official-artwork"]["front_default"];
        this.nameElement!.innerHTML = this.name;
        this.hpElement!.innerHTML = this.hp.toString();
        this.attackElement!.innerHTML = this.attack.toString();
        this.defenseElement!.innerHTML = this.defense.toString();
        this.typeElement!.innerHTML = this.type;
    }
}

// 2 - Analizar la API de Pokemon :)
// - Haz un llamado a la URL https://pokeapi.co/api/v2/pokemon/ y analiza cómo devuelve su respuesta
// Al API retorna un pokemon https://pokeapi.co/api/v2/pokemon/{ID} si se provee un ID al final.
// Para enfrentar 2 pokemones aleatores, necesitamos hacer 2 llamados a la API con 2 n´¨úmeros aleatorios entre el 1 y el 900

// 3 - Crear una función que genere un número random entre 1 y 900.
// Puedes usar esta:
const getRandomNumber = (numMin: number, numMax: number) => {
    return Math.floor(Math.random() * (numMax - numMin + 1) + numMin);
};

// 4 - Asignar un número random al ID de los que serán nuestros pokemons
// Declara 2 variables para cada pokemon y guarda los números que retorna la funci´øn en ellos

// 5 - Crear una función para traer (fetch) data de la API
// Dale una mirada a la función fetch -> https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
// Recuerda la URL de la API https://pokeapi.co/api/v2/pokemon/${pokeID}


// 6 - Crear los pokemons. Haz varias pruebas a las API para examinar bien qué devuelve, esa data
// será necesaria para popular nuestros elementos HTML
// Crea una función asíncrona que reciba los 2 ID de los pokemon
// Haz una llamada a la API por cada pokemon, guarda los datos que te devuelve en dos variables: pokemon1 y pokemon2
// - Toma los elementos HTML que seleccionamos más arriba y utiliza su propiendad innerHTML para añadir la info que necesitamos de la API
const poke1ID = getRandomNumber(1, 900);
const poke2ID = getRandomNumber(1, 900);
const poke1: Pokemon = new Pokemon(poke1ID, 1)
const poke2: Pokemon = new Pokemon(poke2ID, 2)

poke1.fetchPokemon()
poke2.fetchPokemon()

// BONUS 8 - Vamos a crear la función que permitirá que los pokemons interactúen y peleen

const fightPokemons = () => {
    // 1. Seleccionar los datos que ahora tenemos en el HTML y que trajimos desde la API: para ambos pokemon: HP, attack, defense y name.
    const modalText = document.querySelector(".modal__text");

    // 2. Crear una función que calcule el daño hecho a cada pokemon. Necesitamos el poder del atacante y la defensa y los HP del que defiende
    // - Calcular el daño restando el ataque de la defensa, con esto definimos si el pokemon sufrió daño.
    // - Calcular los nuevos HP: Si la defensa es menor a 0, significa que el ataque logró perforarla e hizo daño, en este caso vamos a restar el daño de los HP, si no, la HP debe quedar igual pues no hubo da˜ño
    // En esta función vamos a devolver la nueva HP del pokemon atacado y además el da˜ñó que sufrió. - Luego vamos a necesitar estos datos -
    const calcularDano = (ataque: number, defensa: number, hp: number) => {
        const damage = defensa - ataque;
        const newHP = damage < 0 ? hp + damage : hp;

        return [newHP, damage];
    };

    // 3. Narrar la batalla ;). Para esto vamos a usar el elemento modal__text, aquí vamos a ir llenando su innerHTML.
    // Empecemos con el Pokemon 1.

    modalText!.innerHTML += `${poke1.name} ataca a ${poke2.name} con ${poke1.attack} puntos de ataque <br>`;

    // Ahora calculemos el daño que le hizo a pokemon2 y cuánta vida le queda, usemos la función de calcular daño

    const [poke2newHP, poke2DmgRecibido] = calcularDano(
        poke1.attack,
        poke2.defense,
        poke2.hp
    );

    // Vamos a narrar qué pasó en este ataque.Si el pokemon 1 tiene un ataque mayor a la denfesa del pokemon 2, debemos narrar que logra perforar su defensa
    // y describir cuánto daño recibió y cuáles son ahora sus puntos de vida
    // Si el ataque del pokemon 1 no es mayor que la denfesa del pokemon 2, significa que no logra perforarla y por lo tanto no hay daño.
    if (poke1.attack > poke2.defense) {
        modalText!.innerHTML += ` ${poke1.name} logra perforar la defensa de ${poke2.name} y recibe ${Math.abs(poke2DmgRecibido)} puntos de daño <br> <br> Ahora el HP de ${poke2.name} es de ${poke2newHP} <br> <br>`;
    } else {
        modalText!.innerHTML += ` ${poke1.name}  no logra perforar la defensa de ${poke2.name} <br> <br>`;
    }

    // Ahora el Pokemon2, mismo procedimiento.
    modalText!.innerHTML += `${poke2.name} ataca a ${poke1.name} con ${poke2.attack} puntos de ataque <br>`;

    const [poke1newHP, poke1DmgRecibido] = calcularDano(
        poke2.attack,
        poke1.defense,
        poke1.hp
    );

    if (poke2.attack > poke1.defense) {
        modalText!.innerHTML += ` ${poke2.name} logra perforar la defensa de ${poke1.name} y recibe ${Math.abs(poke1DmgRecibido)} puntos de daño <br> <br> Ahora el HP de ${poke1.name} es de ${poke1newHP} <br> <br>`;
    } else {
        modalText!.innerHTML += ` ${poke2.name}  no logra perforar la defensa de ${poke1.name} <br> <br>`;
    }

    // Definamos el ganador que sería el más daño haya hecho al otro pokemon.
    // Recordemos que los puntos de daño son negativos!!
    // - Si el daño recibido por pokemon 2 es menor al de pokemon 1, (es decir un mayor número negativo), significa que pokemon 1 hizo más daño, por lo tanto es el gandor!
    // - En caso de que sea menor el daño de pokemon 1, significa que pokemon 2 es el gandor
    // - El último caso posible es que ambos hayan recibido el mismo daño, en ese caso sería un empate.
    if (poke2DmgRecibido < poke1DmgRecibido) {
        modalText!.innerHTML += ` ${poke1.name} es el ganador!`;
    } else if (poke1DmgRecibido < poke2DmgRecibido) {
        modalText!.innerHTML += ` ${poke2.name} es el ganador!`;
    } else {
        modalText!.innerHTML += `Es un empate!`;
    }
};

// 7 - Vamos a practicar eventos en JS, de esta manera vamos a poder controlar cuándo traer pokemons desde la interfaz
// Nuestra función fetch va a traer pokemons cada que el código es ejecutado, es decir cuando la página se recarga
// Vamos a añadir un botón que recargue la página en cada click, así podemos obtener nuevos pokemons random cada vez.
// - Seleccionar el elmento HTML del botón
// - Llamar a la función createPokemons solo cuando se dé click a ese botón (lee sobre eventListeners https://www.w3schools.com/js/js_htmldom_eventlistener.asp )

const catchButton:HTMLButtonElement | null = document.querySelector(".button__catch");
const fightButton:HTMLButtonElement | null = document.querySelector(".button__fight");
const modalButton:HTMLButtonElement | null = document.querySelector(".button__modal");

catchButton!.addEventListener("click", () => {
    window.location.reload();
});

fightButton!.addEventListener("click", () => {
    const modalLayer:HTMLDivElement | null = document.querySelector(".layer");
    const modalContainer:HTMLDivElement | null = document.querySelector(".modal");
    modalLayer!.style.display = "block";
    modalContainer!.style.display = "block";

    fightPokemons();
});

modalButton!.addEventListener("click", () => {
    const modalLayer:HTMLDivElement | null = document.querySelector(".layer");
    const modalContainer:HTMLDivElement | null = document.querySelector(".modal");
    const modalText:HTMLParagraphElement | null = document.querySelector(".modal__text");
    modalLayer!.style.display = "none";
    modalContainer!.style.display = "none";
    modalText!.innerHTML = "";
});