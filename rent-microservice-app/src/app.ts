import express, {Application} from 'express'; 
import morgan from 'morgan';

import IndexRouters from "./routers/index.route";
import RentRouters from "./routers/rent.route";

export class App{

    private app:Application;

    constructor(private port:number){
        this.app = express();
        this.middleware();
        this.routes();
    }

    middleware(){
        this.app.use(morgan('dev'));
        this.app.use(express.json());
    }

    routes(){
        this.app.use(IndexRouters);
        this.app.use(RentRouters);
    }

    async listen(){
        await this.app.listen(this.port);
        console.log("Server on " + this.port);
    }
}