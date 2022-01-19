import express, { Application } from "express";
import indexRoutes from "./routes/index.route";
import clientRoutes from "./routes/client.route";

export class App {
	private app: Application;

	constructor(private port: number) {
		this.app = express();
		this.middleware();
		this.routes();
	}

	middleware() {
		this.app.use(express.json());
	}

	routes() {
		this.app.use(indexRoutes);
		this.app.use(clientRoutes);
	}

	async listen() {
		await this.app.listen(this.port);
		console.log(`Listen in port ${this.port}`);
	}
}
