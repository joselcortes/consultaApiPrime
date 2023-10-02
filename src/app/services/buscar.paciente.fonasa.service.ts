import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from '../interfaces/Paciente';

@Injectable({providedIn: 'root'})
export class BuscarPacienteFonasa {

  private apiUrl = 'https://api-pacientes.netcat.cl';

  constructor(private http: HttpClient) {
   }

  obtenerPacienteFonasaAPI = (termino: string): Observable<Paciente> => {
    const auth = new HttpHeaders({
      "Content-Type": "aplication/json",
      "Authorization": "Basic " + btoa("admin:Cb7A506a"),
    });

    auth.append("Access-Control-Allow-Origin", `${this.apiUrl}/pacientes/buscar`);
    auth.append("Access-Control-Allow-Origin", "true");
    auth.append("Content-Type", "application/json");


    const url = `${this.apiUrl}/pacientes/fonasa/${termino}`;
    const body = {
      "termino": termino,
    }

    return this.http.post<Paciente>(url, body, {headers: auth})
      // .pipe(
      //   catchError(error => {
      //     return of(null as unknown as Paciente)
      //   })
      //    ,map(response => response !== null ? response : false as unknown as Paciente)
      //  );
  }


}
