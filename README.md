# Goat X Eroge - Proyecto Personal

Este repositorio contiene un proyecto personal creado para demostrar mis habilidades y mejorar la experiencia de la landing page de **Goat X Eroge**. Es una versión reimaginada, moderna, rápida y dinámica que he construido con **Astro** y **React** para demostrar que se puede hacer mejor.

## 🚀 Características
- **Contador regresivo dinámico:** Visualización clara de los días, horas, minutos y segundos restantes.
- **Internacionalización (i18n):** Creé un sistema propio para soporte multilingüe instantáneo en Español, Inglés, Portugués y Coreano, sin depender de librerías externas.
- **Barra de Progreso animada:** Feedback visual fluido sobre el progreso actual del desarrollo.
- **Diseño ultra-responsivo y optimizado:** Desarrollé toda la interfaz con CSS nativo y componentes de React altamente eficientes.
- **Formulario de Suscripción:** Componente limpio con validación local instantánea que programé para captar correos electrónicos.

## 📁 Estructura del Código
He diseñado la arquitectura del proyecto para que sea minimalista y esté 100% limpia de archivos de demostración o código residual.
- `src/pages/index.astro`: El esqueleto principal y gestor del estado global de i18n de la página.
- `src/styles/global.css`: Sistema de diseño global con variables y tokens de estilos personalizados.
- `src/components/Countdown.tsx`: Componente en React para gestionar el reloj de cuenta atrás de forma inteligente.
- `src/components/FeatureCards.tsx`: Presentación de novedades y mecánicas del sistema.
- `src/components/NotifyForm.tsx`: Lógica y UI del formulario de notificación con validación del lado del cliente.

## 🛠️ Ejecución y Desarrollo

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Ejecutar entorno de desarrollo local (Abre http://localhost:4321 en tu navegador):
   ```bash
   npm run dev
   ```

3. Construcción para producción:
   ```bash
   npm run build
   ```

## ⚙️ Guía de Personalización Fácil

Para que no tengas que buscar en un millón de archivos, concentré toda la configuración principal de la página en la parte superior del archivo `src/pages/index.astro`. Al inicio de ese archivo verás estas variables que puedes cambiar muy fácilmente:

- `progressPercentage`: Cambia este número (ej: 95) para modificar cuánto porcentaje de progreso se muestra en la barra animada.
- `progressDurationSeconds`: El tiempo (en segundos) que tarda la barra en llenarse desde 0 hasta el porcentaje establecido.
- `visualTitleDate`: El texto de la fecha que aparece en grande en el centro de la página (ej: "07 / 06 / 2026").
- `countdownTarget`: La fecha real matemática hacia la cual el reloj hará la cuenta atrás (formato: "Año-Mes-DíaTHora:Min:Seg-Zona").
- `socialLinks`: Aquí están las URLs de X, Instagram, TikTok, YouTube y Discord. ¡Solo pega tus enlaces y los iconos del Footer te llevarán a tus redes!
- `copyrightText`: Cambia el texto de los derechos reservados del footer.

### 🌐 Cómo funciona el sistema de idiomas (Traducciones)
No utilicé librerías externas pesadas. Construí el gestor de idiomas de manera nativa y ultra-rápida. 
- En el archivo `src/pages/index.astro`, casi al final, hay una variable llamada `const dict = { ... }`. Ahí dentro encontrarás las versiones en `es` (Español), `en` (Inglés), `pt` (Portugués) y `ko` (Coreano) para el texto principal. Solo cambia el texto entre comillas y se actualizará en toda la página.
- En los componentes `src/components/Countdown.tsx`, `FeatureCards.tsx` y `NotifyForm.tsx`, verás un bloque similar con sus respectivos textos para los distintos idiomas.
- Si quieres agregar un idioma nuevo, simplemente agrégalo al diccionario (por ejemplo `fr` para francés) en cada uno de estos archivos, y añade una opción nueva en el menú desplegable (línea 132 de `index.astro`).

## 🔒 Estabilidad
Audité y optimicé el proyecto para ser veloz y seguro. La carpeta `node_modules` es fundamental localmente para ejecutar los componentes, pero la excluí correctamente mediante `.gitignore`.

<br/><br/>
<div align="right"><sub style="font-size: 8px; opacity: 0.5;">gracias antigravity</sub></div>
