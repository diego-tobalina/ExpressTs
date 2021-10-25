# [🔥 UPDATE V1] ExpressTs

Aplicación de ejemplo de Node con TypeScript y Express

Utiliza base de datos PostgreSql, arquitectura hexagonal y permite generar nuevas entidades

## 💡 Cómo utilizar la aplicación

```
1. Renombrar el fichero **.env.example** a **.env**
2. Modificar las variables de entorno del fichero **.env**
3. Instalar el proyecto `npm install`
4. Lanzar el proyecto `npm run start` (para desarrollo utilizar `npm run dev`)
```

## 💡 Generar una nueva entidad

```
Lanzar el script "newEntity.js".
Este script utiliza como base la carpeta "content/example" para generar los nuevos ficheros.

Ejemplos:
node newEntity.js Car
node newEntity.js UserAccount
```

## 🚀 Desplegar en docker

```
1. Generar las imágenes de docker `docker-compose build`
2. Eliminar los contenedores anteriores `docker-compose down`
3. Lanzar los nuevos contenedores `docker-compose up -d`
4. Visualizar los logs de la app `docker logs -f --tail 100 spring 2>&1 | ccze -m ansi -o nolookups`
```

## 🚀 Desplegar en heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/xBidi/ExpressTs)

### ⚠️ Beware of forks. I do not give any guarantee that the fork may turn out to be a scam.
