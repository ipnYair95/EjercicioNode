import { Request, Response } from "express";
import { conexion } from "../database";
import { Cliente } from "../interfaces/client";

import axios from "axios"


export async function getClients(
	req: Request,
	resp: Response
): Promise<Response> {
	try {
		const conn = await conexion();

		const QUERY = "SELECT * FROM cliente";

		const clients = await conn.query(QUERY);
		return resp.status(200).json(clients[0]);
	} catch (error) {
		return resp.status(500).json({
			message: error,
		});
	}
}

export async function createClient(
	req: Request,
	resp: Response
): Promise<Response> {
	try {
		const conn = await conexion();

		const newClient: Cliente = req.body;
		const QUERY = `INSERT INTO cliente SET ?`;

		await conn.query(QUERY, newClient);
		return resp
			.status(200)
			.json({ message: "Registro creado correctamente" });
	} catch (error) {
		return resp.status(500).json({
			message: error,
		});
	}
}

export async function getClient(
	req: Request,
	resp: Response
): Promise<Response> {
	try {
		const conn = await conexion();

		const id = req.params.clientId;
		const QUERY = "SELECT * FROM cliente WHERE cliente_id = ?";

		const client = await conn.query(QUERY, [id]);
		return resp.status(200).json(client[0]);
	} catch (error) {
		return resp.status(500).json({
			message: error,
		});
	}
}

export async function updateClient(
	req: Request,
	resp: Response
): Promise<Response> {
	try {
		const conn = await conexion();

		const id = req.params.clientId;
		const updateClient: Cliente = req.body;
		const QUERY = "UPDATE cliente SET ? WHERE cliente_id = ?";

		await conn.query(QUERY, [updateClient, id]);
		return resp
			.status(200)
			.json({ message: "Cliente actualizado" });
	} catch (error) {
		return resp.status(500).json({
			message: error,
		});
	}
}

export async function deleteClient(
	req: Request,
	resp: Response
): Promise<Response> {
	try {
		const conn = await conexion();
		const id = req.params.clientId;
		const QUERY = "DELETE FROM cliente WHERE cliente_id = ?";

		await conn.query(QUERY, [id]);
		return resp
			.status(200)
			.json({ message: "Cliente eliminado con exito" });
	} catch (error) {
		return resp.status(500).json({
			message: error,
		});
	}
}

export async function otraCosa(
	req: Request,
	resp: Response
): Promise<Response> {
	try {

		let respuesta;
		
		respuesta = await axios.get('https://restcountries.com/v2/name/mexico')
			.then( resp => {
				console.log(resp.data);
				return resp.data;
			})
			.catch( err => err )

		return resp
			.status(200)
			.json( respuesta );
		
	} catch (error) {
		return resp.status(500).json({
			message: error,
		});
	}
}



