export class Inscription {

    emp_codi: number;
    top_codi: number;
    inf_nume: number;
    inf_fech: Date;
    cli_coda: string;
    arb_cods: string;
    inf_desc: string;
    inf_icrm: string;
    inf_icde: string;
    inf_pcor: string;
    inf_envc: string;
    detalle:DetailInscription[];
}

export class DetailInscription{

    constructor(){
        this.din_feci = new Date();
        this.din_fecf=new Date();
    }
      pla_codi:number;
      cli_coda:string;
      din_cant:number;
      din_valo:number;
      din_tide:string;
      din_pvde:number;
      din_feci:Date;
      din_fecf:Date;
      din_cfef:string;
}