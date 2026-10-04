# Cerrajería Arrieta 24 Horas

Landing page de [cerrajeriaarrieta24horas.com](https://cerrajeriaarrieta24horas.com/), construida con Astro, TypeScript, Tailwind CSS 4, React Islands y Motion.

## Comandos

| Comando           | Acción                                          |
| :---------------- | :---------------------------------------------- |
| `npm install`     | Instala las dependencias                        |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`      |
| `npm run check`   | Verificación de tipos (`astro check`)           |
| `npm run build`   | Verificación de tipos y build de producción     |
| `npm run preview` | Previsualiza el build                           |
| `npm run generate:social` | Regenera la imagen social (`og-image.jpg`) y los iconos de app |

## SEO y GEO

- **Dominio:** `site` en `astro.config.mjs` (`https://cerrajeriaarrieta24horas.com`). Canonical, Open Graph, sitemap y Schema se derivan de él.
- **Datos únicos:** título, descripción, contacto, cobertura, servicios y FAQ viven en `src/data/`. La página, el Schema (`StructuredData.astro`) y `llms.txt` leen de ahí, así que nunca se contradicen.
- **Generados en el build:** `/sitemap.xml`, `/robots.txt` y `/llms.txt` (resumen para buscadores con IA).
- **Schema.org:** `WebSite`, `WebPage`, `Locksmith` (negocio con área de servicio, sin dirección física, con catálogo de servicios y zonas) y `FAQPage`.

## Estructura

```text
src/
├── components/
│   ├── ui/            Piezas presentacionales reutilizables (iconos, logotipo, textos animados)
│   ├── layout/        SEO y datos estructurados
│   └── interactive/   Islas React con Motion (navbar, efectos magnéticos, hooks)
├── sections/          Secciones de la landing
├── data/              Datos comerciales, contacto y navegación centralizados
├── layouts/           Layout base
├── pages/
├── styles/            Tailwind y tokens del sistema visual
└── utils/
```
