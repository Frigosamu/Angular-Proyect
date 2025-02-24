import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Libro } from '../model/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private urlLibro = 'http://localhost:3001/libros';

  constructor(private http: HttpClient) { }

  getLibros() {
    return this.http.get<Libro[]>(this.urlLibro);
  }

  getLibro(id: string) {
    return this.http.get<Libro>(`${this.urlLibro}/${id}`);
  }

  addLibro(libro: Libro) {
    return this.http.post<Libro>(this.urlLibro, libro);
  }

  updateLibro(libro: Libro) {
    return this.http.put<Libro>(`${this.urlLibro}/${libro.id}`, libro);
  }

  deleteLibro(id: string) {
    return this.http.delete<Libro>(`${this.urlLibro}/${id}`);
  }
}
