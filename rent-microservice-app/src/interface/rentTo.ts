export interface RentTo {
    renta_id?: number;
    auto_id: number;
    cliente_id: number;
    renta_fecha_salida: Date;
    renta_fecha_regreso: Date;
    renta_kilometraje: number;
    renta_observaciones: String;
}
