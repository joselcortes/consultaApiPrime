
export interface Paciente {
  _id:              string;
  run:              string;
  nombre:           string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  prevision:        Prevision;
  telefono:         string;
  direccion:        string;
  comuna:           Comuna;
  sexo:             string;
}

 export interface Comuna {
  id:     string;
  nombre: string;
 }

 export interface Prevision {
   id:     string;
   nombre: string;
   tramo:  string;
 }
