***Undefined Tech - Proyecto Web page***

https://undefined-tech-app.netlify.app/#

## Requisitos

### Frontend
- Instalar Node.js desde https://nodejs.org/es
  - Para verificar la instalación, abrir la terminal y escribir `node -v`
- Ejecutar los siguientes comandos dentro de un terminal en la carpeta `frontend/undefinedTechApp`:
  - `npm install`
  - `npm install -g @angular/cli`
  - (Verificar la instalación) `ng version`
  - `npm i bootstrap@5.3.3`
- Para editar los archivos .html buscar en la ruta `frontend/undefinedTechApp/src/app/pages/`:
  Aquí encontrarán una carpeta por cada página, en total son 5 (si hay alguna más avisen para agregar)
  - home
  - level1
  - level2
  - level3
  - score-table
- Cada carpeta está conformada por 4 archivos con diferente extensión:
  - archivo .css (agregar estilos)
  - archivo .html (agregar código fuente para cada página)
  - archivo .spec.ts (NO modificar nada)
  - archivo .ts (agregar métodos que se implementen en el .html)
- Si necesitan agregar imágenes o cualquier tipo de contenido multimedia guardarlo en la carpeta:
  - `frontend/undefinedTechApp/src/assets/`
- Para ejecutar la webPage en el terminal `ng serve`
- En cualquier navegador `localhost:4200`

### Backend
- Instalar Node.js desde https://nodejs.org/es (si no está ya instalado)
  - Para verificar la instalación, abrir la terminal y escribir `node -v`
- Ejecutar los siguientes comandos dentro de un terminal en la carpeta `backend/`:
  - `npm install`
  - `npm install -g nodemon`
- Para iniciar el servidor backend, ejecutar en el terminal:
  - `nodemon server.js`
- El servidor backend estará corriendo en `localhost:3000`

***Recordatorio: aún no hemos definido los colores nuevos para la página web***

