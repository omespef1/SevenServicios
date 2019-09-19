import { Component, OnInit } from "@angular/core";
import { SessionService } from "../../services/session.service";
import { BookingService } from "../../services/booking.service";
import { GeneralService } from "../../services/general.service";
import { bookingInfo } from "../../models/models";
import { NavController, IonRefresher } from "@ionic/angular";
import { ClassSpacesService } from '../../services/class-spaces.service';


@Component({
  selector: "app-booking",
  templateUrl: "./booking.page.html",
  styleUrls: ["./booking.page.scss"]
})
export class BookingPage implements OnInit {
  user: any;
  showCar: boolean = false;
  bookings: any[];
  carItemsCount: number = 0;
  bookingsList: any[];
  cancelValue: number[] = [];
  statesToPay = ["NO AUTORIZADO", "EXPIRADO", "FALLIDO"];
  logo: string;
  constructor(
    private session: SessionService,
    private _booking: BookingService,
    private _general: GeneralService,
    private navCtrl: NavController,
    private _classSpaces:ClassSpacesService
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.verifyItemsCar();
  }
  ionViewDidLoad() {
    this.session.GetLoggedin().then(resp => {
      this.user = resp;
      this.GetBooking();
      //Verificar si hay proceso de eventos pendiente
      //this.verifyPendings();
    });
  }

  GetBooking() {
    this._booking.GetBooking(this.user).then((resp: any) => {
      if (resp != null) {
        this.bookings = resp.ObjTransaction;

        this.initializeItems();
      } else {
        this._general.showToastMessage("No tiene reservas aún!", "bottom");
      }
    }),
      err => console.log("problemas " + err);
  }

 
  newBooking() {
    this.navCtrl.navigateForward('ClassSpaces');
  }
  goCar() {
    //migrar
    // this.navCtrl.push(CarPage, { option: "B" });
  }

  doRefresh(refresher: IonRefresher) {
    this._booking
      .GetBooking(this.user)
      .then((resp: any) => {
        if (resp != null) {
          this.bookings = resp.ObjTransaction;
          this.initializeItems();
        }

        refresher.complete();
        // this._general.showToastMessage('Reservas actualizadas!', 'bottom')
      })
      .catch(err => {
        this._general.showToastMessage(err, "bottom");
        //Error
      });
  }
  initializeItems(): void {
    this.bookingsList = this.bookings;
  }
  getItems(q: string) {
    //Reseteo los items a su estado original
    this.initializeItems();
    //Si el valor es vacío no filtra ndada
    if (!q || q.trim() === "") {
      return;
    }
    //Realiza el filtrado
    this.bookingsList = this.bookingsList.filter(
      v =>
        v.Res_nume.toString().indexOf(q.toString()) > -1 ||
        v.Cla_nomb.toString().indexOf(q.toLowerCase()) > -1 ||
        v.Esp_nomb.toString().indexOf(q.toLowerCase()) > -1
    );
  }

  CancelChange(booking: any, i: number) {
    if (this.cancelValue[i] == 80) {
      this._general
        .showMessageOption(
          "Cancelar reserva",
          "¿Está seguro de que desea cancelar esta reserva? Esta operación no puede deshacerse."
        )
        .then(() => {
          this.cancelBooking(booking, i);
          this.cancelValue = [];
        })
        .catch(() => {
          this.cancelValue[i] = 20;
        });
    } else {
      this.cancelValue[i] = 20;
    }
  }

  cancelBooking(booking: any, i: number) {
    //Se optiene la clase de espacio para verificar si ya se cumplió el tiempo de cancelación
    this._classSpaces.GetClassSpace(booking).then((resp: any) => {
      let fechaInicio = new Date(resp.FechaInicio);
      let fechaInicioPosible = this._general.addMinutes(resp.Cla_Tica);
      if (fechaInicioPosible > fechaInicio) {
        this._general.showToastMessage(
          `El plazo para cancelar la reserva  (${resp.Cla_Tica}) minuto(s) ha vencido.`,
          "bottom"
        );
        return;
      }
      //Se obtienen los items para llenar los motivos de rechazo
      this._booking.GetGnItems().then((resp: any) => {
        if (resp != null) {
          let items = resp.ObjTransaction;
          this._general
            .showConfirmMessage(
              "Está seguro de que desea cancelar esta reserva?",
              "Seleccione el motivo",
              items
            )
            .then(resp => {
              if (resp != null && resp != 0) {
                let cancel = {
                  justification: resp,
                  id: booking.Res_cont,
                  emp_codi: this.session.GetClientEmpCodi()
                };
                //Se cancela la reserva según el motivo de selección del usuario
                this._booking.cancelBooking(cancel).then((resp: any) => {
                  if (resp != null) {
                    this._general.showToastMessage(
                      "La reserva se ha cancelado!",
                      "bottom"
                    );
                    this.ionViewDidLoad();
                  } else {
                    this.cancelValue[i] = 20;
                  }
                });
              }
            })
            .catch(err => {
              this.cancelValue[i] = 20;
            });
        }
      });
    });
  }

  //Agrega la reserva seleccionada al carrito de compra
  async AddCart(booking: bookingInfo) {
    // let  test = this.session.verifyCarShopping(booking);
    // console.log( await test);
    try {
      await this.session.addShoppingList(booking);
      await this.verifyItemsCar();
      this._general.showToastMessage(
        `La reserva  ${booking.Res_cont} ha sido agregada al carrito!`,
        "bottom"
      );
    } catch (err) {
      this._general.showToastMessage(
        `Error agregando al carrito: ${err} `,
        "bottom"
      );
    }
  }

  showDetailsPayment(booking: bookingInfo) {
    let payment = { booking: booking, online: true };
    // migrar
    // this.navCtrl.push(ConfirmPaymentPage, { payment: payment });
  }

  async verifyItemsCar() {
    let list: any[] = <any[]>await this.session.getShoppingList();
    if (list != null && list != undefined) {
      if (list.length > 0) {
        this.carItemsCount = list.length;
        this.showCar = true;
      } else {
        this.showCar = false;
      }
    } else {
      this.showCar = false;
    }
  }
}
