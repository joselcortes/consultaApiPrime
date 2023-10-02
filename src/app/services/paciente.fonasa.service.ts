import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Fonasa } from '../interfaces/Paciente.fonasa';
import { Observable, catchError, of } from 'rxjs';



 @Injectable({providedIn: 'root'})
 export class PacienteFonasaService {
    private url:string = 'http://localhost:8080'
   constructor(private http: HttpClient) { }


   obtenerPacienteFonasa = (run: string): Observable<Fonasa> => {
    let separador = run.split("-");

    const body = {
      run: separador[0],
      dverificador: separador[1],
    };

    return this.http.post<Fonasa>(`${ this.url}/buscadorFonasa/obtenerPaciente`, body)
  //     .pipe(
  //       catchError(res => of(false))
  //     );
  // }
  }

}
