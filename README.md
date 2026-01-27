# 👕 Catálogo de Ropa Online

Este es un catálogo web que hice para mostrar productos de ropa. La idea era tener algo limpio y funcional sin complicarme mucho con backend o bases de datos.

## ¿Qué hace?

Básicamente es una página para mostrar ropa con filtros y búsqueda. Los usuarios pueden:

- Ver el catálogo completo de productos
- Filtrar por categoría, talla, color y precio
- Buscar productos específicos
- Ver detalles de cada producto
- Contactar directamente por WhatsApp o Instagram para comprar

No tiene carrito de compras ni sistema de pago integrado porque la idea es que todo se maneje por WhatsApp (así trabajan muchos negocios pequeños de ropa acá en Perú).

## Estructura del proyecto

```
venta-de-ropa/
├── index.html          # Página principal
├── styles/
│   └── main.css        # Todo el CSS está acá
├── js/
│   ├── data.js         # Los productos están hardcodeados acá
│   ├── filters.js      # Lógica de filtros
│   ├── ui.js           # Renderizado de productos y UI
│   ├── modal.js        # Modal del producto
│   └── main.js         # Inicialización general
└── assets/
    └── img/            # Imágenes de productos y UI
```

## Características

### Filtros
Los filtros funcionan en tiempo real. Tengo:
- Categorías (polos, jeans, vestidos, etc.)
- Tallas (S, M, L, XL, tallas numéricas para pantalones)
- Colores
- Rango de precio con slider
- Ordenamiento

### Búsqueda en vivo
Escribes en la barra de búsqueda y va filtrando los productos automáticamente.

### Modal de producto
Cuando haces clic en un producto se abre un modal con:
- Galería de imágenes
- Detalles completos
- Selector de talla
- Botones para comprar directo por WhatsApp o Instagram

Los mensajes ya vienen pre-llenados con la info del producto para que sea más fácil para el cliente.

### Responsive
Funciona bien en móvil, tablet y desktop. Usé un enfoque mobile-first.

### Lazy loading
Los productos se cargan de a 12 para que no sea pesado. Hay un botón de "Ver más" abajo.

## Cómo usar

1. Abre el `index.html` en tu navegador y listo. No necesita instalación ni nada.

2. Si quieres cambiar los productos, edita el archivo `js/data.js`. Ahí está todo el array de productos.

3. Para cambiar el número de WhatsApp o Instagram:
   - WhatsApp: busca `51987654321` en el HTML y cámbialo
   - Instagram: busca `@tiendaropa_demo` y cámbialo

## Personalización

### Cambiar productos
En `js/data.js` encontrarás algo así:

```javascript
{
    id: 1,
    name: "Nombre del producto",
    category: "polos",
    price: 79.90,
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco"],
    images: ["ruta/imagen.webp"],
    // ...
}
```

Solo agrega o edita elementos en ese array.

### Cambiar colores y estilos
Todo el CSS está en `styles/main.css`. Uso variables CSS para los colores principales al inicio del archivo, así que si quieres cambiar el tema solo modifica esas variables.

### Agregar más imágenes
Las imágenes van en la carpeta `assets/img/`. Yo usé formato `.webp` porque pesa menos pero puedes usar `.jpg` o `.png` sin problema.

## Dependencias

Ninguna. Es vanilla JavaScript, HTML y CSS. 

Bueno, sí uso Google Fonts para las tipografías (Inter y Playfair Display) pero eso se carga desde un CDN.

## Notas

- Los productos son datos de ejemplo. En un caso real tendrías que actualizar todo en `data.js`.
- Las fotos también son genéricas que generé para la demo.
- No tiene backend, así que no hay usuarios, autenticación ni nada de eso.
- Pensado para negocios que manejan sus ventas por redes sociales.

## Deployment

Puedes subirlo a cualquier hosting estático:

- **GitHub Pages**: Es gratis y funciona perfecto para esto
- **Netlify**: También gratis, drag & drop y listo
- **Vercel**: Otra opción buena
- Cualquier servidor web básico

Como no tiene backend ni procesa información sensible, no necesitas nada especial.

## To-do (si le quiero meter más cosas después)

- [ ] Agregar sistema de favoritos que se guarde en localStorage
- [ ] Hacer que los filtros se guarden en la URL para compartir búsquedas
- [ ] Mejorar las animaciones
- [ ] Agregar más opciones de ordenamiento (por popularidad, por nombre)
- [ ] Tal vez un sistema de reseñas (aunque sea estático)

---

