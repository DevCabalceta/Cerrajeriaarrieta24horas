# CLAUDE.md — Cerrajería Arrieta 24 Horas

## 1. Project Context

Este repositorio corresponde al rediseño completo del sitio web de **Cerrajería Arrieta 24 Horas**, una empresa de servicios de cerrajería en Costa Rica.

Sitio web original:
https://cerrajeriaarrieta24horas.com/

El proyecto consiste en desarrollar una landing page moderna, minimalista, premium y de alto rendimiento, orientada principalmente a la conversión mediante WhatsApp y llamadas telefónicas.

No se busca replicar el sitio anterior. Su contenido debe utilizarse exclusivamente como referencia para obtener información empresarial, servicios, logotipo, fotografías y datos de contacto.

Nunca inventar información comercial, servicios, testimonios, certificaciones o estadísticas.

El objetivo es conseguir una experiencia comparable a la de un producto digital premium, evitando la apariencia tradicional de las plantillas corporativas.

---

## 2. Technology Stack

Stack principal obligatorio:

- Astro.
- TypeScript.
- Tailwind CSS (sistema principal de estilos).
- React Islands mediante `@astrojs/react`, únicamente cuando sean necesarias.
- Motion for React (`motion/react`) para microinteracciones.
- Astro Image para optimización de recursos visuales.
- SVG para iconografía.

### Technical Rules

1. Astro debe encargarse principalmente del contenido estático y renderizado.
2. Tailwind CSS tiene prioridad absoluta para implementar estilos.
3. Utilizar Motion solamente donde aporte valor real.
4. No convertir todas las secciones Astro en componentes React.
5. No utilizar GSAP ni AOS.
6. Evitar dependencias innecesarias.
7. Mantener TypeScript correctamente tipado.
8. Priorizar componentes reutilizables.
9. Utilizar CSS personalizado únicamente cuando Tailwind no resuelva adecuadamente una necesidad.
10. Respetar la versión instalada de Astro y la compatibilidad de todas las dependencias.

Para las animaciones básicas, priorizar CSS y Tailwind. Utilizar Motion para transiciones complejas, springs, AnimatePresence, estados interactivos y microanimaciones.

---

## 3. Visual Direction — IMPORTANT

La dirección visual del proyecto está inspirada principalmente en:

### Primary Reference

https://x.ai/bot

Esta es la referencia visual más importante, especialmente por su minimalismo tecnológico y calidad de microanimaciones.

Priorizar:

- Composiciones limpias.
- Tipografía protagonista.
- Espacios negativos generosos.
- Animaciones discretas.
- Microinteracciones refinadas.
- Transiciones naturales.
- Excelente jerarquía visual.
- Interfaz moderna y minimalista.

### Secondary Reference

https://www.marco.fyi/

Utilizar como inspiración adicional para:

- Diseño editorial.
- Composiciones creativas.
- Tipografía.
- Hover effects.
- Transiciones.
- Atención a pequeños detalles visuales.

### Component Inspiration

https://www.framer.com/marketplace/components/

Explorar componentes de Framer Marketplace cuando se necesiten ideas de navegación, botones, animaciones o interacciones.

Los componentes exclusivos de Framer deben adaptarse o recrearse utilizando las tecnologías del proyecto, respetando siempre sus respectivas licencias.

No copiar directamente el diseño de las referencias. Reinterpretar su filosofía para construir una identidad propia para Cerrajería Arrieta.

---

## 4. Design Principles

El diseño debe comunicar:

- Seguridad.
- Confianza.
- Profesionalismo.
- Tecnología.
- Rapidez.
- Disponibilidad 24 horas.

Aplicar los siguientes principios:

- Minimalismo visual.
- Mobile-first.
- Tipografía moderna.
- Espaciados consistentes.
- Microanimaciones funcionales.
- Jerarquía visual clara.
- Composiciones cuidadas.
- Accesibilidad.
- Alto rendimiento.

Evitar el abuso de gradientes, sombras, bordes redondeados, glassmorphism, tarjetas genéricas y efectos decorativos innecesarios.

**Design philosophy: Less visual noise, more meaningful details.**

---

## 5. Motion & Microinteractions

Las microanimaciones son una prioridad importante del proyecto.

Inspirarse especialmente en el comportamiento visual de x.ai/bot.

Implementar cuando corresponda:

- Text reveal.
- Subtle fade-in.
- Stagger animations.
- Magnetic buttons.
- Animated icons.
- Hover transitions.
- Image reveal.
- Layout animations.
- Spring transitions.
- AnimatePresence.
- Animated navigation.
- Scroll-based entrance animations.

Las animaciones deben sentirse rápidas, fluidas y naturales.

Evitar animaciones excesivamente largas o repetitivas.

Priorizar propiedades eficientes como `transform` y `opacity`.

Respetar siempre `prefers-reduced-motion`.

En dispositivos móviles, adaptar o reducir animaciones costosas y no depender del hover para mostrar información importante.

---

## 6. Project Architecture

Mantener una estructura modular similar a:

```text
src/
├── assets/
├── components/
│   ├── ui/
│   ├── layout/
│   └── interactive/
├── sections/
├── data/
├── layouts/
├── pages/
├── styles/
└── utils/

public/
```

Reglas de arquitectura:

- No desarrollar toda la landing dentro de `index.astro`.
- Separar componentes estáticos e interactivos.
- Mantener los datos comerciales centralizados.
- Evitar código duplicado.
- Utilizar nombres de archivos y componentes descriptivos.
- Mantener una estructura fácil de ampliar.
- No introducir abstracciones innecesarias.
- Respetar los componentes y patrones existentes que ya hayan sido aprobados.

---

## 7. Responsive Requirements

El diseño debe construirse bajo una metodología mobile-first.

Soportar correctamente:

- Mobile.
- Tablet.
- Laptop.
- Desktop.
- Large desktop.

No limitarse a reducir proporcionalmente el diseño desktop.

Cada breakpoint debe presentar una composición intencional.

Verificar especialmente:

- Typography scaling.
- Image positioning.
- Touch targets.
- Navigation.
- Spacing.
- Grid adaptation.
- Animations.
- Horizontal overflow.

La experiencia móvil debe tener la misma calidad que la versión desktop.

---

## 8. Performance & SEO

Priorizar el rendimiento utilizando las capacidades nativas de Astro.

Aplicar:

- Optimización de imágenes.
- Lazy loading cuando corresponda.
- Carga eficiente de fuentes.
- Hidratación selectiva.
- Reducción del JavaScript enviado al navegador.
- Prevención de layout shifts.
- HTML semántico.
- Metadatos SEO.
- Open Graph.
- Schema.org / LocalBusiness.
- Accesibilidad WCAG.

Objetivo de referencia: intentar conseguir resultados Lighthouse superiores a 90 en las principales categorías.

Nunca sacrificar significativamente la experiencia de usuario por una animación decorativa.

---

## 9. Development Workflow — CRITICAL RULE

**El desarrollo debe realizarse SECTION BY SECTION.**

Claude NO está autorizado a construir toda la landing page en una sola ejecución.

El procedimiento obligatorio es:

1. Analizar la sección solicitada.
2. Revisar las referencias visuales pertinentes.
3. Implementar exclusivamente esa sección.
4. Desarrollar sus componentes y microanimaciones.
5. Adaptarla para móvil, tablet y desktop.
6. Verificar su funcionamiento.
7. Informar qué archivos fueron modificados.
8. Detenerse y esperar aprobación del usuario.

### Approval Rule

Nunca comenzar una sección nueva sin aprobación explícita del usuario.

Si el usuario solicita modificaciones sobre una sección existente, resolverlas antes de continuar.

No implementar anticipadamente secciones futuras.

No modificar secciones previamente aprobadas sin necesidad técnica justificada o autorización del usuario.

### Development Order

0. Project setup & architecture.
1. Navbar & Mobile Menu.
2. Hero Section.
3. Company Introduction.
4. Main Services.
5. Specialized Services.
6. Emergency 24/7.
7. Electric Gates.
8. Coverage Areas.
9. About Us.
10. Final CTA.
11. Footer.

El orden puede modificarse únicamente por indicación del usuario.

---

## 10. Coding Standards

- Escribir código limpio y mantenible.
- Mantener tipado TypeScript.
- Evitar `any` injustificados.
- Utilizar HTML semántico.
- Mantener componentes pequeños y reutilizables cuando corresponda.
- Evitar comentarios innecesarios.
- No dejar código muerto.
- No introducir soluciones temporales como implementación definitiva.
- No eliminar funcionalidades aprobadas.
- No instalar paquetes sin una justificación técnica.
- Seguir las convenciones del proyecto.

Antes de dar por terminada cada sección, revisar los scripts disponibles en `package.json` y ejecutar las verificaciones pertinentes, incluyendo build y comprobaciones de TypeScript cuando estén configuradas.

No afirmar que una prueba pasó si no fue ejecutada.

---

## 11. Communication Rules

Toda la comunicación con el usuario debe realizarse en español.

Los nombres de variables, componentes, funciones y archivos deben mantenerse preferiblemente en inglés.

Al terminar cada sección, entregar un resumen breve indicando:

- Sección implementada.
- Decisiones visuales.
- Microanimaciones añadidas.
- Adaptación responsive.
- Componentes creados.
- Archivos modificados.
- Resultado de las verificaciones técnicas.

Evitar explicaciones extensas del código salvo que el usuario las solicite.

No continuar automáticamente con nuevas funcionalidades.

---

## 12. Current Project Objective

El objetivo es desarrollar progresivamente una landing premium para Cerrajería Arrieta 24 Horas, inspirada principalmente en la estética y las microanimaciones de xAI.

La prioridad siempre será:

**UX → Conversion → Visual Quality → Responsive → Performance → Accessibility.**

El proyecto debe sentirse diseñado por un estudio digital profesional, manteniendo una experiencia rápida, accesible, minimalista y comercialmente efectiva.

Cada sección debe estar completamente revisada y aprobada antes de avanzar a la siguiente.