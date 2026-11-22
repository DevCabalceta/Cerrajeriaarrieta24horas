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

---

## 13. Marketing digital — plan de trabajo (iniciado 2026-11-21)

Objetivo: conseguir **llamadas y mensajes de WhatsApp** de clientes reales en Costa Rica con Google Ads, SEO local y el Perfil de Negocio de Google, midiendo cada contacto.

Este plan replica el proceso que ya se completó para otro cliente (Cerrajería24siete, proyecto aparte). **Solo se reutiliza el método: nunca copiar datos, cuentas, IDs, presupuestos ni resultados de ese negocio.** Todo dato de Arrieta debe salir de este repositorio, de su sitio publicado o de sus propias cuentas.

### Reglas

- No inventar servicios, zonas, años, garantías ni volúmenes/CPC: usar el Planificador de palabras clave o datos reales de la cuenta.
- No modificar código, publicar anuncios, cambiar presupuestos ni gastar dinero sin autorización explícita del dueño.
- No ingresar contraseñas ni datos de pago: cuando Google pida "Confirma tu identidad" o haya que recargar saldo, lo hace el dueño.
- Proyecciones siempre como estimaciones, nunca como resultados garantizados.

### Datos de Arrieta conocidos (verificar antes de usar)

- Sitio: https://cerrajeriaarrieta24horas.com (Astro en Vercel). Teléfono/WhatsApp +506 7204 1289. Correo y Facebook en `src/data/site.ts`.
- Secciones con ancla (posibles páginas de destino de Ads): `#inicio`, `#empresa`, `#servicios`, `#especialidades`, `#emergencias`, `#portones`, `#cobertura`, `#nosotros`, `#contacto`.
- Ya existe: `vercel.json` con 301 de las URLs del WordPress viejo; sitemap propio en `/sitemap.xml`; JSON-LD `Locksmith` + `FAQPage`.
- **Medición: no hay ninguna** (sin Google Tag Manager, GA4 ni Vercel Analytics) al 2026-11-17.
- Perfil de Negocio: "Cerrajería Arrieta 24 Horas Servicio a domicilio", 5.0 con 2 reseñas, abierto 24 h; aparece en el mapa para "cerrajero 24 horas" y "cerrajero a domicilio" (búsqueda hecha desde Belén, Heredia).
- Search Console: propiedad de dominio verificada (TXT en Vercel DNS) con la cuenta de Google abierta en Chrome; sitemap enviado y `/` con indexación solicitada el 2026-10-25. Ojo: la cuenta usada para Cerrajería24siete **no tiene acceso**.
- **Correo roto:** el dominio no tiene registros MX (2026-11-21); `servicioalcliente@` aparece en el sitio y en el JSON-LD pero no recibe correos.
- Google Ads: en la cuenta de Google de Cerrajería24siete aparece "Ronny Arrieta" (342-689-4723) **Cancelada**. La cuenta real con historial es **708-414-4545**, en la cuenta de Google del dueño (ronnyarrieta1966@…), que también tiene 3 administradoras vacías (515-594-3656, 471-669-6980 y 312-750-4025; esta última solo con "adwords 1" 342-575-9050, sin datos). Ver "Auditoría de Google Ads".
- Correo de contacto del sitio cambiado a `pamelac2398@gmail.com` el 2026-11-21 (pedido por el dueño).

### ⚠️ Antes de anunciar: política de "ventaja desleal"

Cerrajería24siete ya anuncia en las mismas búsquedas. Google no permite mostrar más de un anuncio **del mismo negocio** en la misma posición de anuncio. Si Arrieta y Cerrajería24siete son negocios independientes (dueños, teléfonos y operación distintos) pueden anunciar ambos; si son el mismo negocio o están relacionados, confirmar con el dueño y revisar la política de Google antes de lanzar campañas. Nunca usar la misma cuenta de Ads para los dos.

### Orden de trabajo (el que funcionó)

