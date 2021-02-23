export interface ToTransaction {
    Retorno:number;
    TxtError:string;
    ObjTransaction:any;

}

export class loginRequest {
    Username:string;
    Password:string;
    emp_codi:number;
}

export interface TOAccess {
    errorMessage:string;
    codeResult:number;
    objResult:any;
    strToken:string;


}

export interface ToTransactionCentralizacion {
    $id:number;
    State:boolean;
    ObjResult:any;

}


