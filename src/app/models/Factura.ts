export interface Factura{
    idFactura?:number|null;
    Fecha:string;
	nitCliente:string;
	idEstado:number;
	total:number;
	fecha?:string;
	estadoTexto?:string;
}