1. **Auditoría** del sitio publicado (Lighthouse, encabezados, enlaces `tel:`/`wa.me`, datos estructurados) y de la cuenta de Ads si tiene historial (términos de búsqueda, palabras clave, conversiones, ubicaciones, dispositivos, facturación, usuarios con acceso).
2. **Search Console**: propiedad de dominio (registro TXT en el DNS de Vercel, nombre vacío) → enviar el sitemap → quitar sitemaps viejos de WordPress → solicitar indexación de `/`.
3. **SEO on-page**: título, descripción y textos con las búsquedas reales de Search Console/Planificador ("cerrajería 24 horas", "cerrajería a domicilio", "apertura de carros"…), sin cambiar el diseño.
4. **Conversiones en Google Ads** (Objetivos → Crear acción → Sitio web → manual): "Clic en WhatsApp (sitio)" y "Clic en llamar (sitio)", categoría Contacto, acción principal, mismo valor, recuento "Una", **sin** conversiones avanzadas. Pasar "Vista de página" u otras viejas a **secundaria**.
5. **Google Tag Manager**: contenedor web nuevo con Google tag (AW-…), vinculador de conversiones y dos etiquetas de conversión de Ads; activadores "Clic – Solo enlaces → Algunos clics": Click URL contiene `tel:` / contiene `wa.me`. Publicar.
6. **Sitio**: snippet de GTM en `src/layouts/BaseLayout.astro` (head + noscript), ID centralizado en un archivo de `src/data/`. Validar (`astro check` + build) y probar con Chrome headless interceptando (sin enviar) las solicitudes a `googleadservices.com`: cada botón debe disparar **solo** su etiqueta.
7. **Estructura de Ads** (Búsqueda, solo Red de Búsqueda, palabras en frase/exacta, sin amplia hasta tener ~30 conversiones/mes): grupos por intención (general/cerca de mí, 24 h, a domicilio, zonas, automotriz, cerraduras y cajas fuertes; portones en campaña aparte si aplica), cada uno con su anuncio responsivo hacia su sección.
8. **Configuración de campañas**: presupuesto aprobado por el dueño, ubicación por **presencia** (no "presencia o interés"), revisar exclusiones heredadas, ajustes de oferta por provincia si el dueño prioriza zonas, tope de CPC según el Planificador, Maximizar clics hasta tener datos de conversión.
9. **Negativas** (walmart, epa, el lagar, ferretería, cómo, tutorial, curso, empleo, gratis, juego…) y **recursos**: vínculos a sitio a cada sección, textos destacados, fragmentos "Servicios", recurso de llamada.
10. **Perfil de Negocio**: descripción completa (≤750), sitio con `?utm_source=google&utm_medium=organic&utm_campaign=gbp`, áreas de servicio, horario, servicios personalizados, categorías, responder reseñas (con visto bueno del dueño), revisar "Personas y acceso".
11. **Redes** verificadas en los datos del sitio (footer, menú móvil y `sameAs`).
12. **Documentar** todo aquí (cuenta, IDs, presupuestos, fecha de revisión) y revisar resultados ~7 días después.

### Lecciones técnicas (ahorran horas)

- **Números de desvío de Google no existen en Costa Rica**: no se mide la duración de llamadas; solo clics en `tel:` y WhatsApp. Desactivar "informe de llamadas" en el recurso de llamada.
- **Política "Local services"**: muchas palabras con "cerrajero" se rechazan en carga masiva. En Costa Rica están permitidas, pero hay que agregarlas desde la interfaz marcando **"Solicitar una excepción"**.
- **Carga masiva de Ads** (Herramientas → Acciones masivas → Cargas, siempre "Vista previa" antes de "Aplicar"):
  - La columna **Campaign ID** es obligatoria; la concordancia va en la columna Keyword: `"frase"` o `[exacta]`.
  - Recursos: `Row Type` = `Sitelink` / `Callout` / `Structured snippet`, `Action` = Add, `Asset action` = Create new, `Level` = Campaign (`Callout extension` ya no es válido). Fragmentos: header `Services`, valores separados por `;`.
  - Las negativas se agregan mejor desde la interfaz (Palabras clave negativas → +).
  - Límites: títulos ≤30, descripciones ≤90, rutas ≤15, textos destacados ≤25, vínculos ≤25/≤35.
