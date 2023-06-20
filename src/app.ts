
import 'reflect-metadata';
import express, { Application } from 'express';
import taskRoutes from './routes/task';
import morgan from 'morgan';
import Constants from './utils/constants';
class Api {
    constructor(
        private app:Application = express(),
        private port: string | number = process.env.PORT || Constants.DefaultPort,
        private routes:  Record<string, string> = Constants.ConfigRoutes

    ) {
       // middlewares
       this.loadMiddlewares()
       this.loadRoutes()
    }

    loadMiddlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan((process.env.NODE_ENV || Constants.DefaultEnv)));
    }

    loadRoutes() {
        this.app.use(this.routes.tasks, taskRoutes)
    }
    
    start() {
        this.app.listen(this.port, () => {
            console.log('server started at port ', this.port
            );
        })
    }

}


export default Api;