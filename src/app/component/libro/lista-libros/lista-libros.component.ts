import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Libro } from '../../../model/libro';
import { LibroService } from '../../../services/libro.service';
import { AutorService } from '../../../services/autor.service';
import { CommonModule } from '@angular/common';
import { Autor } from '../../../model/autor';

@Component({
  selector: 'app-lista-libros',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './lista-libros.component.html',
  styleUrl: './lista-libros.component.css'
})
export class ListaLibrosComponent {
  libros: Libro[] = [];
  autores: Autor[] = [];

  constructor(private libroService: LibroService, private autorService: AutorService) {
    this.libroService.getLibros().subscribe(l => this.libros = l);
    this.autorService.getAutores().subscribe(a => this.autores = a);
  }

  ngOnInit() {
    this.libroService.getLibros().subscribe((libros) => {
      this.libros = libros;
    });
  }

  deleteLibro(id: string) {
    this.libroService.deleteLibro(id).subscribe(() => {
      this.libroService.getLibros().subscribe(l => 
        this.libros = l);
    });
  }

  //a partir de aqui se puede eliminar
  getAllLibros() {
    this.libroService.getLibros().subscribe(() => {
      this.getAllLibros();
    });
  }

  addLibro(libro: Libro) {
    this.libroService.addLibro(libro).subscribe(() => {
      this.getAllLibros();
    });
  }
}
