import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Autor } from '../model/autor';

@Injectable({
  providedIn: 'root'
})
export class AutorService {

  private urlAutores = 'http://localhost:3000/autores';

  constructor(private http: HttpClient) { }

  getAutores() {
    return this.http.get<Autor[]>(this.urlAutores);
  }

  getAutor(id: string) {
    return this.http.get<Autor>(`${this.urlAutores}/${id}`);
  }

  addAutor(autor: Autor) {
    return this.http.post(this.urlAutores, autor);
  }
  
  updateAutor(autor: Autor) {
    return this.http.put(`${this.urlAutores}/${autor.id}`, autor);
  }

  deleteAutor(id: string) {
    return this.http.delete(`${this.urlAutores}/${id}`);
  }

}
