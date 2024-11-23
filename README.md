# StarWars
StarWars
Star Wars Characters Timeline
Este proyecto presenta una línea de tiempo interactiva que muestra cómo serían en la vida real tus personajes favoritos de Star Wars. Utiliza la API pública de Star Wars para obtener datos de personajes y los presenta en tarjetas categorizadas de manera atractiva con un diseño responsivo basado en Bootstrap 5.

Funcionalidades
Categorías de Personajes: Los personajes están organizados en tres categorías:
Personajes Principales
Personajes Secundarios
Otros Personajes
Interactividad: Al hacer clic en cada categoría, se muestra una nueva tarjeta con información de los personajes en esa categoría.
API de Star Wars: Los datos de los personajes son obtenidos de la API pública de Star Wars (SWAPI), que incluye nombre, altura y peso de los personajes.
Tecnologías
HTML5
CSS3 (Estilos personalizados)
JavaScript (Interactividad y obtención de datos de la API)
Bootstrap 5 (Para el diseño y la estructura responsiva)
Font Awesome (Para los iconos)
Estructura del Proyecto
bash
Copiar código
/starwars-timeline
│
├── index.html        # Página principal que incluye el contenido y diseño de la interfaz
├── asset/
│   ├── style.css     # Estilos personalizados
│   └── javas.js      # Archivo de JavaScript con la lógica para cargar y mostrar los personajes
└── README.md         # Este archivo
Instalación
Clona el repositorio:

bash
Copiar código
git clone https://github.com/tu-usuario/starwars-timeline.git
Abre el archivo index.html en tu navegador.

Cómo Funciona
Carga de Personajes: Al cargar la página, la aplicación hace una llamada a la API pública de Star Wars (https://swapi.dev/api/people/) para obtener información de los personajes.
Mostrar Personajes: Los personajes están distribuidos en tres categorías, y cada categoría tiene un máximo de 5 personajes. Al hacer clic en una categoría, se agregan personajes a la tarjeta correspondiente.
Diseño Responsivo: El diseño es completamente responsivo, lo que significa que se adapta a diferentes tamaños de pantalla, desde dispositivos móviles hasta pantallas de escritorio.
Contribuciones
Si deseas contribuir al proyecto, siéntete libre de abrir un Pull Request. Asegúrate de seguir las mejores prácticas de desarrollo y de probar tu código antes de hacer cambios.

Licencia
Este proyecto está bajo la licencia MIT.

