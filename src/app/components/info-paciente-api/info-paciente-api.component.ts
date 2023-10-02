import { Component, Input } from '@angular/core';
import { catchError, throwError, timeout } from 'rxjs';
import { Paciente } from 'src/app/interfaces/Paciente';
import { PacienteFonasaService } from 'src/app/services/paciente.fonasa.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-info-paciente-api',
  templateUrl: './info-paciente-api.component.html',
  styleUrls: ['./info-paciente-api.component.css'],
  providers: [ MessageService]

})
export class InfoPacienteApiComponent {

  @Input() paciente!:Paciente;
  @Input() botonConsulta!:boolean;

  public visible: boolean = false;
  public consultaApi: boolean = false;
  public mensajeCarga: string = '';
  public bloqueoBoton: boolean = false;


  constructor(
      private pacienteFonasa:PacienteFonasaService,
      private messageService: MessageService

    ){}

  obtenerPacientePorFonasa(term: string){

    this.receteo(true)
    // this.bloqueoBoton = true
    this.pacienteFonasa.obtenerPacienteFonasa(term)
    .pipe(
      timeout(20000)
    )
    .subscribe(
      {
        next: (pacientef) => {
          if(pacientef)
          {
            pacientef.nombre_genero === undefined ? pacientef.nombre_genero = 'Sin Datos'
            : this.paciente.sexo === 'Sin información' ? this.paciente.sexo = pacientef.nombre_genero.toUpperCase() : this.paciente.sexo

            if(this.paciente.prevision.nombre === 'Sin información')
            {
              this.paciente.prevision.nombre = pacientef.prevision;
              this.paciente.prevision.tramo = ''
            }

            pacientef.nombre_comuna === undefined ? pacientef.nombre_comuna = 'Sin Datos'
            : this.paciente.comuna.nombre === 'Sin información' ? this.paciente.comuna.nombre = pacientef.nombre_comuna.toUpperCase() : this.paciente.comuna.nombre

            pacientef.direccion === undefined ? pacientef.direccion = 'Sin Datos'
            : this.paciente.direccion === 'Sin información' ? this.paciente.direccion = pacientef.direccion.toUpperCase() : this.paciente.direccion


            pacientef.telefono === undefined || pacientef.telefono === '0' ? pacientef.telefono = 'Sin teléfono' :
            this.paciente.telefono === 'Sin información' ? this.paciente.telefono = pacientef.telefono : this.paciente.telefono

            this.showDialog(false)
          }

        },
        error: (error) =>{
          console.log(error);
          this.showDialog(false)

          this.activarError()
          this.toast(this.mensajeCarga)
        },
        complete(){}
      })
  }

  receteo(res: boolean){
    this.showDialog(true);
    this.consultaApi = false;
    this.mensajeCarga = ''
  }

  activarError(){
    this.consultaApi = true;
    this.mensajeCarga = 'Problemas con el consultor Fonasa'
    this.bloqueoBoton = false
  }

  showDialog(res: boolean) {
      this.visible = res;
  }

  toast(term:string){
    this.messageService.add({ severity: 'error', summary: 'Error', sticky: true,detail: term });
  }


}