- **Importar contenedor en GTM**: el JSON necesita `accountId`, `containerId` y el bloque `container` (si no, "No se encuentra"); los filtros de activadores (`autoEventFilter`) **no se importan**, hay que ponerlos a mano y volver a publicar.
- **Google pide "Confirma tu identidad"** al guardar presupuestos o quitar usuarios: lo completa el dueño y luego se repite la acción.
- Activar una campaña detenida (inicio de gasto) puede quedar bloqueado por seguridad: pedir al dueño que la active.
- Si las capturas del navegador se congelan, la interfaz de Google Ads se puede leer/operar con JavaScript en la página; el editor del Perfil de Negocio necesita capturas.
- Un sitio de una sola página limita el SEO: las páginas por servicio/zona son el siguiente paso natural (ajustar `vercel.json` si se crean).

### Estado

- [x] Paso 1 — Auditoría (sitio y Google Ads, 2026-11-21)
- [x] Paso 2 — Search Console (2026-10-25; no había sitemaps viejos que quitar)
- [x] Paso 3 — SEO on-page (2026-11-22)
- [x] Paso 4 — Conversiones en Google Ads (2026-11-22)
- [x] Paso 5 — GA4 + GTM publicados (2026-11-22)
- [x] Paso 6 — GTM instalado en el sitio y probado (2026-11-22)
- [~] Pasos 7–9 — Campaña reestructurada (2026-11-21); presupuesto USD 20/día y pujas por provincia (2026-11-22); medición lista. **Sigue detenida**: falta que el dueño recargue saldo y la active
- [x] Paso 10 — Perfil de Negocio (2026-11-22)
- [~] Paso 11 — Redes: Facebook ya está en el sitio (footer, menú móvil, `sameAs`) y en el Perfil de Negocio; falta confirmar con el dueño si tiene otras redes (Instagram, TikTok…)
- [ ] Paso 12 — Documentación y fecha de revisión

#### Cambios en Google Ads (2026-11-21, con autorización del dueño)

- Campaña oficial: **Cerrajeriaarrieta24horas** (ID 20446500889). "Campaña de Búsqueda #1" quitada; "Portones OneSourceADS" renombrada a **Portones Eléctricos** (sin tocar su contenido; el dueño la quiere **detenida** por ahora, 2026-11-22).
- Ubicación: Presencia (antes Presencia o interés); San José (ciudad) → provincia de San José; se agregó Cartago. Tope de CPC USD 1,00 y Maximizar clics sin cambios.
- 2026-11-22 (pedido del dueño: "enfoque en SJ, Heredia, Alajuela y Cartago; los demás también, pero menos"): **presupuesto USD 45 → USD 20/día**; se quitaron las exclusiones de Puntarenas, Guanacaste, Limón y San Isidro de El General y se agregaron esas 3 provincias como ubicaciones con **ajuste de oferta -50 %** (las 4 provincias principales sin ajuste). Quedan 15 exclusiones, todas de otros países.
- 2026-11-22 (segundo pedido del dueño, "el puje", una sola campaña): ajustes de oferta por ubicación → **San José +35 %, Heredia +35 %, Alajuela +27 %, Cartago / Puntarenas / Guanacaste / Limón +3 %** (reemplaza los -50 % anteriores; Cartago pasa al grupo "resto"). Ojo: con Maximizar clics y tope de CPC USD 1,00, el tope limita la puja final, así que la diferencia real entre zonas puede ser menor que los porcentajes.
- Grupos (todos habilitados): `Cerrajeriaarrieta24horas` (general, con sus 2 anuncios responsivos "Excelente"), `Emergencias 24 Horas` → `/#emergencias`, `A Domicilio y Zonas GAM` → `/#cobertura`, `Automotriz` → `/#servicios`, `Cajas Fuertes y Llaves` → `/#especialidades`; cada grupo nuevo con su anuncio responsivo (14–15 títulos, 4 descripciones, sin teléfono en el texto).
- 77 palabras clave: 64 nuevas en frase/exacta (35 con excepción de "Servicios locales" solicitada, en revisión) y 12 amplias viejas detenidas.
- Detenido el anuncio de llamada viejo con el **8501 0505** (el dueño confirmó el 2026-11-22 que ya no lo usa; no volver a usarlo); el de display ya estaba detenido.
- Recursos: quitados 19 vínculos viejos (incluía "Guía de cómo llegar", aunque el negocio no tiene local), 8 textos destacados y 4 fragmentos con errores; creados 6 vínculos a secciones, 8 textos destacados, 1 fragmento "Servicios" y llamada **+506 7204 1289** (antes no había ninguna).
- Negativas: a las 12 existentes se sumaron 32 (walmart, epa, el lagar, ferretería, tutorial, cómo hacer, gratis, juegos, pdf, videos, ganzúa, amazon, mercado libre, temu, vacante…).
- Archivos de carga usados: generados con un script; no se guardan en el repo.

