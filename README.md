## TEST Practico TS NodeJS

El api desarrollada tiene una integracion con serivios de google, especificamente con Firebase (Realtime Database) y Firestore, es posible acceder al api mediante el siguiente enlace [API Rest](http://146.190.15.167/api/tasks).


### CATALOGO DE SERVICIOS
- El primer servicio es un `GET` que obtiene todas las notas creadas. 
- Tambien es posible obtener una tarea en especifico por medio del identificardor asignado por la DB `GET/:id`. 
- Podemos crear una tarea `POST` con titulo y descripcion. 
- Actualizar sus propiedades, incluyendo el status `PUT/:id`. 
- Y eliminarla `DELETE:id`. 

### FEATURES
Se realizaron 2 implementaciones a datasource de google firebase (Realtime DB) y Firestore de un mismo proyecto.

Mediante una configuracion interna es posible hacer switch entre datasources, en el controlador se accede directamente a la capa de persistencia mediante una inyeccion de dependecias utilizando `TypeDI`, por defecto esta `TaskFirebaseRepo`, sin embargo haciendo referencia a la clase `TaskFirestoreRepo` estariamos apuntando al source de firestore.




### Documentacion Basica
Los servicios estan publicados en el siguiente enlace [Postman Documentation](https://documenter.getpostman.com/view/14461857/2s93si2ALf).


## Pruebas locales

Para habilatar el servidor de forma local es necesario correr `npm install` y luego `npm start` el cuel desplegara el servidor de aplicaciones en el puerto `3000` .

### Unit Testing
Se realizo un pequeña implementacion de testing automatico a los servicios desarrollados mediante `jest` y `supertest`

### CI/CD
Los servicios fueron desplegados median un proveedor con servicios cloud, realizando el `CD` con `Kubernetes` y el `CI` con `GITHUB ACTIONS`
