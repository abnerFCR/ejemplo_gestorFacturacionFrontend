export interface Cliente{
    nitCliente:string; 
	nombre:string;
    facVigentes?:number;
    facAnuladas?:number;
    totalFacturacion?:number;
}

export class ClienteRepo{
    nitCliente:string=''; 
	nombre:string='';
    facVigentes:number=0;
    facAnuladas:number=0;
    totalFacturacion:number=0;
    totalFacturacionAnulada:number=0;
}