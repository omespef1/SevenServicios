export class dtprodu {
    pro_cont: number;
    pro_codi: string;
    pro_nomb: string;
    pro_marc: boolean;
}

export class dtcotiz {
    emp_codi: number;
    cli_coda: string;
    detalle: dtdcoti[];
}

export class dtdcoti {
    pro_codi: string;
}