export class etcurso {
  emp_codi: number;
  cur_cont: number;
  cur_codi: number;
  cur_nomb: string;
  cur_esta: string;
  cur_tipo: string;
  pro_cont: number;
  ite_clas: number;
  ite_trad: number;
  cur_clas: number;
  cur_mese: number;
  cur_dias: number;
  cur_nmal: number;
  cur_mpre: number;
  cur_mpos: number;
  cas_cont: number;
  detail: etdcurs[];
}

export class etdcurs {
  emp_codi: number  ;
  cur_cont: number;
  dcu_cont: number;
  dcu_fech: Date;
  dcu_hori: Date;
  dcu_horf: Date;
  dcu_lune: string;
  dcu_mart: string;
  dcu_mier: string;
  dcu_juev: string;
  dcu_vier: string;
  dcu_saba: string;
  dcu_domi: string;
  checked:boolean;

}

