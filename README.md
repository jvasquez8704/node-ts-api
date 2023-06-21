## TEST Practico TS NodeJS

El api desarrollada tiene una integracion con serivios de google, especificamente con Firebase (Realtime Database) y Firestore, es posible acceder al api mediante el siguiente enlace [API Rest](http://146.190.15.167/api/tasks).

- El primer servicio es un `GET` que obtiene todas las notas creadas. 
- Tambien hay un servicio para obtener una tarea en especifico por medio del id de la misma `GET/:id`. 
- Es posible crear una tarea `POST`. 
- Actualizarla `PUT/:id`. 
- Y eliminarla `DELETE:id`. 

Mediante una configuracion interna es posible hacer switch entre firebase y firestore, en el controlador se accede directamente a la capa de persistencia mediante la inyeccion de dependecias, aunque en algunos casos hara falta la capa de servicios y business logic; la dependencia referencia es `TaskFirebaseRepo`, sin embargo solo haciendo referencia a la clase `TaskFirestoreRepo` estariamos apuntando a la base de datos de firestore del mismo proyecto de google.

Los servicios estan publicados en el siguiente enlace [Postman Documentation](https://documenter.getpostman.com/view/14461857/2s93si2ALf).


## Pruebas local

Para probar el proyecto local solo se deben correr los siguientes comandos.

### `npm install`

### `npm start`
