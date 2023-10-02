
import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import { timeout } from 'rxjs';
import { Paciente } from 'src/app/interfaces/Paciente';
import { Fonasa } from 'src/app/interfaces/Paciente.fonasa';
import { BuscarPacienteFonasa } from 'src/app/services/buscar.paciente.fonasa.service';
import { FormateoRunService } from 'src/app/services/formateorut.service';
import { PacienteService } from 'src/app/services/paciente.service';


@Component({
  selector: 'component-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css'],
  providers: [ MessageService]
})
export class PacienteComponent{

  public run: string = '';
  public mensaje:string = '';
  public mensajeCarga:string = '';

  public pacientefonasa!: Fonasa | null
  public paciente!: Paciente

  public isLoad: boolean = false;
  // public consultaApi: boolean = false;
  // public mostrarDiv: boolean = false
  public mostrarTable: boolean = false
  public botonConsultaFonasa:boolean = true;

  @Output()
  txtInput = new EventEmitter<string>();

  constructor(
          private pacienteService:PacienteService,
          private formateoRunService:FormateoRunService,
          private PacienteFonasa:BuscarPacienteFonasa,
          private messageService: MessageService
        ){}

  searchByRun(term:string): void{

     this.pacientefonasa = null;
     this.isLoad = true
    //  this.mostrarDiv = false;
     this.mostrarTable = false
    //  this.consultaApi = false

     this.solicitar(term)

  }

  //Función para permitir solo numeros y letra k en el input
  check(event: any) {

    const tecla = (event.keyCode || event.which);

    // Tecla de retroceso para borrar, siempre la permite
    if (tecla === 8) {
      return true;
    }

    if ( event.target.tagName === 'INPUT' && event.key === 'Enter') {
      event.target.blur();
      event.preventDefault() // Quitar el enfoque del elemento
      return true; // Permitir la acción predeterminada (por ejemplo, enviar un formulario)
    }

    // Patrón de entrada, en este caso solo acepta números y letras
    const patron = /[0-9kK]/;
    const teclaFinal = String.fromCharCode(tecla);
    return patron.test(teclaFinal);
  }


  formatearRun(term:string){
    this.run = ''
    this.run = this.formateoRunService.formatearRUN(term)
  }

  conexionPacienteApi(term: Paciente){
    this.paciente = term
    console.log(this.paciente);
    //muestra u oculta los div
    this.mostrarTable = true;
    // this.mostrarDiv = false;
    this.isLoad = false;
  }
  solicitar(term: string){
      this.pacienteService.obtenerPacienteAPI(term)
      .pipe(
        timeout(20000)
      )
       .subscribe(
        {
          next: (paciente) => {
            console.log(paciente);
            if(paciente){

              // this.mensajeCarga = 'Error al cargar los datos de fonasa, se realizo una consulta interna y algunos datos no se mostraran'
              if(paciente.sexo === '-')
              {
                paciente.sexo = 'Sin información'
              }else if(paciente.sexo ==='M')
              {
                paciente.sexo = 'MASCULINO'
              }else{
                paciente.sexo = 'FEMENINO'
              }

              if(paciente.prevision.nombre === '-'){
                paciente.prevision.nombre = 'Sin información'
                paciente.prevision.tramo = ''
              }
              if(paciente.prevision.tramo === '-'){
                paciente.prevision.tramo = ''
              }

              paciente.comuna.nombre === '-' ? paciente.comuna.nombre = 'Sin información' : paciente.comuna.nombre;
              paciente.telefono === '-' ? paciente.telefono = 'Sin información' : paciente.telefono;
              paciente.direccion === '-' ? paciente.direccion = 'Sin información': paciente.direccion;
              paciente.apellido_materno==='-' ? paciente.apellido_materno = 'Sin información' : paciente.apellido_materno

              this.conexionPacienteApi(paciente);
              this.botonConsultaFonasa =  false

            }
          },
          error:(error) => {
            console.log(error);
            if(error.status === 404)
            {
              this.mensaje = 'El paciente no está registrado en la Api'
              this.isLoad = false;
              // this.mostrarDiv = true;
              this.mostrarTable = false;

              this.buscarPacienteFonasa(term)
            }
            // }else if(error.status === 403){

            //   // this.consultaApi = true
            //   this.mensajeCarga = 'No se encuentra información del paciente en nuestra base de datos';
            //   this.mensajeError(this.mensajeCarga)
            // }
            else if(error.name === "TimeoutError"){

              this.mensajeCarga = 'La conexión está demorando mucho, vuelva a intentar';
              this.mensajeError(this.mensajeCarga)
            }
            else{
              console.log(error);
              this.isLoad = false;
              // this.consultaApi = true
              this.mensajeCarga = 'Hubo un problema en la conexión';
              this.mensajeError(this.mensajeCarga)

            }
          },
          complete() {},
        })
  }
  buscarPacienteFonasa(term:string){
    this.PacienteFonasa.obtenerPacienteFonasaAPI(term)
      .pipe(
        timeout(20000)
      )
       .subscribe(
        {
          next: (paciente) => {
            if(paciente){
              //Genero
              paciente.sexo === '-' ? paciente.sexo = 'Sin información' :
                paciente.sexo === 'M' ? paciente.sexo = 'MASCULINO' :
                paciente.sexo = 'FEMENINO'
              //Prevision
              if(paciente.prevision.nombre === '-'){
                paciente.prevision.nombre = 'Sin información'
                paciente.prevision.tramo = ''
              }
              if(paciente.prevision.tramo === '-'){
                paciente.prevision.tramo = ''
              }

              paciente.apellido_materno ==='-' ? paciente.apellido_materno = 'Sin información' : paciente.apellido_materno
              paciente.comuna.nombre === '-' ? paciente.comuna.nombre = 'Sin información' : paciente.comuna.nombre;
              paciente.telefono === '-' || paciente.telefono === '0'? paciente.telefono = 'Sin información' : paciente.telefono;
              paciente.direccion === '-' ? paciente.direccion = 'Sin información': paciente.direccion;

              this.conexionPacienteApi(paciente);
              this.botonConsultaFonasa =  true

            }
          },
          error:(error) => {
            console.log(error);
            switch(error.status){
              case 404:
                this.mensaje = 'No se encuentran datos del paciente en el consultor fonasa'
                this.mensajeError(this.mensaje)

              break;
              // case 403:
              //   this.mensaje = 'Problemas con el consultor Fonasa 2 '
              //   this.mensajeError(this.mensaje)

              // break;
              case 500:
                this.mensaje = 'A ocurrido un error en el consultor fonasa'
                this.mensajeError(this.mensaje)

              break;

              default:
                this.mensajeCarga = 'Error al buscar el paciente, ';
                this.mensajeError(this.mensaje)
            }
            switch(error.name){
              case 'TimeoutError':
                this.mensaje = 'La conexión está demorando mucho, vuelva a intentar';
                this.mensajeError(this.mensaje);
            }

          },
          complete() {},
        })
  }

  validarRun(term:string){
    let elemento = document.getElementById("txtInput");
    elemento?.blur()
    if(term === '') return
    let val = this.formateoRunService.validarRun(term)
    if(val === false)
    {
      this.mensaje = 'El rut ingresado no es válido'
      this.mensajeError(this.mensaje)
      this.mostrarTable = false;
      // this.mostrarDiv = true;
      return
    }else{
      this.searchByRun(term)
    }
  }

  mensajeError(term:string){
    this.messageService.add({ severity: 'error', summary: 'Error', sticky: true,detail: term });
    this.isLoad = false;
    this.mostrarTable = false;
  }


}


