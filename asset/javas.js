let counters = { primary: 0, secondary: 0, tertiary: 0 };
let allCharacters = [];
let loadingStatus = 'idle'; // 'loading', 'success', 'error'

// Base URL para obtener imágenes de personajes
const STAR_WARS_IMAGE_BASE = 'https://starwars-visualguide.com/assets/img/characters/';

// Función para obtener los personajes con reintentos
async function fetchStarWarsCharacters(retries = 3) {
  try {
    let allData = [];
    let nextUrl = 'https://swapi.dev/api/people/';
    let retryCount = 0;

    // Llamar a la API hasta que no haya más páginas
    while (nextUrl) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout

        const response = await fetch(nextUrl, { signal: controller.signal });
        clearTimeout(timeout);

        // ✅ VALIDAR que la respuesta fue exitosa
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Enriquecer datos con URL de imagen
        const charactersWithImages = data.results.map((char, index) => {
          // Extraer ID del personaje de la URL
          const characterId = char.url.match(/\/people\/(\d+)\//)?.[1];
          return {
            ...char,
            image: characterId ? `${STAR_WARS_IMAGE_BASE}${characterId}.jpg` : null
          };
        });
        
        allData = allData.concat(charactersWithImages);
        nextUrl = data.next;
        retryCount = 0; // Reset retry counter en éxito

      } catch (pageError) {
        retryCount++;
        if (retryCount >= retries) {
          throw pageError; // Lanzar error si se agotaron reintentos
        }
        console.warn(`Reintentando página... (${retryCount}/${retries})`);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Esperar 1 segundo antes de reintentar
      }
    }

    allCharacters = allData;
    loadingStatus = 'success';
    console.log(`✅ Se cargaron ${allCharacters.length} personajes con imágenes`);
    updateLoadingUI('success');
    return allCharacters;

  } catch (error) {
    loadingStatus = 'error';
    console.error('❌ Error al obtener datos:', error.message);
    updateLoadingUI('error', error.message);
    return [];
  }
}

// ✅ NUEVO: Mostrar estado de carga al usuario
function updateLoadingUI(status, errorMessage = '') {
  const output = document.getElementById('output');
  if (!output) return;

  if (status === 'loading') {
    output.innerHTML = '<p style="text-align: center; color: #666;">⏳ Cargando personajes de Star Wars...</p>';
  } else if (status === 'error') {
    output.innerHTML = `
      <div style="background-color: #fee; padding: 15px; border-radius: 8px; color: #c00; text-align: center;">
        <p><strong>❌ No se pudieron cargar los personajes</strong></p>
        <p style="font-size: 0.9rem;">${errorMessage}</p>
        <p style="font-size: 0.85rem; color: #888;">La API de Star Wars puede estar caída. Intenta refrescar la página.</p>
        <button onclick="location.reload()" style="padding: 8px 16px; margin-top: 10px; background: #c00; color: white; border: none; border-radius: 4px; cursor: pointer;">
          🔄 Recargar página
        </button>
      </div>
    `;
  } else if (status === 'success') {
    output.innerHTML = '';
  }
}

// Función para crear las subtarjetas dentro de las tarjetas
async function handleCardClick(category) {
  if (loadingStatus === 'error' || allCharacters.length === 0) {
    alert('⚠️ Los personajes no se han cargado aún. Por favor, recarga la página.');
    return;
  }

  if (counters[category] >= 5) return;

  let startIndex = 0;
  let endIndex = 5;

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

  const character = allCharacters[counters[category] + startIndex];

  if (!character) {
    alert('⚠️ No hay más personajes en esta categoría.');
    return;
  }

  counters[category]++;

  const categoryContainer = document.getElementById(category);
  const subCard = document.createElement('div');
  subCard.classList.add('card', 'mb-3', 'sub-card');

  let circleColor = 'red';
  if (category === 'secondary') {
    circleColor = 'green';
  } else if (category === 'tertiary') {
    circleColor = 'blue';
  }

  // ✅ NUEVO: Incluir imagen del personaje
  const imageHTML = character.image ? 
    `<img src="${character.image}" alt="${character.name}" class="character-image" onerror="this.src='https://via.placeholder.com/80?text=Sin+Imagen'" />` :
    `<img src="https://via.placeholder.com/80?text=Sin+Imagen" alt="${character.name}" class="character-image" />`;

  subCard.innerHTML = `
    <div class="card-body d-flex">
      <div class="circle" style="background-color: ${circleColor};"></div>
      ${imageHTML}
      <div class="ml-3">
        <h5 class="card-title">${character.name}</h5>
        <p class="card-text">Altura: ${character.height} cm</p>
        <p class="card-text">Peso: ${character.mass} kg</p>
      </div>
    </div>
  `;

  categoryContainer.appendChild(subCard);
}

function clickPrimary() {
  handleCardClick('primary');
}

function clickSecondary() {
  handleCardClick('secondary');
}

function clickTertiary() {
  handleCardClick('tertiary');
}

// Inicializar
window.onload = async () => {
  loadingStatus = 'loading';
  updateLoadingUI('loading');
  await fetchStarWarsCharacters();
};
