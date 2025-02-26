import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Libro } from '../../../model/libro';
import { LibroService } from '../../../services/libro.service';
import { AutorService } from '../../../services/autor.service';
import { CommonModule } from '@angular/common';
import { Autor } from '../../../model/autor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-lista-libros',
  imports: [RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './lista-libros.component.html',
  styleUrl: './lista-libros.component.css'
})
export class ListaLibrosComponent {
  libros: Libro[] = [];
  autores: Autor[] = [];
  filtro: string = 'alfabetico';

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

  ordenarLibros() {
    if (this.filtro === 'alfabetico') {
      this.libros.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (this.filtro === 'fecha') {
      this.libros.sort((a, b) => b.anioPublicacion - a.anioPublicacion);
    }
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
