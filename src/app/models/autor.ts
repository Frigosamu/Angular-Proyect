export interface Autor {
    idAutor: number;
    autor: string;
    anioNacimiento: number;
    lugarNacimiento: {
        latitud: number;
        longitud: number;
    };
}