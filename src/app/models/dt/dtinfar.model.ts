export class DtInfar {
    emp_codi :number;
    top_codi :number;
    inf_nume :number;
    inf_fech :Date  ;
    cli_coda :string;
    arb_cods :string;
    inf_desc :string;
    inf_icrm :string;
    inf_icde :string;
    inf_pcor :string;
    inf_envc :string;
    detalle:DtDinfa[]
}

export class DtDinfa{

    emp_codi :number ;
    inf_cont: number;
    apc_cont: number;
    cli_coda: string;
    din_cant: number;
    din_valo: number;
    din_tide: string;
    din_pvde: number;
}