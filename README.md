# 💖 Diana cosas

Bienvenido al repositorio del proyecto **Diana Love**. Este es una aplicación web interactiva diseñada para crear una experiencia de usuario encantadora y sorprendente, con un enfoque en el diseño visual premium y la interactividad fluida.

## 🎨 Sistema de Diseño y Convenciones

Para mantener la coherencia visual y la calidad del proyecto, seguimos estrictamente estas guías de estilo:

### 1. Paleta de Colores (Pastel & Premium)

El diseño se basa en tonos suaves y pastel que evocan calma y elegancia, con acentos vibrantes para la interacción.

- **Fondo Principal**: Gradiente suave de verde pastel (`#E8F5E9` a `#C8E6C9`).
- **Acentos de Amor**: Rosas y rojos suaves (`#E57373`, `#F06292`, `#FFCDD2`).
- **Acentos de Seguridad**: Azules claros y confiables (`#E3F2FD`, `#2196F3`).
- **Texto**: Gris azulado oscuro para una lectura cómoda (`#2c3e50`).
- **Errores**: Rojo alerta pero no agresivo (`#FF5252`).

### 2. Tipografía

Utilizamos una combinación de fuentes de Google Fonts para lograr un equilibrio entre modernidad y elegancia clásica.

- **Títulos y Encabezados**: `Playfair Display` (Serif). Aporta un toque editorial y sofisticado.
- **Cuerpo y UI**: `Outfit` (Sans-serif). Moderna, geométrica y altamente legible.

### 3. Estilo Visual (Look & Feel)

- **Glassmorphism**: Uso de fondos translúcidos con `backdrop-filter: blur()` para modales y superposiciones.
- **Bordes Suaves**: Radio de borde amplio (`24px` o `50%` para círculos) para una apariencia amigable.
- **Sombras**: Sombras difusas y grandes (`box-shadow: 0 20px 60px...`) que dan profundidad sin ser duras.
- **Micro-interacciones**: Feedback visual inmediato (hover effects, escalas al hacer click).

### 4. Animaciones

La experiencia debe sentirse "viva".

- **Librería**: `framer-motion`.
- **Física**: Preferimos animaciones tipo `spring` (resorte) sobre `ease-in-out` lineales para dar peso y realismo a los elementos.
- **Transiciones**: Todo elemento que entra o sale del DOM debe tener una transición de opacidad y escala.

### 5. 📱 Experiencia Móvil (Responsive)

El amor no conoce de tamaños de pantalla. La aplicación debe ser **totalmente responsiva** y ofrecer una experiencia premium en cualquier dispositivo (Móvil, Tablet, Desktop).

- **Touch-First**: Los botones y elementos interactivos deben tener un tamaño adecuado para dedos (min 44px).
- **Adaptabilidad**: Los modales deben ocupar el ancho completo (con márgenes) en móviles y centrarse en desktop.
- **Tipografía**: Los tamaños de fuente se ajustan dinámicamente (`clamp()` o media queries) para mantener la legibilidad sin abrumar la pantalla pequeña.
- **No Scroll**: En la vista principal, evitamos el scroll innecesario para mantener la sensación de "app" nativa.

---

## 🛠️ Stack Tecnológico

- **Framework**: React + Vite
- **Estilos**: CSS Modules / Inline Styles (con objetos de estilo JS para animaciones dinámicas)
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Confetti**: canvas-confetti

## 📂 Estructura del Proyecto

```
src/
├── components/      # Componentes UI reutilizables (Popups, Botones)
├── data/            # Archivos de datos estáticos (Preguntas, Mensajes)
├── assets/          # Imágenes y recursos estáticos
├── App.jsx          # Componente principal y lógica de flujo
└── index.css        # Estilos globales y variables CSS
```

## 🚀 Cómo Iniciar

1.  Instalar dependencias:
    ```bash
    npm install
    ```
2.  Iniciar servidor de desarrollo:
    ```bash
    npm run dev
    ```

---

> _"Hecho con ❤️ y código."_