#### Medición (paso 4, 2026-11-22)

- ID de conversión de Google Ads: **AW-10779849723**.
- Acciones nuevas (Sitio web, manual con código, categoría **Contacto**, acción **principal**, valor fijo USD 1, recuento **Una**, ventana 90 días, atribución basada en datos), incluidas en los objetivos a nivel de cuenta:
  - **Clic en WhatsApp (sitio)** → etiqueta `V4V5CM-dl70dEPvnnZQo`
  - **Clic en llamar (sitio)** → etiqueta `AEvSCMqel70dEPvnnZQo`
- "Vista de página (Carga de página cerrajeriaarrieta24horas.com/)" pasada a **secundaria**. Las acciones viejas de Smart campaign / Business profile se dejaron como estaban (son de Google y no se pueden editar).
- No se activó la fuente "Conversiones de llamadas telefónicas" (no hay números de desvío en Costa Rica).

#### GA4 (2026-11-22)

- Cuenta GA **"Cerrajería Arrieta 24 Horas"** (ID 417142484), propiedad **"cerrajeriaarrieta24horas.com"** (ID 565368990), Costa Rica GMT-6, USD.
- Flujo web **"Sitio web Arrieta"** (`https://cerrajeriaarrieta24horas.com`, ID 16393965447) → **ID de medición `G-X9YEC5K08W`**. Medición mejorada activa (incluye clics de salida). GA creó además la etiqueta de Google `GTM-P4RLFKQN` asociada al flujo (no es el contenedor de GTM; no usarla en el sitio).
- **Vinculado con Google Ads 708-414-4545** (publicidad personalizada y etiquetado automático activos, valores por defecto). Correos promocionales de GA desmarcados.

#### Google Tag Manager (paso 5, 2026-11-22)

- El dueño aceptó los Términos de GTM. Cuenta **"Cerrajería Arrieta 24 Horas"** (ID 6407200081), contenedor web **"cerrajeriaarrieta24horas.com"** = **`GTM-WNPN8FKS`** (ID 288231409). Sin compartir datos anónimos.
- **Publicada la versión 2** ("v1 - GA4 + Google Ads (WhatsApp y llamar)"), importada desde JSON y con los filtros de los activadores puestos a mano:
  - Etiquetas en All Pages: `Google tag - GA4` (`G-X9YEC5K08W`), `Google tag - Google Ads` (`AW-10779849723`), `Vinculador de conversiones`.
  - `Ads - Clic en WhatsApp (sitio)` (10779849723 / `V4V5CM-dl70dEPvnnZQo`) y `GA4 - whatsapp_click` (parámetro `link_url` = Click URL) → activador **Clic - WhatsApp (wa.me)**: Solo enlaces, Click URL contiene `wa.me`.
  - `Ads - Clic en llamar (sitio)` (10779849723 / `AEvSCMqel70dEPvnnZQo`) y `GA4 - phone_click` → activador **Clic - Llamar (tel)**: Solo enlaces, Click URL contiene `tel:`.
- El nombre de un activador no puede llevar `:` (la importación falla con "The name contains invalid character").

#### Sitio (paso 6, 2026-11-22)

- `src/data/analytics.ts` (`gtmId`) + snippet de GTM en `src/layouts/BaseLayout.astro` (script en el `<head>` y `<noscript>` al inicio del `<body>`), **solo en builds de producción** (`import.meta.env.PROD`), así `npm run dev` no manda datos.
- Prueba con Chrome headless sobre `astro preview`, interceptando (sin enviar) todas las solicitudes a Google: carga → page_view de GA4/Ads; clic en `tel:` → **solo** la conversión `AEvSCMqel70dEPvnnZQo` + `phone_click`; clic en `wa.me` → **solo** `V4V5CM-dl70dEPvnnZQo` + `whatsapp_click`; enlace interno → nada; **deslizar el slider de WhatsApp** (`SlideToContact`) → una sola conversión de WhatsApp (tras el arrastre el navegador emite un `click` en el `<a>`; el componente evita la navegación duplicada y GTM igual lo registra porque "Comprobar validación" está desactivado — no activarlo).
- En producción desde el commit `eb58a6e`. Lighthouse móvil con GTM (bloqueando las solicitudes de recogida de Google): **91 / 100 / 100 / 100** (LCP 2,0 s, TBT 370 ms, CLS 0); antes de GTM era 99. Si hace falta recuperar rendimiento: cargar GTM tras el evento `load` (riesgo: perder visitas que rebotan muy rápido).

