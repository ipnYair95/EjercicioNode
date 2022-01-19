import { createPool } from "mysql2/promise";


export async function conexion( ) {

    const conn = await createPool({
        host: 'localhost',
        user: 'root',
        password: 'sasa',
        database: 'hertz'
    });

    return conn;
    
}