import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Paciente } from '../interfaces/Paciente';

@Injectable({providedIn: 'root'})
export class PacienteService {

  private apiUrl = 'https://apifenix.hospitaldeovalle.cl';

  constructor(private http: HttpClient) {
   }

  obtenerPacienteAPI = (termino: string): Observable<Paciente> => {
    const auth = new HttpHeaders({
      "Content-Type": "aplication/json",
      "Authorization": "Basic " + btoa("admin:Cb7A506a"),
    });

    const url = `${this.apiUrl}/api/paciente/${termino}`;
    console.log(url);
    const body = {
      "termino": termino,
    }

    return this.http.get<Paciente>(url, {headers: auth})
      // .pipe(
      //   catchError(error => {
      //     return of(null as unknown as Paciente)
      //   })
      //    ,map(response => response !== null ? response : false as unknown as Paciente)
      //  );
  }


}