#### Punto de reanudación (actualizado 2026-11-22, fin de la sesión)

Forma de trabajo pedida por el dueño: **por pasos y en cada paso commit y push**, documentando aquí. Para retomar: "sigamos con el punto de reanudación del plan de marketing".

**Hecho el 2026-11-21/22** (detalle en las subsecciones de abajo):
- Google Ads: campaña oficial reestructurada, USD 20/día, pujas SJ/Heredia +35 %, Alajuela +27 %, Cartago/Puntarenas/Guanacaste/Limón +3 %; Portones Eléctricos detenida; anuncio del 8501 0505 detenido. Conversiones "Clic en WhatsApp/llamar (sitio)" creadas.
- GA4 `G-X9YEC5K08W` (vinculado con Ads) + GTM `GTM-WNPN8FKS` publicado (versión 2) + instalado en el sitio y probado (commit `eb58a6e`).
- SEO on-page con datos del Planificador (commit `0a51333`).
- Perfil de Negocio: descripción, sitio con UTM, Facebook, zonas (4 provincias), categorías, servicios y nombre "Cerrajería Arrieta 24 Horas".

**Pendiente, en orden:**
1. **Dueño:** recargar saldo de Google Ads (quedaban USD 24,39) y **activar la campaña** Cerrajeriaarrieta24horas (ID 20446500889). Si Google pide "Confirma tu identidad", lo hace el dueño.
2. **Verificar** (desde ~2026-11-23) que Google aprobó los cambios pendientes del Perfil de Negocio (nombre, zonas, sitio con UTM, Facebook, servicios) y que no pidió reverificación.
3. **GA4:** cuando lleguen los primeros clics reales (24–48 h con tráfico), marcar `whatsapp_click` y `phone_click` como **eventos clave** (Administrar → Visualización de datos → Eventos → estrella). Antes de recibir datos GA no permite marcarlos.
4. **Google Ads:** revisar que las 35 palabras con excepción de "Servicios locales" y los anuncios nuevos quedaron aprobados; revisar en "Conversiones" que las acciones pasen de "Esperando conversiones" a "Registrando".
5. **Paso 11:** preguntar al dueño si tiene otras redes además de Facebook y, si las hay, agregarlas a `src/data/site.ts` (`social`) y al Perfil de Negocio.
6. **Paso 12:** ~7 días después de activar la campaña, revisar resultados (términos de búsqueda → nuevas negativas, CPC real vs. tope USD 1,00, gasto por provincia, conversiones por grupo) y anotar aquí.
7. **Opcionales (requieren aprobación):** páginas por zona/servicio para SEO (Heredia, San José, Alajuela, Cartago, portones eléctricos); cargar GTM tras `load` si se quiere recuperar rendimiento (Lighthouse móvil 91 con GTM); pulir y reactivar la campaña "Portones Eléctricos" cuando el dueño quiera; subir fotos reales al Perfil de Negocio y pedir reseñas.

#### SEO on-page (paso 3, 2026-11-22)

