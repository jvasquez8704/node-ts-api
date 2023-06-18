import express, {Application } from 'express';
import taskRoutes from './routes/task';
import morgan from 'morgan';

class Api {
    private app: Application;
    private port: string;
    private routes: Record<string, string>;

    constructor() {
       this.app = express();
       this.port = process.env.PORT || '8080'
       this.routes = {
        tasks: '/api/tasks'
       }
       // middlewares
       this.loadMiddlewares()
       this.loadRoutes()
    }

    loadMiddlewares() {
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(morgan((process.env.NODE_ENV || 'local')));
    }

    loadRoutes() {
        this.app.use(this.routes.tasks, taskRoutes)
    }
    
    start() {
        this.app.listen(this.port, () => {
            console.log('server started at port', this.port
            );
        })
    }

}


export default Api;