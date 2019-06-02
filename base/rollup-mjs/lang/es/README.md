# rollup mjs

Esta configuración permite la creacion de aplicaciones progresivas(PWA) o sistemas de diseño con Atomico, el proyecto es gestionado gracias a Rollup.

La entrada por defecto es `index.html`, ud puede crear tantas como estime conveniente, ya que rollup mediante le plugins `@atomico/rollup-plugin-input-html`, es capas de escanear los ficheros HTML y extraer los módulos locales, para agruparlos en un solo bunde MJS asociado al fichero HTML de forma independiente, el directorio `dist`, es el destino del código procesado por rollup y es el directorio que ud debe enviar a producción.

los assets de proyecto como imágenes, svg o estilos globales deben ser añadidos en el directorio `dist`.

## Scripts

```bash
npm run build # modo produccion
npm run dev # modo desarrollo
```

## Exportación

La extracción del código js depende de `rollup.config.js`, ud pude crear mas ficheros HTML, ya que la captura de estos es mediante la expresión `*.html`, esta captura solo se realiza al momento de arrancar Rollup.

### Recomendación de directorio para aplicación

por defecto Atomico enseña la siguiente distribución para crear aplicaciones.

```bash
index.html
/src
  # You can create HoCs or reusable ui that do not
  # need declaration as web-components
  /components
  # To create reusable logic between
  # components and web-components
  /hooks
    useCustomHook.js
  # You can create HoCs or reusable ui
  # that do not need declaration as WC
  /pages
  	/home
  		index.js
  		style.css
  # Components declared as web-components
  /web-components
    /hello-world
      index.js
      style.css
```

### Recomendación directorio para sistemas de diseño

si ud crea ficheros HTML independientes podrá exportar los componentes de forma independiente, para una exportación ligera en producción comente el plugins `rollup-plugin-node-resolve` en `rollup.config.js`, de esta forma Atomico no formara parte del package.

```bash
ui-button.html # <script type="module" src="./src/web-component/ui-button">
ui-header.html # <script type="module" src="./src/web-component/ui-header">
/src
  /web-component
    /ui-button
      index.js
      style.css
    /ui-header
      index.js
      style.css
```

El resultado de dist será algo como esto:

```
/dist
  ui-button.html
  ui-button.js
  ui-button.html
  ui-button.js
```

ud puede consumir este recurso usando unpkg, ejemplo `http://unpkg.com/my-ui/dist/my-single-web-component?module`, unpkg añadirá de forma automática Atomico como recurso del package.

## Activación de PWA

El fichero que viene por defecto `index.html`, posee comentado el siguiente cogido .**Descomerte este código y habilitara el service worker**, este por defecto solo se actualiza al usar `npm run build`.

```html
<!--Delete comment to activate PWA
<script>
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
</script>
-->
```

#### recuerde completar manifest.json y actualizar los iconos previamente generados
