# Pokedex Module Federation

Este repositorio demuestra una arquitectura de microfrontends con **Module Federation** sobre Vite y React. El proyecto se divide en tres aplicaciones independientes que se comunican entre sí para ofrecer una experiencia completa tipo Pokédex:

- **shell-pokedex (host)**: orquesta la navegación, provee estilos globales y expone un store compartido.
- **pokemon-detail (remote)**: muestra el detalle de un Pokémon individual.
- **pokemon-history (remote)**: presenta el historial de Pokémon visitados.

Cada microfrontend puede desarrollarse y desplegarse de forma aislada, pero al ejecutarlos juntos se integran dinámicamente a través de `remoteEntry.js`.

## Requisitos

- Node.js 20+ (recomendado) y npm.
- Puertos libres **3000**, **3001** y **3002**.

## Instalación

Instala las dependencias de cada microfrontend desde la raíz del repositorio:

```bash
cd shell-pokedex && npm install && cd ..
cd pokemon-detail && npm install && cd ..
cd pokemon-history && npm install && cd ..
```

## Ejecución en desarrollo

En tres terminales diferentes, levanta cada aplicación con sus puertos estrictos:

```bash
# Host
cd shell-pokedex
npm run dev

# Remote de detalle
cd pokemon-detail
npm run dev

# Remote de historial
cd pokemon-history
npm run dev
```

Luego abre `http://localhost:3000`. El host consumirá automáticamente los remotes publicados en `http://localhost:3001/assets/remoteEntry.js` y `http://localhost:3002/assets/remoteEntry.js`.

## Scripts útiles

| Aplicación          | Propósito                | Comando                 |
| ------------------- | ------------------------ | ----------------------- |
| Host / Remotes      | Desarrollo               | `npm run dev`           |
| Host / Remotes      | Build de producción      | `npm run build`         |
| Host / Remotes      | Previsualización build   | `npm run preview`       |
| Host / Remotes      | Linter                   | `npm run lint`          |

> Cada proyecto incluye `start` para construir y servir con `npm run build && npm run serve`.

## Estructura del repositorio

```
.
├── shell-pokedex/      # Aplicación host (router, temas, store compartido)
├── pokemon-detail/     # Remote con la página de detalle
└── pokemon-history/    # Remote con la página de historial
```

### Configuración de Module Federation

- El host declara los remotes en `shell-pokedex/vite.config.js` y expone `./store`.
- Cada remote expone su página principal (`PokemonDetailPage` y `PokemonHistoryPage`) en `pokemon-detail/vite.config.js` y `pokemon-history/vite.config.js`.
- Los paquetes compartidos incluyen `react`, `react-dom`, `styled-components`, `zustand` y `react-router-dom` (y `@tanstack/react-query` en el host).

## Notas de desarrollo

- Usa `npm run lint` en cada microfrontend para mantener la consistencia de código.
- Si modificas los puertos, recuerda actualizar las URLs de `remoteEntry.js` en las configuraciones de Vite correspondientes.