- Volúmenes del Planificador (Costa Rica, todos los idiomas, nov-2025 → oct-2026, promedio mensual): cerrajería cerca de mí 5.400 · cerrajería 2.900 · portones eléctricos 720 · cerrajería heredia 480 · cerrajería san josé 480 · cerrajero 480 · cerrajería alajuela 390 · cerrajería 24 horas 320 · cerrajería cartago 320 · cerrajería costa rica 320 · motores para portones eléctricos 210 · cerrajería a domicilio 140 · apertura de carros 90 · copia de llaves 90 · reparación de portones eléctricos 90 · cerrajero heredia 90 · cerrajería automotriz 70 · mantenimiento de portones eléctricos 40 · copia de llave con chip 30 · llaves con chip 20 · apertura de cajas fuertes / abrir caja fuerte 10 · "rejas automáticas" ≈ 0 (en el sitio se usa "portones eléctricos", que es lo que se busca). Plan guardado en el Planificador ("Plan del nov 22, 2026").
- Cambios (sin tocar el diseño): título → **"Cerrajería 24 Horas a Domicilio en Costa Rica | Arrieta"** (55 caracteres); descripción → **"Cerrajería a domicilio 24/7 en San José, Heredia, Alajuela y Cartago: apertura de casas y carros, cajas fuertes, llaves con chip y portones eléctricos."** (151); Hero "casas, vehículos" → "casas, **carros**"; servicio automotriz "Apertura de vehículos" → "**Apertura de carros**"; portones "Motores" → "**Motores para portones**" con descripción "motores para portones eléctricos…"; JSON-LD `OfferCatalog` sin el "Portones eléctricos" duplicado (la categoría usa los servicios detallados de portones).
- "cerrajería cerca de mí" (la búsqueda más grande) depende sobre todo del Perfil de Negocio y el mapa → paso 10. El siguiente salto de SEO es crear páginas por zona/servicio (Heredia, San José, Alajuela, Cartago, portones eléctricos) — requiere aprobación de diseño.

#### Perfil de Negocio (paso 10, 2026-11-22)

- Perfil verificado, ID de tienda 08143462154185464434, sin ubicación pública (solo servicio a domicilio), cuenta del dueño. **Personas y acceso:** solo el dueño (propietario principal). Las 2 reseñas (5★, Carolina Calvo y Roca y Carbón) ya estaban respondidas.
- Cambios (algunos quedan "pendientes de revisión" de Google hasta 10 min – 1 día):
  - **Descripción** (748/750, ya publicada): "Cerrajería Arrieta 24 Horas es una cerrajería a domicilio con más de 40 años de experiencia en Costa Rica. Atendemos las 24 horas… San José, Heredia, Alajuela y Cartago; en el resto del país… con cita previa…" (solo datos del sitio). Antes: "Servicio de Cerrajería 24 Horas los 365 días del año".
  - **Sitio web** → `https://cerrajeriaarrieta24horas.com/?utm_source=google&utm_medium=organic&utm_campaign=gbp`.
  - **Facebook** agregado en perfiles de redes sociales.
  - **Áreas de servicio**: antes solo "Escazú"; ahora provincias de **San José, Heredia, Alajuela y Cartago** (+ Escazú).
  - **Categorías adicionales**: "Servicio de duplicación de llaves" y "Cerrajero de emergencia" (principal sigue "Cerrajero"). Se descartaron categorías de tiendas/fábricas de puertas por no describir el negocio.
  - **Servicios**: + Instalación, apertura y reparación de cerraduras de cajas de seguridad; Instalación de cerraduras; Reconfiguración de cerraduras; Reparación de cerraduras y afines; Reprogramación de llave digital y remota para automóviles; y personalizados: Extracción de llaves quebradas; Amaestramiento de cerraduras y candados; Mantenimiento y reparación de portones eléctricos; Venta e instalación de motores para portones eléctricos; Venta y programación de controles para portones; Copias de todo tipo de llaves, con o sin muestra.
  - Horario: ya era 24 h todos los días (sin cambios). Aviso "Google actualizó tus opciones de mensajería" **no aceptado** (decisión del dueño).
- **Nombre** (aprobado por el dueño el 2026-11-22): "Cerrajería Arrieta 24 Horas Servicio a domicilio" → **"Cerrajería Arrieta 24 Horas"** (como en el sitio; las directrices de Google no permiten descriptores en el nombre). Quedó pendiente de revisión de Google; no pidió reverificación al guardar. Si Google la pide después, la hace el dueño.
- Sugerido: subir fotos reales de trabajos (el perfil casi no tiene) y pedir reseñas con el enlace "Consigue más opiniones".

#### Auditoría del sitio (2026-11-21)

