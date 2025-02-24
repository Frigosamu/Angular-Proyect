import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Libro } from '../../../model/libro';
import { LibroService } from '../../../services/libro.service';
import { AutorService } from '../../../services/autor.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-libros',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './lista-libros.component.html',
  styleUrl: './lista-libros.component.css'
})
export class ListaLibrosComponent {
  libros: Libro[] = [];

  constructor(private libroService: LibroService, private autorService: AutorService) {}

  ngOnInit() {
    this.libroService.getLibros().subscribe((libros) => {
      this.libros = libros;
    });
  }

  deleteLibro(idLibro: number) {
    this.libroService.deleteLibro(idLibro).subscribe(() => {
      this.libros = this.libros.filter((libro) => libro.idLibro !== idLibro);
    });
  }

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

  trackLibro(index: number, libro: Libro): number {
    return libro.idLibro;
  }
}
