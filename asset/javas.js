let counters = { primary: 0, secondary: 0, tertiary: 0 }; // Contadores por categoría
let allCharacters = []; // Almacenar todos los personajes obtenidos

// Función para obtener los personajes
async function fetchStarWarsCharacters() {
  try {
    let allData = [];
    let nextUrl = 'https://swapi.dev/api/people/';

    // Llamar a la API hasta que no haya más páginas
    while (nextUrl) {
      const response = await fetch(nextUrl);
      const data = await response.json();
      allData = allData.concat(data.results);
      nextUrl = data.next; // Obtener la siguiente página si existe
    }

    allCharacters = allData; // Guardar todos los personajes
    return allCharacters;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    return [];
  }
}

// Función para crear las subtarjetas dentro de las tarjetas
async function handleCardClick(category) {
  if (counters[category] >= 5) return; // Limitar a 5 personajes por categoría

  let startIndex = 0; // Por defecto
  let endIndex = 5;   // Por defecto

  // Determinar el rango de personajes según la categoría
  if (category === 'primary') {
    startIndex = 1;
    endIndex = 5;
  } else if (category === 'secondary') {
    startIndex = 6;
    endIndex = 11;
  } else if (category === 'tertiary') {
    startIndex = 12;
    endIndex = 17;
  }

  // Verifica que haya personajes disponibles para la categoría
  const character = allCharacters[counters[category] + startIndex];

  if (!character) return; 

  counters[category]++; // Incrementar el contador de la categoría

  // Crear una nueva subtarjeta dentro de la tarjeta clickeada
  const categoryContainer = document.getElementById(category); 
  const subCard = document.createElement('div');
  subCard.classList.add('card', 'mb-3', 'sub-card');

  // Determinar el color del círculo según la categoría
  let circleColor = 'red'; 
  if (category === 'secondary') {
    circleColor = 'green';
  } else if (category === 'tertiary') {
    circleColor = 'blue';
  }

  // Agregar contenido a la subtarjeta
  subCard.innerHTML = `
    <div class="card-body d-flex">
      <div class="circle" style="background-color: ${circleColor};"></div>
      <div class="ml-3">
        <h5 class="card-title">${character.name}</h5>
        <p class="card-text">Altura: ${character.height} cm</p>
        <p class="card-text">Peso: ${character.mass} kg</p>
      </div>
    </div>
  `;

  categoryContainer.appendChild(subCard);
}

// Asignar eventos de clic a las categorías
function clickPrimary() {
  handleCardClick('primary');
}

function clickSecondary() {
  handleCardClick('secondary');
}

function clickTertiary() {
  handleCardClick('tertiary');
}

// Inicializar los personajes cuando la página cargue
window.onload = async () => {
  await fetchStarWarsCharacters(); // Cargar todos los personajes
};