- Lighthouse en producción: móvil 99/100/100/100 (LCP 1,8 s, CLS 0); escritorio 100 en todo.
- Un H1, `lang="es-CR"`, canonical, OG y JSON-LD (`Locksmith` + `FAQPage` de 10 preguntas) correctos; 18 imágenes, todas con `alt`.
- Contacto: 10 enlaces `tel:+50672041289` y 19 `wa.me/50672041289` (cada servicio con su mensaje). No hay medición instalada.
- 301 del WordPress viejo funcionan; robots y sitemap correctos. Pendientes menores: `OfferCatalog` repite "Portones eléctricos"; en los botones "Llamar" el `aria-label` no incluye el texto visible (aviso de Lighthouse).
- Search Console (20-ago → 19-nov): 28 clics, 2.170 impresiones, CTR 1,3 %, posición 10,8; 90 % de impresiones en móvil. Consultas con más impresiones: "cerrajería en heredia" (55, pos. 2,2), "arrieta cerrajeros" (48), "mantenimiento rejas automáticas" (43, pos. 66), "cerrajero a domicilio heredia" (41, pos. 1,7), "cerrajería heredia 24 horas" (34, pos. 1,2), "cerrajero/cerrajería a domicilio" (34/33), "cerrajería cerca de mí" (27), "cerrajería 24 horas" (24–27, pos. 16–40). Heredia es la zona más fuerte; "24 horas" y "portones/rejas" rankean bajo.
- Indexación: 21 indexadas y 68 sin indexar (14 redirecciones, 10 noindex, 5 404, 1 403, 38 rastreadas sin indexar), casi todo URLs del WordPress viejo en transición.

#### Auditoría de Google Ads — cuenta 708-414-4545 (2026-11-21)

- Historial total (oct 2021 → nov 2026): USD 26.574, 84.024 clics y 3,53 M de impresiones. Sin campañas activas.
- Campañas:
  - **Cerrajeriaarrieta24horas** (Búsqueda, desde 10-ago-2023, USD 45/día, Maximizar clics, SJ/Alajuela/Heredia con 19 exclusiones). Gastó USD 22.712 en total: 2024 USD 5.403, 2025 USD 9.087, 2026 USD 6.650. Ritmo de ~USD 1.000/mes de dic-2025 a jun-2026, bajó en julio, casi nada en ago–oct. Gastó USD 86 del 1 al 10 de nov y el dueño la detuvo el 10-nov-2026 desde la app.
  - **Campaña de Búsqueda #1** (2022–2023, USD 34,65/día): USD 2.107, 3.518 clics.
  - **Llama a Expertos en Cerrajería** (Inteligente, 2021–2022, quitada): USD 1.754, 3.394 clics y 408 conversiones; fue la única con conversiones.
  - **Portones OneSourceADS** (Búsqueda, creada 28-ago-2023, USD 20/día, Maximizar clics, SJ/Alajuela/Heredia): casi sin uso, con 7 impresiones y USD 0,80 en total. Tiene 1 grupo, 10 palabras clave amplias de mantenimiento/reparación de portones y 1 anuncio responsivo (calidad "Excelente") hacia el dominio.
- Problemas: **0 conversiones medidas desde 2023** (solo existe "Vistas de página", sin datos). Palabras clave sobre todo en concordancia **amplia** (CPC ~USD 0,87). En los últimos 12 meses, **USD 2.140 (27 %) se fueron a la Red de Display** (1,04 M de impresiones y 21.003 clics a ~USD 0,10, CTR 2 %), contra USD 5.703 en Búsqueda (6.577 clics, CTR 8,4 %). Hoy la campaña ya solo tiene Búsqueda.
- Facturación: prepago manual con Visa; saldo USD 24,39 ("fondos agotándose"); último pago 4-nov-2026, USD 45.
- Accesos: el 18-nov-2026 el dueño quitó a un administrador `one…@gmail.com` (probablemente de OneSourceADS).
- Palabras clave con más gasto en 12 meses: "cerrajeria cerrajero" (frase, USD 1.814), "cerrajería a domicilio" (USD 782), "cerrajero de autos" (USD 670), "servicio de cerrajería" (USD 490), "cerrajería vehicular" (USD 473), "cerrajería cerca de mi" (USD 433).
- Dato para presupuestar: en 12 meses la Búsqueda solo absorbió ~USD 475/mes (~USD 16/día) con tope de CPC USD 1,00, aunque el presupuesto era USD 45/día; el resto se iba a Display.
