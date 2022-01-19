import { Request, Response } from "express";
import axios from "axios";
// DB
import { connect } from "../database";
// Interfaces
import { RentTo } from "../interface/rentTo";

async function validar(renta: RentTo) {
	const { cliente_id, auto_id } = renta;

	let responseClient = await axios.get(
		`http://localhost:3001/client/${cliente_id}`
	);
	let responseAuto = await axios.get(
		`http://localhost:3003/auto/${auto_id}`
	);

	let clienteId = responseClient.data[0]
		? responseClient.data[0].cliente_id
		: -1;
	let autoId = responseAuto.data[0]
		? responseAuto.data[0].cliente_id
		: -1;

	return {
		clienteId: clienteId != -1 ? true : false,
		autoId: autoId != -1 ? true : false,
	};
}

export async function getRentas(req: Request, res: Response) {
	try {
		const conn = await connect();
		const QUERY = "SELECT * FROM renta";

		const rentas = await conn.query(QUERY);

		return res.status(200).json(rentas[0]);
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
}

export async function getRenta(req: Request, res: Response) {
	try {
		const id = req.params.rentaId;
		const conn = await connect();
		const QUERY = "SELECT * FROM renta WHERE renta_id = ?";

		const rentas = await conn.query(QUERY, id);
		const rentasList = rentas[0] as [];

		console.log(rentasList);

		return res
			.status(200)
			.json(
				rentasList.length > 0
					? rentasList
					: { message: "No encontrado" }
			);
	} catch (error) {
		return res.status(500).json({
			message: error,
		});
	}
}

export async function createRent(req: Request, res: Response) {
	try {
		const newRent: RentTo = req.body;

		const { clienteId, autoId } = await validar(newRent);
		if (!clienteId || !autoId) {
			throw new Error("404: Auto o cliente no encontrados");
		}

		// SI EXISTE EL ID CLIENTE Y DE AUTO

		const conn = await connect();
		const QUERY = "INSERT INTO renta SET ?";
		await conn.query(QUERY, newRent);

		return res.status(200).json({
			message: "Registro creado correctamente",
		});
	} catch (err) {
		const { message } = err as Error;
		const code = message.split(":")[0] || 500;
		const msg = message.split(":")[1] || "Internal server error";

		console.log(message);
		return res.status(+code).json({
			message: msg,
		});
	}
}

//TODO UPDATE

export async function updateRent(req: Request, res: Response) {
	try {
		const updateRent: RentTo = req.body;
		const rentaId = req.params.rentaId;

		const { clienteId, autoId } = await validar(updateRent);
		if (!clienteId || !autoId) {
			throw new Error("404: Auto o cliente no encontrados");
		}

		// SI EXISTE EL ID CLIENTE Y DE AUTO

		const conn = await connect();
		const QUERY = "UPDATE renta SET ? WHERE renta_id = ?";
		await conn.query(QUERY, [updateRent, rentaId]);

		return res.status(200).json({
			message: "Registro actualizado correctamente",
		});
	} catch (err) {
		const { message } = err as Error;
		const code = message.split(":")[0] || 500;
		const msg = message.split(":")[1] || "Internal server error";

		console.log(message);
		return res.status(+code).json({
			message: msg,
		});
	}
}

export async function deleteRent(req: Request, res: Response) {
	try {
		const rentaId = req.params.rentaId;
		const conn = await connect();
		const QUERY = "DELETE FROM renta WHERE renta_id = ?";
		await conn.query(QUERY, [rentaId]);

		return res.status(200).json({
			message: "Registro eliminado correctamente",
		});
	} catch (err) {
		const { message } = err as Error;
		const code = message.split(":")[0] || 500;
		const msg = message.split(":")[1] || "Internal server error";

		console.log(message);
		return res.status(+code).json({
			message: msg,
		});
	}
}
