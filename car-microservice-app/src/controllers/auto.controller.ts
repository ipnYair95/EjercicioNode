import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { AutoTo } from '../interface/autoTo'

export async function getCars(req: Request, res: Response): Promise<Response | void> {
    try {
        const conn_e = await connect();
        const posts = await conn_e.query('SELECT * FROM auto');
        return res.status(200).json(posts[0]);
    }
    catch (e) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        });
    }
}

export async function createCar(req: Request, res: Response) {
    try {
        const newCar: AutoTo = req.body;
        const conn = await connect();
        await conn.query('INSERT INTO auto SET ?', [newCar]);
        return res.status(200).json({
            message: 'Registro creado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        });
    }

}

export async function getCar(req: Request, res: Response) {
    try {
        const id = req.params.carId;
        const conn = await connect();
        console.log(id);
        const cars = await conn.query('SELECT * FROM auto WHERE auto_id = ?', [id]);
        return res.status(200).json(cars[0]);
    } catch (error) {
        return res.status(500).json({
            message: error
        });
    }

}

export async function deleteCar(req: Request, res: Response) {
    try {
        const id = req.params.carId;
        const conn = await connect();
        await conn.query('DELETE FROM auto WHERE auto_id = ?', [id]);
        return res.status(200).json({
            message: 'Registro borrado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        });
    }
}

export async function updateCar(req: Request, res: Response) {
    try {
        const id = req.params.carId;
        const updateCar: AutoTo = req.body;
        const conn = await connect();
        await conn.query('UPDATE auto set ? WHERE auto_id = ?', [updateCar, id]);
        return res.status(200).json({
            message: 'Registro actualizado correctamente'
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Ocurrio un error'
        });
    }

}