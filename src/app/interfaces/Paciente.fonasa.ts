
export interface Fonasa {
    run             : string;
    nombre          : string;
    apellido_paterno: string;
    apellido_materno: string;
    fecha_nacimiento: string;
    direccion:        string;
    telefono:         string;
    nombre_genero:    string;
    nombre_comuna:    string;
    nombre_completo?: string;
    id_comuna:        string;
    prevision:        string;
    ok?:              boolean;
}
