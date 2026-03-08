# Postulación Vacantes

Este proyecto es una aplicación desarrollada con el framework [NestJS](https://nestjs.com), diseñada para gestionar procesos de postulación a vacantes. La arquitectura del proyecto sigue principios de modularidad y escalabilidad, lo que facilita su mantenimiento y expansión.

## Descripción

La aplicación permite gestionar usuarios, roles, vacantes y procesos de autenticación. Está diseñada para ser utilizada como backend en sistemas de reclutamiento y selección de personal. Entre sus características principales se incluyen:

- **Gestión de usuarios:** Creación, actualización y eliminación de usuarios.
- **Gestión de roles:** Control de acceso basado en roles.
- **Gestión de vacantes:** Creación y administración de vacantes disponibles.
- **Autenticación y autorización:** Implementación de JWT para la seguridad.
- **Interceptors y decoradores personalizados:** Para manejar respuestas y roles de usuario.
- **Configuración de Swagger:** Documentación automática de la API.
- **Integración con TypeORM:** Para la gestión de la base de datos.

## Estructura del Proyecto

El proyecto está organizado en módulos para facilitar su mantenimiento y escalabilidad. A continuación, se describen los módulos principales:

- **Auth:** Manejo de autenticación y autorización.
- **User:** Gestión de usuarios.
- **Role:** Gestión de roles y permisos.
- **Vacancy:** Gestión de vacantes.
- **Common:** Contiene constantes, decoradores, guardias e interceptores reutilizables.
- **Config:** Configuración de la aplicación, incluyendo Swagger y TypeORM.
- **Database:** Configuración y conexión a la base de datos.

## Requisitos Previos

- Node.js (v16 o superior)
- npm (v8 o superior)
- Docker y Docker Compose
- Base de datos PostgreSQL

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd postulacion_vacantes
   ```

3. Instala las dependencias:

   ```bash
   npm install
   ```

## Configuración

1. Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables de entorno:

   ```env
   APP_CONTAINER_NAME=
   APP_PORT=
   NODE_ENV=
   POSTGRES_USER=
   POSTGRES_PASSWORD=
   POSTGRES_DB=
   POSTGRES_PORT=
   APP_CPU_LIMIT=
   APP_MEM_LIMIT=
   DB_CPU_LIMIT=
   DB_MEM_LIMIT=
   DB_CONTAINER_NAME=
   ```

2. Configura la base de datos en el archivo `src/config/typeOrm.config.ts`.

## Ejecución con Docker Compose

1. Construye y levanta los servicios definidos en el archivo `docker-compose.yml`:

   ```bash
   docker-compose up --build
   ```

2. Accede a la aplicación en `http://localhost:3000`.

## Ejecución sin Docker

### Desarrollo

```bash
npm run start:dev
```

### Producción

```bash
npm run start:prod
```

## Poblar la Base de Datos (Seeding)

El proyecto incluye un sistema de seeding para poblar la base de datos con datos iniciales de roles, usuarios y vacantes.

### Ejecutar Seeds

#### Desde tu máquina local:

```bash
npm run seed
```

#### Desde el contenedor Docker:

```bash
docker-compose exec app npm run seed
```

#### O entrando al contenedor:

```bash
docker-compose exec app sh
npm run seed
```

### Estructura de Seeds

Los datos de seed se encuentran en `src/seed/data/`:

- `roles.json`: Roles del sistema (ADMIN, USER, RECRUITER)
- `users.json`: Usuarios de prueba con sus respectivos roles
- `vacancies.json`: Vacantes de ejemplo

**Nota:** El seeding solo insertará datos si las tablas están vacías. Si ejecutas el comando múltiples veces, los datos existentes no se duplicarán.

## Pruebas

El proyecto incluye pruebas unitarias y de integración para garantizar la calidad del código.

```bash
# Pruebas unitarias
npm run test

# Pruebas end-to-end
npm run test:e2e

# Cobertura de pruebas
npm run test:cov
```

## Documentación de la API

La documentación de la API se genera automáticamente con Swagger. Una vez que la aplicación esté en ejecución, puedes acceder a la documentación en:

```
http://localhost:3000/api
```

## Contribución

Si deseas contribuir a este proyecto, por favor sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una rama para tu funcionalidad o corrección de errores:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y haz commit:

   ```bash
   git commit -m "Agrega nueva funcionalidad"
   ```

4. Envía tus cambios:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Crea un Pull Request.

## Licencia

Este proyecto está licenciado bajo la licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## Autor

- **Hector Vargas**

## Contacto

Si tienes preguntas o sugerencias, no dudes en ponerte en contacto.

---

¡Gracias por usar esta aplicación! Espero que sea útil para tus necesidades de gestión de vacantes.
