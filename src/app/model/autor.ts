export interface Autor {
    id: string;
    nombre: string;
    anioNacimiento: number;
    lugarNacimiento: {
        latitud: number;
        longitud: number;
    };
}