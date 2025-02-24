export interface Autor {
    idAutor: number;
    nombre: string;
    anioNacimiento: number;
    lugarNacimiento: {
        latitud: number;
        longitud: number;
    };
}